/**
 * Static content used by the resume generator.
 * Mirror of frontend/lib/data.ts — keep in sync manually or
 * move to a shared CMS later.
 */

export const skills = [
  { name: "C", description: "Procedural programming foundation" },
  { name: "C++", description: "OOP, STL, & problem solving" },
  { name: "HTML", description: "Semantic, accessible markup" },
  { name: "CSS", description: "Layouts, animation & design" },
  { name: "JavaScript", description: "ES6+, async, DOM APIs" },
  { name: "React.js", description: "Components, hooks & state" },
  { name: "MongoDB", description: "NoSQL schemas & queries" },
  { name: "MySQL", description: "Relational modeling & SQL" },
];

export const creativeSkills = [
  { name: "CapCut", description: "Fast-paced video editing for social media" },
];

export const education = [
  {
    title: "Diploma in Computer Science & Engineering",
    place: "Brainware University",
    period: "2024 — Present",
    description:
      "Pursuing a Diploma in Computer Science & Engineering — building foundations in computer science, software engineering and programming through coursework and real projects.",
  },
];

export const projects = [
  {
    title: "Dukaan Sathi",
    category: "AI · Full Stack",
    description:
      "AI-powered billing platform for small shopkeepers — invoice in Bengali, Hindi or English using voice, powered by Gemini.",
    tech: ["JavaScript", "Next.js", "Express", "MongoDB", "Gemini", "Cloudinary"],
  },
  {
    title: "Project Management Tool",
    category: "Full Stack",
    description:
      "Kanban & Gantt project management app with team workspaces, JWT + 2FA auth, and realtime updates via Socket.io.",
    tech: ["JavaScript", "MongoDB", "Express", "React", "Socket.io"],
  },
  {
    title: "E-Commerce Web App",
    category: "Full Stack",
    description:
      "Full-featured storefront with product catalog, cart, orders, and an admin dashboard for inventory management.",
    tech: ["JavaScript", "MongoDB", "Express", "React"],
  },
  {
    title: "XIBIT 2k26",
    category: "Web App",
    description:
      "Farmer & buyer marketplace with dashboards, built on React, Vite, TypeScript and Express with a voice assistant.",
    tech: ["TypeScript", "React", "Vite", "Express", "MongoDB"],
  },
];

type ItemWithYear = { title: string; year: string };
type Certificate = { title: string; issuer: string; year: string };

export const achievements: ItemWithYear[] = [];

export const certificates: Certificate[] = [];