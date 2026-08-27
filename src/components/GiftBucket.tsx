import { useRef, useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import SparkBurst from '@/components/SparkBurst';
import { sfx } from '@/game/audio';
import { RECIPIENT } from '@/game/types';

interface GiftItem {
  emoji: string;
  title: string;
  message: string;
}

const GIFTS: GiftItem[] = [
  { emoji: '🎉', title: 'Celebrations!', message: 'Selamat hari lulus dan dapat kompetensi!' },
  { emoji: '🍗', title: 'Makan Besar', message: 'Jangan lupa makan2 barengnyaaa wkwkwk' },
  { emoji: '🌙', title: 'Istirahat', message: 'Tidur yang cukup, kamu sudah lulus!' },
  { emoji: '🎁', title: 'Hadiah', message: `Untuk ${RECIPIENT}, sedikit kejutan kecil.` },
  { emoji: '🚀', title: 'Next Journey', message: 'Semoga kelancaran untuk langkah berikutnya.' },
];

export default function GiftBucket() {
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number | null>(null);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);
  const sparkId = useRef(0);

  const open = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (opened.has(i)) {
      setActive(i);
      return;
    }
    sfx.flip();
    const rect = e.currentTarget.getBoundingClientRect();
    const id = sparkId.current++;
    setSparks((s) => [...s, { id, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }]);
    setTimeout(() => setSparks((s) => s.filter((sp) => sp.id !== id)), 700);

    setOpened((prev) => {
      const next = new Set(prev);
      next.add(i);
      if (next.size === GIFTS.length) {
        setTimeout(() => sfx.celebrate(), 250);
      }
      return next;
    });
    setActive(i);
  };

  const allOpened = opened.size === GIFTS.length;

  return (
    <div className="mt-6 rounded-2xl border border-[#ffd24c]/25 bg-gradient-to-b from-[#1e3a6b]/40 to-[#0f1d3a]/40 p-4">
      <div className="mb-3 flex items-center justify-center gap-2 text-[#ffd24c]">
        <Gift size={18} className="anim-float-sm" />
        <span className="font-display text-sm font-semibold tracking-wide">GIFT BUCKET</span>
        <span className="font-display text-xs font-semibold text-white/50">
          ({opened.size}/{GIFTS.length})
        </span>
      </div>

      <p className="mb-4 text-center text-xs text-white/55">
        Ketuk setiap kado untuk membuka hadiah kecil buat {RECIPIENT}.
      </p>

      <div className="grid grid-cols-5 gap-2">
        {GIFTS.map((g, i) => {
          const isOpen = opened.has(i);
          return (
            <button
              key={i}
              onClick={(e) => open(i, e)}
              aria-label={`Buka kado ${i + 1}: ${g.title}`}
              className="press relative flex aspect-square items-center justify-center rounded-xl text-2xl transition-all duration-300"
              style={{ animation: isOpen ? 'none' : `floatUpSm ${2.5 + i * 0.3}s ease-in-out infinite` }}
            >
              <div
                className={`flex h-full w-full items-center justify-center rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#ffd24c]/50 bg-gradient-to-br from-[#ffd24c]/20 to-[#ffb703]/10'
                    : 'border-white/15 bg-white/5 hover:border-[#6aa6ff]/50'
                }`}
              >
                {isOpen ? (
                  <span className="anim-pop">{g.emoji}</span>
                ) : (
                  <Gift size={22} className="text-[#ffd24c]/70" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {sparks.map((s) => (
        <SparkBurst key={s.id} x={s.x} y={s.y} count={12} />
      ))}

      {active !== null && (
        <div className="anim-fade-up mt-4 rounded-xl bg-white/8 p-4 text-center">
          <div className="text-2xl">{GIFTS[active].emoji}</div>
          <div className="mt-1 font-display text-sm font-semibold text-[#ffd24c]">{GIFTS[active].title}</div>
          <p className="mt-1 text-sm leading-relaxed text-white/80">{GIFTS[active].message}</p>
        </div>
      )}

      {allOpened && (
        <div className="anim-pop mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#ffd24c]/15 py-2.5 font-display text-sm font-semibold text-[#ffd24c]">
          <Sparkles size={16} /> Semua kado sudah dibuka! 🎉
        </div>
      )}
    </div>
  );
}
