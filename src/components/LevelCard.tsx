import { Lock, Check } from 'lucide-react';

interface Props {
  index: number;
  icon: string;
  title: string;
  sub: string;
  status: 'locked' | 'available' | 'completed';
  onClick: () => void;
  isLast?: boolean;
}

export default function LevelCard({ index, icon, title, sub, status, onClick, isLast }: Props) {
  const disabled = status === 'locked';

  return (
    <div className="relative flex items-center gap-4">
      {/* node */}
      <button
        onClick={onClick}
        disabled={disabled}
        aria-label={`Level ${index}: ${title}${disabled ? ' (terkunci)' : ''}`}
        className={[
          'relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-3xl transition-all duration-300',
          status === 'completed'
            ? 'bg-gradient-to-br from-[#ffd24c] to-[#ffb703] text-navy shadow-[0_8px_30px_rgba(255,210,76,0.45)]'
            : status === 'available'
              ? 'glass anim-glow text-white'
              : 'glass text-white/40',
          disabled ? 'cursor-not-allowed' : 'press cursor-pointer',
        ].join(' ')}
      >
        {status === 'completed' ? (
          <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1e3a6b] text-white anim-check">
            <Check size={14} strokeWidth={3} />
          </span>
        ) : null}
        {disabled ? <Lock size={22} /> : <span>{icon}</span>}
      </button>

      {/* label */}
      <button
        onClick={onClick}
        disabled={disabled}
        className={`flex-1 rounded-2xl p-3.5 text-left transition-all duration-300 sm:p-4 ${status === 'locked' ? 'glass opacity-50' : 'glass'} ${disabled ? 'cursor-not-allowed' : 'press'}`}
      >
        <div className="flex items-center gap-2">
          <span className="font-display text-xs font-semibold tracking-widest text-[#ffd24c]">
            LEVEL {String(index).padStart(2, '0')}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
              status === 'completed'
                ? 'bg-[#ffd24c] text-[#0f1d3a]'
                : status === 'available'
                  ? 'bg-[#6aa6ff]/30 text-[#7bdfff]'
                  : 'bg-white/10 text-white/50'
            }`}
          >
            {status === 'completed' ? 'DONE' : status === 'available' ? 'READY' : 'LOCKED'}
          </span>
        </div>
        <div className="font-display text-lg font-semibold text-white sm:text-xl">{title}</div>
        <div className="text-sm text-white/60">{sub}</div>
      </button>

      {/* path to next */}
      {!isLast && (
        <div className="absolute left-10 top-20 h-[calc(100%-0px)] w-0.5 -translate-x-1/2 bg-gradient-to-b from-white/25 to-white/5" />
      )}
    </div>
  );
}
