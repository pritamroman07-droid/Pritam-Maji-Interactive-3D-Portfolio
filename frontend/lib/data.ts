export const hero = {
  greeting: "Hello, I'm",
  name: "Pritam Maji",
  roles: ["Computer Science Student", "Developer", "Builder"],
  description:
    "I write code, learn daily and build practical web applications — turning ideas into working products.",
};

export const about = {
  paragraphs: [
    "I'm Pritam Maji, a Diploma in Computer Science & Engineering student from Hooghly, West Bengal. I'm passionate about software development and modern web technologies, and I love the process of turning an idea into a working, functional product.",
    "Most of my time goes into learning and building — writing programs in C and C++, making interactive pages with HTML, CSS and JavaScript, and exploring frameworks like React.js and databases like MongoDB and MySQL.",
    "I believe the best way to learn is to build, so I work on real, practical projects: an AI-powered billing platform, a project management tool, an e-commerce storefront and more. Every project teaches me something new, and I'm always looking for the next thing to improve.",
  ],
  focusAreas: [
    {
      title: "Where I'm headed",
      text: "Frontend and full-stack web development — building complete, useful applications.",
    },
    {
      title: "How I learn",
      text: "By building. Each project is a chance to experiment, break things and improve.",
    },
    {
      title: "Current study",
      text: "Diploma in Computer Science & Engineering — programming, web and databases.",
    },
  ],
};

export type TimelineItem = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  phase: "past" | "current" | "future";
  phrase?: string;
};

export const timeline: TimelineItem[] = [
  {
    year: "2024",
    title: "Higher Secondary Completed",
    subtitle: "Pancharul Srhari Vidyamandir",
    description:
      "Completed my Higher Secondary (HS) education in 2024 from Pancharul Srhari Vidyamandir.",
    phase: "past",
  },
  {
    year: "2024",
    title: "Started Diploma in Computer Science & Engineering",
    subtitle: "Brainware University",
    description:
      "Joined Brainware University to pursue a Diploma in Computer Science & Engineering (CSE) — the beginning of my focused journey into computer science and software development.",
    phase: "past",
  },
  {
    year: "2025",
    title: "Started Web Development",
    subtitle: "Building Real Projects",
    description:
      "Started learning web development and began building practical projects — improving my programming fundamentals, exploring the frontend and understanding how real applications are developed.",
    phase: "past",
  },
  {
    year: "2026",
    title: "Still Learning & Building",
    subtitle: "Continuous Learning",
    description:
      "Continuing my Diploma in Computer Science & Engineering while improving my programming and web development skills — learning by building projects, experimenting with technologies and growing every day.",
    phase: "current",
    phrase: "Still learning. Still building. Still improving.",
  },
  {
    year: "Future",
    title: "B.Tech & Continuous Growth",
    subtitle: "Future Goal",
    description:
      "After completing my Diploma in Computer Science & Engineering, my goal is to pursue a B.Tech — continuously improving my technical skills, deepening my knowledge of computer science and building better real-world projects.",
    phase: "future",
  },
];

export type Skill = {
  name: string;
  description: string;
  icon: string;
};

export const skills: Skill[] = [
  {
    name: "C",
    description: "Foundational programming — logic, pointers and structured thinking.",
    icon: "code",
  },
  {
    name: "C++",
    description: "Object-oriented programming, STL and problem solving.",
    icon: "code",
  },
  {
    name: "HTML",
    description: "Semantic markup and accessible page structure.",
    icon: "code",
  },
  {
    name: "CSS",
    description: "Responsive layouts, modern styling and design systems.",
    icon: "palette",
  },
  {
    name: "JavaScript",
    description: "Interactive pages, DOM work and client-side logic.",
    icon: "code",
  },
  {
    name: "React.js",
    description: "Component-based user interfaces with hooks and state.",
    icon: "atom",
  },
  {
    name: "MongoDB",
    description: "Document databases — schemas, queries and Atlas.",
    icon: "database",
  },
  {
    name: "MySQL",
    description: "Relational databases — tables, joins and constraints.",
    icon: "database",
  },
];

export const creativeSkills: Skill[] = [
  {
    name: "CapCut",
    description: "Video editing — cutting, effects, transitions and captions.",
    icon: "scissors",
  },
];

export type EducationItem = {
  title: string;
  place: string;
  period: string;
  status: string;
  description: string;
  subjects: string[];
  goals: string[];
};

export const education: EducationItem[] = [
  {
    title: "Diploma in Computer Science & Engineering",
    place: "Brainware University",
    period: "Started 2024",
    status: "Currently pursuing",
    description:
      "Pursuing a Diploma in Computer Science & Engineering — building my foundations in computer science, software engineering and programming through coursework and real projects.",
    subjects: ["Software Engineering", "Physics", "Chemistry"],
    goals: [
      "Pursue a B.Tech after completing my Diploma",
      "Keep building real-world projects",
      "Keep improving my development skills",
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  repo: string;
  owner: string;
  tech: string[];
  features: string[];
  demo?: string;
};

export const projects: Project[] = [
  {
    id: "dukaan-sathi",
    title: "Dukaan Saathi",
    tagline: "AI-powered billing platform for local Indian shops",
    description:
      "A full-stack platform that turns speech into bills. Shop owners speak a customer's purchase in Bengali, Hindi or English and AI (Google Gemini) generates a structured bill in seconds — with a real-time analytics dashboard, product inventory, customer management and an AI business advisor.",
    image: "https://opengraph.githubassets.com/portfolio/R4NiTeXe/Dukaan_Sathi",
    repo: "https://github.com/R4NiTeXe/Dukaan_Sathi",
    owner: "R4NiTeXe",
    tech: ["Next.js", "Express", "Node.js", "MongoDB", "Google Gemini", "Tailwind CSS"],
    features: [
      "Voice-to-bill with Google Gemini",
      "Billing in Bengali, Hindi and English",
      "Real-time analytics dashboard",
      "Product inventory & customer management",
      "AI business advisor on real sales data",
    ],
    demo: "https://dukaan-sathi-sigma.vercel.app",
  },
  {
    id: "project-management-tool",
    title: "ProManager",
    tagline: "Full-stack project management tool",
    description:
      "A production-ready MERN project management application with JWT authentication (including refresh tokens and 2FA), role-based access, kanban boards with real-time drag-and-drop, Gantt charts, a calendar view, an analytics dashboard and AI productivity insights powered by Google Gemini.",
    image: "https://opengraph.githubassets.com/portfolio/pritamroman07-droid/Project-Management-Tool",
    repo: "https://github.com/pritamroman07-droid/Project-Management-Tool",
    owner: "pritamroman07-droid",
    tech: ["React", "Express", "Node.js", "MongoDB", "Socket.io", "Redux Toolkit", "Google Gemini"],
    features: [
      "JWT auth with refresh tokens & 2FA",
      "Kanban board with real-time drag-and-drop",
      "Gantt chart and calendar views",
      "Analytics dashboard with charts",
      "AI productivity insights (Gemini)",
    ],
  },
  {
    id: "ecommerce-web",
    title: "SweetShop",
    tagline: "Premium MERN e-commerce platform",
    description:
      "A modern e-commerce application built with the MERN stack — 100+ products, real-time search and filtering, a glassmorphism dark UI, dynamic cart, multi-step checkout and a full admin dashboard for products, orders and users.",
    image: "https://opengraph.githubassets.com/portfolio/pritamroman07-droid/E-Commers-Web",
    repo: "https://github.com/pritamroman07-droid/E-Commers-Web",
    owner: "pritamroman07-droid",
    tech: ["React", "Express", "Node.js", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "100+ products with search & filters",
      "Dynamic cart and multi-step checkout",
      "JWT authentication with sessions",
      "Admin dashboard for full control",
      "Dark and light theme",
    ],
  },
  {
    id: "xibit-2k26",
    title: "XIBIT 2K26",
    tagline: "Voice-enabled farmer & buyer marketplace",
    description:
      "A full-stack platform under the XIBIT 2K26 banner with separate farmer and buyer dashboards — an AI voice assistant built on Google Gemini, multi-language support and a MongoDB-backed Express API.",
    image: "https://opengraph.githubassets.com/portfolio/urmipaul007/XIBIT-2k26",
    repo: "https://github.com/urmipaul007/XIBIT-2k26",
    owner: "urmipaul007",
    tech: ["React", "TypeScript", "Vite", "Express", "MongoDB", "Google Gemini"],
    features: [
      "Farmer and buyer dashboards",
      "AI voice assistant (Google Gemini)",
      "Multi-language support",
      "Express + MongoDB backend",
    ],
  },
];

export const marqueeItems = [
  "C",
  "C++",
  "HTML",
  "CSS",
  "JavaScript",
  "React.js",
  "MongoDB",
  "MySQL",
  "CapCut",
];