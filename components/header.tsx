"use client";

import React, { useState, useEffect } from "react";
import { useThemeSound } from "./theme-sound-provider";

interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  html_url: string;
}

export default function Header() {
  const {
    textTitle,
    textMuted,
    bgImagePlaceholder,
    isDark,
    triggerSound,
  } = useThemeSound();

  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });
      setCurrentTime(`${time} (GMT+5:30) Gujarat, India`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        if (active) {
          setProfile(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const handleFlip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFlipped(!isFlipped);
    triggerSound(520, "sine", 0.06);
  };

  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">

        {/* Profile Image Container with 3D Flip */}
        <div className="relative w-[76px] h-[76px]">
          {loading ? (
            <div className={`w-full h-full rounded-2xl border border-dashed border-2 flex items-center justify-center animate-pulse ${bgImagePlaceholder}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`transition-transform duration-300 ${isDark ? "stroke-zinc-700" : "stroke-zinc-300"}`}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          ) : (
            <div className="w-full h-full [perspective:1000px] relative">
              <div
                className={`w-full h-full duration-700 transition-all [transform-style:preserve-3d] relative ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* Front Side: Current Profile Image */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-2xl border border-border shadow-md overflow-hidden bg-card flex items-center justify-center">
                  <a href={profile?.html_url || "https://github.com/Nikunj-1812"} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                    <img
                      src={profile?.avatar_url || "/profile_img.jpeg"}
                      alt="Nikunj Sorathiya"
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </a>
                </div>

                {/* Back Side: New Photo */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-border shadow-md overflow-hidden bg-card flex items-center justify-center">
                  <img
                    src="/1782708650934.png"
                    alt="Nikunj Sorathiya Alternate"
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              {/* Small Switch Button in the bottom-right corner */}
              <button
                onClick={handleFlip}
                onMouseEnter={() => triggerSound(800, "sine", 0.02)}
                className="absolute -right-2 -bottom-2 z-20 w-6 h-6 rounded-full bg-background border border-border shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Switch Photo"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Name and Date/Time */}
        <div className="flex flex-col select-text text-left">
          {loading ? (
            <>
              <div className="h-7 w-28 rounded bg-secondary animate-pulse mb-1.5" />
              <div className="h-4 w-36 rounded bg-secondary animate-pulse" />
            </>
          ) : (
            <>
              <h1 className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${textTitle}`}>
                Nikunj Sorathiya
              </h1>
              <span className={`text-[13px] font-medium tracking-wide transition-colors duration-300 ${textMuted} max-w-[450px] font-mono`}>
                {currentTime}
              </span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
