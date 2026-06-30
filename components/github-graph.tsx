"use client";

import React, { useState, useEffect } from "react";
import { useThemeSound } from "./theme-sound-provider";

interface ContributionDay {
  count: number;
  date: string;
  level: number; // 0-4
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export default function GitHubGraph() {
  const { isDark, triggerSound } = useThemeSound();
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/github/contributions")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (active && json && !json.error) {
          setData(json);
        }
        if (active) setLoading(false);
      })
      .catch(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Generate month labels from real data
  const getMonthLabels = () => {
    if (!data || data.weeks.length === 0) return [];
    const labels: { name: string; col: number }[] = [];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    let lastMonth = -1;

    for (let i = 0; i < data.weeks.length; i++) {
      const firstDay = data.weeks[i].days[0];
      if (!firstDay) continue;
      const d = new Date(firstDay.date);
      const month = d.getMonth();
      if (month !== lastMonth) {
        labels.push({ name: months[month], col: i });
        lastMonth = month;
      }
    }
    return labels;
  };

  const getContributionsText = (count: number) => {
    if (count === 0) return "No contributions";
    if (count === 1) return "1 contribution";
    return `${count} contributions`;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Skeleton loading state
  if (loading) {
    return (
      <section className="flex flex-col gap-3.5 mt-2">
        <div className="w-full select-none pb-1 overflow-x-auto scrollbar-none">
          <div className="w-full flex flex-col gap-1.5 min-w-[600px] sm:min-w-0 pr-1">
            <div className="h-4" />
            <div className="flex gap-[2px] w-full">
              {Array.from({ length: 53 }).map((_, colIdx) => (
                <div key={colIdx} className="flex-1 flex flex-col gap-[2px]">
                  {Array.from({ length: 7 }).map((_, rowIdx) => (
                    <div
                      key={rowIdx}
                      className={`w-full aspect-square rounded-[2px] animate-pulse ${
                        isDark ? "bg-zinc-800/50" : "bg-zinc-200/50"
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full text-[11px] font-mono tracking-wide text-zinc-500 mt-0.5 select-none">
          <div className="h-3 w-36 rounded bg-secondary animate-pulse" />
          <div className="h-3 w-24 rounded bg-secondary animate-pulse" />
        </div>
      </section>
    );
  }

  // Fallback if fetch failed
  if (!data) {
    return (
      <section className="flex flex-col gap-3.5 mt-2">
        <div className="text-center text-xs py-8 font-mono text-zinc-500">
          Unable to load contribution data.
        </div>
      </section>
    );
  }

  const monthLabels = getMonthLabels();

  return (
    <section className="flex flex-col gap-3.5 mt-2">
      {/* Heatmap Outer Wrapper */}
      <div className="w-full select-none pb-1 overflow-x-auto scrollbar-none">
        <div className="w-full flex flex-col gap-1.5 min-w-[600px] sm:min-w-0 pr-1">
          
          {/* Month Labels Bar */}
          <div className="flex w-full text-[9px] text-zinc-500 font-mono tracking-wide">
            {data.weeks.map((week, colIdx) => {
              const label = monthLabels.find((m) => m.col === colIdx);
              return (
                <div key={colIdx} className="flex-1 min-w-0">
                  {label ? <span>{label.name}</span> : null}
                </div>
              );
            })}
          </div>

          {/* Grid Body - each week is a column, each day is a row */}
          <div className="flex gap-[2px] w-full">
            {data.weeks.map((week, colIdx) => (
              <div key={colIdx} className="flex-1 flex flex-col gap-[2px]">
                {week.days.map((day, rowIdx) => {
                  const level = day.level;
                  let cellColor = "";
                  if (isDark) {
                    if (level === 0) cellColor = "bg-[#111113]/70 hover:bg-[#1a1a1e]";
                    else if (level === 1) cellColor = "bg-[#27272a]/95 hover:bg-[#3f3f46]";
                    else if (level === 2) cellColor = "bg-[#52525b]/95 hover:bg-[#71717a]";
                    else if (level === 3) cellColor = "bg-[#a1a1aa]/95 hover:bg-[#d4d4d8]";
                    else cellColor = "bg-[#ffffff] shadow-sm shadow-white/30";
                  } else {
                    if (level === 0) cellColor = "bg-[#f4f4f5] hover:bg-[#e4e4e7]";
                    else if (level === 1) cellColor = "bg-[#e4e4e7] hover:bg-[#d4d4d8]";
                    else if (level === 2) cellColor = "bg-[#a1a1aa] hover:bg-[#71717a]";
                    else if (level === 3) cellColor = "bg-[#52525b] hover:bg-[#3f3f46]";
                    else cellColor = "bg-[#09090b] shadow-sm shadow-black/10";
                  }

                  return (
                    <div
                      key={rowIdx}
                      className={`w-full aspect-square rounded-[2px] cursor-help transition-all duration-150 relative group ${cellColor}`}
                      onMouseEnter={() => triggerSound(880, "sine", 0.02)}
                    >
                      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none z-50 px-2 py-1 text-[9px] font-mono whitespace-nowrap rounded border shadow-xl ${
                        isDark 
                          ? "bg-[#0e0e11] text-zinc-150 border-zinc-800" 
                          : "bg-white text-zinc-800 border-zinc-200"
                      }`}>
                        <span className="font-semibold">{getContributionsText(day.count)}</span> on {formatDate(day.date)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Heatmap Footer */}
      <div className="flex items-center justify-between w-full text-[11px] font-mono tracking-wide text-zinc-500 mt-0.5 select-none">
        <span>{data.totalContributions.toLocaleString()} contributions in the last year</span>
        
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="flex gap-[3px]">
            {[0, 1, 2, 3, 4].map((lvl) => {
              let lvlColor = "";
              if (isDark) {
                if (lvl === 0) lvlColor = "bg-[#111113]";
                else if (lvl === 1) lvlColor = "bg-[#27272a]";
                else if (lvl === 2) lvlColor = "bg-[#52525b]";
                else if (lvl === 3) lvlColor = "bg-[#a1a1aa]";
                else lvlColor = "bg-[#ffffff]";
              } else {
                if (lvl === 0) lvlColor = "bg-[#f4f4f5]";
                else if (lvl === 1) lvlColor = "bg-[#e4e4e7]";
                else if (lvl === 2) lvlColor = "bg-[#a1a1aa]";
                else if (lvl === 3) lvlColor = "bg-[#52525b]";
                else lvlColor = "bg-[#09090b]";
              }
              return (
                <div
                  key={lvl}
                  className={`w-[10px] h-[10px] rounded-[2px] border ${lvlColor} ${
                    isDark ? "border-transparent" : "border-zinc-200/50"
                  }`}
                />
              );
            })}
          </div>
          <span>More</span>
        </div>
      </div>
    </section>
  );
}
