"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useThemeSound } from "../../../components/theme-sound-provider";
import Nav from "../../../components/nav";
import ContactSection from "../../../components/contact-section";

interface BlogContent {
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  intro: string[];
  sections: {
    heading: string;
    content: string[];
  }[];
}

const blogsData: Record<string, BlogContent> = {
  "tech-stack-journey": {
    title: "From Hello World to Full Stack: My Tech Stack Journey as a CSE Student",
    date: "June 29, 2026",
    readTime: "11 min read",
    tags: ["CSE", "WebDev", "FullStack", "DSA", "ReactJS", "NodeJS", "AIML", "StudentLife", "CodingJourney", "Hackathon"],
    intro: [
      "There's a line in the Bhagavad Gita that I read for the first time and thought — okay, cool philosophical quote, moving on.",
      "\"Karmanye vadhikaraste, ma phaleshu kadachana.\"",
      "You have the right to perform your actions, but not to the fruits of your actions.",
      "This line didn't make sense to me until I was sitting in front of my screen at 2 AM, and my CSS layout had broken. Again. Third time. Same place. Same reason. And I had absolutely no idea what to do next.",
      "That's when it clicked — in coding, results don't show up immediately. You put in hours, nothing seems to happen. Then one day, out of nowhere, everything starts connecting. But until then — you just have to keep going anyway.",
      "This is my tech stack journey. The honest version."
    ],
    sections: [
      {
        heading: "The Beginning: A Blank Screen and a Lot of Confusion",
        content: [
          "I'm from Anjar, Kutch. Small town. The computer science scene there is different — no senior to tell you \"learn this first,\" no roadmap, no mentor.",
          "First day of college. Parul University. The professor is writing on the board — what is HTML, what is a tag. And I'm thinking — okay, this seems manageable.",
          "Then JavaScript showed up. And I got completely lost.",
          "Variables made sense. Functions too. But when the `this` keyword came around — honestly, it felt like the language had a personal grudge against me. I'd follow every tutorial step by step and still get a completely different output. No one to explain it. I'd go to YouTube and find five different people teaching the same concept five different ways. And I'd be standing in the middle — confused, frustrated, and honestly a little embarrassed.",
          "Because that's the worst feeling — when it seems like everyone else gets it, and you're the only one who doesn't."
        ]
      },
      {
        heading: "HTML/CSS: The First Time Something Actually Worked",
        content: [
          "Honestly? HTML felt easy. Almost insultingly easy. `<h1>`, `<p>`, `<div>` — straightforward enough.",
          "CSS made me cry.",
          "When to use Flex, when to use Grid — that confusion was real. A `position: absolute` element would end up somewhere completely random. `margin: auto` worked sometimes and didn't other times. And responsive design? Looks fine on laptop, completely broken on mobile.",
          "One night I was building a simple landing page. Header, hero section, a few cards. Straightforward stuff. It took three hours. And when it finally worked — I genuinely got emotional. There was a little embarrassment too, feeling so much about a landing page. But then I thought — no, this was hard. I did it. That's valid.",
          "I remember that moment clearly. The first thing I designed myself, wrote myself, and debugged myself. That feeling is addictive."
        ]
      },
      {
        heading: "JavaScript: The Longest Phase",
        content: [
          "HTML/CSS gave me confidence. JavaScript took it right back.",
          "The first few months were basics — DOM manipulation, events, functions. Then async JavaScript hit. Callbacks, Promises, async/await. This is where I genuinely ran into a wall.",
          "I'd follow a tutorial. Everything made sense while watching. Then I'd write my own code — and nothing would work. Errors I didn't even recognize. `undefined is not a function`. `Cannot read property of null`.",
          "Two, three months went by like this. No visible progress anywhere.",
          "The Gita line kept coming back — seeing results and actually growing are two different things. The growth was happening. I just couldn't see it.",
          "Then one day — complex problem, a chain of async calls — and I solved it myself. No documentation, no tutorial. Just me working through it until it made sense.",
          "That click. That moment. That's when I understood — everything was being invested. Compounding quietly. Just not visible yet."
        ]
      },
      {
        heading: "React: When Things Actually Got Powerful",
        content: [
          "Once JavaScript felt solid, I moved to React.",
          "First reaction? — \"What even is this. What's JSX. HTML inside JavaScript? Why?\"",
          "The component concept was confusing at first. Passing props, managing state, understanding re-renders — I'd learn one thing and forget another.",
          "But React felt different. The first time I built a proper component-based app — clicked a button and the UI updated smoothly — it literally felt like magic. I did this. In real time. In the browser.",
          "Chatify — my MERN stack chat app — that's where everything came together. React frontend, Node.js backend, MongoDB database, Express routes, WebSocket real-time updates. Three months of work. I thought about quitting more than once. But I shipped it.",
          "And when someone used my app for the first time — messages traveling between two different browsers in real time — that satisfaction is genuinely indescribable."
        ]
      },
      {
        heading: "Node.js & Backend: A Completely Different World",
        content: [
          "Once frontend felt comfortable, I jumped into backend.",
          "Node.js felt alien at first. I'd been thinking in the browser — now I'm on a server. Requests come in, responses go out, routes need handling, the database needs talking to.",
          "Express.js made things easier. Working with MongoDB and Mongoose — define a schema, write queries — that was actually enjoyable.",
          "But what genuinely excited me was WebSockets. The Collaborative Whiteboard project — multiple users drawing simultaneously, real-time sync, low latency. Written in TypeScript, built with WebSockets. The first time that whiteboard was running on two separate devices at once — I was genuinely proud of that."
        ]
      },
      {
        heading: "DSA: When My Thinking Got Sharper",
        content: [
          "While learning to code, I noticed something — I knew what I wanted to achieve, but I didn't know how to think through getting there.",
          "I started DSA properly through Apna College — Shradha didi and Aman bhaiya's content. Started from arrays. Strings. Recursion. Linked Lists.",
          "The first LeetCode problem I solved completely on my own — no hints, no looking at solutions. That green checkmark. That dopamine hit is real.",
          "400+ problems solved so far. 100+ on GeeksforGeeks, 150+ on HackerRank. 3 Gold Badges — Java, Python, Problem Solving.",
          "DSA changed how I think. Now when any frontend or backend problem comes up — I mentally break it down first. Think in steps. That shift — from copying tutorials to actually thinking — that's the real growth."
        ]
      },
      {
        heading: "ML/AI: Currently Exploring",
        content: [
          "This is my newest frontier.",
          "Python was already there. Scikit-learn, Pandas, NumPy, Matplotlib — completed the AI-ML certificate course from Reliance Foundation, NSDC certified. Understood supervised learning — classification, regression, data preprocessing.",
          "GestureOS AI — my major B.Tech project — gesture-based computer control using computer vision and ML with webcam input. Still building it. Challenging. But genuinely exciting.",
          "The AI-ML field moves fast. Something new every week. Actively exploring it now — through implementation, through projects, not just theory."
        ]
      },
      {
        heading: "Hackathons & Freelance: The Real World Test",
        content: [
          "Theory is one thing. Real world delivery is completely different.",
          "What you learn in a hackathon — one weekend beats months of studying alone. Because under pressure, there's no time to be scared. You just build.",
          "ROBOFEST 5.0 — robotics and innovation competition organized by GUJCOST — 1st place. That win hit differently. It was validation that consistency actually works.",
          "Freelance project for Insight Association — first real client. Deadlines, deliverables, revision rounds. Nothing like college assignments. And when the client approved the final website — that satisfaction was on a different level entirely."
        ]
      },
      {
        heading: "Things Nobody Tells You — But Someone Should",
        content: [
          "**Jumping from tutorials to your own projects — that's the hardest step.** Tutorials are smooth. Build your own project — everything breaks. That's normal. It's not failure — it's literally the learning.",
          "**Don't switch your stack too fast.** Get one thing solid first. HTML/CSS solid, then JavaScript, then a framework. Jumping to a new tool every time — the foundation stays weak.",
          "**Stop comparing — seriously.** That developer on social media who's shipped five projects has been coding for three years longer than you. Your last month versus this month — that's the only useful comparison.",
          "**Stubbornness is worth more than talent.** I genuinely believe this after two years. The people who grow the most aren't necessarily the fastest learners. They're the ones who keep coming back."
        ]
      },
      {
        heading: "One Last Thing — If You're On This Journey Too",
        content: [
          "Start before you feel ready. You'll never feel ready. Readiness is a myth. You get ready by doing — not by waiting until you feel ready enough to start doing.",
          "From the Gita — Chapter 2, Verse 40:",
          "\"Even a little progress on this path protects one from the greatest fear.\"",
          "Not one step on this path is wasted. Every problem you solved. Every project you shipped. Every night you sat in front of that screen — all of it is accumulating.",
          "Just don't stop."
        ]
      }
    ]
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const id = params.id as string;
  const { bgMain, textTitle, triggerSound, bgBadge } = useThemeSound();

  const blog = blogsData[id];

  if (!blog) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${bgMain}`}>
        <h2 className="text-xl font-bold mb-4">Post not found</h2>
        <Link 
          href="/blogs"
          onClick={() => triggerSound(480, "triangle", 0.1)}
          className={`inline-flex items-center gap-1.5 px-4.5 py-2 border rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${bgBadge}`}
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="text-foreground font-bold">{part.slice(2, -2)}</strong>;
      }
      // Handle inline code
      const codeParts = part.split(/(`[^`]+`)/g);
      return codeParts.map((cp, j) => {
        if (cp.startsWith("`") && cp.endsWith("`")) {
          return <code key={`${i}-${j}`} className="text-[11px] bg-secondary px-1 py-0.5 rounded font-mono text-foreground">{cp.slice(1, -1)}</code>;
        }
        return <span key={`${i}-${j}`}>{cp}</span>;
      });
    });
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start pt-0 pb-12 px-6 sm:px-8 transition-colors duration-300 ${bgMain}`}>
      <div className="w-full max-w-[700px] flex flex-col gap-10">
        
        {/* Navigation Bar */}
        <Nav />

        {/* Action Header */}
        <div className="flex items-center justify-between w-full select-none -mb-4">
          <Link
            href="/blogs"
            onClick={() => triggerSound(480, "triangle", 0.1)}
            className={`inline-flex items-center gap-1 px-3 py-1 border rounded-full text-[10px] font-bold tracking-wide transition-all duration-200 cursor-pointer ${bgBadge}`}
          >
            <span>← Back to Blog</span>
          </Link>
        </div>

        {/* Blog Post Layout */}
        <article className="flex flex-col gap-6 text-left select-text">
          
          {/* Header section */}
          <div className="flex flex-col gap-4">
            <h1 className={`text-2xl sm:text-3xl font-serif font-extrabold tracking-tight leading-tight ${textTitle}`}>
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-500 font-mono">
              <span>{blog.date}</span>
              <span>&bull;</span>
              <span>{blog.readTime}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-bold px-2 py-0.5 bg-secondary text-muted-foreground border border-border rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <hr className="border-border my-2" />

          {/* Intro Content */}
          <div className="text-[14px] text-muted-foreground leading-relaxed flex flex-col gap-4">
            {blog.intro.map((para, i) => (
              <p key={i}>{renderText(para)}</p>
            ))}
          </div>

          {/* Sections */}
          {blog.sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-3 mt-4">
              <h2 className={`text-lg font-serif font-extrabold tracking-tight mt-2 ${textTitle}`}>
                {section.heading}
              </h2>
              <div className="text-[14px] text-muted-foreground leading-relaxed flex flex-col gap-4">
                {section.content.map((para, i) => (
                  <p key={i}>{renderText(para)}</p>
                ))}
              </div>
            </div>
          ))}

        </article>

        {/* Footer actions */}
        <div className="flex items-center justify-center w-full select-none mt-6">
          <Link
            href="/blogs"
            onClick={() => triggerSound(480, "triangle", 0.1)}
            className={`inline-flex items-center gap-1.5 px-4.5 py-2 border rounded-full text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${bgBadge}`}
          >
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Divider before footer */}
        <hr className="w-full border-t border-dashed mt-2 transition-colors duration-300 border-border" />

        {/* Footer section */}
        <ContactSection />

      </div>
    </div>
  );
}
