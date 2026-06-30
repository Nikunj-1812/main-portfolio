import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHHUB_API;

  if (!token) {
    return NextResponse.json(
      { error: "GitHub API token not found." },
      { status: 500 }
    );
  }

  const query = `
    query {
      viewer {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token.trim()}`,
        "Content-Type": "application/json",
        "User-Agent": "NextJS-Portfolio-App",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: `GitHub GraphQL API error ${res.status}: ${errorText}` },
        { status: res.status }
      );
    }

    const json = await res.json();

    if (json.errors) {
      return NextResponse.json(
        { error: json.errors[0]?.message || "GraphQL query failed" },
        { status: 500 }
      );
    }

    const calendar =
      json.data?.viewer?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return NextResponse.json(
        { error: "No contribution data found" },
        { status: 500 }
      );
    }

    // Map contributionLevel strings to numeric levels 0-4
    const levelMap: Record<string, number> = {
      NONE: 0,
      FIRST_QUARTILE: 1,
      SECOND_QUARTILE: 2,
      THIRD_QUARTILE: 3,
      FOURTH_QUARTILE: 4,
    };

    const weeks = calendar.weeks.map(
      (week: { contributionDays: { contributionCount: number; date: string; contributionLevel: string }[] }) => ({
        days: week.contributionDays.map(
          (day: { contributionCount: number; date: string; contributionLevel: string }) => ({
            count: day.contributionCount,
            date: day.date,
            level: levelMap[day.contributionLevel] ?? 0,
          })
        ),
      })
    );

    return NextResponse.json({
      totalContributions: calendar.totalContributions,
      weeks,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}
