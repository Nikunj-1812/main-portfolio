"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeSoundContextType {
  theme: Theme;
  soundEnabled: boolean;
  toggleTheme: (event?: React.MouseEvent | MouseEvent) => void;
  toggleSound: () => void;
  triggerSound: (frequency?: number, type?: OscillatorType, duration?: number) => void;
  playClickSound: () => void;
  isDark: boolean;
  bgMain: string;
  bgNav: string;
  textNavActive: string;
  textNavInactive: string;
  textTitle: string;
  textMuted: string;
  bgImagePlaceholder: string;
  bgTogglePill: string;
  textToggleIcon: string;
  borderDivider: string;
  bgBadge: string;
  cardBorder: string;
  badgeTech: string;
  statusRunningBg: string;
  ctaLeftBg: string;
  ctaCallRing: string;
  borderHrLine: string;
}

const ThemeSoundContext = createContext<ThemeSoundContextType | undefined>(undefined);

// Web Audio Synth for retro pop sound effects (reusing AudioContext to prevent lag)
let cachedAudioCtx: AudioContext | null = null;

const playPopSound = (frequency = 600, type: OscillatorType = "sine", duration = 0.08) => {
  if (typeof window === "undefined") return;
  try {
    if (!cachedAudioCtx) {
      cachedAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (cachedAudioCtx.state === "suspended") {
      cachedAudioCtx.resume();
    }

    const osc = cachedAudioCtx.createOscillator();
    const gain = cachedAudioCtx.createGain();

    osc.connect(gain);
    gain.connect(cachedAudioCtx.destination);

    const now = cachedAudioCtx.currentTime;
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, now + duration);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.start();
    osc.stop(now + duration);
  } catch (e) {
    console.error("Web Audio API error:", e);
  }
};

// Cached click sound Audio element for MP3 playback
let cachedClickAudio: HTMLAudioElement | null = null;

const getClickAudio = (): HTMLAudioElement | null => {
  if (typeof window === "undefined") return null;
  if (!cachedClickAudio) {
    cachedClickAudio = new Audio("/freesound_gamestudio-click-2-384920.mp3");
    cachedClickAudio.volume = 0.5;
    cachedClickAudio.preload = "auto";
  }
  return cachedClickAudio;
};

export function ThemeSoundProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const soundEnabledRef = useRef(false);

  // Keep ref in sync with state so the global listener can read it without re-registering
  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // Preload the click sound on mount
  useEffect(() => {
    getClickAudio();
  }, []);

  // Play the MP3 click sound (clones audio for rapid overlapping clicks)
  const playClickSound = useCallback(() => {
    if (!soundEnabledRef.current) return;
    const audio = getClickAudio();
    if (!audio) return;
    try {
      // Clone the audio node so overlapping rapid clicks all produce sound
      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = 0.5;
      clone.play().catch(() => {});
    } catch {
      // Silently ignore audio errors
    }
  }, []);

  // Global click listener — plays click sound on any interactive element
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (!soundEnabledRef.current) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Walk up the DOM to find the nearest interactive element
      const interactive = target.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"], [data-click-sound]'
      );
      if (interactive) {
        playClickSound();
      }
    };

    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, [playClickSound]);

  // Sync theme with root HTML class to apply Shadcn theme variables
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleSound = () => {
    if (!soundEnabled) {
      playPopSound(520, "sine", 0.1);
      setTimeout(() => playPopSound(780, "sine", 0.08), 80);
      setSoundEnabled(true);
    } else {
      playPopSound(420, "sine", 0.12);
      setSoundEnabled(false);
    }
  };

  const toggleTheme = (event?: React.MouseEvent | MouseEvent) => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    if (
      typeof window === "undefined" ||
      !(document as any).startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !event
    ) {
      setTheme(nextTheme);
      if (nextTheme === "dark") {
        playPopSound(660, "triangle", 0.1);
      } else {
        playPopSound(880, "sine", 0.08);
      }
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const root = document.documentElement;
    root.style.setProperty("--x", `${x}px`);
    root.style.setProperty("--y", `${y}px`);
    root.style.setProperty("--r", `${endRadius}px`);
    root.classList.add("theme-transitioning");

    const transition = (document as any).startViewTransition(() => {
      setTheme(nextTheme);
      if (nextTheme === "dark") {
        playPopSound(660, "triangle", 0.1);
      } else {
        playPopSound(880, "sine", 0.08);
      }
    });

    transition.finished.then(() => {
      root.classList.remove("theme-transitioning");
    });
  };

  const triggerSound = (freq = 600, type: OscillatorType = "sine", dur = 0.08) => {
    if (soundEnabled) {
      playPopSound(freq, type, dur);
    }
  };

  const isDark = theme === "dark";

  // Global design tokens exported as layout mappings
  const bgMain = "bg-background text-muted-foreground";
  const bgNav = "bg-card/70 border-border/80";
  const textNavActive = "bg-accent text-accent-foreground shadow-sm border border-border/30";
  const textNavInactive = "text-muted-foreground hover:text-foreground";
  const textTitle = "text-foreground font-bold";
  const textMuted = "text-muted-foreground";
  const bgImagePlaceholder = "bg-card border-border";
  const bgTogglePill = "bg-card border-border shadow-sm";
  const textToggleIcon = "text-muted-foreground hover:text-foreground hover:bg-accent";
  const borderDivider = "bg-border";

  // Hero & General badges styles
  const bgBadge = "bg-card text-foreground border-border shadow-sm hover:bg-accent hover:text-foreground";

  // Card project & blog styles
  const cardBorder = "bg-card border-border hover:border-muted-foreground/60 shadow-sm hover:shadow-md";
  const badgeTech = "bg-secondary border-border text-muted-foreground";
  const statusRunningBg = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";

  // Contact specific styles
  const ctaLeftBg = "bg-card border-border";
  const ctaCallRing = "border-border text-muted-foreground";
  const borderHrLine = "border-border";

  return (
    <ThemeSoundContext.Provider
      value={{
        theme,
        soundEnabled,
        toggleTheme,
        toggleSound,
        triggerSound,
        playClickSound,
        isDark,
        bgMain,
        bgNav,
        textNavActive,
        textNavInactive,
        textTitle,
        textMuted,
        bgImagePlaceholder,
        bgTogglePill,
        textToggleIcon,
        borderDivider,
        bgBadge,
        cardBorder,
        badgeTech,
        statusRunningBg,
        ctaLeftBg,
        ctaCallRing,
        borderHrLine,
      }}
    >
      {children}
    </ThemeSoundContext.Provider>
  );
}

export function useThemeSound() {
  const context = useContext(ThemeSoundContext);
  if (!context) {
    throw new Error("useThemeSound must be used within a ThemeSoundProvider");
  }
  return context;
}

