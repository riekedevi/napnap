import { useState } from 'react';
import { Check, X } from 'lucide-react';
import LevelShell from '@/components/LevelShell';
import { sfx } from '@/game/audio';

interface Props {
  onComplete: (bonus: number) => void;
  onBack: () => void;
}

interface Question {
  q: string;
  options: string[];
  answer: number;
}

const QUESTIONS: Question[] = [
  {
    q: "What's stronger than coffee during exam season?",
    options: ['Coffee', 'Sleep', 'Determination', 'Giving up'],
    answer: 2,
  },
  {
    q: 'After all those sleepless nights, what do you deserve?',
    options: ['Another assignment', 'More exams', 'A BIG CONGRATULATIONS', 'Nothing'],
    answer: 2,
  },
  {
    q: 'Are you ready for the final surprise?',
    options: ['No', 'Maybe', 'ABSOLUTELY YES!'],
    answer: 2,
  },
];

export default function QuizLevel({ onComplete, onBack }: Props) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [done, setDone] = useState(false);

  const cur = QUESTIONS[idx];

  const pick = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === cur.answer) {
      sfx.correct();
      const newCorrect = correctCount + 1;
      setCorrectCount(newCorrect);
      setTimeout(() => {
        if (idx + 1 >= QUESTIONS.length) {
          setDone(true);
          setTimeout(() => sfx.levelComplete(), 200);
        } else {
          setIdx(idx + 1);
          setPicked(null);
          setWrong(false);
        }
      }, 900);
    } else {
      sfx.wrong();
      setWrong(true);
      setTimeout(() => {
        setPicked(null);
        setWrong(false);
      }, 1100);
    }
  };

  return (
    <LevelShell level={2} title="QUICK CHALLENGE" tagline="Okay Apt. Naufal, let's see if you're ready for the final mission." onBack={onBack}>
      <div className="mb-4 flex items-center justify-between text-xs font-semibold text-white/60">
        <span>
          Question {idx + 1} / {QUESTIONS.length}
        </span>
        <span>Score: {correctCount}/{QUESTIONS.length}</span>
      </div>
      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-white/12">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#6aa6ff] to-[#ffd24c] transition-all duration-300"
          style={{ width: `${((done ? idx + 1 : idx) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      {!done && (
        <div key={idx} className="anim-fade-up rounded-2xl glass p-5">
          <p className="font-display text-lg font-semibold leading-snug text-white">{cur.q}</p>
          <div className="mt-5 flex flex-col gap-3">
            {cur.options.map((opt, i) => {
              const isAnswer = i === cur.answer;
              const isPicked = picked === i;
              const showCorrect = picked !== null && isAnswer;
              const showWrong = isPicked && !isAnswer;
              return (
                <button
                  key={i}
                  onClick={() => pick(i)}
                  disabled={picked !== null}
                  className={`press flex items-center justify-between rounded-xl border px-4 py-3.5 text-left font-medium transition-all duration-200 ${
                    showCorrect
                      ? 'border-[#ffd24c] bg-[#ffd24c]/20 text-white'
                      : showWrong
                        ? 'anim-shake border-red-400/60 bg-red-400/15 text-white'
                        : 'border-white/12 bg-white/5 text-white/85 hover:border-[#6aa6ff]/50'
                  }`}
                >
                  <span>{opt}</span>
                  {showCorrect && <Check size={18} className="text-[#ffd24c]" strokeWidth={3} />}
                  {showWrong && <X size={18} className="text-red-300" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
          {wrong && (
            <p className="anim-fade mt-4 text-center text-sm text-red-300">Almost! Try again 😆</p>
          )}
        </div>
      )}

      {done && (
        <div className="anim-pop text-center">
          <div className="text-5xl">🏆</div>
          <div className="mt-3 font-display text-2xl font-bold text-[#ffd24c]">
            {correctCount}/{QUESTIONS.length} — PERFECT SCORE!
          </div>
          <p className="mt-2 text-sm text-white/60">Kamu siap untuk misi terakhir.</p>
          <button
            onClick={() => {
              sfx.click();
              onComplete(60);
            }}
            className="press mt-6 rounded-full bg-gradient-to-r from-[#ffd24c] to-[#ffb703] px-10 py-4 font-display text-lg font-semibold text-[#0f1d3a] shadow-[0_10px_30px_rgba(255,210,76,0.4)]"
          >
            CONTINUE →
          </button>
        </div>
      )}
    </LevelShell>
  );
}
