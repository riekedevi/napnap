import { useState } from 'react';
import { Check } from 'lucide-react';
import LevelShell from '@/components/LevelShell';
import { sfx } from '@/game/audio';

interface Props {
  onComplete: (bonus: number) => void;
  onBack: () => void;
}

interface Card {
  key: string;
  title: string;
  emoji: string;
  message: string;
}

const CARDS: Card[] = [
  { key: 'learn', title: 'LEARN', emoji: '📚', message: 'Every day taught you something new.' },
  { key: 'practice', title: 'PRACTICE', emoji: '🔄', message: 'Practice made you stronger.' },
  { key: 'struggle', title: 'STRUGGLE', emoji: '💧', message: 'The hard days mattered too.' },
  { key: 'grow', title: 'GROW', emoji: '🌱', message: 'And somehow, you kept going.' },
];

export default function JourneyLevel({ onComplete, onBack }: Props) {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const flip = (key: string) => {
    if (flipped.has(key)) return;
    sfx.flip();
    setFlipped((prev) => {
      const next = new Set(prev);
      next.add(key);
      if (next.size === CARDS.length) {
        setTimeout(() => sfx.levelComplete(), 400);
      }
      return next;
    });
  };

  const allFlipped = flipped.size === CARDS.length;

  return (
    <LevelShell level={1} title="THE JOURNEY" tagline="Every achievement has a story behind it." onBack={onBack}>
      <p className="mb-6 text-center text-sm text-white/60">
        Buka semua 4 kartu untuk melanjutkan.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {CARDS.map((c, i) => {
          const isFlipped = flipped.has(c.key);
          return (
            <button
              key={c.key}
              onClick={() => flip(c.key)}
              aria-label={`Kartu ${c.title}`}
              className="press relative h-44 [perspective:1000px] sm:h-48"
              style={{ animation: `fadeInUp 0.5s ${i * 0.1}s both` }}
            >
              <div className={`card-3d relative h-full w-full ${isFlipped ? 'flipped' : ''}`}>
                {/* front */}
                <div className="card-face absolute inset-0 flex flex-col items-center justify-center rounded-2xl glass text-center">
                  <span className="text-4xl">{c.emoji}</span>
                  <span className="mt-3 font-display text-lg font-semibold text-white">{c.title}</span>
                  <span className="mt-1 text-[10px] uppercase tracking-widest text-[#ffd24c]/70">tap to flip</span>
                </div>
                {/* back */}
                <div className="card-face card-back absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e3a6b] to-[#16264d] p-4 text-center shadow-lg">
                  <span className="text-2xl">{c.emoji}</span>
                  <p className="mt-2 font-display text-sm font-medium leading-snug text-white">{c.message}</p>
                  {isFlipped && (
                    <span className="anim-check absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#ffd24c] text-[#0f1d3a]">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {allFlipped && (
        <div className="anim-fade-up mt-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ffd24c]/15 px-5 py-2 font-display font-semibold text-[#ffd24c]">
            <Check size={18} strokeWidth={3} /> MISSION COMPLETED
          </div>
          <div>
            <button
              onClick={() => {
                sfx.click();
                onComplete(40);
              }}
              className="press rounded-full bg-gradient-to-r from-[#ffd24c] to-[#ffb703] px-10 py-4 font-display text-lg font-semibold text-[#0f1d3a] shadow-[0_10px_30px_rgba(255,210,76,0.4)]"
            >
              NEXT LEVEL →
            </button>
          </div>
        </div>
      )}
    </LevelShell>
  );
}
