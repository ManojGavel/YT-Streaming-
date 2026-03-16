import { useState } from 'react';
import { extractVideoId, uid } from '../utils/utils';
import type { StreamData } from '../data/defaultStreams';
import './AddStreamModal.css';

const CATS: StreamData['category'][] = ['news', 'temple', 'music'];

export default function AddStreamModal({ onAdd, onClose }: { onAdd: (s: StreamData) => void; onClose: () => void }) {
  const [url, setUrl] = useState('');
  const [label, setLabel] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<StreamData['category']>('news');
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = extractVideoId(url.trim());
    if (!videoId) { setError('Enter a valid YouTube URL or video ID'); return; }
    if (!label.trim()) { setError('Label is required'); return; }
    onAdd({ id: uid(), videoId, label: label.trim(), location: location.trim() || 'India', category });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Channel</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={submit} className="modal-form">
          <div className="form-group">
            <label>YouTube URL or Video ID</label>
            <input type="text" value={url} onChange={e => { setUrl(e.target.value); setError(''); }} placeholder="https://youtube.com/watch?v=... or video ID" autoFocus />
          </div>
          <div className="form-group">
            <label>Label</label>
            <input type="text" value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. Aaj Tak" />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. New Delhi" />
          </div>
          <div className="form-group">
            <label>Category</label>
            <div className="category-grid">
              {CATS.map(c => (
                <button key={c} type="button" className={`cat-btn cat-${c} ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c.toUpperCase()}</button>
              ))}
            </div>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="submit-btn">+ Add</button>
        </form>
      </div>
    </div>
  );
}
