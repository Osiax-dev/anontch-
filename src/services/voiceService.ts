// Audio service for playing clear, articulate French vocal notes for all users, including non-readers.

class VoiceGuideService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudioId: string | null = null;
  private onStateChangeListeners: Array<(state: { isPlaying: boolean; currentId: string | null }) => void> = [];
  private audioCtx: AudioContext | null = null;

  public subscribe(listener: (state: { isPlaying: boolean; currentId: string | null }) => void) {
    this.onStateChangeListeners.push(listener);
    listener({
      isPlaying: this.currentAudioId !== null,
      currentId: this.currentAudioId,
    });
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.onStateChangeListeners.forEach((l) =>
      l({
        isPlaying: this.currentAudioId !== null,
        currentId: this.currentAudioId,
      })
    );
  }

  // Play a soft pleasant audio chime to confirm audio button tapped
  private playChime() {
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5 note
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.12); // E5 note

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // AudioContext might be blocked until gesture, gracefully ignored
    }
  }

  public speak(id: string, textFr: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    // If currently playing this exact id, toggle pause/stop
    if (this.currentAudioId === id) {
      this.stop();
      return;
    }

    // Stop existing speech
    this.stop();

    this.playChime();

    const utterance = new SpeechSynthesisUtterance(textFr);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.92; // Calm, clear, accessible speaking pace
    utterance.pitch = 1.04;

    // Pick best natural French voice if voices are loaded
    const voices = window.speechSynthesis.getVoices();
    const frenchVoice = voices.find((v) => v.lang.startsWith('fr') && !v.name.includes('Compact')) || voices.find((v) => v.lang.startsWith('fr'));
    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    this.currentAudioId = id;
    this.currentUtterance = utterance;
    this.notify();

    utterance.onend = () => {
      this.currentAudioId = null;
      this.currentUtterance = null;
      this.notify();
    };

    utterance.onerror = () => {
      this.currentAudioId = null;
      this.currentUtterance = null;
      this.notify();
    };

    window.speechSynthesis.speak(utterance);
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.currentAudioId = null;
    this.currentUtterance = null;
    this.notify();
  }
}

export const voiceGuide = new VoiceGuideService();
