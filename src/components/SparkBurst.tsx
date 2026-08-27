import { useMemo } from 'react';

interface Props {
  x: number;
  y: number;
  count?: number;
  colors?: string[];
}

const DEFAULT = ['#ffd24c', '#7bdfff', '#ff7eb6', '#ffffff'];

export default function SparkBurst({ x, y, count = 12, colors = DEFAULT }: Props) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 30 + Math.random() * 50;
        return {
          id: i,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          color: colors[i % colors.length],
          size: 6 + Math.random() * 8,
          dur: 0.5 + Math.random() * 0.4,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [x, y, count]
  );

  return (
    <div className="pointer-events-none fixed z-[70]" style={{ left: x, top: y }} aria-hidden>
      {sparks.map((s) => (
        <span
          key={s.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: s.size,
            height: s.size,
            background: s.color,
            ['--dx' as string]: `${s.dx}px`,
            ['--dy' as string]: `${s.dy}px`,
            animation: `sparkBurst ${s.dur}s ease-out forwards`,
          }}
        />
      ))}
    </div>
  );
}
