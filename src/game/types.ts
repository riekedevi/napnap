export type Screen = 'loading' | 'opening' | 'map' | 'level1' | 'level2' | 'level3' | 'surprise';

export interface GameState {
  currentScreen: Screen;
  completedLevels: number[]; // [1,2,3,4]
  score: number;
  soundEnabled: boolean;
  openedFromSurprise: boolean;
}

export const STORAGE_KEY = 'mission-naufal-v1';

export const TOTAL_LEVELS = 4;

export const LEVELS = [
  { id: 1, icon: '📚', title: 'THE JOURNEY', sub: 'Setiap pencapaian punya cerita.' },
  { id: 2, icon: '🧠', title: 'THE CHALLENGE', sub: 'Ujian ringan sebelum finale.' },
  { id: 3, icon: '⚡', title: 'THE FINAL TEST', sub: 'Satu tugas terakhir.' },
  { id: 4, icon: '🎁', title: 'THE SURPRISE', sub: 'Buka kejutan spesial.' },
] as const;

export const RECIPIENT = 'Apt. Naufal';
