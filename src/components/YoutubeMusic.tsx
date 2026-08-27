import { useEffect, useRef } from 'react';

interface Props {
  videoId: string;
  enabled: boolean;
  play: boolean;
}

let apiPromise: Promise<void> | null = null;

function loadApi(): Promise<void> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    document.head.appendChild(tag);
  });
  return apiPromise;
}

export default function YoutubeMusic({ videoId, enabled, play }: Props) {
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const readyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadApi().then(() => {
      if (cancelled || !containerRef.current) return;
      playerRef.current = new window.YT!.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          loop: 1,
          playlist: videoId,
          rel: 0,
        },
        events: {
          onReady: () => {
            readyRef.current = true;
            playerRef.current?.setVolume(45);
            if (play && enabled) {
              playerRef.current?.playVideo();
            }
          },
          onStateChange: (e: YT.OnStateChangeEvent) => {
            if (e.data === window.YT!.PlayerState.ENDED) {
              playerRef.current?.seekTo(0, true);
              playerRef.current?.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
      readyRef.current = false;
    };
  }, [videoId]);

  useEffect(() => {
    if (!readyRef.current || !playerRef.current) return;
    if (!enabled) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
      if (play) playerRef.current.playVideo();
    }
  }, [enabled, play]);

  return (
    <div aria-hidden className="pointer-events-none fixed -z-10 h-0 w-0 overflow-hidden opacity-0">
      <div ref={containerRef} />
    </div>
  );
}
