import { useMemo } from 'react';

interface Props {
  count?: number;
  className?: string;
}

const EMOJIS = ['⭐', '✨', '🎓', '💫'];

export default function StarField({ count = 14, className = '' }: Props) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 10 + Math.random() * 18,
        delay: Math.random() * 3,
        dur: 2 + Math.random() * 3,
        char: EMOJIS[i % EMOJIS.length],
        drift: (Math.random() - 0.5) * 80,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute anim-twinkle select-none"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
            ['--drift' as string]: `${s.drift}px`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
