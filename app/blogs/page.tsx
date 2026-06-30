"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useThemeSound } from "../../components/theme-sound-provider";
import Nav from "../../components/nav";
import ContactSection from "../../components/contact-section";

interface Blog {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readMoreUrl: string;
  category: string; // Used for filter pills
}

// --- Icons ---
const CalendarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function BlogsPage() {
  const { bgMain, textTitle, triggerSound, bgBadge } = useThemeSound();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredBlog, setHoveredBlog] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const blogsList: Blog[] = [
    {
      id: "tech-stack-journey",
      title: "From Hello World to Full Stack: My Tech Stack Journey as a CSE Student",
      description: "2024 batch. From Kutch. Didn't know how to code. Now shipping real projects. This is my story — no filter.",
      date: "June 29, 2026",
      tags: ["CSE", "WebDev", "FullStack", "CodingJourney"],
      category: "Personal",
      readMoreUrl: "/blogs/tech-stack-journey",
    },
  ];

  // Sound handler for hovers
  const handleHoverStart = (id: string) => {
    setHoveredBlog(id);
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

  const handleRowClick = (readMoreUrl: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) {
      return;
    }
    triggerSound(480, "triangle", 0.1);
    router.push(readMoreUrl);
  };

  // Extract unique categories and calculate counts
  const categories = ["All", "Personal"];
  const getCategoryCount = (cat: string) => {
    if (cat === "All") return blogsList.length;
    return blogsList.filter((b) => b.category === cat || b.tags.includes(cat)).length;
  };

  const filteredBlogs = activeCategory === "All"
    ? blogsList
    : blogsList.filter((b) => b.category === activeCategory || b.tags.includes(activeCategory));

  // --- Render custom high-fidelity graphic layouts for popover hover triggers ---
  const renderPopoverGraphic = (id: string) => {
    switch (id) {
      case "tech-stack-journey":
        return (
          <div className="w-full h-full relative overflow-hidden rounded-lg">
            <img
              src="/blog1.png"
              alt="Tech Stack Journey"
              className="w-full h-full object-fill"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start pt-0 pb-12 px-6 sm:px-8 transition-colors duration-300 ${bgMain}`}>
      <div className="w-full max-w-[700px] flex flex-col gap-10">
        
        {/* Navigation Bar */}
        <Nav />

        {/* Blog Header */}
        <section className="flex flex-col gap-2 select-text text-left">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Blog
          </h2>
          <p className="text-sm font-medium leading-relaxed text-muted-foreground max-w-[550px]">
            Thoughts, tutorials, and insights on engineering and programming.
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
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card text-muted-foreground border-border hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[9px] font-extrabold px-1 rounded-full ${
                    isSelected ? "bg-background/25 text-background" : "bg-secondary text-muted-foreground"
                  }`}>
                    {getCategoryCount(cat)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Blog List View */}
        <section className="flex flex-col select-text relative">
          {filteredBlogs.length > 0 ? (
            <div className="flex flex-col">
              {filteredBlogs.map((blog) => {
                const isHovered = hoveredBlog === blog.id;
                return (
                  <div
                    key={blog.id}
                    onClick={(e) => handleRowClick(blog.readMoreUrl, e)}
                    onMouseEnter={() => handleHoverStart(blog.id)}
                    onMouseLeave={() => setHoveredBlog(null)}
                    onMouseMove={handleMouseMove}
                    className={`relative flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-border/40 py-5 last:border-0 transition-all duration-150 px-2 rounded-lg group cursor-pointer gap-3 sm:gap-4 ${
                      isHovered
                        ? "z-[86] bg-card border-transparent shadow-md"
                        : "z-10"
                    }`}
                  >
                    {/* Left content details */}
                    <div className="flex flex-col gap-1.5 text-left sm:max-w-[78%]">
                      <h3 className={`text-base font-bold leading-snug tracking-tight transition-colors duration-200 ${textTitle}`}>
                        {blog.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-normal font-medium">
                        {blog.description}
                      </p>

                      <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-500 mt-1 select-none">
                        <span className="px-2 py-0.5 rounded border bg-secondary border-border">
                          {blog.tags[0]}
                        </span>
                        <div className="flex items-center">
                          <CalendarIcon />
                          <span>{blog.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right read link — full width tap target on mobile, inline on desktop */}
                    <a
                      href={blog.readMoreUrl}
                      onClick={() => triggerSound(480, "triangle", 0.1)}
                      className="text-xs font-bold transition-all duration-200 hover:text-sky-500 flex items-center gap-1 select-none animate-pulse hover:animate-none sm:shrink-0 w-fit"
                    >
                      <span>Read more</span>
                      <span>→</span>
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-xs py-16 font-mono text-zinc-500">
              No writeups found matching &quot;{activeCategory}&quot;.
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
        className={`fixed inset-0 z-[85] pointer-events-none transition-all duration-300 ${
          hoveredBlog 
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
          className={`w-48 h-32 rounded-lg border border-border bg-card shadow-2xl overflow-hidden hidden sm:block transition-all duration-200 ease-out origin-center ${
            hoveredBlog ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {hoveredBlog && renderPopoverGraphic(hoveredBlog)}
        </div>
      </div>

    </div>
  );
}
