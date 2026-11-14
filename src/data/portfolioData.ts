import { Project, ArsenalSkill, Milestone, Chapter, InterviewQnA } from '../types';

export const portfolioConfig = {
  // Identity & Branding
  personal: {
    name: "Aayush Askandani",
    title: "Full-Stack Engineer & Systems Builder",
    greeting: "Hello, I'm",
    shortBio: "Building deterministic, failure-resilient distributed systems, low-latency microservices, and high-cadence interfaces. Architecting with voice velocity using Wispr Flow.",
    philosophy: "I believe modern software isn't just about throwing APIs together. It's about deterministic state, resilience under failure, and crafting interfaces that feel as intuitive and fluid as human thought.",
    location: "India",
    email: "aayushaskandani@gmail.com",
    github: "https://github.com/aayushaskandani",
    linkedin: "https://linkedin.com/in/aayush-askandani",
    twitter: "https://twitter.com",
    resumeUrl: "#",
    statusBadge: "AVAILABLE FOR SDE ROLES & INTERNSHIPS",
  },

  // 12 Boxes for Engineering Arsenal (Interactive Click-to-Craft)
  arsenal: [
    { name: "React / Vite", category: "Frontend" },
    { name: "Next.js", category: "Full-Stack" },
    { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "Python / FastAPI", category: "Backend / AI" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Redis", category: "Cache / Queue" },
    { name: "Docker", category: "DevOps / Infra" },
    { name: "AWS / Cloud", category: "Cloud Services" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "WebSockets", category: "Real-time" },
    { name: "LLMs / RAG", category: "AI Engineering" },
  ] as ArsenalSkill[],

  // Featured Projects (with deep technical dossiers)
  projects: [
    {
      id: "resilience-os",
      name: "LINQCHAIN · RESILIENCE OS",
      tag: "SUPPLY CHAIN CONTROL ROOM",
      category: "systems",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      problem: "Modern global supply networks collapse under cascading multi-tier disruptions, leaving operators blind to inventory bottlenecks.",
      architecture: "Microservices control architecture. Next.js 14 interactive UI with dynamic network topology graphs (@xyflow/react), FastAPI telemetry processing engine, and automated disruption mitigation simulations.",
      techStack: ["Next.js 14", "React", "FastAPI", "Python", "SQLAlchemy", "PostgreSQL", "Redis", "Docker", "Tailwind CSS"],
      keyDecisions: [
        "Separated telemetry ingestion microservice from simulation engine to avoid thread starvation during shock cascades.",
        "Implemented graph cycle detection to prevent recursive disruption loops in supplier dependency trees.",
        "Client-side optimistic state updates with SWR caching to maintain snappy 60fps graph manipulations."
      ],
      whatBrokeAndFix: [
        "Early sprint database connection pooling crashed during sudden spike cascades; fixed by implementing PgBouncer and bulk event batching.",
        "Graph re-rendering lagged above 200 nodes; solved by memoizing node coordinates and utilizing canvas viewport virtualization."
      ],
      outcome: [
        "National Finalist Hackathon demonstration",
        "Sub-100ms real-time cascade simulation across 500+ supply nodes",
        "Complete open-source system architecture"
      ],
      metrics: "National Finalist · 500+ Nodes Simulated"
    },
    {
      id: "finassist",
      name: "FINASSIST · AI FINANCIAL COPILOT",
      tag: "INTELLIGENT WEALTH & ANALYTICS",
      category: "ai",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      problem: "Retail investors struggle to navigate volatile market data, portfolio risk factors, and financial filings without costly advisory services.",
      architecture: "Three-tiered financial analytics engine. Next.js and TypeScript frontend with Recharts visualization communicating with a FastAPI microservice backend running statistical risk engines (Sharpe ratio, VaR) and a RAG advisory agent.",
      techStack: ["Python", "FastAPI", "Next.js", "TypeScript", "Pandas", "NumPy", "LangChain", "Recharts", "Tailwind CSS"],
      keyDecisions: [
        "Asynchronous FastAPI backend for non-blocking ticker ingestion across multiple financial data APIs.",
        "Strict hallucination guardrails forcing financial advisory prompts to cite direct source balance sheets."
      ],
      whatBrokeAndFix: [
        "Free-tier financial API rate limits caused data drops; resolved by caching historical closes in Redis with exponential backoff.",
        "Irregular market closure dates broke time-series array alignments; handled with Pandas business day calendar re-indexing."
      ],
      outcome: [
        "Real-time portfolio health metrics and automated risk diversification alerts",
        "Sub-second multi-ticker financial comparison queries"
      ],
      metrics: "Sub-second Risk Engine · Multi-Asset"
    },
    {
      id: "pravah",
      name: "PROJECT PRAVAH",
      tag: "PIPELINE TELEMETRY · INDUSTRIAL IOT",
      category: "systems",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      problem: "Long-distance industrial pipelines suffer catastrophic pressure leaks, unauthorized tapping, and structural degradation across remote terrain.",
      architecture: "Real-time industrial IoT telemetry and spatial anomaly detection system. Edge sensor telemetry transmitted over MQTT and WebSockets to a Python stream processor, mapped on dynamic geospatial maps.",
      techStack: ["React", "Python", "FastAPI", "MQTT / WebSockets", "Leaflet / GeoJSON", "PostgreSQL", "TimescaleDB"],
      keyDecisions: [
        "Adopted TimescaleDB for hypertable compression of high-frequency sensor telemetry.",
        "Decoupled alert notifications from stream processing using asynchronous Redis message queues."
      ],
      whatBrokeAndFix: [
        "Sensor noise and transient pressure waves caused false leak triggers; resolved by implementing rolling Kalman filtering and moving average thresholds."
      ],
      outcome: [
        "Sub-second leak isolation along simulated 50km pipeline spans",
        "Interactive geospatial dashboard with historical pressure replay"
      ],
      metrics: "Sub-second Leak Detection · 50km Simulation"
    },
    {
      id: "intervyo",
      name: "INTERVYO · AI MOCK INTERVIEWER",
      tag: "MULTIMODAL INTERVIEW COPILOT",
      category: "ai",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      problem: "Engineering students lack access to objective, high-cadence technical mock interviews with personalized behavioral and code critique.",
      architecture: "Interactive voice-enabled multimodal interview platform. Browser client streams audio via WebRTC/MediaStream to a streaming AI evaluator, generating structured feedback and scoring.",
      techStack: ["Next.js", "React", "TypeScript", "WebRTC", "Google Gemini API", "FastAPI", "Tailwind CSS"],
      keyDecisions: [
        "Streamed chunked token responses directly to Web Speech synthesizers to reduce perceived latency under 400ms.",
        "Structured Rubric enforcement to score responses against industry coding & system design standards."
      ],
      whatBrokeAndFix: [
        "Audio latency lag disrupted conversational turn-taking; solved by streaming chunked responses and optimistic UI feedback."
      ],
      outcome: [
        "Conducted automated mock coding and behavioral interviews with comprehensive end-of-session evaluation reports."
      ],
      metrics: "Under 400ms Turn Latency · AI Evaluation"
    },
    {
      id: "campus-os",
      name: "CAMPUS OS",
      tag: "COLLEGE OPERATING SYSTEM",
      category: "web",
      liveUrl: "https://github.com",
      githubUrl: "https://github.com",
      problem: "University notices, event registrations, and study materials were scattered across disconnected chat groups and physical noticeboards.",
      architecture: "Multi-tenant student hub built with Next.js, Node.js, and PostgreSQL with Role-Based Access Control (RBAC), real-time push notifications, and campus knowledge assistant.",
      techStack: ["Next.js", "React", "Node.js", "Express", "PostgreSQL", "Prisma", "Redis", "JWT Auth", "Docker"],
      keyDecisions: [
        "Role-Based Access Control (Student, Faculty, Club Lead, Admin) implemented with secure signed JWTs.",
        "Redis caching for high-traffic announcement queries."
      ],
      whatBrokeAndFix: [
        "Mass fest registration spike hit database connection limits on launch day; fixed with PgBouncer connection pooling and Redis queue buffering."
      ],
      outcome: [
        "Adopted by 2,000+ active campus students across 10+ college departments."
      ],
      metrics: "2,000+ Active Users · 99.9% Uptime"
    }
  ] as Project[],

  // 9-Chapter Narrative Experience (Story Mode)
  chapters: [
    {
      id: "ch01",
      num: "01",
      title: "THE OLD LAPTOP",
      subtitle: "Windows XP, dial-up sounds, and opening new worlds",
      era: "EARLY CURIOSITY",
      tag: "ORIGIN STORY",
      fileCode: "MEM_0001.XP",
      memory: "An old laptop in the house. Windows XP taking its sweet time to boot. I didn't know what an operating system was — I just knew this beige machine could open infinite worlds.",
      quote: "You don't need fancy machines to fall in love with computing. You just need curiosity and a keyboard.",
      learnings: [
        "Explored system file structures and early desktop customization",
        "Discovered that software wasn't magic — it was files, instructions, and logic"
      ],
      techFocus: ["Windows XP", "File Systems", "CMD", "Curiosity"]
    },
    {
      id: "ch02",
      num: "02",
      title: "THE ASTERISK TRIANGLE",
      subtitle: "When logic hides inside something visual",
      era: "FIRST CODE",
      tag: "THE SYNTAX SHIFT",
      fileCode: "MEM_0002.LOOP",
      memory: "I resented every asterisk of that nested loop star triangle in introductory programming. Until the day I saw it wasn't about stars — it was loops, memory pointers, pattern recognition, and control. Logic hiding inside something visual.",
      quote: "The moment a nested loop clicks, you realize you're no longer typing commands — you're orchestrating flow.",
      learnings: [
        "Mastered algorithmic control flow: nested loops, conditionals, array indexing",
        "Discovered the beauty of clean, predictable mathematical execution"
      ],
      techFocus: ["C / C++", "Algorithms", "Control Flow", "Memory"]
    },
    {
      id: "ch03",
      num: "03",
      title: "BREAKING TOYS",
      subtitle: "Inspect element, scripts, and the addiction of immediate feedback",
      era: "WEB EXPLORATION",
      tag: "TINKERING",
      fileCode: "MEM_0003.HTML",
      memory: "Opening browser DevTools for the first time. Editing text on live web pages and feeling like a hacker. Writing raw HTML, messy CSS, and JavaScript event listeners until the screen came alive.",
      quote: "The fastest way to learn how the web works is to break other people's websites in the browser console.",
      learnings: [
        "DOM manipulation and responsive layout mechanics",
        "The power of immediate visual feedback in frontend engineering"
      ],
      techFocus: ["JavaScript", "HTML5", "CSS3", "Browser DOM"]
    },
    {
      id: "ch04",
      num: "04",
      title: "CONSUMER TO BUILDER",
      subtitle: "Leaving the consumer seat forever",
      era: "TRANSITION",
      tag: "OWNERSHIP",
      fileCode: "MEM_0004.GIT",
      memory: "The turning point when consuming content and playing games stopped being fulfilling. The real thrill was building the game, running the server, handling the database queries, and publishing repositories to GitHub.",
      quote: "Building is an irreversible state change. Once you know you can build whatever you imagine, you never look back.",
      learnings: [
        "Git version control and collaborative branching strategies",
        "Full-stack architecture: connecting frontend clients to backend databases"
      ],
      techFocus: ["Git", "Node.js", "Express", "REST APIs"]
    },
    {
      id: "ch05",
      num: "05",
      title: "THE COLD SPRINT",
      subtitle: "36 hours, energy drinks, and shipping under pressure",
      era: "HACKATHONS",
      tag: "PRESSURE TESTS",
      fileCode: "MEM_0005.SPRINT",
      memory: "Stepping into university hackathon war rooms. 36 hours on the clock with red eyes, cold pizza, and Git merge conflicts at 3 AM. Learning that shipping a working MVP beats perfectionism every single time.",
      quote: "The pressure of a hackathon countdown is the best software engineering mentor in existence.",
      learnings: [
        "Rapid architecture decomposition and MVP prioritization",
        "Debugging production deployment failures under strict deadlines"
      ],
      techFocus: ["Docker", "Vercel", "FastAPI", "WebSockets"]
    },
    {
      id: "ch06",
      num: "06",
      title: "HOUR 51 OF 72",
      subtitle: "Where the real product decisions happen",
      era: "NATIONAL STAGES",
      tag: "ENDURANCE",
      fileCode: "MEM_0006.HACK",
      memory: "72 hours on the clock at a major national hackathon — and reaching the Top 5 among 100+ competing teams. Hour 51 is where real product decisions happen: made by whoever is still awake and still kind to their teammates.",
      quote: "Great software isn't just written by brains — it's written by teams who don't crack when the clock hits zero.",
      learnings: [
        "Managing fatigue and cross-functional team communication",
        "Deterministic fallbacks for third-party API downtime during live demo judging"
      ],
      techFocus: ["PostgreSQL", "Redis", "Resilience", "State Machines"]
    },
    {
      id: "ch07",
      num: "07",
      title: "RUNNING THE ROOM",
      subtitle: "Scaling from 1,100 to 2,300+ developers",
      era: "COMMUNITY LEADERSHIP",
      tag: "COMMUNITY SCALE",
      fileCode: "MEM_0007.GDG",
      memory: "Standing on stage in the university auditorium with a microphone before hundreds of student builders. Scaling our campus developer community from 1,100 to over 2,300 members across 15+ hands-on cloud study jams and hackathons.",
      quote: "Leadership isn't having answers — it's rallying smart builders around ambitious, intimidating technical goals.",
      learnings: [
        "Technical storytelling and demystifying complex cloud architectures",
        "Organizing multi-track developer conferences and judging hackathons"
      ],
      techFocus: ["Cloud Architecture", "Mentorship", "Public Speaking", "DevRel"]
    },
    {
      id: "ch08",
      num: "08",
      title: "THE VOICE LAB",
      subtitle: "Voice-first engineering: thoughts at 3x typing velocity",
      era: "VELOCITY",
      tag: "WISPR FLOW",
      fileCode: "MEM_0008.VOICE",
      memory: "Adopting Wispr Flow voice dictation to build by speaking. Instead of typing slowly with syntax friction, I talk complex architectural thoughts out loud into voice dictation. Thoughts flow 3x faster than fingers, unlocking stream-of-consciousness engineering.",
      quote: "When you eliminate keyboard friction, your brain stops worrying about commas and starts orchestrating systems.",
      learnings: [
        "Architectural prompt structuring and high-cadence rapid prototyping",
        "Building multimodal voice interfaces with Web Speech and MediaStream APIs"
      ],
      techFocus: ["Wispr Flow", "Web Speech API", "LLMs", "Audio Synthesis"]
    },
    {
      id: "ch09",
      num: "09",
      title: "THE SYSTEM BUILDER",
      subtitle: "'Then I stopped building projects and started building systems.'",
      era: "PRESENT ERA",
      tag: "SYSTEMS ARCHITECTURE",
      fileCode: "MEM_0009.OBS",
      memory: "A project ends when the hackathon ends. A system keeps running, self-heals, isolates faults, and scales. Resilience OS, LinqChain, and industrial pipeline telemetry: engineering where failure is the expected state and resilience is the verified guarantee.",
      quote: "Toy projects assume sunshine. Real software assumes the database just crashed and the network is partitioned.",
      learnings: [
        "Deterministic state machines and circuit breakers",
        "Fault isolation: microservices, distributed queues, and optimistic caches"
      ],
      techFocus: ["Distributed Systems", "Fault Tolerance", "Telemetry", "Clean Architecture"]
    }
  ] as Chapter[],

  // Interactive Voice Assistant Q&A dossiers
  interviewQnA: [
    {
      id: "journey",
      label: "My Engineering Journey",
      query: "Can you tell me about yourself, your background, and your engineering journey?",
      answer: "I am a full-stack engineer and systems builder specializing in deterministic, fault-tolerant distributed applications and sleek, responsive user interfaces. My journey began with curiosity on an old Windows XP laptop, matured through high-pressure national hackathons, and expanded into community leadership where I scaled a developer chapter to 2,300+ members. Today, I build systems that don't crumble under stress.",
      tags: ["Background", "Philosophy", "Systems"],
      keyPoints: [
        "Passionate about deterministic state and fault tolerance",
        "National hackathon finalist across 100+ competing engineering teams",
        "Voice-first builder iterating at 3x velocity using Wispr Flow"
      ]
    },
    {
      id: "resilience",
      label: "Explain LinqChain (Resilience OS)",
      query: "What is LinqChain (Resilience OS) and how did you architect its supply chain simulation?",
      answer: "LinqChain was our National Finalist project at the hackathon. It's an intelligent supply chain command center designed to simulate and mitigate cascading tier-N supplier disruptions. We built the interactive control room with Next.js and XYFlow graphs, while a Python FastAPI microservice ran topological graph traversals. We decoupled ingestion from simulation and used PgBouncer connection pooling to survive sudden spike cascades.",
      tags: ["Distributed Systems", "FastAPI", "Next.js", "Hackathon Finalist"],
      keyPoints: [
        "Simulates 500+ supply nodes with sub-100ms cascade latencies",
        "Decoupled telemetry ingestion from simulation engine to avoid starvation",
        "Resolved early connection pool crashes using PgBouncer and bulk batching"
      ]
    },
    {
      id: "finassist",
      label: "Explain FinAssist AI Copilot",
      query: "How does FinAssist AI Copilot prevent financial hallucinations and calculate real-time risk?",
      answer: "FinAssist is an AI-powered financial advisory copilot. It combines a Next.js/Recharts frontend with a FastAPI microservice that computes mathematical risk metrics like Sharpe Ratio and Value-at-Risk. To prevent LLM hallucinations, we implemented strict LangChain RAG guardrails that mandate citations to primary source balance sheets and regulatory filings.",
      tags: ["AI & RAG", "LangChain", "FastAPI", "Risk Analytics"],
      keyPoints: [
        "Multi-asset historical price forecasting and portfolio health scoring",
        "Strict RAG guardrails preventing generative hallucination",
        "Redis caching with exponential backoff to handle rate limits"
      ]
    },
    {
      id: "pravah",
      label: "Explain Project Pravah (Pipeline IoT)",
      query: "Walk me through the IoT telemetry pipeline of Project Pravah.",
      answer: "Project Pravah was developed for industrial pipeline telemetry. Crude oil pipelines suffer pressure leaks and illegal tapping across thousands of kilometers. We built an IoT anomaly detection pipeline where sensors stream telemetry over MQTT and WebSockets to a TimescaleDB database. Rolling Kalman filters remove transient pressure spikes, isolating leaks in under one second.",
      tags: ["Industrial IoT", "WebSockets", "TimescaleDB", "Kalman Filter"],
      keyPoints: [
        "Real-time sensor telemetry over MQTT and persistent WebSockets",
        "Rolling Kalman filtering eliminated false alarm triggers from pressure waves",
        "Geospatial alert mapping with historical pressure replay"
      ]
    },
    {
      id: "voice",
      label: "Why Build by Speaking (Wispr Flow)?",
      query: "Why do you emphasize voice-first engineering with Wispr Flow?",
      answer: "Typing is a 60-word-per-minute bottleneck for thoughts that move at 180 words per minute. By using Wispr Flow voice dictation, I talk through architectural specifications, prompt generation, and code iteration out loud. Speaking removes syntax friction and allows stream-of-consciousness engineering where I focus purely on system design.",
      tags: ["Wispr Flow", "Voice AI", "Productivity", "Velocity"],
      keyPoints: [
        "3x faster thought-to-prompt iteration speed",
        "Reduces keyboard ergonomics friction during long engineering sessions",
        "Enables rapid architectural exploration and documentation"
      ]
    },
    {
      id: "stack",
      label: "Core Tech Stack & Philosophy",
      query: "What is your primary technology stack and technical philosophy?",
      answer: "On the frontend: React, Next.js, TypeScript, and Tailwind CSS for snappy 60fps interfaces. On the backend: Python (FastAPI) and Node.js for high-throughput APIs, backed by PostgreSQL, TimescaleDB, and Redis. My philosophy is 'failure-first engineering': expect every network call to time out, every database pool to fill, and design deterministic fallbacks so the user never sees a broken screen.",
      tags: ["Tech Stack", "TypeScript", "Python", "System Design"],
      keyPoints: [
        "End-to-end type safety with TypeScript and Pydantic",
        "Non-blocking asynchronous I/O with Redis caching and message queues",
        "Zero-bloat architecture: prioritizing speed, predictability, and clean state"
      ]
    }
  ] as InterviewQnA[],

  // Milestones & Real-World Proof
  milestones: [
    {
      id: "hackfest-national",
      organization: "National Hackathon 2026",
      roleOrAchievement: "National Finalist — Built LinqChain (Resilience OS)",
      category: "Hackathons",
      date: "FEB 2026",
      badge: "National Finalist",
      description: "Pitched and demonstrated LinqChain supply chain disruption simulation platform before senior enterprise judges.",
      location: "Finals Arena",
      verifiedStats: "Top 5 of 100+ Teams"
    },
    {
      id: "gdg-lead",
      organization: "Google Developer Groups on Campus",
      roleOrAchievement: "Lead Organizer & Community Speaker",
      category: "Leadership",
      date: "2024 – PRESENT",
      badge: "Community Lead",
      description: "Grew student developer chapter from 1,100 to over 2,300 active members. Led 15+ hands-on technical workshops and hackathons.",
      location: "Main Campus Auditorium",
      verifiedStats: "2,300+ Members · 15+ Events"
    },
    {
      id: "cloud-cert",
      organization: "Cloud Certification",
      roleOrAchievement: "Certified Cloud Developer Professional",
      category: "Certifications",
      date: "2025",
      badge: "Professional Certified",
      description: "Demonstrated expertise in cloud architecture, IAM security, container orchestration, and serverless compute pipelines.",
      location: "Global Credential",
      verifiedStats: "Verified Professional"
    },
    {
      id: "dev-intern",
      organization: "Software Engineering Intern",
      roleOrAchievement: "Frontend & Full-Stack Intern",
      category: "Work",
      date: "2025",
      badge: "Certified Completion",
      description: "Engineered responsive web applications, optimized client-side bundle performance by 35%, and integrated REST APIs.",
      location: "Remote",
      verifiedStats: "Production Impact"
    }
  ] as Milestone[],

  // Terminal commands and answers
  terminal: {
    welcomeMessage: "Windows PowerShell v7.4.2 [Ask Aayush Terminal]\nType 'help' to see available commands or ask questions directly.\n",
    commands: {
      help: "Available commands:\n  help        - Show this manual\n  whoami      - Developer bio and credentials\n  projects    - List engineering projects\n  skills      - List core technical stack\n  story       - 9-chapter journey logs\n  interview   - Launch AI voice interviewer\n  milestones  - Real-world proof & hackathon wins\n  contact     - Get email and social handles\n  clear       - Clear terminal buffer\n  sudo hire   - Fast-track offer pipeline",
      whoami: "Aayush Askandani — Full-Stack Engineer & Systems Builder.\nSpecializing in deterministic systems, resilient APIs, and high-cadence interfaces.",
      projects: "1. LINQCHAIN · RESILIENCE OS (Supply Chain Simulation - National Finalist)\n2. FINASSIST (AI Financial Analytics Copilot)\n3. PROJECT PRAVAH (IoT Pipeline Telemetry)\n4. INTERVYO (AI Mock Interviewer)\n5. CAMPUS OS (University Multi-tenant Hub)\nInspect BUILDER_LAB.EXE for architectural dossiers.",
      skills: "Frontend: React, Next.js, TypeScript, Tailwind CSS\nBackend: Node.js, Express, Python, FastAPI\nDatabases: PostgreSQL, Redis, TimescaleDB\nCloud & Tools: Docker, AWS, Git, WebSockets, Linux",
      story: "9 Chapters available: CH01 (Old Laptop) through CH09 (System Builder).\nInspect STORY_MODE.EXE or modern story section for complete narrative files.",
      interview: "Interactive AI Voice Interviewer active. Ask questions about architecture, decisions, and tech stack.",
      milestones: "• National Finalist: National HackFest 2026 (LinqChain)\n• Lead Organizer: Google Developer Groups (2,300+ members)\n• Professional Cloud Certified 2025\n• SDE Intern: Production UI & Performance Optimization",
      contact: "Email: aayushaskandani@gmail.com\nGitHub: https://github.com/aayushaskandani\nLinkedIn: https://linkedin.com/in/aayush-askandani",
      "sudo hire": "ACCESS GRANTED: Priority pipeline unlocked. Send an offer to aayushaskandani@gmail.com. Looking forward to building exceptional systems together!",
    }
  }
};
