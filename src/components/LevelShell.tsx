import { ChevronLeft } from 'lucide-react';
import { ReactNode } from 'react';
import StarField from '@/components/StarField';
import { sfx } from '@/game/audio';

interface Props {
  level: number;
  title: string;
  tagline: string;
  onBack: () => void;
  children: ReactNode;
}

export default function LevelShell({ level, title, tagline, onBack, children }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#16264d] via-[#0f1d3a] to-[#0a1428] px-5 py-8 sm:px-6">
      <StarField count={8} />
      <div className="relative z-10 mx-auto max-w-md">
        <button
          onClick={() => {
            sfx.click();
            onBack();
          }}
          aria-label="Kembali ke peta"
          className="press glass mb-6 flex h-10 w-10 items-center justify-center rounded-full text-white/80"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="text-center">
          <div className="font-display text-xs font-semibold tracking-[0.25em] text-[#ffd24c]">
            LEVEL {String(level).padStart(2, '0')}
          </div>
          <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-white/55">{tagline}</p>
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
