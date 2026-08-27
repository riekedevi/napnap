import { useRef, useState } from 'react';
import LevelShell from '@/components/LevelShell';
import ProgressBar from '@/components/ProgressBar';
import SparkBurst from '@/components/SparkBurst';
import { sfx } from '@/game/audio';

interface Props {
  onComplete: (bonus: number) => void;
  onBack: () => void;
}

const WORDS = ['KEEP GOING', 'BELIEVE', "DON'T GIVE UP", 'YOU CAN DO IT'];
const POINTS_PER = 10;

export default function FinalTest({ onComplete, onBack }: Props) {
  const [pressed, setPressed] = useState<Set<number>>(new Set());
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  const sparkId = useRef(0);
  const [unlocked, setUnlocked] = useState(false);

  const total = WORDS.length;
  const progress = (pressed.size / total) * 100;
  const allPressed = pressed.size === total;

  const press = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (pressed.has(i)) return;
    sfx.spark();
    const rect = e.currentTarget.getBoundingClientRect();
    const id = sparkId.current++;
    setSparks((s) => [...s, { id, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }]);
    setTimeout(() => setSparks((s) => s.filter((sp) => sp.id !== id)), 700);

    setPressed((prev) => {
      const next = new Set(prev);
      next.add(i);
      if (next.size === total) {
        setTimeout(() => {
          sfx.levelComplete();
          setTimeout(() => setUnlocked(true), 1300);
        }, 300);
      }
      return next;
    });
  };

  return (
    <LevelShell level={3} title="FINAL TEST" tagline="You've come this far. One final task remains." onBack={onBack}>
      <div className="mb-6">
        <ProgressBar value={progress} showLabel />
      </div>

      <div className="flex flex-col gap-4">
        {WORDS.map((w, i) => {
          const isPressed = pressed.has(i);
          const driftX = (i % 2 === 0 ? 1 : -1) * (8 + i * 3);
          return (
            <button
              key={i}
              onClick={(e) => press(i, e)}
              disabled={isPressed}
              className={`press relative overflow-hidden rounded-2xl px-6 py-5 font-display text-lg font-semibold transition-all duration-300 ${
                isPressed
                  ? 'bg-gradient-to-r from-[#ffd24c] to-[#ffb703] text-[#0f1d3a]'
                  : 'glass text-white'
              }`}
              style={{
                animation: isPressed ? 'none' : `floatUpSm ${3 + i * 0.4}s ease-in-out infinite`,
                transform: isPressed ? 'none' : `translateX(${driftX}px)`,
              }}
            >
              {w}
              {isPressed && <span className="ml-2">✨</span>}
            </button>
          );
        })}
      </div>

      {sparks.map((s) => (
        <SparkBurst key={s.id} x={s.x} y={s.y} count={14} />
      ))}

      {allPressed && !unlocked && (
        <div className="anim-fade-up mt-8 text-center">
          <div className="text-4xl">✨</div>
          <h2 className="mt-2 font-display text-2xl font-bold text-white">MISSION COMPLETE</h2>
          <p className="mt-1 text-sm text-white/60">You made it.</p>
        </div>
      )}

      {unlocked && (
        <div className="anim-pop mt-8 text-center">
          <button
            onClick={() => {
              sfx.unlock();
              onComplete(80);
            }}
            className="press anim-glow rounded-full bg-gradient-to-r from-[#ffd24c] to-[#ffb703] px-10 py-4 font-display text-lg font-semibold text-[#0f1d3a] shadow-[0_10px_40px_rgba(255,210,76,0.55)]"
          >
            🔓 UNLOCK THE SURPRISE
          </button>
        </div>
      )}
    </LevelShell>
  );
}
