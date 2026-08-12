export const hero = {
  greeting: "Hello, I'm",
  name: "Pritam Maji",
  roles: ["Full Stack Developer", "Creative Designer", "CS Student"],
  description:
    "I craft immersive digital experiences — blending clean code, cinematic motion and thoughtful design into products people love.",
  quotes: [
    "Code is poetry in motion.",
    "Design is intelligence made visible.",
    "Build things that feel alive.",
    "Simplicity is the soul of efficiency.",
  ],
};

export const stats = [
  { label: "Projects Completed", value: 35, suffix: "+" },
  { label: "Certificates", value: 18, suffix: "+" },
  { label: "Coding Hours", value: 2400, suffix: "+" },
  { label: "Happy Clients", value: 12, suffix: "+" },
];

export type Skill = {
  name: string;
  level: number;
  category: "Programming" | "Design";
  icon: string;
};

export const skills: Skill[] = [
  { name: "HTML", level: 95, category: "Programming", icon: "code" },
  { name: "CSS", level: 92, category: "Programming", icon: "palette" },
  { name: "JavaScript", level: 90, category: "Programming", icon: "code" },
  { name: "TypeScript", level: 82, category: "Programming", icon: "code" },
  { name: "React", level: 85, category: "Programming", icon: "atom" },
  { name: "Next.js", level: 84, category: "Programming", icon: "zap" },
  { name: "Node.js", level: 80, category: "Programming", icon: "server" },
  { name: "Express", level: 78, category: "Programming", icon: "server" },
  { name: "MongoDB", level: 76, category: "Programming", icon: "database" },
  { name: "Git & GitHub", level: 88, category: "Programming", icon: "git" },
  { name: "C", level: 75, category: "Programming", icon: "code" },
  { name: "C++", level: 72, category: "Programming", icon: "code" },
  { name: "Java", level: 70, category: "Programming", icon: "coffee" },
  { name: "Python", level: 68, category: "Programming", icon: "snake" },
  { name: "Figma", level: 86, category: "Design", icon: "pen" },
  { name: "Photoshop", level: 80, category: "Design", icon: "image" },
  { name: "Illustrator", level: 74, category: "Design", icon: "pen-tool" },
  { name: "Premiere Pro", level: 78, category: "Design", icon: "video" },
  { name: "CapCut", level: 85, category: "Design", icon: "scissors" },
];

export type EducationItem = {
  title: string;
  place: string;
  period: string;
  semester: string;
  description: string;
  subjects: string[];
  progress: number;
  achievements: string[];
  goals: string[];
};

export const education: EducationItem[] = [
  {
    title: "Diploma in Computer Science & Engineering",
    place: "West Bengal State Council of Technical Education",
    period: "2023 — 2026",
    semester: "Currently in 5th Semester",
    description:
      "Building a strong foundation in computer science with hands-on projects, competitive coding and creative technology.",
    subjects: [
      "Data Structures & Algorithms",
      "DBMS",
      "Operating Systems",
      "Web Technologies",
      "Computer Networks",
      "Software Engineering",
    ],
    progress: 70,
    achievements: [
      "Top 10% of the class",
      "Best Mini-Project Award",
      "1st place in institute hackathon",
    ],
    goals: ["Master full-stack engineering", "Contribute to open source", "B.Tech in CSE"],
  },
  {
    title: "Higher Secondary Education (Science)",
    place: "West Bengal Council of Higher Secondary Education",
    period: "2021 — 2023",
    semester: "Completed",
    description:
      "Physics, Chemistry, Mathematics and Computer Applications — where the love for technology began.",
    subjects: ["Physics", "Chemistry", "Mathematics", "Computer Applications"],
    progress: 100,
    achievements: ["Scored 92% in Board Examination"],
    goals: [],
  },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  category: string;
  tech: string[];
  features: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
};

export const projectCategories = ["All", "Web App", "Portfolio", "Full Stack", "UI/UX", "Game"];

export const projects: Project[] = [
  {
    id: "nexus-dash",
    title: "Nexus Dashboard",
    tagline: "Realtime analytics platform",
    description:
      "A modern analytics dashboard with realtime charts, dark luxury UI and full CRUD for user data.",
    image: "/covers/cover-1.svg",
    category: "Full Stack",
    tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind"],
    features: ["Realtime charting", "Role-based auth", "REST API", "Responsive design"],
    github: "https://github.com/pritammaji",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: "lumina-ui",
    title: "Lumina UI",
    tagline: "Component library",
    description: "A hand-crafted React component library with 40+ animated, accessible components.",
    image: "/covers/cover-2.svg",
    category: "Web App",
    tech: ["React", "TypeScript", "Storybook", "Framer Motion"],
    features: ["40+ components", "Dark/light theming", "Fully accessible", "Motion-first"],
    github: "https://github.com/pritammaji",
    featured: true,
  },
  {
    id: "aurora-vision",
    title: "Aurora Vision",
    tagline: "AI image enhancer",
    description: "An AI-powered image enhancement studio with filters, upscaling and batch processing.",
    image: "/covers/cover-3.svg",
    category: "Full Stack",
    tech: ["Next.js", "Python", "TensorFlow.js", "Vercel"],
    features: ["AI upscaling", "Filter presets", "Batch mode", "Cloud storage"],
    demo: "https://example.com",
  },
  {
    id: "portfolio-x",
    title: "Portfolio X",
    tagline: "3D immersive portfolio",
    description: "This very website — an Awwwards-grade 3D portfolio with cinematic scroll.",
    image: "/covers/cover-4.svg",
    category: "Portfolio",
    tech: ["Next.js", "Three.js", "GSAP", "Tailwind"],
    features: ["3D hero", "Cinematic scroll", "Full SEO", "Admin dashboard"],
    github: "https://github.com/pritammaji",
    demo: "https://example.com",
    featured: true,
  },
  {
    id: "pixel-play",
    title: "Pixel Play",
    tagline: "Retro game engine",
    description: "A tiny browser game engine with physics, sprites and a playable demo game.",
    image: "/covers/cover-5.svg",
    category: "Game",
    tech: ["JavaScript", "Canvas API", "WebGL"],
    features: ["Physics engine", "Sprite system", "Pause/Resume", "Mobile touch"],
    github: "https://github.com/pritammaji",
  },
  {
    id: "flowboard",
    title: "FlowBoard",
    tagline: "Kanban workspace",
    description: "A collaborative kanban tool with drag-and-drop, labels and realtime sync.",
    image: "/covers/cover-6.svg",
    category: "Full Stack",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    features: ["Drag & drop", "Realtime sync", "Board templates", "Guest sharing"],
    demo: "https://example.com",
  },
  {
    id: "glow-shop",
    title: "GlowShop",
    tagline: "Headless ecommerce",
    description: "A headless storefront with a dark neon aesthetic, cart and Stripe checkout.",
    image: "/covers/cover-7.svg",
    category: "Web App",
    tech: ["Next.js", "Stripe", "Sanity", "Tailwind"],
    features: ["Headless CMS", "Stripe checkout", "Order tracking", "Dark neon UI"],
    demo: "https://example.com",
  },
  {
    id: "motion-studio",
    title: "Motion Studio",
    tagline: "Web animation toolkit",
    description: "A visual tool for composing GSAP animations with timeline previews.",
    image: "/covers/cover-8.svg",
    category: "UI/UX",
    tech: ["React", "GSAP", "Zustand"],
    features: ["Visual timeline", "Preset library", "Export code", "Live preview"],
    github: "https://github.com/pritammaji",
  },
];

export type Achievement = {
  id: string;
  title: string;
  type: string;
  year: string;
  description: string;
  icon: "trophy" | "medal" | "award" | "code" | "sport" | "star";
};

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "Institute Hackathon Champion",
    type: "Hackathon",
    year: "2025",
    description:
      "Led a team of 4 to build an AI-powered campus assistant in 24 hours, winning 1st place among 30 teams.",
    icon: "trophy",
  },
  {
    id: "ach-2",
    title: "Best Mini-Project Award",
    type: "Academics",
    year: "2024",
    description:
      "Received the best mini-project award for an IoT-based smart attendance system using face recognition.",
    icon: "award",
  },
  {
    id: "ach-3",
    title: "Top 10% in Diploma",
    type: "Academics",
    year: "2025",
    description: "Ranked in the top 10% of the Computer Science department across all semesters.",
    icon: "star",
  },
  {
    id: "ach-4",
    title: "Web Design Contest Finalist",
    type: "Competition",
    year: "2024",
    description:
      "Reached the finals of a state-level web design contest with a motion-heavy photography portfolio.",
    icon: "medal",
  },
  {
    id: "ach-5",
    title: "100 Days of Code — 3x",
    type: "Coding",
    year: "2023 — 2025",
    description:
      "Completed the 100 Days of Code challenge three times, building and shipping a project every single day.",
    icon: "code",
  },
  {
    id: "ach-6",
    title: "College Football Team Captain",
    type: "Sports",
    year: "2024",
    description:
      "Captained the college football team to a runner-up finish in the district inter-college tournament.",
    icon: "sport",
  },
];

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  link?: string;
};

export const certificates: Certificate[] = [
  { id: "cert-1", title: "Full Stack Web Development", issuer: "Coursera", year: "2025", image: "/covers/cover-1.svg" },
  { id: "cert-2", title: "React & Next.js Masterclass", issuer: "Udemy", year: "2025", image: "/covers/cover-2.svg" },
  { id: "cert-3", title: "JavaScript Algorithms & DSA", issuer: "freeCodeCamp", year: "2024", image: "/covers/cover-3.svg" },
  { id: "cert-4", title: "UI/UX Design Fundamentals", issuer: "Google", year: "2024", image: "/covers/cover-4.svg" },
  { id: "cert-5", title: "MongoDB University — M001", issuer: "MongoDB", year: "2024", image: "/covers/cover-5.svg" },
  { id: "cert-6", title: "Creative Design with Figma", issuer: "Coursera", year: "2023", image: "/covers/cover-6.svg" },
];

export type GalleryItem = { id: string; src: string; title: string; tall?: boolean };

export const gallery: GalleryItem[] = [
  { id: "g-1", src: "/covers/cover-1.svg", title: "Neon Geometry", tall: true },
  { id: "g-2", src: "/covers/cover-2.svg", title: "Electric Bloom" },
  { id: "g-3", src: "/covers/cover-3.svg", title: "Purple Horizon", tall: true },
  { id: "g-4", src: "/covers/cover-4.svg", title: "Cyan Dreams" },
  { id: "g-5", src: "/covers/cover-5.svg", title: "Violet Storm", tall: true },
  { id: "g-6", src: "/covers/cover-6.svg", title: "Aurora Fields" },
  { id: "g-7", src: "/covers/cover-7.svg", title: "Chromatic Waves", tall: true },
  { id: "g-8", src: "/covers/cover-8.svg", title: "Deep Space" },
  { id: "g-9", src: "/covers/cover-2.svg", title: "Glass Prism", tall: true },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Arjun Sen",
    role: "Startup Founder",
    quote:
      "Pritam rebuilt our landing page and conversions jumped 40%. The 3D hero and micro-interactions are genuinely world-class.",
    initials: "AS",
  },
  {
    id: "t-2",
    name: "Sneha Roy",
    role: "Product Designer",
    quote:
      "Rare combination of designer and engineer. Every pixel is intentional and the code behind it is equally beautiful.",
    initials: "SR",
  },
  {
    id: "t-3",
    name: "Rahul Das",
    role: "Engineering Lead",
    quote:
      "Delivered ahead of schedule, documented everything, and the admin dashboard made content updates effortless.",
    initials: "RD",
  },
];

export const timeline = [
  {
    year: "2021",
    title: "The Spark",
    description:
      "Wrote the first line of code in a school computer lab and instantly fell in love with programming.",
  },
  {
    year: "2023",
    title: "Diploma in CSE",
    description:
      "Started my diploma in Computer Science & Engineering and began building real projects.",
  },
  {
    year: "2024",
    title: "Freelance Design",
    description:
      "Started freelancing — shipping brand identities, UI kits and websites for small businesses.",
  },
  {
    year: "2025",
    title: "Full Stack Era",
    description:
      "Diving deep into Next.js, Three.js and backend engineering. Won my first hackathon.",
  },
  {
    year: "2026",
    title: "The Future",
    description:
      "Aiming to join a top product team, contribute to open source and build for thousands of users.",
  },
];

export const marqueeItems = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Three.js",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "GSAP",
  "Figma",
  "Python",
  "C++",
  "Java",
  "Git",
];
