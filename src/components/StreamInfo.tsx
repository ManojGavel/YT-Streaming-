import type { StreamData } from '../data/defaultStreams';
import './StreamInfo.css';

interface StreamInfoProps {
  stream: StreamData | null;
}

export default function StreamInfo({ stream }: StreamInfoProps) {
  if (!stream) {
    return (
      <aside className="stream-info empty">
        <div className="info-placeholder">
          <span className="placeholder-icon">◎</span>
          <p>Select a feed to view details and enable audio</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="stream-info">
      <div className="info-header">
        <span className="info-led live" />
        <h2>FEED DETAILS</h2>
      </div>

      <div className="info-body">
        <div className="info-row">
          <span className="info-key">LABEL</span>
          <span className="info-value">{stream.label}</span>
        </div>
        <div className="info-row">
          <span className="info-key">LOCATION</span>
          <span className="info-value">{stream.location}</span>
        </div>
        <div className="info-row">
          <span className="info-key">CATEGORY</span>
          <span className={`info-value info-cat cat-${stream.category}`}>{stream.category.toUpperCase()}</span>
        </div>
        <div className="info-row">
          <span className="info-key">VIDEO ID</span>
          <span className="info-value mono">{stream.videoId}</span>
        </div>
        <div className="info-row">
          <span className="info-key">STREAM URL</span>
          <a
            className="info-value info-link"
            href={`https://www.youtube.com/watch?v=${stream.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            youtube.com/watch?v={stream.videoId}
          </a>
        </div>
        <div className="info-row">
          <span className="info-key">STATUS</span>
          <span className="info-value status-live">● LIVE</span>
        </div>
      </div>

      <div className="info-footer">
        <span className="info-hint">🔊 Audio is playing for this feed</span>
      </div>
    </aside>
  );
}
