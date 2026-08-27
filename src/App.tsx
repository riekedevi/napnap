import { useCallback, useEffect, useState } from 'react';
import LoadingScreen from '@/screens/LoadingScreen';
import OpeningScreen from '@/screens/OpeningScreen';
import GameMap from '@/screens/GameMap';
import JourneyLevel from '@/screens/JourneyLevel';
import QuizLevel from '@/screens/QuizLevel';
import FinalTest from '@/screens/FinalTest';
import SurpriseScreen from '@/screens/SurpriseScreen';
import AudioControl from '@/components/AudioControl';
import Confetti from '@/components/Confetti';
import YoutubeMusic from '@/components/YoutubeMusic';
import { useGameState } from '@/game/useGameState';
import { resumeAudio, sfx } from '@/game/audio';
import { Screen } from '@/game/types';

const MUSIC_VIDEO_ID = 'JLf9q36UsBk';

export default function App() {
  const { state, go, completeLevel, resetGame, toggleSound, setOpenedFromSurprise } = useGameState();
  const [eggMsg, setEggMsg] = useState(false);
  const [eggConfetti, setEggConfetti] = useState(false);

  const startGame = useCallback(() => {
    resumeAudio();
    go('opening');
  }, [go]);

  const triggerEasterEgg = useCallback(() => {
    sfx.easter();
    setEggMsg(true);
    setEggConfetti(true);
    setTimeout(() => setEggMsg(false), 3200);
    setTimeout(() => setEggConfetti(false), 2500);
  }, []);

  const openLevel = useCallback(
    (screen: Screen) => {
      setOpenedFromSurprise(false);
      go(screen);
    },
    [go, setOpenedFromSurprise]
  );

  const finishLevel = useCallback(
    (screen: Screen, level: number, bonus: number) => {
      completeLevel(level, bonus);
      go('map');
    },
    [completeLevel, go]
  );

  const playAgain = useCallback(() => {
    sfx.click();
    resetGame();
  }, [resetGame]);

  // unlock sound surprise only when surprise first opened
  useEffect(() => {
    if (state.currentScreen === 'surprise' && !state.openedFromSurprise) {
      resumeAudio();
      setOpenedFromSurprise(true);
    }
  }, [state.currentScreen, state.openedFromSurprise, setOpenedFromSurprise]);

  const showAudio = state.currentScreen !== 'loading';
  const musicStarted = state.currentScreen !== 'loading';

  return (
    <div className="relative min-h-screen">
      {showAudio && (
        <div className="fixed right-4 top-4 z-50" style={{ top: 'max(1rem, env(safe-area-inset-top))' }}>
          <AudioControl enabled={state.soundEnabled} onToggle={toggleSound} />
        </div>
      )}

      <SoundGate enabled={state.soundEnabled} />

      <YoutubeMusic videoId={MUSIC_VIDEO_ID} enabled={state.soundEnabled} play={musicStarted} />

      {eggConfetti && <Confetti count={50} fire />}
      {eggMsg && (
        <div className="anim-pop fixed left-1/2 top-1/2 z-[80] -translate-x-1/2 -translate-y-1/2 rounded-2xl glass px-6 py-4 text-center font-display text-lg font-semibold text-white shadow-2xl">
          Okay... you really like your name 😂
        </div>
      )}

      {state.currentScreen === 'loading' && <LoadingScreen onReady={startGame} />}
      {state.currentScreen === 'opening' && (
        <OpeningScreen onStart={() => go('map')} onEasterEgg={triggerEasterEgg} />
      )}
      {state.currentScreen === 'map' && (
        <GameMap
          completedLevels={state.completedLevels}
          score={state.score}
          onOpenLevel={openLevel}
          onReset={resetGame}
        />
      )}
      {state.currentScreen === 'level1' && (
        <JourneyLevel onComplete={(b) => finishLevel('map', 1, b)} onBack={() => go('map')} />
      )}
      {state.currentScreen === 'level2' && (
        <QuizLevel onComplete={(b) => finishLevel('map', 2, b)} onBack={() => go('map')} />
      )}
      {state.currentScreen === 'level3' && (
        <FinalTest onComplete={(b) => finishLevel('surprise', 3, b)} onBack={() => go('map')} />
      )}
      {state.currentScreen === 'surprise' && <SurpriseScreen onPlayAgain={playAgain} />}
    </div>
  );
}

// Gate sound effects globally based on the enabled flag.
function SoundGate({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    const orig = { ...sfx };
    if (!enabled) {
      (Object.keys(sfx) as (keyof typeof sfx)[]).forEach((k) => {
        (sfx as Record<string, () => void>)[k] = () => {};
      });
    } else {
      (Object.keys(orig) as (keyof typeof orig)[]).forEach((k) => {
        (sfx as Record<string, () => void>)[k] = orig[k];
      });
    }
    return () => {
      (Object.keys(orig) as (keyof typeof orig)[]).forEach((k) => {
        (sfx as Record<string, () => void>)[k] = orig[k];
      });
    };
  }, [enabled]);
  return null;
}
