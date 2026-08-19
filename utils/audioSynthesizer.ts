"use client";

import { assetUrl } from "./assetHelper";

class GlobalAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private audioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.initAudio();
    }
  }

  private initAudio() {
    if (!this.audio && typeof window !== "undefined") {
      this.audio = new Audio(assetUrl("/audio/echo_preview.wav"));
      this.audio.loop = true;
      this.audio.volume = 0.65;
      this.audio.preload = "auto";

      this.audio.addEventListener("play", () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener("pause", () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener("ended", () => {
        this.isPlaying = false;
        this.notify();
      });
    }
  }

  public subscribe(callback: (playing: boolean) => void) {
    this.listeners.add(callback);
    callback(this.isPlaying);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public play() {
    this.initAudio();
    if (this.audio) {
      this.audio.currentTime = this.audio.currentTime || 0;
      this.audio
        .play()
        .then(() => {
          this.isPlaying = true;
          this.notify();
        })
        .catch((err) => {
          console.warn("Audio play blocked until user gesture:", err);
        });
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle(): boolean {
    this.initAudio();
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public playSfx(type: "select" | "hover" | "success" = "select") {
    if (typeof window === "undefined") return;
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state !== "closed") {
        if (this.audioCtx.state === "suspended") {
          this.audioCtx.resume();
        }
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = "sine";
        const freq = type === "success" ? 880 : type === "select" ? 520 : 340;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
        if (type === "success") {
          osc.frequency.exponentialRampToValueAtTime(1320, this.audioCtx.currentTime + 0.15);
        }
        gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.18);
      }
    } catch {
      // AudioContext fallback ignored safely
    }
  }
}

export const soundEngine = new GlobalAudioEngine();
