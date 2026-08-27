import { RotateCcw, ChevronLeft } from 'lucide-react';
import LevelCard from '@/components/LevelCard';
import StarField from '@/components/StarField';
import { sfx } from '@/game/audio';
import { LEVELS, RECIPIENT, Screen, TOTAL_LEVELS } from '@/game/types';

interface Props {
  completedLevels: number[];
  score: number;
  onOpenLevel: (screen: Screen) => void;
  onReset: () => void;
}

export default function GameMap({ completedLevels, score, onOpenLevel, onReset }: Props) {
  const done = completedLevels.length;

  const statusOf = (id: number): 'locked' | 'available' | 'completed' => {
    if (completedLevels.includes(id)) return 'completed';
    if (id === 1 || completedLevels.includes(id - 1)) return 'available';
    return 'locked';
  };

  const handleReset = () => {
    if (window.confirm('Yakin ingin mengulang misi dari awal? Semua progress akan hilang.')) {
      sfx.click();
      onReset();
    }
  };

  const screenFor = (id: number): Screen =>
    id === 1 ? 'level1' : id === 2 ? 'level2' : id === 3 ? 'level3' : 'surprise';

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#16264d] via-[#0f1d3a] to-[#0a1428] px-5 py-8 sm:px-6">
      <StarField count={10} />

      <div className="relative z-10 mx-auto max-w-md">
        <button
          onClick={handleReset}
          aria-label="Reset game"
          className="press glass absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full text-white/70"
        >
          <RotateCcw size={18} />
        </button>

        <div className="text-center">
          <div className="font-display text-xs font-semibold tracking-[0.25em] text-[#ffd24c]">MISSION PROGRESS</div>
          <div className="mt-1 font-display text-sm text-white/60">
            {done} / {TOTAL_LEVELS} COMPLETED
          </div>
          <div className="mx-auto mt-3 h-2 w-40 overflow-hidden rounded-full bg-white/12">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#6aa6ff] to-[#ffd24c] transition-all duration-500"
              style={{ width: `${(done / TOTAL_LEVELS) * 100}%` }}
            />
          </div>
        </div>

        <h1 className="mt-8 text-center font-display text-3xl font-bold text-white sm:text-4xl">
          {RECIPIENT.split(' ').map((w, i) => (
            <span key={i} className={i === 1 ? 'shimmer-text' : ''}>
              {w}{' '}
            </span>
          ))}
          JOURNEY
        </h1>
        <p className="mt-2 text-center text-sm text-white/55">One last journey before the final surprise.</p>

        <div className="mt-10 flex flex-col gap-8">
          {LEVELS.map((lv, i) => (
            <LevelCard
              key={lv.id}
              index={lv.id}
              icon={lv.icon}
              title={lv.title}
              sub={lv.sub}
              status={statusOf(lv.id)}
              isLast={i === LEVELS.length - 1}
              onClick={() => {
                if (statusOf(lv.id) === 'locked') return;
                sfx.click();
                onOpenLevel(screenFor(lv.id));
              }}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 rounded-2xl glass px-4 py-3 text-center">
          <ChevronLeft size={16} className="rotate-90 text-[#ffd24c]" />
          <span className="text-sm text-white/70">
            Score: <span className="font-display font-bold text-[#ffd24c]">{score}</span> XP
          </span>
        </div>
      </div>
    </div>
  );
}
