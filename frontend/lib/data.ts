export const hero = {
  greeting: "Hello, I'm",
  name: "Pritam Maji",
  roles: ["Computer Science Student", "Developer", "Builder"],
  description:
    "I'm a Diploma in CSE student who enjoys learning new technologies and turning ideas into working web applications.",
};

export const about = {
  paragraphs: [
    "Hi, I'm Pritam Maji — a Diploma in Computer Science & Engineering student from Hooghly, West Bengal. I enjoy understanding how software works and building things with it.",
    "Most of my time goes into learning and building. I write programs in C and C++, make web pages with HTML, CSS and JavaScript, and work with React.js, MongoDB and MySQL.",
    "I believe the best way to learn is to build. So I keep making real, working projects — an AI billing app, a project management tool, an e-commerce site. Each one teaches me something new.",
  ],
  focusAreas: [
    {
      title: "Where I'm headed",
      text: "Frontend and full-stack web development — building complete, useful applications.",
    },
    {
      title: "How I learn",
      text: "By building. Each project is a chance to try, break and improve.",
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
      "In 2024, I joined Brainware University to study for my Diploma in Computer Science & Engineering (CSE). This is where my focused journey into computer science began.",
    phase: "past",
  },
  {
    year: "2025",
    title: "Started Web Development",
    subtitle: "Building Real Projects",
    description:
      "In 2025, I started learning web development and building real projects — improving my programming basics, exploring the frontend, and understanding how real applications are built.",
    phase: "past",
  },
  {
    year: "2026",
    title: "Still Learning & Building",
    subtitle: "Continuous Learning",
    description:
      "I'm continuing my Diploma while improving my programming and web development skills. I learn by building projects, experimenting with new tools, and getting a little better every day.",
    phase: "current",
    phrase: "Still learning. Still building. Still improving.",
  },
  {
    year: "Future",
    title: "B.Tech & Continuous Growth",
    subtitle: "Future Goal",
    description:
      "Once I finish my Diploma, my plan is to pursue a B.Tech. My long-term goal is simple — keep learning, build better projects, and grow as a software developer.",
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
    description: "A great place to start — logic, pointers and structured thinking.",
    icon: "c",
  },
  {
    name: "C++",
    description: "Object-oriented programming and problem solving.",
    icon: "cpp",
  },
  {
    name: "HTML",
    description: "The structure and meaning of web pages.",
    icon: "html",
  },
  {
    name: "CSS",
    description: "Making websites look clean and work on any screen.",
    icon: "css",
  },
  {
    name: "JavaScript",
    description: "Making pages interactive and bringing ideas to life.",
    icon: "js",
  },
  {
    name: "React.js",
    description: "Building interfaces from reusable components.",
    icon: "react",
  },
  {
    name: "MongoDB",
    description: "Working with flexible, document-based data.",
    icon: "mongo",
  },
  {
    name: "MySQL",
    description: "Organizing data in tables and working with SQL.",
    icon: "mysql",
  },
];

export const creativeSkills: Skill[] = [
  {
    name: "CapCut",
    description: "Cutting and editing videos for social media.",
    icon: "capcut",
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
      "I'm currently pursuing my Diploma in Computer Science & Engineering — learning the foundations of computer science, software engineering and programming through my coursework and personal projects.",
    subjects: [
      "Software Engineering",
      "Physics",
      "Chemistry",
      "Mathematics",
      "Object-Oriented Programming in C++",
      "Data Structures",
      "Database Management",
    ],
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
    tagline: "AI billing for local Indian shops",
    description:
      "A billing app for small Indian shops. Shop owners speak the items in Bengali, Hindi or English, and AI turns their words into a proper bill in seconds — with an inventory, customer list and a simple analytics dashboard.",
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
    tagline: "Project management made simple",
    description:
      "A project management tool with kanban boards, Gantt charts and team workspaces. It has secure login with 2FA, realtime updates, and simple AI suggestions to help teams stay on track.",
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
    tagline: "A complete online store",
    description:
      "An e-commerce store with over 100 products, easy search and filters, a smooth cart and checkout, and a full admin dashboard for managing products, orders and users.",
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
    tagline: "A marketplace for farmers & buyers",
    description:
      "A marketplace where farmers and buyers can connect. It has separate dashboards for each side, a voice assistant powered by Gemini, and support for multiple languages.",
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