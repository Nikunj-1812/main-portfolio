"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useThemeSound } from "../components/theme-sound-provider";
import Nav from "../components/nav";
import Header from "../components/header";
import GitHubGraph from "../components/github-graph";
import ProjectCard from "../components/project-card";
import BlogCard from "../components/blog-card";
import ContactSection from "../components/contact-section";

// --- Hero Inline Icons ---

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const MessageBubbleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// --- Tech Stack Badge Icons ---

const PythonLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm-.5 3h1c2.76 0 5 1.57 5 3.5V9H8V6.5C8 4.57 8.74 3 11.5 3zM7 10h10v4.5c0 1.93-2.24 3.5-5 3.5h-1c-2.76 0-4.5-1.57-4.5-3.5V10zm3.5 1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4-6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
  </svg>
);

const JavaLogo = () => (
  <div className="w-[12px] h-[12px] bg-[#f89820] text-[7px] flex items-center justify-center font-extrabold text-white rounded-[1.5px] select-none font-sans leading-none">
    J
  </div>
);

const CLogo = () => (
  <div className="w-[12px] h-[12px] bg-[#a8b9cc] text-[8px] flex items-center justify-center font-extrabold text-[#283593] rounded-[1.5px] select-none font-sans leading-none">
    C
  </div>
);

const HTMLLogo = () => (
  <div className="w-[12px] h-[12px] bg-[#e34f26] text-[6.5px] flex items-center justify-center font-extrabold text-white rounded-[1.5px] select-none font-sans leading-none">
    H
  </div>
);

const CSSLogo = () => (
  <div className="w-[12px] h-[12px] bg-[#264de4] text-[6.5px] flex items-center justify-center font-extrabold text-white rounded-[1.5px] select-none font-sans leading-none">
    C
  </div>
);

const JavaScriptLogo = () => (
  <div className="w-[12px] h-[12px] bg-[#f7df1e] text-[8px] flex items-center justify-center font-bold text-black rounded-[1.5px] select-none font-sans leading-none">
    JS
  </div>
);

const TypeScriptLogo = () => (
  <div className="w-[12px] h-[12px] bg-[#007acc] text-[8px] flex items-center justify-center font-bold text-white rounded-[1.5px] select-none font-sans leading-none">
    TS
  </div>
);

const ReactLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00d8ff" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="2" fill="#00d8ff" />
  </svg>
);

const NodejsLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L1.75 5.92v11.83L12 23.67l10.25-5.92V5.92L12 0zm-1.12 18.84v-4.99L6.5 11.23v2.64l4.38 4.97zm1.12-6.52V7.33l4.38 4.97v2.64l-4.38-2.62zm5.5-2.32L12 4.41l5.5 3.19v2.42z" />
  </svg>
);

const ExpressLogo = () => (
  <div className="w-[14px] h-[9px] bg-zinc-800 text-[6.5px] flex items-center justify-center font-bold text-zinc-150 rounded-[1.5px] font-sans leading-none">
    EX
  </div>
);

const MongoDBLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.19 12.35c-.96-3.86-4.31-7.85-4.7-8.29-.25-.28-.73-.28-.98 0-.39.44-3.74 4.43-4.7 8.29-.65 2.62.15 4.88 1.45 6.13.75.72 1.83 1.13 2.99 1.14v3.52c0 .48.39.87.87.87.48 0 .87-.39.87-.87v-3.52c1.16-.01 2.24-.42 2.99-1.14 1.3-1.25 2.1-3.51 1.45-6.13zm-5.19 5.56v-12.7c.07.09 1.87 2.37 2.51 5.92.51 2.82-.41 5.41-2.51 6.78z" />
  </svg>
);

const SQLLogo = () => (
  <div className="w-[14px] h-[10px] bg-[#00758f] text-[7px] flex items-center justify-center font-extrabold text-white rounded-[1.5px] select-none font-sans leading-none tracking-tight">
    SQ
  </div>
);

const GitLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f05032">
    <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.66 2.66c.645-.222 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.72.719-1.885.719-2.604 0-.54-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.713.721-1.88.721-2.593 0-.713-.717-.713-1.879 0-2.6.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
  </svg>
);

const PandasLogo = () => (
  <div className="w-[14px] h-[10px] bg-[#150458] text-[7px] flex items-center justify-center font-extrabold text-white rounded-[1.5px] select-none font-sans leading-none tracking-tight">
    PD
  </div>
);

const NumPyLogo = () => (
  <div className="w-[14px] h-[10px] bg-[#4dabcf] text-[7px] flex items-center justify-center font-extrabold text-white rounded-[1.5px] select-none font-sans leading-none tracking-tight">
    NP
  </div>
);

const ScikitLogo = () => (
  <div className="w-[14px] h-[10px] bg-[#f7931e] text-[7px] flex items-center justify-center font-extrabold text-white rounded-[1.5px] select-none font-sans leading-none tracking-tight">
    SK
  </div>
);

const MatplotlibLogo = () => (
  <div className="w-[14px] h-[10px] bg-[#11557c] text-[6px] flex items-center justify-center font-extrabold text-white rounded-[1.5px] select-none font-sans leading-none tracking-tight">
    MP
  </div>
);

const WebSocketLogo = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19l4-4m0 0l4 4m-4-4V5" />
    <path d="M20 5l-4 4m0 0l-4-4m4 4v10" />
  </svg>
);

export default function Home() {
  const { bgMain, bgBadge, isDark, triggerSound } = useThemeSound();

  const [ghProfile, setGhProfile] = useState<{
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    public_repos: number;
    followers: number;
    html_url: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/github")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data && !data.error) setGhProfile(data);
      })
      .catch(() => { });
    return () => { active = false; };
  }, []);

  const techStackList = [
    { name: "Python", icon: <PythonLogo /> },
    { name: "Java", icon: <JavaLogo /> },
    { name: "C", icon: <CLogo /> },
    { name: "HTML", icon: <HTMLLogo /> },
    { name: "CSS", icon: <CSSLogo /> },
    { name: "JavaScript", icon: <JavaScriptLogo /> },
    { name: "TypeScript", icon: <TypeScriptLogo /> },
    { name: "React", icon: <ReactLogo /> },
    { name: "Node.js", icon: <NodejsLogo /> },
    { name: "Express", icon: <ExpressLogo /> },
    { name: "MongoDB", icon: <MongoDBLogo /> },
    { name: "SQL", icon: <SQLLogo /> },
    { name: "Git", icon: <GitLogo /> },
    { name: "WebSockets", icon: <WebSocketLogo /> },
    { name: "Pandas", icon: <PandasLogo /> },
    { name: "NumPy", icon: <NumPyLogo /> },
    { name: "Scikit-learn", icon: <ScikitLogo /> },
    { name: "Matplotlib", icon: <MatplotlibLogo /> },
  ];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start pt-0 pb-12 px-6 sm:px-8 transition-colors duration-300 ${bgMain}`}>
      <div className="w-full max-w-[700px] flex flex-col gap-10">

        {/* Navigation Bar */}
        <Nav />

        {/* Profile Card Header */}
        <Header />

        {/* Hero Body Paragraphs */}
        <section className="flex flex-col gap-6 text-[15px] leading-relaxed tracking-[0.015em] select-text text-left">

          {/* Paragraph 1 */}
          <p className="transition-colors duration-300">
            hi, i&apos;m <span className="text-[#e2a85c] font-semibold dark:text-[#f4b66b]">nikunj</span> — a full-stack developer &amp;{" "}
            ai-ml enthusiast.
          </p>

          {/* Paragraph 2 */}
          <p className="transition-colors duration-300">
            i build cool stuff with tech i like, <span className="font-semibold text-foreground">always shipping</span>{" "}
            <a
              href={ghProfile?.html_url || "https://github.com/Nikunj-1812"}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => triggerSound(760, "sine", 0.04)}
              onClick={() => triggerSound(480, "triangle", 0.12)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${bgBadge}`}
            >
              <GitHubIcon /> {ghProfile?.login || "Nikunj-1812"}
            </a>
            {ghProfile && (
              <span className="ml-2 text-[10px] font-mono text-muted-foreground">
                {ghProfile.public_repos} repos · {ghProfile.followers} followers
              </span>
            )}
          </p>

          {/* Paragraph 3 */}
          <p className="transition-colors duration-300">
            got an idea worth building? <span className="font-semibold text-foreground">let&apos;s chat</span>{" "}
            <a
              href="https://x.com/Nikunj_1812_"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => triggerSound(760, "sine", 0.04)}
              onClick={() => triggerSound(480, "triangle", 0.12)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${bgBadge}`}
            >
              <MessageBubbleIcon /> Twitter DM
            </a>
            <span className="mx-2 text-[10px] font-bold text-muted-foreground">OR</span>
            <a
              href="mailto:nikunjsorathiya712@gmail.com"
              onMouseEnter={() => triggerSound(760, "sine", 0.04)}
              onClick={() => triggerSound(480, "triangle", 0.12)}
              className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${bgBadge}`}
            >
              <EnvelopeIcon /> Email me
            </a>
          </p>
        </section>

        {/* GitHub Graph Activity Grid */}
        <GitHubGraph />

        {/* Divider 1 */}
        <hr className="w-full border-t border-dashed mt-2 transition-colors duration-300 border-border" />

        {/* Tech Stack Section */}
        <section className="flex flex-col gap-2 select-text">
          <div className="flex flex-col select-text text-left">
            <h2 className="text-2xl font-serif tracking-tight font-extrabold text-foreground">
              Tech Stack
            </h2>
            <span className="text-[13px] font-medium tracking-wide mt-1 text-muted-foreground">
              the tech arsenal behind my builds!
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5 mt-5 select-none">
            {techStackList.map((tech) => (
              <div
                key={tech.name}
                onMouseEnter={() => triggerSound(840, "sine", 0.02)}
                className="flex items-center gap-2.5 px-3 py-1.5 border rounded-lg text-xs font-semibold transition-all duration-250 cursor-pointer shadow-sm hover:scale-103 hover:-translate-y-[1px] bg-card border-border hover:bg-accent text-foreground hover:text-foreground"
                title={`Skills: ${tech.name}`}
              >
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>

        </section>

        {/* Divider 2 */}
        <hr className="w-full border-t border-dashed mt-2 transition-colors duration-300 border-border" />

        {/* Projects Section (with redirect) */}
        <section className="flex flex-col gap-6 select-text text-left">
          <h2 className="text-2xl font-serif tracking-tight font-extrabold text-foreground">
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                id: "travel-loop",
                title: "TravelLoop",
                description: "Interactive travel community platform to share itineraries, discover destinations, and connect with other travelers.",
                status: "Running",
                githubUrl: "https://github.com/Nikunj-1812/TravelLoop",
                techStack: ["next", "ts"],

              },
              {
                id: "gesture-os-ai",
                title: "GestureOS AI",
                description: "Gesture-based computer control system using computer vision and machine learning for hands-free OS navigation.",
                status: "Building",
                githubUrl: "https://github.com/Nikunj-1812/GestureOS-AI",
                techStack: ["Python", "OpenCV", "MediaPipe"],
                category: "AI / ML",
              },
            ].map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="flex justify-center mt-2 select-none">
            <Link
              href="/projects"
              onMouseEnter={() => triggerSound(760, "sine", 0.04)}
              onClick={() => triggerSound(480, "triangle", 0.12)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 border rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${bgBadge}`}
            >
              <span>View All</span>
              <span className="text-[10px] font-black">↗</span>
            </Link>
          </div>
        </section>

        {/* Divider 3 */}
        <hr className="w-full border-t border-dashed mt-2 transition-colors duration-300 border-border" />

        {/* Blogs Section (with redirect) */}
        <section className="flex flex-col gap-6 select-text text-left">
          <h2 className="text-2xl font-serif tracking-tight font-extrabold text-foreground">
            Blogs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                id: "tech-stack-journey",
                title: "From Hello World to Full Stack: My Tech Stack Journey as a CSE Student",
                description: "2024 batch. From Kutch. Didn't know how to code. Now shipping real projects. This is my story — no filter.",
                date: "29/06/2026",
                tags: ["CSE", "WebDev", "FullStack", "CodingJourney"],
                readMoreUrl: "/blogs/tech-stack-journey",
              },
            ].map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          <div className="flex justify-center mt-2 select-none">
            <Link
              href="/blogs"
              onMouseEnter={() => triggerSound(760, "sine", 0.04)}
              onClick={() => triggerSound(480, "triangle", 0.12)}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 border rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${bgBadge}`}
            >
              <span>View All</span>
              <span className="text-[10px] font-black">↗</span>
            </Link>
          </div>
        </section>

        {/* Divider 4 */}
        <hr className="w-full border-t border-dashed mt-2 transition-colors duration-300 border-border" />

        {/* Contact/CTA Section */}
        <ContactSection />

      </div>
    </div>
  );
}
