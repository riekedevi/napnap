import { useEffect, useState } from 'react';
import { RotateCcw, Share2, MessageCircle } from 'lucide-react';
import Confetti from '@/components/Confetti';
import StarField from '@/components/StarField';
import GiftBucket from '@/components/GiftBucket';
import { sfx } from '@/game/audio';
import { RECIPIENT } from '@/game/types';

interface Props {
  onPlayAgain: () => void;
}

type Phase = 'dark' | 'complete' | 'congrats' | 'name' | 'sub' | 'photo' | 'personal' | 'didIt' | 'proud' | 'card';

const ORDER: Phase[] = ['dark', 'complete', 'congrats', 'name', 'sub', 'photo', 'personal', 'didIt', 'proud', 'card'];

const PERSONAL_MESSAGE = 'Terima kasih sudah mengusahakan yang terbaik untuk dirimu ya Nap!! semoga senantiasa diberikan kelancaran untuk next journey:D';
const EXTRA_MESSAGE = 'jangan lupa makan2 barengnyaaa wkwkwk';
const PHOTO_PATH = '/assets/images/photo_2026-08-27_13-59-35.jpg';
const PHOTO_GALLERY = [
  '/assets/images/photo_2026-08-27_13-58-05 copy.jpg',
  '/assets/images/photo_2026-08-27_13-59-08 copy.jpg',
  '/assets/images/photo_2026-08-27_13-59-35 copy.jpg',
];
const WA_TEXT = `🎉 Congratulations, ${RECIPIENT}!\n\nSelamat atas kompetensinya!\n\nMission completed. You did it! 🎓✨\n\n${PERSONAL_MESSAGE}\n\nProud of you, ${RECIPIENT}!`;

export default function SurpriseScreen({ onPlayAgain }: Props) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [confettiOn, setConfettiOn] = useState(false);

  const phase = ORDER[phaseIdx];

  useEffect(() => {
    sfx.celebrate();
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhaseIdx(1), 800));
    timers.push(window.setTimeout(() => setPhaseIdx(2), 1700));
    timers.push(window.setTimeout(() => setPhaseIdx(3), 2700));
    timers.push(window.setTimeout(() => setPhaseIdx(4), 3800));
    timers.push(window.setTimeout(() => setConfettiOn(true), 3900));
    timers.push(window.setTimeout(() => setPhaseIdx(5), 5000));
    timers.push(window.setTimeout(() => setPhaseIdx(6), 6800));
    timers.push(window.setTimeout(() => setPhaseIdx(7), 9000));
    timers.push(window.setTimeout(() => setPhaseIdx(8), 10400));
    timers.push(window.setTimeout(() => setPhaseIdx(9), 12000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const shareWhatsApp = () => {
    sfx.click();
    window.open(`https://wa.me/?text=${encodeURIComponent(WA_TEXT)}`, '_blank', 'noopener,noreferrer');
  };

  const copyLink = () => {
    sfx.click();
    if (navigator.share) {
      navigator.share({ title: `Mission: ${RECIPIENT}`, text: WA_TEXT, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href).catch(() => {});
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0a1428] via-[#0f1d3a] to-[#16264d]">
      <Confetti count={90} fire={confettiOn} />
      <StarField count={20} />

      {phaseIdx < ORDER.length - 1 ? (
        <div className={`relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center ${phase === 'personal' || phase === 'didIt' || phase === 'proud' ? 'bg-[#0f1d3a]/35' : ''}`}>
          {phase === 'dark' && <div className="anim-fade text-5xl">🔓</div>}

          {phase === 'complete' && (
            <div className="anim-pop">
              <div className="text-5xl">✨</div>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-[0.3em] text-white/80">
                MISSION COMPLETE
              </h2>
            </div>
          )}

          {phase === 'congrats' && (
            <h1 className="anim-pop font-display text-4xl font-bold shimmer-text sm:text-6xl">CONGRATULATIONS!</h1>
          )}

          {phase === 'name' && (
            <div className="flex flex-col items-center">
              <h1 className="anim-pop font-display text-5xl font-bold text-white sm:text-7xl" style={{ textShadow: '0 0 40px rgba(255,210,76,0.6)' }}>
                {RECIPIENT}
              </h1>
            </div>
          )}

          {phase === 'sub' && (
            <div className="flex flex-col items-center gap-3">
              <h1 className="font-display text-4xl font-bold text-white sm:text-7xl" style={{ textShadow: '0 0 40px rgba(255,210,76,0.6)' }}>
                {RECIPIENT}
              </h1>
              <h2 className="anim-fade-up font-display text-xl font-semibold text-[#ffd24c] sm:text-3xl">
                SELAMAT ATAS KOMPETENSINYA! 🎓
              </h2>
            </div>
          )}

          {phase === 'photo' && (
            <div className="anim-fade-up flex max-w-sm flex-col items-center gap-5">
              <h2 className="font-display text-xl font-semibold text-[#ffd24c] sm:text-3xl">SELAMAT ATAS KOMPETENSINYA! 🎓</h2>
              <img
                src={PHOTO_PATH}
                alt="Apt. Naufal saat merayakan pencapaiannya"
                className="h-64 w-full rounded-3xl border border-[#ffd24c]/35 object-cover shadow-[0_16px_60px_rgba(0,0,0,0.4)] sm:h-80"
              />
            </div>
          )}

          {phase === 'personal' && (
            <div className="anim-fade-up flex max-w-sm flex-col items-center gap-5">
              <img
                src={PHOTO_PATH}
                alt="Apt. Naufal saat merayakan pencapaiannya"
                className="h-56 w-full rounded-3xl border border-white/15 object-cover opacity-90 shadow-[0_12px_50px_rgba(0,0,0,0.35)] sm:h-72"
              />
              <p className="font-display text-xl font-medium leading-relaxed text-[#fff4d6] sm:text-2xl" style={{ textShadow: '0 0 24px rgba(255,210,76,0.18)' }}>
                “{PERSONAL_MESSAGE}”
              </p>
            </div>
          )}

          {phase === 'didIt' && (
            <div className="anim-pop flex flex-col items-center gap-4">
              <div className="text-5xl">✨</div>
              <h2 className="font-display text-4xl font-bold text-white sm:text-6xl">YOU DID IT.</h2>
            </div>
          )}

          {phase === 'proud' && (
            <div className="anim-fade-up flex flex-col items-center gap-4">
              <h2 className="font-display text-2xl font-semibold text-[#ffd24c] sm:text-4xl">Proud of you, {RECIPIENT}!</h2>
              <div className="h-1 w-16 rounded-full bg-[#ffd24c]/70" />
            </div>
          )}
        </div>
      ) : (
        <FinalCard onPlayAgain={onPlayAgain} onWhatsApp={shareWhatsApp} onShare={copyLink} />
      )}
    </div>
  );
}

function FinalCard({
  onPlayAgain,
  onWhatsApp,
  onShare,
}: {
  onPlayAgain: () => void;
  onWhatsApp: () => void;
  onShare: () => void;
}) {
  return (
    <div className="relative z-20 flex min-h-screen items-center justify-center px-4 py-10">
      <div className="anim-rise w-full max-w-md overflow-hidden rounded-3xl glass p-7 text-center shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:p-9">
        <div className="font-display text-xs font-semibold tracking-[0.3em] text-[#ffd24c]">CONGRATULATIONS</div>
        <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">{RECIPIENT}</h2>
        <p className="mt-1 font-display text-base font-semibold text-[#7bdfff]">SELAMAT ATAS KOMPETENSINYA</p>

        <img
          src={PHOTO_PATH}
          alt="Apt. Naufal saat merayakan pencapaiannya"
          className="mx-auto mt-5 h-56 w-full rounded-2xl border border-[#ffd24c]/30 object-cover shadow-[0_12px_45px_rgba(0,0,0,0.35)] sm:h-64"
        />

        <p className="mt-5 font-display text-base leading-relaxed text-[#fff4d6] sm:text-lg">
          “{PERSONAL_MESSAGE}”
        </p>

        <div className="my-5 flex items-center justify-center gap-3 text-2xl">
          <span className="anim-float">🎓</span>
          <span className="anim-float-sm">🏆</span>
          <span className="anim-float">✨</span>
        </div>

        <div className="my-5 rounded-2xl border border-dashed border-white/20 bg-white/5 py-6 text-xs uppercase tracking-widest text-white/40">
          [ Foto {RECIPIENT} ]
        </div>

        <p className="text-sm italic leading-relaxed text-white/70">
          “This is not the end of the journey.
          <br />
          This is the beginning of something greater.”
        </p>

        <p className="mt-5 font-display text-base font-semibold text-[#ffd24c]">{EXTRA_MESSAGE}</p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {PHOTO_GALLERY.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              alt={`Momen Apt. Naufal ${index + 1}`}
              className="aspect-[4/3] w-full rounded-xl border border-white/15 bg-black/10 object-contain"
            />
          ))}
        </div>

        <GiftBucket />

        <div className="mt-7 flex flex-col gap-3">
          <button
            onClick={onWhatsApp}
            className="press flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#1ebe5d] px-6 py-3.5 font-display text-base font-semibold text-white shadow-lg"
          >
            <MessageCircle size={18} /> Share to WhatsApp
          </button>
          <div className="flex gap-3">
            <button
              onClick={onPlayAgain}
              className="press flex flex-1 items-center justify-center gap-2 rounded-full glass px-5 py-3.5 font-display text-base font-semibold text-white"
            >
              <RotateCcw size={16} /> PLAY AGAIN
            </button>
            <button
              onClick={onShare}
              className="press flex flex-1 items-center justify-center gap-2 rounded-full glass px-5 py-3.5 font-display text-base font-semibold text-white"
            >
              <Share2 size={16} /> SHARE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
