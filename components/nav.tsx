"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useThemeSound } from "./theme-sound-provider";

// --- Nav Vector Icons ---
const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SpeakerOnIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

const SpeakerMutedIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

interface SearchItem {
  title: string;
  subtitle: string;
  category: "Navigation" | "Projects" | "Blogs" | "Settings";
  action: () => void;
}

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    isDark,
    soundEnabled,
    toggleTheme,
    toggleSound,
    triggerSound,
    bgNav,
    textToggleIcon,
    borderDivider,
  } = useThemeSound();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blogs" },
    { name: "Resume", path: "/resume" },
  ];

  // Hotkey listener for Ctrl/Cmd + K Command Palette toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        triggerSound(680, "sine", 0.08);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerSound]);

  // Focus input automatically when Command Palette is opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Handle option click redirects
  const handleItemSelect = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  // Static list of search items
  const searchItems: SearchItem[] = [
    { title: "Home", subtitle: "Navigate to home details and bio", category: "Navigation", action: () => router.push("/") },
    { title: "Projects", subtitle: "Browse my projects list", category: "Navigation", action: () => router.push("/projects") },
    { title: "Blog", subtitle: "Read technical writeups and guides", category: "Navigation", action: () => router.push("/blogs") },
    { title: "Resume", subtitle: "Inspect work history & PDF downloads", category: "Navigation", action: () => router.push("/resume") },
    { title: "TravelLoop", subtitle: "Interactive travel community platform", category: "Projects", action: () => router.push("/projects") },

    { title: "GestureOS AI", subtitle: "Gesture-based computer vision OS control", category: "Projects", action: () => router.push("/projects") },
    { title: "Cinematch", subtitle: "Personalized movie recommendation engine", category: "Projects", action: () => router.push("/projects") },
    { title: "Uber Clone", subtitle: "Ride sharing mobile application clone", category: "Projects", action: () => router.push("/projects") },
    { title: "Collaborative Whiteboard", subtitle: "Real-time drawing canvas using WebSockets", category: "Projects", action: () => router.push("/projects") },
    { title: "Chatify", subtitle: "Real-time chat platform using MERN stack", category: "Projects", action: () => router.push("/projects") },
    { title: "My Tech Stack Journey", subtitle: "Read my journey from Hello World to Full Stack", category: "Blogs", action: () => router.push("/blogs/tech-stack-journey") },
    { title: "Toggle Light/Dark Theme", subtitle: `Switch to ${isDark ? "light" : "dark"} mode`, category: "Settings", action: toggleTheme },
    { title: "Toggle Audio Feedbacks", subtitle: `Sound effects are ${soundEnabled ? "Enabled" : "Disabled"}`, category: "Settings", action: toggleSound },
  ];

  // Filtering logic
  const filteredItems = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="w-full flex items-center justify-between py-4 border-b border-border/40 select-none mb-4">
        
        {/* Left Side Links */}
        <div className="flex items-center gap-5 sm:gap-7">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <Link
                key={tab.name}
                href={tab.path}
                onMouseEnter={() => triggerSound(800, "sine", 0.03)}
                onClick={() => triggerSound(640, "sine", 0.06)}
                className={`text-[13px] font-semibold transition-colors duration-200 cursor-pointer ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side Control Bar */}
        <div className="flex items-center gap-3">
          
          {/* Search/Command Pill button */}
          <button
            onClick={() => {
              setIsOpen(true);
              triggerSound(680, "sine", 0.08);
            }}
            onMouseEnter={() => triggerSound(800, "sine", 0.02)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-border hover:bg-accent hover:text-accent-foreground text-muted-foreground text-xs transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: isDark ? "rgba(17, 17, 19, 0.6)" : "#ffffff"
            }}
          >
            <SearchIcon />
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-[10px] font-bold text-zinc-400 font-mono">Ctrl</span>
              <span className="text-[10px] font-bold text-zinc-400 font-mono bg-zinc-200/50 dark:bg-zinc-800 px-1 rounded">K</span>
            </div>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => triggerSound(800, "sine", 0.02)}
            className={`p-1.5 rounded-full transition-all duration-200 cursor-pointer ${
              soundEnabled
                ? (isDark ? "text-amber-400 bg-zinc-850" : "text-amber-500 bg-zinc-100")
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
            title={soundEnabled ? "Mute sound feedbacks" : "Enable sound feedbacks"}
          >
            {soundEnabled ? <SpeakerOnIcon /> : <SpeakerMutedIcon />}
          </button>

          {/* Theme Mode Toggle */}
          <button
            onClick={toggleTheme}
            onMouseEnter={() => triggerSound(800, "sine", 0.02)}
            className="p-1.5 rounded-full transition-all duration-200 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

        </div>
      </div>

      {/* Command Palette Modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] rounded-xl border border-border bg-card text-card-foreground shadow-2xl p-3 flex flex-col gap-2 max-h-[380px] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Search Input Box */}
            <div className="flex items-center gap-2.5 px-3 py-2 border-b border-border mb-1">
              <SearchIcon />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search tabs, projects, settings..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  triggerSound(960, "sine", 0.01);
                }}
                className="w-full bg-transparent border-0 outline-none text-sm text-foreground placeholder-zinc-400"
              />
              <span className="text-[10px] font-bold text-zinc-500 font-mono border border-border px-1.5 py-0.5 rounded shadow-sm">
                ESC
              </span>
            </div>

            {/* List scroll container */}
            <div className="flex flex-col gap-0.5 overflow-y-auto flex-1 pr-1 scrollbar-none">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleItemSelect(item.action)}
                    onMouseEnter={() => triggerSound(880, "sine", 0.015)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-accent text-foreground hover:text-accent-foreground flex items-center justify-between transition-colors duration-150 cursor-pointer"
                  >
                    <div className="flex flex-col select-none">
                      <span className="text-xs font-bold">{item.title}</span>
                      <span className="text-[10px] text-zinc-400 leading-normal">{item.subtitle}</span>
                    </div>
                    <span className="text-[8px] font-extrabold uppercase tracking-widest text-zinc-500 bg-secondary/80 border border-border/80 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </button>
                ))
              ) : (
                <div className="text-center text-xs py-8 text-zinc-500 font-mono">
                  No results found for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
