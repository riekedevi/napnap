let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
    } catch {
      ctx = null;
    }
  }
  return ctx;
}

function tone(freq: number, duration: number, type: OscillatorType = 'sine', gain = 0.12, delay = 0) {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

export const sfx = {
  click: () => tone(420, 0.08, 'triangle', 0.08),
  flip: () => tone(520, 0.12, 'triangle', 0.09),
  correct: () => {
    tone(660, 0.1, 'sine', 0.1);
    tone(880, 0.18, 'sine', 0.1, 0.08);
  },
  wrong: () => tone(180, 0.18, 'sawtooth', 0.07),
  levelComplete: () => {
    tone(523, 0.12, 'triangle', 0.1);
    tone(659, 0.12, 'triangle', 0.1, 0.1);
    tone(784, 0.2, 'triangle', 0.1, 0.2);
  },
  unlock: () => {
    tone(392, 0.15, 'sine', 0.09);
    tone(523, 0.15, 'sine', 0.09, 0.12);
    tone(659, 0.15, 'sine', 0.09, 0.24);
    tone(880, 0.3, 'sine', 0.11, 0.36);
  },
  celebrate: () => {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.25, 'triangle', 0.12, i * 0.12));
    [659, 784, 988, 1319].forEach((f, i) => tone(f, 0.3, 'sine', 0.1, 0.5 + i * 0.12));
  },
  spark: () => tone(1200 + Math.random() * 400, 0.06, 'sine', 0.04),
  easter: () => {
    [400, 500, 600, 700].forEach((f, i) => tone(f, 0.1, 'triangle', 0.08, i * 0.06));
  },
};

export function resumeAudio() {
  const ac = getCtx();
  if (ac && ac.state === 'suspended') ac.resume();
}
