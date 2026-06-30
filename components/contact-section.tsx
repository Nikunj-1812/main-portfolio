"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeSound } from "./theme-sound-provider";

// --- SVG Icons ---
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export default function ContactSection() {
  const { textTitle, triggerSound, bgBadge, isDark } = useThemeSound();
  const [avatarUrl, setAvatarUrl] = useState("/profile_img.jpeg");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    let active = true;
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data && data.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const navigateLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blogs" },
    { name: "Resume", path: "/resume" },
  ];

  const connectLinks = [
    { name: "X", icon: <XIcon />, url: "https://x.com/Nikunj_1812_" },
    { name: "LinkedIn", icon: <LinkedInIcon />, url: "https://www.linkedin.com/in/nikunj-sorathiya-6b7098382/" },
    { name: "GitHub", icon: <GitHubIcon />, url: "https://github.com/Nikunj-1812" },
    { name: "Email", icon: <EmailIcon />, url: "mailto:nikunjsorathiya712@gmail.com" },
  ];

  return (
    <footer className="w-full flex flex-col gap-8 select-text mb-4">
      {/* upper side element of footer */}
      {isHome && (
        <div 
          id="contact" 
          className={`border py-8 rounded-xl shadow-sm dark:shadow-none transition-colors duration-300 ${
            isDark ? "border-zinc-800 bg-transparent" : "border-zinc-200 bg-white"
          }`}
        >
          <div className="px-6 sm:px-12 flex flex-col items-center">
            <p 
              className={`opacity-50 text-base md:text-xl mb-6 text-center transition-colors duration-300 ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Hey, you scrolled this far, let&apos;s talk.
            </p>
            <a
              href="https://cal.com/nikunj-sorathiya-cnihd7/30min"
              target="_blank"
              rel="noopener noreferrer"
              data-cal-namespace="30min"
              data-cal-link="nikunj-sorathiya-cnihd7/30min"
              data-cal-config='{"layout":"month_view"}'
              onClick={() => triggerSound(480, "triangle", 0.12)}
              onMouseEnter={() => triggerSound(800, "sine", 0.02)}
              className={`group inline-flex items-center text-sm border py-2 px-3 rounded-md cursor-pointer transition-all ${
                isDark 
                  ? "bg-white/15 border-zinc-800 hover:bg-white/20" 
                  : "bg-black/5 border-zinc-200 hover:bg-black/10"
              }`}
            >
              <div className="flex items-center gap-2 group-hover:gap-8 transition-all duration-300 relative">
                <div className="w-5 h-5 flex-shrink-0">
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-contain rounded-sm"
                  />
                </div>
                <div 
                  className={`flex items-center gap-1 absolute left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                    isDark ? "text-white" : "text-zinc-900"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  <div 
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] ml-1 font-bold ${
                      isDark ? "bg-zinc-700 text-white" : "bg-zinc-200 text-zinc-900"
                    }`}
                  >
                    You
                  </div>
                </div>
                <span 
                  className={`whitespace-nowrap font-bold text-sm ml-0 group-hover:ml-16 transition-all duration-300 ${
                    isDark ? "text-white" : "text-zinc-900"
                  }`}
                >
                  Book a Free Call
                </span>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Upper Footer section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left mt-4">
        
        {/* NAVIGATE COLUMN */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 font-mono">
            Navigate
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
            {navigateLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onMouseEnter={() => triggerSound(800, "sine", 0.02)}
                onClick={() => triggerSound(640, "sine", 0.05)}
                className="text-[13px] font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* CONNECT COLUMN */}
        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex flex-col gap-3 w-full max-w-[200px] sm:items-end">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 font-mono text-left sm:text-right w-full">
              Connect
            </span>
            <div className="flex flex-wrap gap-2 mt-1">
              {connectLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => triggerSound(840, "sine", 0.02)}
                  onClick={() => triggerSound(480, "triangle", 0.1)}
                  className={`w-9 h-9 border border-border hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isDark ? "bg-[#111113]/60" : "bg-white"
                  }`}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Divider */}
      <hr className="w-full border-t border-border opacity-50 my-2" />

      {/* Copyright row */}
      <div className="flex items-center justify-between text-[11px] font-medium text-zinc-500 font-mono select-none">
        <span>&copy; {new Date().getFullYear()} Nikunj Sorathiya. All rights reserved.</span>
      </div>
    </footer>
  );
}
