"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useThemeSound } from "./theme-sound-provider";

// --- Blog Icons ---
const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

interface Blog {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readMoreUrl: string;
}

export default function BlogCard({ blog }: { blog: Blog }) {
  const { cardBorder, textTitle, badgeTech, triggerSound } = useThemeSound();
  const router = useRouter();

  const renderCardGraphic = (id: string) => {
    switch (id) {
      case "crabgit-blog":
        return (
          <div className="w-full h-36 bg-gradient-to-br from-[#402d23] to-[#1c120c] border-b border-zinc-850/60 relative overflow-hidden flex items-center justify-center group-hover:scale-102 transition-transform duration-300 select-none">
            <div className="w-[84%] h-[78%] bg-[#0d0a09] rounded-lg border border-[#5c3e30]/60 p-2 shadow-2xl flex flex-col font-mono text-[8px] leading-tight text-[#e2ab87]">
              <div className="flex items-center justify-between pb-1 border-b border-[#2d1d17]/40 mb-1 select-none">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f87171]/80" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]/80" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]/80" />
                </div>
                <span className="text-[7px] text-zinc-600">crabgit — bash</span>
                <div className="w-3" />
              </div>
              <div className="flex flex-col gap-0.5 select-none font-bold">
                <span className="text-[#a5b4fc] text-[9px]"> _ _ _ ___ _ _ _</span>
                <span className="text-[#a5b4fc] text-[9px] -mt-1">/ _\ / _ \/ _\ / _\ / /</span>
                <span className="text-[#fb923c] text-[8px] -mt-0.5">$ crabgit init --scratch</span>
                <span className="text-zinc-500 text-[7.5px]">Initialized content-addressable storage.</span>
                <span className="text-[#fb923c] text-[8px] mt-0.5">$ crabgit commit -m &quot;initial&quot;</span>
                <span className="text-[#34d399] text-[7.5px]">[master 9f8a32d] committed.</span>
              </div>
            </div>
          </div>
        );

      case "solana-blog":
        return (
          <div className="w-full h-36 bg-[#1a1a1e] border-b border-zinc-850/60 relative overflow-hidden flex items-center justify-center group-hover:scale-102 transition-transform duration-300 select-none">
            <span className="absolute top-2 left-2 text-[6.5px] text-zinc-650 font-mono tracking-tight">
              Building My First Solana Smart Contract: A Simple Counter
            </span>

            <div className="absolute left-6 flex flex-col items-center">
              <div className="w-[18px] h-[18px] bg-sky-500 border border-sky-400 rounded-md flex items-center justify-center text-white text-[9px] font-black shadow-lg shadow-sky-900/35 transform -rotate-12 translate-y-1">
                +
              </div>
              <div className="w-[18px] h-[18px] bg-sky-600 border border-sky-500 rounded-md flex items-center justify-center text-white text-[9px] font-black shadow-lg shadow-sky-900/35 transform rotate-12 mt-2">
                -
              </div>
            </div>

            <div className="w-[100px] h-[64px] bg-[#0c0c0e] border border-zinc-800/90 rounded p-1.5 shadow-2xl flex flex-col font-mono text-[5.5px] leading-tight text-emerald-400 z-10 relative">
              <div className="flex gap-0.5 mb-1 opacity-70">
                <div className="w-1 h-1 rounded-full bg-rose-500" />
                <div className="w-1 h-1 rounded-full bg-amber-500" />
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
              </div>
              <span className="text-zinc-500">// smart contract</span>
              <span>struct Counter &#123;</span>
              <span className="pl-1.5 text-zinc-200">pub value: u64,</span>
              <span>&#125;</span>
            </div>

            <div className="absolute right-6 bg-[#eb6e3a] border border-[#f08558] text-white rounded p-1.5 shadow-lg flex flex-col items-center justify-center transform rotate-12 w-[34px] h-[34px]">
              <span className="text-[5px] uppercase font-mono tracking-widest text-[#ffd3bf] leading-none">course</span>
              <span className="text-[13px] font-extrabold leading-none mt-0.5">42</span>
            </div>
          </div>
        );

      case "tech-stack-journey":
        return (
          <div className="w-full aspect-video border-b border-border/40 relative overflow-hidden flex items-center justify-center group-hover:scale-102 transition-transform duration-300 select-none bg-zinc-950">
            <img
              src="/blog1.png"
              alt="My Tech Stack Journey"
              className="w-full h-full object-fill"
            />
          </div>
        );

      default:
        return <div className="w-full h-36 bg-zinc-900" />;
    }
  };

  const isInternal = blog.readMoreUrl.startsWith("/");

  const handleCardClick = (e: React.MouseEvent) => {
    // If the user clicked directly on the anchor element, let the native link work
    if ((e.target as HTMLElement).closest("a")) {
      return;
    }
    triggerSound(480, "triangle", 0.1);
    if (isInternal) {
      router.push(blog.readMoreUrl);
    } else {
      window.open(blog.readMoreUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => triggerSound(720, "sine", 0.04)}
      className={`group rounded-xl border flex flex-col overflow-hidden transition-all duration-300 cursor-pointer ${cardBorder}`}
    >
      {renderCardGraphic(blog.id)}

      <div className="p-4 flex flex-col flex-1 justify-between gap-4">
        <div className="flex flex-col gap-2 text-left">
          <h3 className={`text-sm font-bold tracking-tight leading-snug transition-colors duration-300 ${textTitle}`}>
            {blog.title}
          </h3>
          <p className="text-xs leading-normal font-medium">
            {blog.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-1 select-none">
          <div className="flex flex-wrap gap-1.5">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[9px] font-bold px-2 py-0.5 rounded border transition-colors duration-300 ${badgeTech}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-500">
            <div className="flex items-center gap-1.5">
              <CalendarIcon />
              <span>{blog.date}</span>
            </div>
            <a
              href={blog.readMoreUrl}
              target={isInternal ? undefined : "_blank"}
              rel={isInternal ? undefined : "noopener noreferrer"}
              onClick={() => triggerSound(480, "triangle", 0.1)}
              className="inline-flex items-center gap-0.5 transition-colors cursor-pointer hover:text-sky-500 text-foreground"
            >
              <span>Read More</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
