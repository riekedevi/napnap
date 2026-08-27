import { useCallback, useEffect, useState } from 'react';
import { GameState, Screen, STORAGE_KEY } from './types';

const DEFAULT_STATE: GameState = {
  currentScreen: 'loading',
  completedLevels: [],
  score: 0,
  soundEnabled: true,
  openedFromSurprise: false,
};

function load(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      currentScreen: 'loading',
      openedFromSurprise: false,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useGameState() {
  const [state, setState] = useState<GameState>(load);

  useEffect(() => {
    try {
      const { currentScreen: _omit, openedFromSurprise: _omit2, ...persist } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
    } catch {
      /* ignore */
    }
  }, [state]);

  const go = useCallback((screen: Screen) => {
    setState((s) => ({ ...s, currentScreen: screen }));
  }, []);

  const completeLevel = useCallback((level: number, bonus = 0) => {
    setState((s) =>
      s.completedLevels.includes(level)
        ? s
        : { ...s, completedLevels: [...s.completedLevels, level], score: s.score + bonus }
    );
  }, []);

  const addScore = useCallback((n: number) => {
    setState((s) => ({ ...s, score: s.score + n }));
  }, []);

  const toggleSound = useCallback(() => {
    setState((s) => ({ ...s, soundEnabled: !s.soundEnabled }));
  }, []);

  const setOpenedFromSurprise = useCallback((v: boolean) => {
    setState((s) => ({ ...s, openedFromSurprise: v }));
  }, []);

  const resetGame = useCallback(() => {
    setState({ ...DEFAULT_STATE, currentScreen: 'opening', soundEnabled: state.soundEnabled });
  }, [state.soundEnabled]);

  return { state, go, completeLevel, addScore, toggleSound, setOpenedFromSurprise, resetGame };
}
