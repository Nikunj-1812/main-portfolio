import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHHUB_API;

  if (!token) {
    return NextResponse.json(
      { error: "GitHub API token (GITHHUB_API) not found in env." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token.trim()}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "NextJS-Portfolio-App",
      },
      next: { revalidate: 3600 }, // Cache response for 1 hour
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: `GitHub API responded with status ${res.status}: ${errorText}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      login: data.login,
      name: data.name,
      avatar_url: "/profile_img.jpeg",
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      html_url: data.html_url,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch GitHub user data" },
      { status: 500 }
    );
  }
}
