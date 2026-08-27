import { useMemo } from 'react';

interface Props {
  count?: number;
  fire?: boolean;
}

const COLORS = ['#ffd24c', '#6aa6ff', '#ff7eb6', '#7bdfff', '#b58cff', '#fff4d6'];
const SHAPES = ['■', '●', '▲', '★', '◆'];

interface Piece {
  id: number;
  left: number;
  delay: number;
  dur: number;
  color: string;
  shape: string;
  size: number;
}

export default function Confetti({ count = 80, fire = true }: Props) {
  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        dur: 2.5 + Math.random() * 2.5,
        color: COLORS[i % COLORS.length],
        shape: SHAPES[i % SHAPES.length],
        size: 8 + Math.random() * 12,
      })),
    [count]
  );

  if (!fire) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            color: p.color,
            animation: `confettiFall ${p.dur}s linear ${p.delay}s infinite`,
          }}
        >
          {p.shape}
        </span>
      ))}
    </div>
  );
}
