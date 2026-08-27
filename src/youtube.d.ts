// Minimal YouTube IFrame API types (no @types/youtube dependency needed).

declare namespace YT {
  interface Player {
    playVideo(): void;
    pauseVideo(): void;
    mute(): void;
    unMute(): void;
    setVolume(volume: number): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    destroy(): void;
  }

  interface PlayerOptions {
    videoId?: string;
    width?: string | number;
    height?: string | number;
    playerVars?: {
      autoplay?: 0 | 1;
      controls?: 0 | 1;
      disablekb?: 0 | 1;
      fs?: 0 | 1;
      loop?: 0 | 1;
      modestbranding?: 0 | 1;
      playsinline?: 0 | 1;
      playlist?: string;
      rel?: 0 | 1;
    };
    events?: {
      onReady?: (e: PlayerEvent) => void;
      onStateChange?: (e: OnStateChangeEvent) => void;
    };
  }

  interface PlayerEvent {
    target: Player;
  }

  interface OnStateChangeEvent {
    target: Player;
    data: number;
  }

  const PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };

  class Player {
    constructor(element: HTMLElement | string, options: PlayerOptions);
    playVideo(): void;
    pauseVideo(): void;
    mute(): void;
    unMute(): void;
    setVolume(volume: number): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    destroy(): void;
  }
}

interface Window {
  YT?: typeof YT;
  onYouTubeIframeAPIReady?: () => void;
}
