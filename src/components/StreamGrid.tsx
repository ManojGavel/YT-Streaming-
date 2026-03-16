import type { StreamData } from '../data/defaultStreams';
import StreamTile from './StreamTile';
import './StreamGrid.css';

interface Props {
  streams: StreamData[];
  selectedId: string | null;
  gridCols: number;
  muteAll: boolean;
  onSelect: (stream: StreamData) => void;
  onRemove: (id: string) => void;
  onExpand: (stream: StreamData) => void;
}

export default function StreamGrid({ streams, selectedId, gridCols, muteAll, onSelect, onRemove, onExpand }: Props) {
  return (
    <div className="stream-grid" style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
      {streams.map((stream, i) => (
        <StreamTile
          key={stream.id}
          stream={stream}
          isSelected={!muteAll && stream.id === selectedId}
          onSelect={() => onSelect(stream)}
          onRemove={() => onRemove(stream.id)}
          onExpand={() => onExpand(stream)}
          loadDelay={200 + i * 150}
        />
      ))}
    </div>
  );
}
