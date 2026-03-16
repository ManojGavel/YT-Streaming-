import { useState, useEffect } from 'react';
import { formatSurveillanceTime } from '../utils/utils';
import type { StreamData } from '../data/defaultStreams';
import './Header.css';

interface HeaderProps {
  streams: StreamData[];
  gridCols: number;
  onGridChange: (cols: number) => void;
  onAddStream: () => void;
  onToggleAll: () => void;
  allPaused: boolean;
  selectedStream: StreamData | null;
  onFullscreen: () => void;
}

export default function Header({
  streams,
  gridCols,
  onGridChange,
  onAddStream,
  onToggleAll,
  allPaused,
  selectedStream,
  onFullscreen,
}: HeaderProps) {
  const [time, setTime] = useState(formatSurveillanceTime());

  useEffect(() => {
    const t = setInterval(() => setTime(formatSurveillanceTime()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="cctv-header">
      <div className="header-left">
        <div className="header-logo">
          <span className="logo-icon">◉</span>
          <h1>SURVEIL<span className="accent">STREAM</span></h1>
        </div>
        <div className="header-meta">
          <span className="stream-count">
            <span className="pulse-dot" /> {streams.length} FEEDS ACTIVE
          </span>
          {selectedStream && (
            <span className="selected-label">▶ {selectedStream.label}</span>
          )}
        </div>
      </div>

      <div className="header-center">
        <span className="clock">{time}</span>
      </div>

      <div className="header-right">
        <div className="grid-selector">
          {[2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`grid-btn ${gridCols === n ? 'active' : ''}`}
              onClick={() => onGridChange(n)}
              title={`${n}×${n} grid`}
            >
              {n}×{n}
            </button>
          ))}
        </div>
        <button className="header-action" onClick={onToggleAll} title={allPaused ? 'Play All' : 'Pause All'}>
          {allPaused ? '▶ PLAY ALL' : '⏸ PAUSE ALL'}
        </button>
        <button className="header-action" onClick={onFullscreen} title="Fullscreen">
          ⛶
        </button>
        <button className="header-action add-btn" onClick={onAddStream}>
          + ADD FEED
        </button>
      </div>
    </header>
  );
}
