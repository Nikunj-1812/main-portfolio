import type { Metadata, Viewport } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeSoundProvider } from "../components/theme-sound-provider";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nikunjsorathiya.vercel.app";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // ── Core SEO ──
  title: {
    default: "Nikunj Sorathiya — Full-Stack Developer & AI-ML Enthusiast",
    template: "%s | Nikunj Sorathiya",
  },
  description:
    "Portfolio of Nikunj Sorathiya — a passionate Full-Stack Developer & AI-ML Enthusiast building modern web applications with React, Next.js, Python, and more.",
  keywords: [
    "Nikunj Sorathiya",
    "Full-Stack Developer",
    "AI ML Enthusiast",
    "Portfolio",
    "React",
    "Next.js",
    "Python",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Nikunj Sorathiya", url: siteUrl }],
  creator: "Nikunj Sorathiya",
  publisher: "Nikunj Sorathiya",

  // ── Robots / Indexing ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph (Facebook, LinkedIn, WhatsApp, etc.) ──
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nikunj Sorathiya — Portfolio",
    title: "Nikunj Sorathiya — Full-Stack Developer & AI-ML Enthusiast",
    description:
      "Explore the portfolio of Nikunj Sorathiya — a Full-Stack Developer & AI-ML Enthusiast crafting modern web experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nikunj Sorathiya — Full-Stack Developer & AI-ML Enthusiast",
        type: "image/png",
      },
    ],
  },

  // ── Twitter Card ──
  twitter: {
    card: "summary_large_image",
    title: "Nikunj Sorathiya — Full-Stack Developer & AI-ML Enthusiast",
    description:
      "Portfolio of Nikunj Sorathiya — building modern web apps with React, Next.js, Python & AI/ML.",
    images: ["/og-image.png"],
    creator: "@nikunjsorathiya",
  },

  // ── Icons ──
  icons: {
    icon: "/favicon.ico",
  },

  // ── Misc ──
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeSoundProvider>
          {children}
        </ThemeSoundProvider>
      </body>
    </html>
  );
}

