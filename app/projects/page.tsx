"use client";
import React, { useState, useRef } from "react";
import { useThemeSound } from "../../components/theme-sound-provider";
import Nav from "../../components/nav";
import ContactSection from "../../components/contact-section";
interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
  category: string;
}

// --- Icons ---
const GlobeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function ProjectsPage() {
  const { bgMain, textTitle, triggerSound, bgBadge } = useThemeSound();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const projectsList: Project[] = [
    {
      id: "travel-loop",
      title: "TravelLoop",
      description: "Interactive travel community platform to share itineraries, discover destinations, and connect with other travelers.",
      status: "Running",
      githubUrl: "https://github.com/Nikunj-1812/TravelLoop",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      category: "Full Stack",
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
    {
      id: "cinematch",
      title: "Cinematch",
      description: "Movie recommendation and discovery engine offering personalized film suggestions based on user preferences.",
      status: "Running",
      githubUrl: "https://github.com/Nikunj-1812/Cinematch",
      techStack: ["React", "CSS", "TMDB API"],
      category: "Frontend",
    },
    {
      id: "uber-clone",
      title: "Uber Clone",
      description: "Full-featured ride-sharing clone with real-time driver tracking, map navigation, and payment gateway integration.",
      status: "Running",
      githubUrl: "https://github.com/Nikunj-1812/Uber-Clone",
      techStack: ["React Native", "Firebase", "Node.js"],
      category: "Full Stack",
    },
    {
      id: "collaborative-whiteboard",
      title: "Collaborative Whiteboard",
      description: "Real-time collaborative whiteboard enabling multiple users to draw and annotate simultaneously with WebSocket-based live sync.",
      status: "Running",
      githubUrl: "https://github.com/Nikunj-1812/Collabrative-WhiteBoard",
      techStack: ["TypeScript", "WebSockets"],
      category: "Full Stack",
    },
    {
      id: "chatify",
      title: "Chatify",
      description: "Full-stack real-time chat application using the MERN stack with secure user authentication and instant messaging.",
      status: "Running",
      githubUrl: "https://github.com/Nikunj-1812/Chatify",
      techStack: ["MongoDB", "Express.js", "React", "Node.js"],
      category: "Full Stack",
    },
  ];

  // Sound handler for hovers
  const handleHoverStart = (id: string) => {
    setHoveredProject(id);
    triggerSound(720, "sine", 0.03);
  };

  // Mouse move handler to translate position instantly
  const handleMouseMove = (e: React.MouseEvent) => {
    if (popoverRef.current) {
      const x = e.clientX + 20;
      const y = e.clientY - 70;
      popoverRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };

  // Categories list and counter utilities
  const categories = ["All", "Full Stack", "AI / ML", "Frontend"];
  const getCategoryCount = (cat: string) => {
    if (cat === "All") return projectsList.length;
    return projectsList.filter((p) => p.category === cat).length;
  };

  const filteredProjects = activeCategory === "All"
    ? projectsList
    : projectsList.filter((p) => p.category === activeCategory);

  // --- Render custom high-fidelity vector graphics for project hovers ---
  const renderPopoverGraphic = (id: string) => {
    switch (id) {
      case "travel-loop":
        return (
          <div className="w-full h-full relative overflow-hidden rounded-lg">
            <img
              src="/travelloop.png"
              alt="TravelLoop"
              className="w-full h-full object-fill"
            />
          </div>
        );

      case "gesture-os-ai":
        return (
          <div className="w-full h-full relative overflow-hidden rounded-lg">
            <img
              src="/GestureOS.png"
              alt="GestureOS AI"
              className="w-full h-full object-fill"
            />
          </div>
        );
      case "cinematch":
        return (
          <div className="w-full h-full relative overflow-hidden rounded-lg">
            <img
              src="/cinematch.png"
              alt="Cinematch"
              className="w-full h-full object-fill"
            />
          </div>
        );
      case "uber-clone":
        return (
          <div className="w-full h-full relative overflow-hidden rounded-lg">
            <img
              src="/uberclone.png"
              alt="Uber Clone"
              className="w-full h-full object-fill"
            />
          </div>
        );
      case "collaborative-whiteboard":
        return (
          <div className="w-full h-full bg-[#070708] relative overflow-hidden flex items-center justify-center border border-zinc-800 rounded-lg">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#141416_1px,transparent_1px),linear-gradient(to_bottom,#141416_1px,transparent_1px)] bg-[size:12px_12px] opacity-40" />
            <svg width="140" height="90" viewBox="0 0 140 90" fill="none" className="relative z-10">
              <path d="M20 70 Q40 20 70 45 T120 25" stroke="url(#wb-grad)" strokeWidth="2" strokeLinecap="round" fill="none" />
              <path d="M30 30 L50 60 L80 35 L110 65" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" fill="none" />
              <circle cx="20" cy="70" r="3" fill="#f43f5e" className="animate-pulse" />
              <circle cx="70" cy="45" r="3" fill="#3b82f6" />
              <circle cx="120" cy="25" r="3" fill="#10b981" />
              <defs>
                <linearGradient id="wb-grad" x1="0" y1="0" x2="1" y2="0">
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
      case "chatify":
        return (
          <div className="w-full h-full relative overflow-hidden rounded-lg">
            <img
              src="/chatify.png"
              alt="Chatify"
              className="w-full h-full object-fill"
            />
          </div>
        );
      default:
        return null;
    }
  };


  const handleRowClick = (githubUrl: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) {
      return;
    }
    triggerSound(480, "triangle", 0.1);
    window.open(githubUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <div className={`min-h-screen flex flex-col items-center justify-start pt-0 pb-12 px-6 sm:px-8 transition-colors duration-300 ${bgMain}`}>
      <div className="w-full max-w-[700px] flex flex-col gap-10">

        {/* Navigation Bar */}
        <Nav />

        {/* Projects Header */}
        <section className="flex flex-col gap-2 select-text text-left">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Projects
          </h2>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground max-w-[550px]">
            A curated list of applications and open-source contributions I&apos;ve built.
          </p>
        </section>

        {/* Filter Pills Slider */}
        <div className="w-full overflow-x-auto pb-1 -mt-2 scrollbar-none select-none">
          <div className="flex items-center gap-2 whitespace-nowrap min-w-max">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    triggerSound(680, "sine", 0.05);
                  }}
                  onMouseEnter={() => triggerSound(840, "sine", 0.02)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${isSelected
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-accent"
                    }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[9px] font-extrabold px-1 rounded-full ${isSelected ? "bg-background/25 text-background" : "bg-secondary text-muted-foreground"
                    }`}>
                    {getCategoryCount(cat)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects List View */}
        <section className="flex flex-col select-text relative">
          {filteredProjects.length > 0 ? (
            <div className="flex flex-col">
              {filteredProjects.map((project) => {
                const isHovered = hoveredProject === project.id;
                return (
                  <div
                    key={project.id}
                    onClick={(e) => handleRowClick(project.githubUrl, e)}
                    onMouseEnter={() => handleHoverStart(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    onMouseMove={handleMouseMove}
                    className={`relative flex items-center justify-between border-b border-border/40 py-5 last:border-0 transition-all duration-150 px-2 rounded-lg group ${isHovered
                      ? "z-[86] bg-card border-transparent shadow-md"
                      : "z-10"
                      }`}
                  >
                    {/* Left content details */}
                    <div className="flex flex-col gap-1.5 text-left max-w-[78%]">
                      <h3 className={`text-base font-bold leading-snug tracking-tight transition-colors duration-200 ${textTitle}`}>
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-normal font-medium">
                        {project.description}
                      </p>

                      <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-500 mt-1 select-none">
                        <span className="px-2 py-0.5 rounded border bg-secondary border-border">
                          {project.techStack.join(" / ")}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${project.status === "Building" ? "bg-amber-500" : "bg-emerald-500"} animate-pulse`} />
                          <span>{project.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right read/live link */}
                    <a
                      href={project.liveUrl || project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => triggerSound(480, "triangle", 0.1)}
                      className="text-xs font-bold transition-all duration-200 hover:text-sky-500 flex items-center gap-0.5 select-none"
                    >
                      {project.liveUrl ? (
                        <>
                          <GlobeIcon />
                          <span>Live link</span>
                        </>
                      ) : (
                        <span>Code</span>
                      )}
                      <span>→</span>
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-xs py-16 font-mono text-zinc-500">
              No builds found matching &quot;{activeCategory}&quot;.
            </div>
          )}
        </section>

        {/* Divider before footer */}
        <hr className="w-full border-t border-dashed mt-2 transition-colors duration-300 border-border" />

        {/* Footer section */}
        <ContactSection />

      </div>

      {/* Subtle full-page backdrop blur behind the cursor popover */}
      <div
        className={`fixed inset-0 z-[85] pointer-events-none transition-all duration-300 ${hoveredProject
          ? "backdrop-blur-[1.5px] bg-black/5 dark:bg-black/10 opacity-100"
          : "backdrop-blur-0 bg-transparent opacity-0"
          }`}
      />

      {/* Floating Glide Popover Preview Card with Entrance Animation */}
      <div
        ref={popoverRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 90,
          transform: "translate3d(-200px, -200px, 0)", // Initial off-screen
        }}
      >
        <div
          className={`w-48 h-32 rounded-lg border border-border bg-card shadow-2xl overflow-hidden hidden sm:block transition-all duration-200 ease-out origin-center ${hoveredProject ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
        >
          {hoveredProject && renderPopoverGraphic(hoveredProject)}
        </div>
      </div>

    </div>
  );
}
