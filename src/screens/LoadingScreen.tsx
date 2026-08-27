import { useEffect, useState } from 'react';
import StarField from '@/components/StarField';

interface Props {
  onReady: () => void;
}

export default function LoadingScreen({ onReady }: Props) {
  const [pct, setPct] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 16 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setReady(true);
      }
      setPct(Math.floor(p));
    }, 160);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#16264d] via-[#0f1d3a] to-[#0a1428] px-6 text-center">
      <StarField count={16} />
      <div className="anim-pop relative z-10 mb-8 text-6xl">🎓</div>
      <h1 className="font-display relative z-10 text-2xl font-semibold text-white sm:text-3xl">
        Preparing your mission...
      </h1>

      <div className="relative z-10 mt-8 w-full max-w-xs">
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/12">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#6aa6ff] to-[#ffd24c] transition-all duration-200"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 font-display text-sm font-semibold tracking-widest text-white/70">{pct}%</div>
      </div>

      {ready && (
        <button
          onClick={onReady}
          className="anim-fade-up press relative z-10 mt-10 rounded-full bg-gradient-to-r from-[#ffd24c] to-[#ffb703] px-12 py-4 font-display text-lg font-semibold text-[#0f1d3a] shadow-[0_10px_40px_rgba(255,210,76,0.45)]"
        >
          START
        </button>
      )}
    </div>
  );
}
