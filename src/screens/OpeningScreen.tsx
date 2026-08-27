import { useState } from 'react';
import StarField from '@/components/StarField';
import { sfx } from '@/game/audio';
import { RECIPIENT } from '@/game/types';

interface Props {
  onStart: () => void;
  onEasterEgg: () => void;
}

export default function OpeningScreen({ onStart, onEasterEgg }: Props) {
  const [taps, setTaps] = useState(0);

  const handleNameClick = () => {
    const next = taps + 1;
    setTaps(next);
    if (next >= 5) {
      setTaps(0);
      onEasterEgg();
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1e3a6b] via-[#16264d] to-[#0f1d3a] px-6 py-12 text-center">
      <StarField count={18} />

      <div className="relative z-10 flex flex-col items-center">
        <div className="anim-fade mb-3 rounded-full border border-[#ffd24c]/40 bg-[#ffd24c]/10 px-4 py-1.5 font-display text-xs font-semibold tracking-[0.25em] text-[#ffd24c]">
          MISSION START
        </div>

        <p className="anim-fade-up text-lg text-white/70 sm:text-xl">Hey,</p>
        <button
          onClick={handleNameClick}
          aria-label="Penerima ucapan"
          className="anim-pop press font-display text-4xl font-bold text-white sm:text-5xl"
        >
          {RECIPIENT}
        </button>

        <h1 className="anim-fade-up mt-8 max-w-md font-display text-2xl font-semibold leading-snug text-white sm:text-3xl" style={{ animationDelay: '0.15s' }}>
          Ada satu misi terakhir yang harus kamu selesaikan...
        </h1>

        <p className="anim-fade-up mt-4 max-w-sm text-sm text-white/60 sm:text-base" style={{ animationDelay: '0.3s' }}>
          Selesaikan semua challenge untuk membuka sesuatu yang spesial.
        </p>

        <button
          onClick={() => {
            sfx.click();
            onStart();
          }}
          className="anim-fade-up press mt-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffd24c] to-[#ffb703] px-10 py-4 font-display text-lg font-semibold text-[#0f1d3a] shadow-[0_12px_40px_rgba(255,210,76,0.5)]"
          style={{ animationDelay: '0.45s' }}
        >
          START MISSION <span className="text-xl">🚀</span>
        </button>
      </div>
    </div>
  );
}
