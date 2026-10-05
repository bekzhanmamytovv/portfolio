/**
 * Sound Manager — Web Audio API synthesized micro-sounds.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private _muted: boolean = true;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    try {
      const saved = localStorage.getItem('sound-muted');
      this._muted = saved !== 'false';
    } catch {
      this._muted = true;
    }
  }

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  get muted() { return this._muted; }

  toggle(): boolean {
    this._muted = !this._muted;
    try { localStorage.setItem('sound-muted', String(this._muted)); } catch {}
    this.listeners.forEach((fn) => fn(this._muted));
    if (!this._muted) this.click();
    return this._muted;
  }

  subscribe(fn: (muted: boolean) => void): () => void {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  }

  /** Subtle mechanical click (System UI toggle) */
  click() {
    if (this._muted) return;
    try {
      const ctx = this.getCtx();
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(440, t + 0.06);
      gain.gain.setValueAtTime(0.03, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch {}
  }

  /** Page transition whoosh */
  transition() {
    if (this._muted) return;
    try {
      const ctx = this.getCtx();
      const t = ctx.currentTime;
      const dur = 0.18;
      const len = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - (i / len), 4);
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3000, t);
      filter.frequency.exponentialRampToValueAtTime(150, t + dur);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.035, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      src.connect(filter).connect(gain).connect(ctx.destination);
      src.start(t);
    } catch {}
  }

  /** Hover tick — Хрустящий, тактильный клик (как в ТЗ) */
  hover() {
    if (this._muted) return;
    try {
      const ctx = this.getCtx();
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle'; // Дает более резкий/стеклянный клик, чем sine
      osc.frequency.setValueAtTime(1500, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.02); // Быстрое падение тона (punch)

      gain.gain.setValueAtTime(0.02, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03); // Ультра-короткий decay (хруст)

      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.03);
    } catch {}
  }

  /** Theme switch chime */
  themeSwitch() {
    if (this._muted) return;
    try {
      const ctx = this.getCtx();
      const t = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(660, t);
      gain1.gain.setValueAtTime(0.025, t);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc1.connect(gain1).connect(ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.1);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(990, t + 0.05);
      gain2.gain.setValueAtTime(0.001, t);
      gain2.gain.setValueAtTime(0.02, t + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc2.connect(gain2).connect(ctx.destination);
      osc2.start(t + 0.05);
      osc2.stop(t + 0.12);
    } catch {}
  }

  dispose() {
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
    this.listeners.clear();
  }
}

let _instance: SoundManager | null = null;

export function getSoundManager(): SoundManager | null {
  if (typeof window === 'undefined') return null;
  if (!_instance) _instance = new SoundManager();
  return _instance;
}
