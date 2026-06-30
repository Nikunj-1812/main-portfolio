# Nikunj Sorathiya — Portfolio

A modern, interactive developer portfolio built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. Features dark/light theme transitions, sound effects, GitHub API integration, and a fully responsive design.

## ✨ Features

- **Dark / Light Theme** — Circular clip-path view transition with smooth animation
- **Sound Effects** — Toggle-able UI sounds with Web Audio API synth + MP3 click feedback
- **GitHub Integration** — Live profile data and contribution graph via GitHub API
- **Responsive Design** — Fully optimized for mobile, tablet, and desktop
- **SEO Optimized** — Open Graph, Twitter Cards, sitemap, robots.txt, and structured metadata
- **Security Hardened** — HSTS, CSP, X-Frame-Options, and other security headers
- **Performance Tuned** — Gzip compression, AVIF/WebP images, long-term asset caching

## 🛠 Tech Stack

| Layer      | Technology                    |
| ---------- | ----------------------------- |
| Framework  | Next.js 16 (App Router)       |
| UI         | React 19                      |
| Styling    | Tailwind CSS 4                |
| Language   | TypeScript 5                  |
| Font       | Roboto Mono (Google Fonts)    |
| Deployment | Vercel                        |

## 📁 Project Structure

```
├── app/
│   ├── api/github/       # GitHub API proxy route
│   ├── blogs/            # Blog listing + detail pages
│   ├── projects/         # Projects archive page
│   ├── resume/           # Resume page
│   ├── layout.tsx        # Root layout with SEO metadata
│   ├── page.tsx          # Homepage
│   ├── robots.ts         # Auto-generated robots.txt
│   ├── sitemap.ts        # Auto-generated sitemap.xml
│   └── globals.css       # Global styles and theme tokens
├── components/
│   ├── blog-card.tsx     # Blog preview card
│   ├── contact-section.tsx
│   ├── github-graph.tsx  # GitHub contribution graph
│   ├── header.tsx        # Profile header with flip animation
│   ├── nav.tsx           # Navigation bar with command palette
│   ├── project-card.tsx  # Project showcase card
│   └── theme-sound-provider.tsx  # Theme + sound context provider
├── public/               # Static assets (images, audio, favicon)
└── next.config.ts        # Security headers, performance config
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
GITHHUB_API=your_github_personal_access_token
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## 📦 Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start
```

Deploy instantly on [Vercel](https://vercel.com) — push to your GitHub repo and it auto-deploys.

## 📄 License

MIT © Nikunj Sorathiya
