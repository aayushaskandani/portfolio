// Web Audio API Synthesizer - Zero external network dependency
// Generates both realistic SFX and a soothing ambient lo-fi chord generator

class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public isMusicPlaying: boolean = false;
  private musicInterval: any = null;
  private activeMusicNodes: OscillatorNode[] = [];
  private onMusicStateChangeListeners: ((isPlaying: boolean) => void)[] = [];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Register listener for music playing state
  public subscribeMusicState(cb: (isPlaying: boolean) => void) {
    this.onMusicStateChangeListeners.push(cb);
    return () => {
      this.onMusicStateChangeListeners = this.onMusicStateChangeListeners.filter(l => l !== cb);
    };
  }

  private notifyMusicState() {
    this.onMusicStateChangeListeners.forEach(cb => cb(this.isMusicPlaying));
  }

  // Play a pleasant synthesized frequency
  playFrequency(freq: number = 520, duration: number = 0.06, type: OscillatorType = 'sine', volume: number = 0.04) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.4), ctx.currentTime + duration);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy catch
    }
  }

  playClick() {
    this.playFrequency(640, 0.04, 'triangle', 0.03);
  }

  playBeep() {
    this.playFrequency(880, 0.08, 'sine', 0.04);
  }

  playWindowOpen() {
    this.playFrequency(440, 0.05, 'sine', 0.03);
    setTimeout(() => this.playFrequency(660, 0.06, 'sine', 0.03), 40);
  }

  playWindowClose() {
    this.playFrequency(660, 0.05, 'sine', 0.03);
    setTimeout(() => this.playFrequency(440, 0.06, 'sine', 0.03), 40);
  }

  playWarp() {
    this.playFrequency(320, 0.1, 'sine', 0.04);
    setTimeout(() => this.playFrequency(540, 0.1, 'triangle', 0.03), 50);
    setTimeout(() => this.playFrequency(780, 0.12, 'sine', 0.03), 100);
  }

  playError() {
    this.playFrequency(220, 0.12, 'sawtooth', 0.03);
  }

  playVoiceChime() {
    this.playFrequency(587, 0.08, 'sine', 0.04);
    setTimeout(() => this.playFrequency(880, 0.1, 'sine', 0.04), 70);
  }

  // Stark J.A.R.V.I.S. HUD power-up chime
  playJarvisChime() {
    this.playFrequency(523.25, 0.06, 'sine', 0.05); // C5
    setTimeout(() => this.playFrequency(783.99, 0.08, 'sine', 0.05), 50); // G5
    setTimeout(() => this.playFrequency(1046.50, 0.12, 'triangle', 0.04), 110); // C6
  }

  // Tactical HUD target lock chirp
  playTargetLock() {
    this.playFrequency(1200, 0.03, 'sine', 0.035);
    setTimeout(() => this.playFrequency(1600, 0.04, 'sine', 0.04), 30);
  }

  // Mechanical servo / hydraulic iris actuation
  playHydraulicServo() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.06);
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }

  // --- Real-time Ambient Lo-Fi Background Synthesizer ---
  // Plays warm, dreamy ambient chords (Dm7 -> G7 -> Cmaj7 -> Am7)
  public toggleAmbientMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }

  public startAmbientMusic() {
    const ctx = this.getContext();
    if (!ctx) return;
    this.isMusicPlaying = true;
    this.notifyMusicState();

    // Chord progressions in Hz:
    // Dm9 (D3, F3, A3, C4, E4) -> G13 (G2, B3, F4, A4) -> Cmaj9 (C3, E3, G3, B3, D4) -> Am9 (A2, C3, E3, G3, B3)
    const chords = [
      [146.83, 174.61, 220.00, 261.63, 329.63], // Dm9
      [98.00, 246.94, 349.23, 440.00],          // G13
      [130.81, 164.81, 196.00, 246.94, 293.66], // Cmaj9
      [110.00, 130.81, 164.81, 196.00, 246.94]  // Am9
    ];

    let chordIndex = 0;

    const playChord = () => {
      if (!this.isMusicPlaying) return;
      const currentChord = chords[chordIndex % chords.length];
      chordIndex++;

      const now = ctx.currentTime;
      const duration = 4.2; // seconds per chord

      // Filter to give that warm, mellow lo-fi tape sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);
      filter.Q.setValueAtTime(1.5, now);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(0.025, now + 1.2);
      masterGain.gain.setValueAtTime(0.025, now + duration - 1.2);
      masterGain.gain.linearRampToValueAtTime(0.0001, now + duration);

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      currentChord.forEach(freq => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        // Add subtle detune for vintage analog chorus warmth
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);
        osc.connect(filter);
        osc.start(now);
        osc.stop(now + duration);
        this.activeMusicNodes.push(osc);
      });
    };

    playChord();
    this.musicInterval = setInterval(playChord, 4000);
  }

  public stopAmbientMusic() {
    this.isMusicPlaying = false;
    this.notifyMusicState();
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.activeMusicNodes.forEach(node => {
      try { node.stop(); } catch {}
    });
    this.activeMusicNodes = [];
  }
}

export const soundFX = new SoundFX();
