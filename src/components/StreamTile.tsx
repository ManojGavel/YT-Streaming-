import { useMemo, useState, useEffect } from 'react';
import type { StreamData } from '../data/defaultStreams';
import './StreamTile.css';

interface Props {
  stream: StreamData;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onExpand: () => void;
  loadDelay: number;
}

export default function StreamTile({ stream, isSelected, onSelect, onRemove, onExpand, loadDelay }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), loadDelay);
    return () => clearTimeout(t);
  }, [loadDelay]);

  const src = useMemo(() => {
    const p = new URLSearchParams({
      autoplay: '1',
      mute: isSelected ? '0' : '1',
      controls: '0',
      modestbranding: '1',
      rel: '0',
      playsinline: '1',
    });
    return `https://www.youtube.com/embed/${stream.videoId}?${p}`;
  }, [stream.videoId, isSelected]);

  const thumb = `https://img.youtube.com/vi/${stream.videoId}/hqdefault.jpg`;

  return (
    <div className={`tile ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <img src={thumb} className="tile-thumb" alt="" />
      {loaded && (
        <iframe src={src} className="tile-iframe" allow="autoplay; encrypted-media" allowFullScreen title={stream.label} />
      )}
      <div className="tile-label">
        <span className={`cat-dot cat-${stream.category}`}>●</span>
        <span className="name">{stream.label}</span>
        {isSelected && <span className="audio-on">🔊</span>}
      </div>
      {/* Expand button */}
      <button className="tile-expand" onClick={(e) => { e.stopPropagation(); onExpand(); }} title="Big Screen">⛶</button>
      <button className="tile-x" onClick={(e) => { e.stopPropagation(); onRemove(); }}>×</button>
    </div>
  );
}
