export type Mode = "recruiter" | "engineer";
export type ProjectTab =
  "Overview" | "Product" | "Architecture" | "Engineering" | "Quality";

export const profile = {
  name: "Ammar Ahmed",
  location: "Cottbus, Germany",
  email: "hafiz.ammar33@gmail.com",
  github: "https://github.com/ammar081",
  linkedin: "https://www.linkedin.com/in/ammar-ahmed-544876137/",
  cv: "/Ammar_Ahmed_CV.pdf",
};

export const projects = [
  {
    slug: "energy",
    index: "01",
    title: "AI Energy Data Analyst",
    eyebrow: "ENERGY OPERATIONS · FULL-STACK AI",
    repo: "https://github.com/ammar081/AI-Energy-Data-Analyst",
    image:
      "https://raw.githubusercontent.com/ammar081/AI-Energy-Data-Analyst/dcead9b4aa9c5104b7bde56d58a944165af91bd4/docs/screenshots/dashboard.png",
    imageAlt:
      "AI Energy Data Analyst fleet operations overview with dataset status, portfolio KPIs and attention queue",
    problem:
      "Renewable operations data arrives fragmented, inconsistent and difficult to turn into reliable decisions.",
    solution:
      "A production-shaped workspace that validates operational files, calculates deterministic KPIs, detects anomalies, forecasts output and produces evidence-backed reports.",
    contribution:
      "Designed and implemented the product end to end: responsive Next.js interface, FastAPI domain services, data pipeline, authentication, background jobs and delivery workflow.",
    outcome:
      "A deployable operations workflow that turns raw files into validated datasets, explainable findings, forecasts and business-ready reports while keeping core calculations deterministic.",
    capabilities: [
      "CSV & Excel ingestion",
      "Energy KPI dashboards",
      "Anomaly evidence",
      "7–30 day forecasts",
      "Role-based workspace",
      "Live telemetry",
      "Report search",
      "HTML reports",
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Redis",
      "Celery",
      "scikit-learn",
      "statsmodels",
      "Docker",
    ],
    architecture: [
      "Next.js dashboard",
      "FastAPI API",
      "Validated analytics services",
      "PostgreSQL + file storage",
      "Celery / Redis jobs",
    ],
    decisions: [
      "Calculations stay deterministic; the optional LLM only explains bounded computed findings.",
      "A rules router preserves useful answers when Gemini is unavailable.",
      "SQLite supports simple local runs; PostgreSQL powers Docker and deployment.",
    ],
    quality: [
      "23-test backend suite",
      "pytest API and service coverage",
      "Ruff static checks",
      "TypeScript build checks",
      "GitHub Actions CI",
      "Upload limits and role-permission tests",
    ],
  },
  {
    slug: "research",
    index: "02",
    title: "AI Research Assistant",
    eyebrow: "KNOWLEDGE SYSTEM · SOURCE-GROUNDED RAG",
    repo: "https://github.com/ammar081/AI-research-assistant",
    image:
      "https://raw.githubusercontent.com/ammar081/AI-research-assistant/5b6ef57ba65c776f377ec8e4d739b3df6b1bcae2/docs/app_screenshot.png",
    imageAlt: "AI Research Assistant document workspace",
    problem:
      "Researchers need fast answers across PDFs without losing the page-level evidence behind each claim.",
    solution:
      "A document workspace that extracts PDFs by page, retrieves semantically relevant passages and generates answers with traceable citations.",
    contribution:
      "Built the full RAG workflow, secure server-side routes, provider abstractions, persistent document/chat context and responsive research interface.",
    outcome:
      "A complete document-research workflow where answers remain traceable to retrieved passages and original PDF page numbers.",
    capabilities: [
      "PDF ingestion",
      "Page-aware chunks",
      "Semantic retrieval",
      "Grounded answers",
      "Page citations",
      "Saved chats",
      "Document context",
      "Provider switching",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "OpenAI",
      "Gemini",
      "Tailwind CSS",
      "Docker Compose",
    ],
    architecture: [
      "PDF extraction",
      "Overlapping chunks",
      "Embedding provider",
      "pgvector similarity search",
      "Cited LLM response",
    ],
    decisions: [
      "Provider and model metadata travels with embeddings to prevent vector-dimension mismatches.",
      "Each chat owns its selected document context.",
      "Only retrieved excerpts reach the generation model, keeping answers source-bounded.",
    ],
    quality: [
      "Typed server routes",
      "Input validation",
      "Secure server-side API keys",
      "Lint and type-check scripts",
      "Production build verification",
      "Dockerized pgvector environment",
    ],
  },
] as const;

export type Project = (typeof projects)[number];

export const skills = {
  Frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Material UI",
    "Redux Toolkit",
    "RTK Query",
    "Zustand",
  ],
  Backend: ["Node.js", "Express", "NestJS", "Python", "FastAPI", "Flask"],
  Data: ["PostgreSQL", "MongoDB", "SQLAlchemy", "pgvector", "Redis"],
  "AI / ML": [
    "RAG",
    "Embeddings",
    "Semantic search",
    "pandas",
    "NumPy",
    "scikit-learn",
    "statsmodels",
    "Anomaly detection",
    "Forecasting",
  ],
  Quality: ["Jest", "React Testing Library", "pytest", "Ruff", "ESLint"],
  Delivery: ["Docker", "Docker Compose", "GitHub Actions", "Git"],
};

export const experience = [
  {
    company: "Uforia Infotech Inc",
    role: "Frontend Developer",
    date: "Apr 2022 — May 2023",
    bullets: [
      "Built and maintained reusable React components for production web applications.",
      "Integrated REST APIs and collaborated with backend and design stakeholders on end-to-end features.",
      "Contributed to Material UI and Fabric.js interfaces, Tailwind styling standards and issue resolution in an eight-person Scrum team.",
    ],
    stack: [
      "React",
      "JavaScript",
      "Material UI",
      "Tailwind CSS",
      "REST APIs",
      "Fabric.js",
    ],
  },
  {
    company: "Silicon Centre",
    role: "Frontend Developer",
    date: "Mar 2021 — Mar 2022",
    bullets: [
      "Translated business requirements into responsive internal management flows with React and Redux.",
      "Introduced Next.js server-side rendering to support performance and search visibility.",
      "Built operational dashboards and data visualizations, then iterated on existing features with the wider team.",
    ],
    stack: ["React", "Next.js", "Redux", "Chart.js", "JavaScript", "GSAP"],
  },
];
