"use client";

import React from "react";
import { useThemeSound } from "./theme-sound-provider";

// --- Project Icons ---
const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// --- Tech Badge Logos ---
const NextjsLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const TypeScriptLogo = () => (
  <div className="w-[12px] h-[12px] bg-[#007acc] text-[8px] flex items-center justify-center font-bold text-white rounded-[1.5px] select-none font-sans leading-none">
    TS
  </div>
);

const RustLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.378 1.602c-.34.02-.68.083-1.01.186l-.103-.309c-.58.196-1.125.496-1.61.887l.21.238c-.3.21-.57.45-.81.72l-.21-.21c-.41.38-.76.83-1.04 1.33l.26.155c-.21.36-.37.75-.48 1.15l-.29-.07c-.15.48-.23.99-.24 1.51l.3.01c-.01.31-.01.62 0 .93l-.3.01c.01.52.09 1.03.24 1.51l.29-.07c.11.4.27.79.48 1.15l-.26.155c.28.5.63.95 1.04 1.33l.21-.21c.24.27.51.51.81.72l-.21.238c.485.391 1.03.691 1.61.887l.103-.309c.67.206 1.37.268 2.05.186l.07.29c.58-.1 1.14-.29 1.65-.56l-.16-.25c.34-.23.65-.5.92-.81l.22.2c.43-.37.8-.81 1.09-1.3l-.24-.18c.23-.34.42-.71.56-1.1l.27.12c.18-.47.29-.97.33-1.48l-.29-.05c.03-.38.03-.76 0-1.14l.29-.05c-.04-.51-.15-1.01-.33-1.48l-.27.12c-.14-.39-.33-.76-.56-1.1l.24-.18c-.29-.49-.66-.93-1.09-1.3l-.22.2c-.27-.31-.58-.58-.92-.81l.16-.25c-.51-.27-1.07-.46-1.65-.56l-.07.29zm.622 1.398c2.97.2 5.37 2.6 5.57 5.57.14 2.08-.66 4.07-2.14 5.48l.01-.01c-1.41 1.48-3.4 2.28-5.48 2.14-2.97-.2-5.37-2.6-5.57-5.57-.14-2.08.66-4.07 2.14-5.48l-.01.01c1.41-1.48 3.4-2.28 5.48-2.14zM8.37 6.13c-.09 0-.17.03-.24.08l-1.89 1.35c-.17.12-.21.35-.09.52.12.17.35.21.52.09l.48-.34v2.79c0 .21.17.38.38.38h.75c.21 0 .38-.17.38-.38V7.53l.48.34c.07.05.15.08.24.08.09 0 .17-.03.24-.08.17-.12.21-.35.09-.52l-1.89-1.35c-.07-.05-.15-.08-.24-.08zm7.26.08c-.17-.12-.4-.08-.52.09l-.48.34V6.13c0-.21-.17-.38-.38-.38h-.75c-.21 0-.38.17-.38.38v4.51c0 .21.17.38.38.38h.75c.21 0 .38-.17.38-.38V8.92l.48.34c.07.05.15.08.24.08.09 0 .17-.03.24-.08.17-.12.21-.35.09-.52l-1.89-1.35z" />
  </svg>
);

const GoLogo = () => (
  <div className="w-[14px] h-[10px] bg-cyan-400 text-[7px] flex items-center justify-center font-extrabold text-slate-900 rounded-[2px] select-none font-sans leading-none tracking-tight">
    GO
  </div>
);

const TailwindLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 6.036c-2.402 0-3.606 1.203-3.606 3.61 0 2.404 1.204 3.605 3.606 3.605 2.404 0 3.607-1.201 3.607-3.605 0-2.407-1.203-3.61-3.607-3.61zm0-6.036c-4.808 0-7.211 2.404-7.211 7.216 0 4.808 2.403 7.211 7.211 7.211 4.811 0 7.216-2.403 7.216-7.211 0-4.812-2.405-7.216-7.216-7.216zm0 18.053c-2.402 0-3.606 1.203-3.606 3.61 0 2.404 1.204 3.605 3.606 3.605 2.404 0 3.607-1.201 3.607-3.605 0-2.407-1.203-3.61-3.607-3.61z" />
  </svg>
);

const RedisStackLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0l-12 6 12 6 12-6-12-6zm0 8l-10-5 10 5 10-5-10 5zm-12 4l3 1.5v3.5l9 4.5 9-4.5v-3.5l3-1.5v5l-12 6-12-6v-5zm3 8.5l9 4.5 9-4.5v-1l-9 4.5-9-4.5v1z" />
  </svg>
);

const NestjsLogo = () => (
  <div className="w-[12px] h-[12px] bg-[#e0234e] text-[7.5px] flex items-center justify-center font-bold text-white rounded-[1.5px] select-none font-mono leading-none">
    N
  </div>
);

const renderTechIcon = (tech: string) => {
  switch (tech) {
    case "next":
      return <NextjsLogo />;
    case "ts":
      return <TypeScriptLogo />;
    case "rust":
      return <RustLogo />;
    case "go":
      return <GoLogo />;
    case "tailwind":
      return <TailwindLogo />;
    case "nestjs":
      return <NestjsLogo />;
    case "redis":
      return <RedisStackLogo />;
    default:
      return null;
  }
};

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
}

export default function ProjectCard({ project }: { project: Project }) {
  const { cardBorder, textTitle, badgeTech, statusRunningBg, triggerSound } = useThemeSound();

  const renderCardGraphic = (id: string) => {
    switch (id) {
      case "fynt":
        return (
          <div className="w-full h-36 bg-[#070708] border-b border-zinc-850/60 relative overflow-hidden flex items-center justify-center group-hover:scale-102 transition-transform duration-300 select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#141416_1px,transparent_1px),linear-gradient(to_bottom,#141416_1px,transparent_1px)] bg-[size:14px_14px] opacity-60" />
            <span className="text-[44px] font-extrabold tracking-widest text-[#16161a] select-none font-mono">
              FYNT
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="220" height="100" viewBox="0 0 220 100" fill="none">
                <path d="M40 50 Q100 20 120 50 T200 50" stroke="url(#fynt-grad-1)" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M40 50 C90 80, 110 80, 160 50" stroke="url(#fynt-grad-2)" strokeWidth="1.5" />
                <circle cx="40" cy="50" r="4.5" fill="#f43f5e" className="animate-pulse" />
                <circle cx="40" cy="50" r="9" stroke="#f43f5e" strokeWidth="0.8" strokeOpacity="0.4" />
                <circle cx="120" cy="50" r="4.5" fill="#3b82f6" />
                <circle cx="120" cy="50" r="9" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.4" />
                <circle cx="200" cy="50" r="4.5" fill="#10b981" />
                <circle cx="200" cy="50" r="9" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.4" />
                <defs>
                  <linearGradient id="fynt-grad-1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="fynt-grad-2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute top-2 right-2 border border-zinc-800 rounded px-1.5 py-0.5 bg-[#0f0f12] text-[8px] text-zinc-500 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>FLOW v1.0</span>
            </div>
          </div>
        );

      case "crabgit":
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

      case "tempmail":
        return (
          <div className="w-full h-36 bg-[#f4f4f5] border-b border-zinc-200/60 relative overflow-hidden flex group-hover:scale-102 transition-transform duration-300 select-none">
            <div className="w-[60%] bg-[#fafafc] p-2.5 flex flex-col justify-between border-r border-zinc-200">
              <div className="flex flex-col gap-0.5">
                <span className="text-[8px] font-extrabold tracking-wider text-zinc-400 uppercase font-mono">YOUR TEMPORARY EMAIL</span>
                <span className="text-[12px] font-bold text-zinc-900 tracking-tight mt-0.5">TEMP MAIL</span>
              </div>
              <div className="flex items-center justify-between border border-zinc-200 bg-white rounded-md p-1 pl-1.5 select-none">
                <span className="text-[8.5px] font-mono text-zinc-600 truncate mr-1">temp@abhinav.in</span>
                <div className="p-0.5 rounded bg-zinc-100 border border-zinc-200 text-[7px] font-bold text-zinc-500">COPY</div>
              </div>
            </div>
            <div className="w-[40%] bg-[#0c0c0e] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
              <div className="flex items-center gap-0.5 text-zinc-700 relative z-10 font-black text-2xl tracking-tighter animate-pulse select-none">
                <span>❯</span>
                <span className="text-zinc-500">❯</span>
                <span className="text-white">❯</span>
              </div>
            </div>
          </div>
        );

      case "redis":
        return (
          <div className="w-full h-36 bg-gradient-to-tr from-[#ffe3ec] via-[#ffccd5] to-[#e8eaf6] border-b border-zinc-200/50 relative overflow-hidden flex items-center justify-center gap-5 group-hover:scale-102 transition-transform duration-300 select-none">
            <div className="relative w-12 h-14 bg-[#a1e2f5] border-[1.5px] border-sky-950 rounded-full flex flex-col items-center justify-center shadow-lg shadow-sky-900/10 select-none">
              <div className="flex gap-1.5 mt-2">
                <div className="w-3.5 h-3.5 bg-white border border-sky-950 rounded-full flex items-center justify-center relative">
                  <div className="w-1.5 h-1.5 bg-sky-950 rounded-full absolute bottom-0.5" />
                </div>
                <div className="w-3.5 h-3.5 bg-white border border-sky-950 rounded-full flex items-center justify-center relative">
                  <div className="w-1.5 h-1.5 bg-sky-950 rounded-full absolute bottom-0.5" />
                </div>
              </div>
              <div className="absolute top-2 w-[34px] h-[7px] bg-zinc-950 rounded-sm opacity-90 shadow-sm flex items-center justify-around select-none">
                <div className="w-3 h-1.5 bg-white/20 rounded-sm" />
                <div className="w-3 h-1.5 bg-white/20 rounded-sm" />
              </div>
              <div className="flex gap-0.5 mt-1 border-[0.5px] border-t-0 border-sky-950 bg-white px-0.5 rounded-b-sm">
                <div className="w-1.2 h-1.2 bg-white" />
                <div className="w-1.2 h-1.2 bg-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-zinc-400 border border-zinc-600 rounded p-0.5 text-[5px] text-zinc-950 font-bold select-none rotate-12">
                🔧
              </div>
            </div>

            <div className="flex flex-col gap-0.5 select-none scale-105">
              <div className="w-11 h-3.5 bg-[#ef4444] border border-[#b91c1c] rounded shadow-md relative flex items-center justify-center select-none transform skew-x-12 translate-x-1 hover:bg-red-500">
                <span className="text-[6px] text-white font-black select-none">*</span>
              </div>
              <div className="w-11 h-3.5 bg-[#dc2626] border border-[#991b1b] rounded shadow-md transform skew-x-12 select-none hover:bg-red-500" />
              <div className="w-11 h-3.5 bg-[#b91c1c] border border-[#7f1d1d] rounded shadow-md transform skew-x-12 -translate-x-1 select-none hover:bg-red-500" />
            </div>
          </div>
        );

      case "travel-loop":
        return (
          <div className="w-full aspect-video border-b border-border/40 relative overflow-hidden flex items-center justify-center group-hover:scale-102 transition-transform duration-300 select-none bg-zinc-950">
            <img
              src="/travelloop.png"
              alt="TravelLoop"
              className="w-full h-full object-fill"
            />
          </div>
        );



      case "gesture-os-ai":
        return (
          <div className="w-full aspect-video border-b border-border/40 relative overflow-hidden flex items-center justify-center group-hover:scale-102 transition-transform duration-300 select-none bg-zinc-950">
            <img
              src="/GestureOS.png"
              alt="GestureOS AI"
              className="w-full h-full object-fill"
            />
          </div>
        );

      case "cinematch":
        return (
          <div className="w-full aspect-video border-b border-border/40 relative overflow-hidden flex items-center justify-center group-hover:scale-102 transition-transform duration-300 select-none bg-zinc-950">
            <img
              src="/cinematch.png"
              alt="Cinematch"
              className="w-full h-full object-fill"
            />
          </div>
        );

      case "uber-clone":
        return (
          <div className="w-full aspect-video border-b border-border/40 relative overflow-hidden flex items-center justify-center group-hover:scale-102 transition-transform duration-300 select-none bg-zinc-950">
            <img
              src="/uberclone.png"
              alt="Uber Clone"
              className="w-full h-full object-fill"
            />
          </div>
        );

      case "chatify":
        return (
          <div className="w-full aspect-video border-b border-border/40 relative overflow-hidden flex items-center justify-center group-hover:scale-102 transition-transform duration-300 select-none bg-zinc-950">
            <img
              src="/chatify.png"
              alt="Chatify"
              className="w-full h-full object-fill"
            />
          </div>
        );

      case "collaborative-whiteboard":
        return (
          <div className="w-full aspect-video bg-[#070708] border-b border-border/40 relative overflow-hidden flex items-center justify-center select-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#141416_1px,transparent_1px),linear-gradient(to_bottom,#141416_1px,transparent_1px)] bg-[size:12px_12px] opacity-40" />
            <svg width="140" height="90" viewBox="0 0 140 90" fill="none" className="relative z-10">
              <path d="M20 70 Q40 20 70 45 T120 25" stroke="url(#wb-grad-card)" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M30 30 L50 60 L80 35 L110 65" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" fill="none" />
              <circle cx="20" cy="70" r="3" fill="#f43f5e" className="animate-pulse" />
              <circle cx="70" cy="45" r="3" fill="#3b82f6" />
              <circle cx="120" cy="25" r="3" fill="#10b981" />
              <defs>
                <linearGradient id="wb-grad-card" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-2 right-2 border border-zinc-800 rounded px-1.5 py-0.5 bg-[#0f0f12] text-[7px] text-zinc-500 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE</span>
            </div>
          </div>
        );

      default:
        return <div className="w-full aspect-video bg-zinc-900" />;
    }
  };

  return (
    <div
      onMouseEnter={() => triggerSound(720, "sine", 0.04)}
      className={`group rounded-xl border flex flex-col overflow-hidden transition-all duration-300 ${cardBorder}`}
    >
      {renderCardGraphic(project.id)}

      <div className="p-4 flex flex-col flex-1 justify-between gap-4">
        <div className="flex flex-col gap-1.5 text-left">
          <div className="flex items-center justify-between">
            <h3 className={`text-sm font-bold tracking-tight transition-colors duration-300 ${textTitle}`}>
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-zinc-400 select-none">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerSound(480, "triangle", 0.1)}
                  className={`transition-colors cursor-pointer hover:text-sky-500`}
                  title="Visit website"
                >
                  <GlobeIcon />
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerSound(480, "triangle", 0.1)}
                className={`transition-colors cursor-pointer hover:text-sky-500`}
                title="View GitHub repository"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>

          <p className="text-xs leading-normal font-medium">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-1 select-none">
          <div className={`flex items-center gap-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full border ${statusRunningBg}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span>{project.status}</span>
          </div>

          <div className="flex items-center gap-1">
            {project.techStack.map((tech) => (
              <div
                key={tech}
                className={`p-1 rounded-md border text-[9px] flex items-center justify-center transition-colors duration-300 ${badgeTech}`}
                title={tech.toUpperCase()}
              >
                {renderTechIcon(tech)}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
