"use client";

import React from "react";
import { useThemeSound } from "../../components/theme-sound-provider";
import Nav from "../../components/nav";
import ContactSection from "../../components/contact-section";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

interface ProjectItem {
  title: string;
  tech: string;
  period: string;
  bullets: string[];
}

export default function ResumePage() {
  const { bgMain, textTitle, borderHrLine, bgBadge, cardBorder, triggerSound } = useThemeSound();

  const experiences: ExperienceItem[] = [
    {
      role: "Freelance Web Developer",
      company: "Insight Association",
      period: "Dec 2025 – Jan 2026",
      bullets: [
        "Designed and developed a complete website for Insight Association as a freelance client project.",
        "Built a responsive frontend and delivered the project on schedule, gaining real-world industry experience.",
      ],
    },
  ];

  const projects: ProjectItem[] = [
    {
      title: "Collaborative Whiteboard",
      tech: "TypeScript, WebSockets",
      period: "Dec 2025 – Feb 2026",
      bullets: [
        "Built a real-time collaborative whiteboard enabling multiple users to draw and annotate simultaneously.",
        "Engineered WebSocket-based live sync for seamless, low-latency multi-user collaboration.",
      ],
    },
    {
      title: "Chatify",
      tech: "MongoDB, Express.js, React, Node.js",
      period: "June 2025 – Aug 2025",
      bullets: [
        "Developed a full-stack real-time chat application using the MERN stack with secure user authentication.",
        "Built a responsive UI with instant messaging powered by RESTful APIs and live session handling.",
      ],
    },
  ];

  const skillCategories = [
    { label: "Programming Languages", skills: "Python, Java, C" },
    { label: "Full Stack Development", skills: "HTML, CSS, JavaScript, React, Node.js, SQL" },
    { label: "Machine Learning", skills: "Supervised Learning, Data Preprocessing, Scikit-learn, Pandas, NumPy, Matplotlib" },
    { label: "Developer Tools", skills: "Git, GitHub, VS Code" },
    { label: "Languages Known", skills: "English, Hindi, Gujarati" },
  ];

  const achievements = [
    "Winner List — ROBOFEST 5.0 Robotics and Innovation Competition, organized by GUJCOST (21/03/2026).",
    "Earned 5 HackerRank Gold Badges in Java, Python, and Problem Solving.",
    "Solved 400+ Data Structures and Algorithms problems on LeetCode.",
    "50+ problems on HackerRank.",
    "Solved 100+ problems on GeeksforGeeks.",
  ];

  const certifications = [
    "ROBOFEST 5.0 Certificate — Robotics and Innovation Competition, GUJCOST.",
    "AI – Machine Learning Engineer Certificate Course, Reliance Foundation/Skillship (certified by NSDC).",
    "Certificate of Completion — Insight Association (real-world project experience).",
  ];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start pt-0 pb-12 px-6 sm:px-8 transition-colors duration-300 ${bgMain}`}>
      <div className="w-full max-w-[700px] flex flex-col gap-10">
        
        {/* Navigation Bar */}
        <Nav />

        {/* Resume Content */}
        <section className="flex flex-col gap-8 select-text text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
            <div className="flex flex-col">
              <h2 className="text-2xl font-serif tracking-tight font-extrabold text-foreground">
                Resume
              </h2>
              <span className="text-[13px] font-medium tracking-wide mt-1 text-muted-foreground">
                my professional timeline and experience
              </span>
            </div>

            <a
              href="/Nikunj_Sorathiya_Resume (1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                triggerSound(480, "triangle", 0.15);
              }}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4.5 py-1.5 sm:py-2 border rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer w-fit ${bgBadge}`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              <span>Print Resume</span>
            </a>
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-3">
            <h3 className={`text-base font-bold tracking-wide transition-colors duration-300 ${textTitle}`}>
              Summary
            </h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              B.Tech Computer Science Engineering student at Parul University with hands-on experience in Full Stack Web Development,
              building real-time applications using HTML, CSS, JavaScript, React, and Node.js. Proficient in Python, Java, and C, with
              exposure to Machine Learning and AI concepts. Passionate about solving real-world problems through code, with a focus on creating
              clean, efficient, and user-friendly web applications, with practical freelance experience delivering client projects.
            </p>
          </div>

          <hr className={`w-full border-t transition-colors duration-300 ${borderHrLine}`} />

          {/* Education */}
          <div className="flex flex-col gap-4">
            <h3 className={`text-base font-bold tracking-wide transition-colors duration-300 ${textTitle}`}>
              Education
            </h3>
            <div className={`border rounded-xl p-4 flex flex-col gap-1.5 ${cardBorder}`}>
              <div className="flex items-center justify-between flex-wrap gap-1">
                <h4 className={`text-sm font-bold leading-none ${textTitle}`}>
                  Parul University
                </h4>
                <span className="text-[11px] font-bold text-zinc-500 font-mono">
                  June 2023 – Present
                </span>
              </div>
              <span className="text-[11px] text-zinc-500 font-medium">
                Vadodara, Gujarat
              </span>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                B.Tech in Computer Science Engineering &bull; CGPA: 8.98 / 10.00
              </p>
            </div>
          </div>

          <hr className={`w-full border-t transition-colors duration-300 ${borderHrLine}`} />

          {/* Work Experience */}
          <div className="flex flex-col gap-6">
            <h3 className={`text-base font-bold tracking-wide transition-colors duration-300 ${textTitle}`}>
              Experience
            </h3>

            <div className="flex flex-col gap-5 border-l-2 border-border pl-5 ml-1">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative flex flex-col gap-1.5">
                  <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-border border-2 border-background" />
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <h4 className={`text-sm font-bold leading-none ${textTitle}`}>
                      {exp.role} <span className="text-zinc-500 font-medium">@ {exp.company}</span>
                    </h4>
                    <span className="text-[11px] font-bold text-zinc-500 font-mono">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-muted-foreground leading-relaxed flex flex-col gap-1 mt-1">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <hr className={`w-full border-t transition-colors duration-300 ${borderHrLine}`} />

          {/* Projects */}
          <div className="flex flex-col gap-6">
            <h3 className={`text-base font-bold tracking-wide transition-colors duration-300 ${textTitle}`}>
              Projects
            </h3>

            <div className="flex flex-col gap-5 border-l-2 border-border pl-5 ml-1">
              {projects.map((proj, idx) => (
                <div key={idx} className="relative flex flex-col gap-1.5">
                  <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-border border-2 border-background" />
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <h4 className={`text-sm font-bold leading-none ${textTitle}`}>
                      {proj.title} <span className="text-zinc-500 font-medium text-[11px]">| {proj.tech}</span>
                    </h4>
                    <span className="text-[11px] font-bold text-zinc-500 font-mono">
                      {proj.period}
                    </span>
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-muted-foreground leading-relaxed flex flex-col gap-1 mt-1">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <hr className={`w-full border-t transition-colors duration-300 ${borderHrLine}`} />

          {/* Technical Skills */}
          <div className="flex flex-col gap-4">
            <h3 className={`text-base font-bold tracking-wide transition-colors duration-300 ${textTitle}`}>
              Technical Skills
            </h3>
            <div className="flex flex-col gap-3">
              {skillCategories.map((cat) => (
                <div key={cat.label} className="flex flex-col gap-1.5">
                  <span className={`text-xs font-bold ${textTitle}`}>{cat.label}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.split(", ").map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-bold px-2.5 py-1 bg-secondary text-muted-foreground border border-border rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className={`w-full border-t transition-colors duration-300 ${borderHrLine}`} />

          {/* Achievements */}
          <div className="flex flex-col gap-4">
            <h3 className={`text-base font-bold tracking-wide transition-colors duration-300 ${textTitle}`}>
              Achievements
            </h3>
            <ul className="list-disc list-outside pl-4 text-xs text-muted-foreground leading-relaxed flex flex-col gap-1.5">
              {achievements.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>
          </div>

          <hr className={`w-full border-t transition-colors duration-300 ${borderHrLine}`} />

          {/* Certifications */}
          <div className="flex flex-col gap-4">
            <h3 className={`text-base font-bold tracking-wide transition-colors duration-300 ${textTitle}`}>
              Certifications
            </h3>
            <ul className="list-disc list-outside pl-4 text-xs text-muted-foreground leading-relaxed flex flex-col gap-1.5">
              {certifications.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>

        </section>

        {/* Divider before footer */}
        <hr className="w-full border-t border-dashed mt-2 transition-colors duration-300 border-border" />

        {/* Footer section */}
        <ContactSection />

      </div>

    </div>
  );
}
