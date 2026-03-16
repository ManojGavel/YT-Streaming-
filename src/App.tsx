import { useState, useCallback, useMemo, useEffect } from 'react';
import defaultStreams from './data/defaultStreams';
import type { StreamData } from './data/defaultStreams';
import AddStreamModal from './components/AddStreamModal';
import './App.css';

type ViewMode = 'gallery' | 'speaker' | 'focus';

const VIEW_LABELS: Record<ViewMode, string> = {
  gallery: '⊞ Gallery',
  speaker: '◧ Speaker',
  focus: '□ Focus',
};

export default function App() {
  const [streams, setStreams] = useState<StreamData[]>(defaultStreams);
  const [activeId, setActiveId] = useState<string>(defaultStreams[0]?.id ?? '');
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<ViewMode>('gallery');
  const [gridCols, setGridCols] = useState(4);

  const activeStream = streams.find((s) => s.id === activeId) ?? streams[0];
  const filmstrip = useMemo(() => streams.filter((s) => s.id !== activeId), [streams, activeId]);

  useEffect(() => {
    if (!streams.find((s) => s.id === activeId) && streams.length > 0) {
      setActiveId(streams[0].id);
    }
  }, [streams, activeId]);

  const handleRemove = useCallback((id: string) => {
    setStreams((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const handleAdd = useCallback((stream: StreamData) => {
    setStreams((prev) => [...prev, stream]);
  }, []);

  const activeSrc = useMemo(() => {
    if (!activeStream) return '';
    return `https://www.youtube.com/embed/${activeStream.videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&playsinline=1`;
  }, [activeStream]);

  return (
    <div className="gallery">
      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-left">
          <span className="topbar-dot" />
          <span className="topbar-title">Live Stream</span>
          <span className="topbar-count">{streams.length}</span>
        </div>

        <div className="topbar-center">
          {/* View mode dropdown */}
          <div className="view-dropdown">
            <select value={view} onChange={(e) => setView(e.target.value as ViewMode)} className="view-select">
              {(Object.keys(VIEW_LABELS) as ViewMode[]).map((v) => (
                <option key={v} value={v}>{VIEW_LABELS[v]}</option>
              ))}
            </select>
          </div>

          {/* Grid size controls — only in gallery view */}
          {view === 'gallery' && (
            <div className="grid-btns">
              {[3, 4, 5].map((n) => (
                <button key={n} className={`gbtn ${gridCols === n ? 'on' : ''}`} onClick={() => setGridCols(n)}>
                  {n}×{n}
                </button>
              ))}
            </div>
          )}

          {/* Active stream info (speaker / focus views) */}
          {view !== 'gallery' && activeStream && (
            <div className="topbar-info">
              <span className="topbar-live">● LIVE</span>
              <span className="topbar-label">{activeStream.label}</span>
              <span className="topbar-loc">{activeStream.location}</span>
            </div>
          )}
        </div>

        <div className="topbar-right">
          <button className="topbar-btn" onClick={() => setShowModal(true)}>+ Add Channel</button>
        </div>
      </header>

      {/* ═══════ GALLERY VIEW — Grid of all videos ═══════ */}
      {view === 'gallery' && (
        <div className="grid-view" style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
          {streams.map((stream, i) => (
            <GridTile
              key={stream.id}
              stream={stream}
              isActive={stream.id === activeId}
              onSelect={() => setActiveId(stream.id)}
              onRemove={() => handleRemove(stream.id)}
              onExpand={() => { setActiveId(stream.id); setView('focus'); }}
              loadDelay={100 + i * 120}
            />
          ))}
        </div>
      )}

      {/* ═══════ SPEAKER VIEW — Large video + horizontal filmstrip ═══════ */}
      {view === 'speaker' && (
        <>
          <main className="stage">
            {activeStream && (
              <div className="stage-video">
                <iframe
                  key={activeStream.videoId}
                  src={activeSrc}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  title={activeStream.label}
                />
                <div className="stage-nameplate">
                  <span className={`stage-cat cat-${activeStream.category}`}>●</span>
                  <span>{activeStream.label}</span>
                  <span className="stage-loc">— {activeStream.location}</span>
                </div>
              </div>
            )}
          </main>
          <div className="filmstrip">
            <div className="filmstrip-scroll">
              {filmstrip.map((stream) => (
                <FilmstripTile
                  key={stream.id}
                  stream={stream}
                  onSelect={() => setActiveId(stream.id)}
                  onRemove={() => handleRemove(stream.id)}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* ═══════ FOCUS VIEW — Single full-screen video ═══════ */}
      {view === 'focus' && activeStream && (
        <main className="focus-view">
          <div className="focus-video">
            <iframe
              key={activeStream.videoId}
              src={activeSrc}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title={activeStream.label}
            />
            <div className="focus-nameplate">
              <span className={`stage-cat cat-${activeStream.category}`}>●</span>
              <span className="focus-title">{activeStream.label}</span>
              <span className="stage-loc">— {activeStream.location}</span>
            </div>
            {/* Channel switcher in focus mode */}
            <div className="focus-nav">
              <button onClick={() => {
                const idx = streams.findIndex(s => s.id === activeId);
                const prev = (idx - 1 + streams.length) % streams.length;
                setActiveId(streams[prev].id);
              }}>◀ Prev</button>
              <span className="focus-counter">
                {streams.findIndex(s => s.id === activeId) + 1} / {streams.length}
              </span>
              <button onClick={() => {
                const idx = streams.findIndex(s => s.id === activeId);
                const next = (idx + 1) % streams.length;
                setActiveId(streams[next].id);
              }}>Next ▶</button>
            </div>
          </div>
        </main>
      )}

      {showModal && <AddStreamModal onAdd={handleAdd} onClose={() => setShowModal(false)} />}
    </div>
  );
}

/* ── Grid Tile (Gallery View) ── */
function GridTile({
  stream, isActive, onSelect, onRemove, onExpand, loadDelay,
}: {
  stream: StreamData; isActive: boolean;
  onSelect: () => void; onRemove: () => void; onExpand: () => void;
  loadDelay: number;
}) {
  const thumb = `https://img.youtube.com/vi/${stream.videoId}/mqdefault.jpg`;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), loadDelay);
    return () => clearTimeout(t);
  }, [loadDelay]);

  const src = useMemo(() => {
    return `https://www.youtube.com/embed/${stream.videoId}?autoplay=1&mute=${isActive ? '0' : '1'}&controls=0&modestbranding=1&rel=0&playsinline=1`;
  }, [stream.videoId, isActive]);

  return (
    <div className={`g-tile ${isActive ? 'active' : ''}`} onClick={onSelect}>
      <img src={thumb} className="g-thumb" alt="" />
      {loaded && <iframe src={src} className="g-iframe" allow="autoplay; encrypted-media" allowFullScreen title={stream.label} />}
      <div className="g-label">
        <span className={`cat-dot cat-${stream.category}`}>●</span>
        <span className="g-name">{stream.label}</span>
        {isActive && <span className="g-audio">🔊</span>}
      </div>
      <button className="g-expand" onClick={(e) => { e.stopPropagation(); onExpand(); }} title="Focus">⛶</button>
      <button className="g-x" onClick={(e) => { e.stopPropagation(); onRemove(); }}>×</button>
    </div>
  );
}

/* ── Filmstrip Tile (Speaker View) ── */
function FilmstripTile({
  stream, onSelect, onRemove,
}: {
  stream: StreamData; onSelect: () => void; onRemove: () => void;
}) {
  const thumb = `https://img.youtube.com/vi/${stream.videoId}/mqdefault.jpg`;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  const src = useMemo(() => {
    return `https://www.youtube.com/embed/${stream.videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1`;
  }, [stream.videoId]);

  return (
    <div className="film-tile" onClick={onSelect}>
      <img src={thumb} className="film-thumb" alt="" />
      {loaded && <iframe src={src} className="film-iframe" allow="autoplay; encrypted-media" title={stream.label} />}
      <div className="film-name">
        <span className={`cat-dot cat-${stream.category}`}>●</span>
        <span>{stream.label}</span>
      </div>
      <button className="film-x" onClick={(e) => { e.stopPropagation(); onRemove(); }}>×</button>
    </div>
  );
}
