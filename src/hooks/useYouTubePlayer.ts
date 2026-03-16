import { useEffect, useRef, useCallback } from 'react';

// Extend window for YT API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

let apiLoaded = false;
let apiReady = false;
const readyCallbacks: (() => void)[] = [];

function loadYouTubeAPI() {
  if (apiLoaded) return;
  apiLoaded = true;
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
  window.onYouTubeIframeAPIReady = () => {
    apiReady = true;
    readyCallbacks.forEach((cb) => cb());
    readyCallbacks.length = 0;
  };
}

function onAPIReady(cb: () => void) {
  if (apiReady) {
    cb();
  } else {
    readyCallbacks.push(cb);
  }
}

interface UseYouTubePlayerOptions {
  containerId: string;
  videoId: string;
  muted?: boolean;
  onReady?: (player: any) => void;
}

export function useYouTubePlayer({ containerId, videoId, muted = true, onReady }: UseYouTubePlayerOptions) {
  const playerRef = useRef<any | null>(null);
  const readyCbRef = useRef(onReady);
  readyCbRef.current = onReady;

  useEffect(() => {
    loadYouTubeAPI();

    onAPIReady(() => {
      // Destroy existing player if any
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch { /* noop */ }
        playerRef.current = null;
      }

      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: muted ? 1 : 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: any) => {
            if (muted) e.target.mute();
            e.target.playVideo();
            readyCbRef.current?.(e.target);
          },
          onError: () => {
            // Silently handle unavailable streams
          },
        },
      });
    });

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch { /* noop */ }
        playerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId, videoId]);

  const mute = useCallback(() => {
    playerRef.current?.mute();
  }, []);

  const unMute = useCallback(() => {
    playerRef.current?.unMute();
    playerRef.current?.playVideo();
  }, []);

  const getPlayer = useCallback(() => playerRef.current, []);

  return { mute, unMute, getPlayer };
}
