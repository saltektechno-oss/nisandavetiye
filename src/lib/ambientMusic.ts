/* ===========================================================================
   Tarayıcıda üretilen arka plan müziği (Web Audio).
   Hiçbir dosya indirmez — telif sorunu yok, yükleme beklemesi yok.
   Kendi müziğini eklemek istersen public/music/README.md'ye bak;
   MusicPlayer bileşeni önce gerçek dosyayı dener, yoksa buna düşer.
   =========================================================================== */

const CHORDS: readonly (readonly [number, number, number, number])[] = [
  [146.83, 293.66, 369.99, 440.0], // Re majör
  [123.47, 246.94, 293.66, 369.99], // Si minör
  [98.0, 196.0, 246.94, 293.66], // Sol majör
  [110.0, 220.0, 277.18, 329.63], // La majör
];
const ARPEGGIO = [1, 2, 3, 2, 1, 2, 3, 2] as const;
const STEP_SECONDS = 0.5;

function makeReverbImpulse(ctx: AudioContext, seconds: number, decay: number): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decay;
    }
  }
  return buffer;
}

export class AmbientMusic {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: number | null = null;
  private nextTime = 0;
  private step = 0;
  private targetVolume: number;

  constructor(targetVolume: number) {
    this.targetVolume = targetVolume;
  }

  private ensureContext(): boolean {
    if (this.ctx) return true;
    const Ctx = window.AudioContext ?? window.webkitAudioContext;
    if (!Ctx) return false;

    /* iOS'ta telefonun yan tarafındaki sessiz düğmesi açıkken tarayıcı sesi
       de susar. "playback" türü, müziğin zil moduna bakılmaksızın çalmasını
       sağlar (Safari 16.4+). Desteklenmeyen tarayıcılarda sessizce atlanır. */
    try {
      const session = (navigator as Navigator & { audioSession?: { type: string } })
        .audioSession;
      if (session) session.type = "playback";
    } catch {
      // desteklenmiyor — sorun değil
    }

    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0;

    const dry = ctx.createGain();
    dry.gain.value = 0.85;
    const wet = ctx.createGain();
    wet.gain.value = 0.45;
    const verb = ctx.createConvolver();
    verb.buffer = makeReverbImpulse(ctx, 3, 2.4);

    const soften = ctx.createBiquadFilter();
    soften.type = "lowpass";
    soften.frequency.value = 3400;
    soften.Q.value = 0.4;

    master.connect(soften);
    soften.connect(dry);
    dry.connect(ctx.destination);
    soften.connect(verb);
    verb.connect(wet);
    wet.connect(ctx.destination);

    this.ctx = ctx;
    this.master = master;
    return true;
  }

  private note(freq: number, at: number, dur: number, vel: number, type: OscillatorType = "triangle") {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(this.master!);

    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(vel, at + 0.03);
    gain.gain.exponentialRampToValueAtTime(vel * 0.4, at + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);

    osc.start(at);
    osc.stop(at + dur + 0.05);
  }

  private scheduleStep(i: number, at: number) {
    const bar = Math.floor(i / ARPEGGIO.length) % CHORDS.length;
    const chord = CHORDS[bar];
    const pos = i % ARPEGGIO.length;

    this.note(chord[ARPEGGIO[pos]], at, 2.2, 0.3);
    if (pos === 0) this.note(chord[0], at, 3.4, 0.24, "sine");
    if (pos === 3 && bar % 2 === 1) this.note(chord[3] * 2, at, 1.6, 0.13, "sine");
  }

  private schedule = () => {
    const ctx = this.ctx!;
    while (this.nextTime < ctx.currentTime + 1.2) {
      this.scheduleStep(this.step, this.nextTime);
      this.nextTime += STEP_SECONDS;
      this.step++;
    }
  };

  /** Çalmaya başlar. Bir kullanıcı hareketinin (tıklama/dokunma) içinden
   *  çağrılmalı — aksi halde tarayıcı otomatik oynatmayı engeller. */
  async start(): Promise<boolean> {
    if (!this.ensureContext()) return false;
    const ctx = this.ctx!;
    if (ctx.state === "suspended") await ctx.resume();

    /* Tarayıcı ilk denemeyi reddettiyse, kullanıcının bir sonraki
       dokunuşunda kendiliğinden devam etsin. */
    if (ctx.state === "suspended") this.resumeOnNextGesture();

    this.nextTime = ctx.currentTime + 0.12;
    this.step = 0;
    this.schedule();
    this.timer = window.setInterval(this.schedule, 200);

    const g = this.master!.gain;
    g.cancelScheduledValues(ctx.currentTime);
    g.setValueAtTime(g.value, ctx.currentTime);
    g.linearRampToValueAtTime(this.targetVolume, ctx.currentTime + 1.6);
    return true;
  }

  /** Bir sonraki dokunuş/tıklamada sesi tekrar açmayı dener. */
  private resumeOnNextGesture() {
    const ctx = this.ctx;
    if (!ctx) return;

    const retry = () => {
      void ctx.resume().finally(() => {
        if (ctx.state === "running") detach();
      });
    };
    const detach = () => {
      document.removeEventListener("pointerdown", retry);
      document.removeEventListener("touchstart", retry);
      document.removeEventListener("keydown", retry);
    };

    document.addEventListener("pointerdown", retry, { passive: true });
    document.addEventListener("touchstart", retry, { passive: true });
    document.addEventListener("keydown", retry);
  }

  stop() {
    if (!this.ctx || !this.master) return;
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    const ctx = this.ctx;
    const g = this.master.gain;
    g.cancelScheduledValues(ctx.currentTime);
    g.setValueAtTime(g.value, ctx.currentTime);
    g.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
  }
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
