import { Project, ArsenalSkill, Milestone, Chapter, InterviewQnA } from '../types';

export const portfolioConfig = {
  // Identity & Branding
  personal: {
    name: "Aayush Askandani",
    title: "Full-Stack Software Engineer & Systems Builder",
    greeting: "Hello, I'm",
    shortBio: "B.Tech CSE student at Poornima University & Google Cloud Arcade Legend (359 labs, 121 badges, 55k+ points). Building deterministic distributed web applications, real-time collaboration platforms, and high-throughput APIs with React 19, Node.js, Express, PostgreSQL, Redis, and FastAPI.",
    philosophy: "I believe modern software isn't just about throwing APIs together. It's about deterministic state, resilience under failure, and crafting interfaces that feel as intuitive and fluid as human thought.",
    location: "Jaipur, Rajasthan, India",
    email: "aayushaskandani64@gmail.com",
    phone: "+91 85049 54425",
    github: "https://github.com/aayushaskandani",
    linkedin: "https://linkedin.com/in/aayush-askandani",
    leetcode: "https://leetcode.com/u/AayushAskandani",
    twitter: "https://twitter.com",
    resumeUrl: "/Aayush_Askandani_Resume.pdf",
    statusBadge: "OPEN FOR SDE INTERNSHIPS & FULL-STACK ROLES",
  },

  // 12 Boxes for Engineering Arsenal (Interactive Click-to-Craft)
  arsenal: [
    { name: "React 19 / Vite", category: "Frontend" },
    { name: "Node.js / Express", category: "Backend" },
    { name: "Python / FastAPI", category: "Backend / AI" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Redis (Cache-Aside)", category: "Cache / Queues" },
    { name: "Socket.IO (Real-Time)", category: "WebSockets" },
    { name: "Docker", category: "DevOps / Infra" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "PWA / Service Workers", category: "Offline-First" },
    { name: "Java & Core DSA", category: "Languages" },
    { name: "Claude API / LLMs", category: "AI Engineering" },
    { name: "Google Cloud / Linux", category: "Cloud & Ops" },
  ] as ArsenalSkill[],

  // Featured Projects (with deep technical dossiers)
  projects: [
    {
      id: "linkforge",
      name: "LINKFORGE · URL SHORTENER & BIO-LINK",
      tag: "HIGH-THROUGHPUT URL PLATFORM",
      category: "systems",
      liveUrl: "https://link-forge-webapp.vercel.app",
      githubUrl: "https://github.com/aayushaskandani/LinkForge",
      problem: "Standard URL shorteners struggle under viral redirect bursts, slow database lookups, and abusive scraping without rate limiting or asynchronous analytics.",
      architecture: "Tiered redirect engine with Redis cache-aside layer in front of PostgreSQL. Base62 URL encoding generates compact keys. Asynchronous non-blocking click logging queues analytics (device, referrer, geo) without delaying the 302 HTTP redirect. Includes dynamic QR code generator and drag-and-drop bio-link page builder.",
      techStack: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Redis", "JWT Auth", "Tailwind CSS"],
      keyDecisions: [
        "Implemented Redis cache-aside layer: repeat lookups for popular links skip the database entirely for sub-15ms redirects.",
        "Sliding-window rate limiter in Redis to cap abusive request bursts and prevent denial-of-service.",
        "Asynchronous click logging pipeline so 302 redirects are never blocked while view counts and referrer data are recorded.",
        "Base62 encoding scheme generating compact, collision-resistant 6-7 character alphanumeric URL keys."
      ],
      whatBrokeAndFix: [
        "Viral redirect spike hit PostgreSQL connection limits; solved with Redis cache-aside with 24h TTL and connection pooling.",
        "Rate limiter race conditions under high concurrent bursts; switched from naive GET/SET to atomic Redis sliding-window Lua scripts."
      ],
      outcome: [
        "Sub-15ms redirect latencies with zero DB hits on cached routes",
        "Complete bio-link page builder and on-the-fly QR code generation",
        "Production deployment on Vercel with real-time analytics"
      ],
      metrics: "Sub-15ms Redirects · Redis Cache-Aside · Async Analytics"
    },
    {
      id: "syncboard",
      name: "SYNCBOARD · REAL-TIME COLLABORATIVE KANBAN",
      tag: "REAL-TIME KANBAN & WEBSOCKETS",
      category: "systems",
      liveUrl: "https://syncboard-2byi.onrender.com",
      githubUrl: "https://github.com/aayushaskandani/syncboard",
      problem: "Multi-user project boards suffer from laggy drag-and-drop feel, expensive database renumbering when cards move, and broad WebSocket event noise across unrelated boards.",
      architecture: "Real-time event-driven architecture using React 19 optimistic UI updates, WebSocket communication via board-scoped Socket.IO rooms, and PostgreSQL with a mathematical fractional-indexing ordering scheme.",
      techStack: ["React 19", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Socket.IO", "Docker"],
      keyDecisions: [
        "Designed a fractional-indexing scheme in PostgreSQL for card ordering, so re-positioning a card only touches that one row instead of renumbering the whole column (O(1) instead of O(N)).",
        "Used Socket.IO rooms scoped per board so presence indicators, card moves, and edit-in-progress broadcast only to users viewing that board.",
        "Implemented optimistic UI updates in React 19 so drag-and-drop actions feel instant while the server confirms in the background.",
        "Deployed full stack (Vite SPA + Node API/WebSockets) as a unified Render service to simplify solo-maintained production."
      ],
      whatBrokeAndFix: [
        "Consecutive rapid card drops between two cards depleted floating-point precision; added a fractional rebalancing routine when epsilon drops below threshold.",
        "Concurrent multi-user drag conflicts; resolved using optimistic state with server timestamp-based rollback reconciliation."
      ],
      outcome: [
        "Zero perceived drag-and-drop latency with instant optimistic UI",
        "O(1) database card repositioning at scale",
        "Isolated multi-room Socket.IO presence without global broadcast overhead"
      ],
      metrics: "O(1) Fractional Indexing · React 19 · Scoped WebSockets"
    },
    {
      id: "trekpedia",
      name: "TREKPEDIA · MOUNTAIN TREK ENCYCLOPEDIA",
      tag: "OFFLINE PWA & CLAUDE AI",
      category: "ai",
      liveUrl: "https://trekpedia.netlify.app",
      githubUrl: "https://github.com/aayushaskandani/TrekPedia",
      problem: "Trekkers and high-altitude hikers frequently lose cellular connectivity in mountain valleys, making online maps, route guides, and emergency checklists inaccessible.",
      architecture: "Offline-first Progressive Web App (PWA) with Service Worker caching, interactive Leaflet.js topographical route mapping across 210+ Himalayan treks, Supabase auth/data storage, and Claude API for conversational natural-language exploration.",
      techStack: ["JavaScript", "Supabase", "Leaflet.js", "Claude API", "PWA", "Service Workers", "Tailwind CSS"],
      keyDecisions: [
        "Configured as an installable Progressive Web App (PWA) with custom service worker and CacheStorage for offline survival (checklists, routes, offline maps).",
        "Integrated Claude API to power natural-language trek search, letting users describe what they want (difficulty, season, region) instead of filtering through rigid dropdowns.",
        "Interactive route maps across 210+ routes in India, Nepal, and Bhutan rendered with Leaflet.js.",
        "Built a community review system and side-by-side trek comparison engine."
      ],
      whatBrokeAndFix: [
        "Large GPX route files caused high initial load times and laggy mobile map panning; resolved by simplifying GeoJSON coordinate paths with Ramer-Douglas-Peucker algorithm and lazy loading route coordinates.",
        "Service worker cache versioning occasionally served stale trek data; implemented network-first with background cache updating for active online sessions."
      ],
      outcome: [
        "210+ curated routes across India, Nepal, and Bhutan",
        "100% offline functionality for saved expeditions and checklists",
        "Conversational AI search powered by Claude API"
      ],
      metrics: "210+ Himalayan Treks · PWA Offline-First · Claude API"
    },
    {
      id: "cloud-arcade-infra",
      name: "CLOUD LABS & DEVOPS INFRASTRUCTURE",
      tag: "INFRASTRUCTURE & ORCHESTRATION",
      category: "systems",
      liveUrl: "https://github.com/aayushaskandani",
      githubUrl: "https://github.com/aayushaskandani",
      problem: "Scaling cloud architectures requires deep mastery over IAM security boundaries, containerized microservices, high-availability VPC networks, and serverless compute pipelines.",
      architecture: "Engineered and executed 359 hands-on cloud labs across Google Cloud: automated CI/CD with GitHub Actions, container orchestration with Docker & Cloud Run, BigQuery data analytics pipelines, and secure IAM policy enforcement.",
      techStack: ["Google Cloud", "Docker", "Linux", "BigQuery", "GitHub Actions", "IAM", "PostgreSQL"],
      keyDecisions: [
        "Achieved Google Cloud Arcade Legend status with 55,267 points across 359 labs and 76 courses.",
        "Implemented least-privilege IAM policies and secret manager injection in containerized deployments.",
        "Automated deployment workflows with GitHub Actions pipelines."
      ],
      whatBrokeAndFix: [
        "Container cold-start latency on serverless compute; solved by minimizing container base images (Alpine/Distroless) and keeping minimum warm instances."
      ],
      outcome: [
        "359 Hands-on Labs & 76 Courses completed",
        "121 Verified Skill Badges earned",
        "55,267 Total Arcade Points achieved"
      ],
      metrics: "359 Labs · 121 Skill Badges · 55,267 Points"
    },
    {
      id: "gdg-community-engine",
      name: "GDG CAMPUS DEVELOPER NETWORK",
      tag: "CAMPUS TECHNICAL PLATFORM",
      category: "web",
      liveUrl: "https://linkedin.com/in/aayush-askandani",
      githubUrl: "https://github.com/aayushaskandani",
      problem: "University student developers needed structured technical roadmaps, hands-on cloud workshops, and collaborative project development environments.",
      architecture: "Community leadership and education ecosystem coordinating 200+ students at Poornima University. Conducts live technical bootcamps, DSA code walkthroughs, and hands-on Google Cloud Study Jams.",
      techStack: ["Java", "Python", "React", "Google Cloud", "Community Mentorship", "Git"],
      keyDecisions: [
        "Designed structured project development tracks for junior students covering core CS fundamentals.",
        "Organized hands-on technical workshops demystifying modern cloud and full-stack architectures."
      ],
      whatBrokeAndFix: [
        "Student onboarding friction with local dev environments; resolved by standardizing on GitHub Codespaces and Docker development containers."
      ],
      outcome: [
        "200+ Student Developers actively coordinated and mentored",
        "Multiple cloud study jams and hands-on technical bootcamps conducted"
      ],
      metrics: "200+ Student Developers · Training Lead"
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
      memory: "An old laptop in the house. Windows XP taking its sweet time to boot. I didn't know what an operating system was — I just knew this machine could open infinite worlds of curiosity.",
      quote: "You don't need fancy machines to fall in love with computing. You just need curiosity and a keyboard.",
      learnings: [
        "Explored system file structures, batch scripts, and desktop customization",
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
      memory: "I remember struggling with nested loop star patterns in introductory programming. Until the day it clicked: it wasn't about stars — it was loops, memory pointers, pattern recognition, and control flow. Logic hiding inside something visual.",
      quote: "The moment a nested loop clicks, you realize you're no longer typing commands — you're orchestrating flow.",
      learnings: [
        "Mastered algorithmic control flow: nested loops, conditionals, array indexing",
        "Discovered the beauty of clean, predictable mathematical execution in Java and Python"
      ],
      techFocus: ["Java", "Python", "Algorithms", "Control Flow"]
    },
    {
      id: "ch03",
      num: "03",
      title: "BREAKING TOYS",
      subtitle: "Inspect element, scripts, and the addiction of immediate feedback",
      era: "WEB EXPLORATION",
      tag: "TINKERING",
      fileCode: "MEM_0003.HTML",
      memory: "Opening browser DevTools for the first time. Editing text on live web pages and feeling like a wizard. Writing raw HTML, CSS styling, and JavaScript event listeners until the screen came alive.",
      quote: "The fastest way to learn how the web works is to inspect, tinker, and understand how the browser renders state.",
      learnings: [
        "DOM manipulation and responsive layout mechanics with Tailwind CSS",
        "The power of immediate visual feedback in frontend engineering"
      ],
      techFocus: ["JavaScript", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
      id: "ch04",
      num: "04",
      title: "CONSUMER TO BUILDER",
      subtitle: "Leaving the consumer seat forever",
      era: "TRANSITION",
      tag: "OWNERSHIP",
      fileCode: "MEM_0004.GIT",
      memory: "The turning point when consuming content and playing games stopped being fulfilling. The real thrill was building the app, running the backend server, designing PostgreSQL schemas, and publishing repositories to GitHub.",
      quote: "Building is an irreversible state change. Once you know you can build whatever you imagine, you never look back.",
      learnings: [
        "Git version control, collaborative branching, and GitHub workflows",
        "Full-stack architecture: connecting React frontends to Node.js/Express and PostgreSQL"
      ],
      techFocus: ["Git", "Node.js", "Express", "PostgreSQL", "REST APIs"]
    },
    {
      id: "ch05",
      num: "05",
      title: "THE CLOUD ODYSSEY",
      subtitle: "359 labs, 76 courses, and earning Arcade Legend",
      era: "CLOUD MASTERY",
      tag: "CLOUD SCALE",
      fileCode: "MEM_0005.CLOUD",
      memory: "Diving headfirst into Google Cloud architecture. Completing 359 hands-on labs and 76 courses: provisioning VPC networks, containerizing microservices with Docker, deploying BigQuery pipelines, and earning 121 skill badges with 55,267 Arcade points to become a Google Cloud Arcade Legend.",
      quote: "Infrastructure isn't an afterthought. Understanding the cloud transforms you from a code writer into a systems architect.",
      learnings: [
        "Mastered containerization with Docker and container orchestration",
        "IAM security, serverless compute, and cloud data analytics pipelines"
      ],
      techFocus: ["Google Cloud", "Docker", "Linux", "BigQuery", "DevOps"]
    },
    {
      id: "ch06",
      num: "06",
      title: "LEADERSHIP & GDG",
      subtitle: "Coordinating 200+ student developers at Poornima University",
      era: "COMMUNITY LEADERSHIP",
      tag: "COMMUNITY SCALE",
      fileCode: "MEM_0006.GDG",
      memory: "Stepping up as Community Coordinator & Training Lead for Google Developer Groups on Campus. Coordinating a community of 200+ students, organizing cloud study jams, and mentoring junior peers on core CS fundamentals and project architecture.",
      quote: "Leadership isn't about having all the answers — it's about creating spaces where smart builders can solve hard problems together.",
      learnings: [
        "Technical communication, public speaking, and workshop facilitation",
        "Mentoring students on DSA, object-oriented design, and full-stack web development"
      ],
      techFocus: ["Community Leadership", "Google Cloud", "Mentorship", "Public Speaking"]
    },
    {
      id: "ch07",
      num: "07",
      title: "LINKFORGE: SOLVING TRAFFIC",
      subtitle: "Base62, Redis cache-aside, and sub-15ms redirects",
      era: "PRODUCTION SYSTEMS",
      tag: "HIGH PERFORMANCE",
      fileCode: "MEM_0007.LINK",
      memory: "Building LinkForge to solve high-throughput URL shortening and bio-link pages. Implementing Base62 encoding, an atomic Redis sliding-window rate limiter, and a cache-aside layer that drops redirect latency under 15ms while asynchronously streaming click analytics.",
      quote: "Don't hit the database when memory can answer in single-digit milliseconds.",
      learnings: [
        "Redis cache-aside caching patterns and sliding-window rate limiters",
        "Asynchronous click telemetry pipelines that never block client HTTP redirects"
      ],
      techFocus: ["Redis", "PostgreSQL", "Express", "Base62", "JWT Auth"]
    },
    {
      id: "ch08",
      num: "08",
      title: "SYNCBOARD: REAL-TIME FLOW",
      subtitle: "React 19, O(1) fractional indexing, and scoped WebSockets",
      era: "REAL-TIME ARCHITECTURE",
      tag: "CONCURRENCY",
      fileCode: "MEM_0008.SYNC",
      memory: "Architecting SyncBoard, a collaborative real-time Kanban platform. Solving card repositioning with a mathematical fractional-indexing scheme in PostgreSQL (O(1) row update instead of renumbering the whole column), paired with board-scoped Socket.IO rooms and React 19 optimistic UI.",
      quote: "Good system design avoids work before it begins. O(1) updates beat brute-force column renumbering every single time.",
      learnings: [
        "Mathematical fractional indexing for frictionless drag-and-drop order persistence",
        "Optimistic UI state management in React 19 with rollback reconciliation"
      ],
      techFocus: ["React 19", "Socket.IO", "PostgreSQL", "Docker", "Render"]
    },
    {
      id: "ch09",
      num: "09",
      title: "THE SYSTEMS BUILDER",
      subtitle: "TrekPedia offline PWA, Claude AI, and failure-first engineering",
      era: "PRESENT ERA",
      tag: "ENGINEERING PHILOSOPHY",
      fileCode: "MEM_0009.SYS",
      memory: "Engineering TrekPedia with 210+ Himalayan routes: integrating Claude API for natural-language search, and building a custom service worker CacheStorage engine so trekkers high in the Himalayas can access route maps without an internet connection. Software designed for real-world conditions.",
      quote: "Toy projects assume sunshine. Real software assumes the network dropped, the server restarted, and still delivers a flawless experience.",
      learnings: [
        "Offline-first PWA architectures with service worker caching strategies",
        "Natural-language query decomposition using LLM APIs"
      ],
      techFocus: ["Claude API", "PWA", "Service Workers", "Leaflet.js", "Supabase"]
    }
  ] as Chapter[],

  // Interactive Voice Assistant Q&A dossiers
  interviewQnA: [
    {
      id: "jarvis",
      label: "J.A.R.V.I.S., evaluate Aayush's code",
      query: "J.A.R.V.I.S., run full diagnostic analysis on Aayush Askandani's engineering capabilities.",
      answer: "Online and at your service, Sir. Accessing personnel dossier for Aayush Askandani: B.Tech CSE student at Poornima University and Google Cloud Arcade Legend with 359 completed cloud labs and 55,267 points. Diagnostic analysis reveals sub-15ms Redis cache-aside pipelines in LinkForge, O(1) mathematical fractional indexing in SyncBoard, and 100% offline Himalayan navigation in TrekPedia with Claude AI. Diagnostic verdict: operates with top-tier systems velocity and fault tolerance. Highly recommended for production engineering divisions, Sir.",
      tags: ["J.A.R.V.I.S.", "Stark AI", "Diagnostics"],
      keyPoints: [
        "Arc Reactor speed: sub-15ms redirect caching pipelines",
        "359 Google Cloud labs completed across containerization and big data",
        "Full-stack real-time collaboration with Socket.IO and React 19"
      ]
    },
    {
      id: "journey",
      label: "My Background & Engineering Journey",
      query: "Can you tell me about yourself, your background, and your engineering journey?",
      answer: "I am Aayush Askandani, a B.Tech Computer Science student at Poornima University, Google Cloud Arcade Legend, and Community Coordinator at GDG on Campus. I specialize in building deterministic, high-throughput web applications and real-time collaboration platforms with React 19, Node.js, Express, PostgreSQL, Redis, and FastAPI. My focus is writing clean, failure-resilient software that scales smoothly under real traffic.",
      tags: ["Background", "Poornima University", "Full-Stack"],
      keyPoints: [
        "B.Tech CSE student at Poornima University (2024–2028, CGPA 7.7)",
        "Google Cloud Arcade Legend: 359 labs, 76 courses, 121 badges, 55k+ points",
        "Community Coordinator & Training Lead at GDG on Campus (200+ students)"
      ]
    },
    {
      id: "linkforge",
      label: "Explain LinkForge (URL Platform)",
      query: "What is LinkForge and how did you architect its high-throughput redirect and caching system?",
      answer: "LinkForge is a production-ready URL shortener and bio-link platform. I built it on Node.js/Express, PostgreSQL, and Redis. It uses Base62 encoding to generate collision-resistant short keys, and places a Redis cache-aside layer in front of the redirect endpoint so repeat lookups skip the database entirely for sub-15ms redirects. It also features a sliding-window rate limiter in Redis to stop abusive bursts and an asynchronous click logging pipeline so view counts and referrer data are recorded without delaying the client redirect.",
      tags: ["LinkForge", "Redis", "PostgreSQL", "Base62", "Caching"],
      keyPoints: [
        "Sub-15ms redirect latency via Redis cache-aside layer",
        "Sliding-window rate limiter in Redis capping client request bursts",
        "Non-blocking asynchronous click telemetry pipeline",
        "React/Vite bio-link tree builder with on-the-fly QR code generation"
      ]
    },
    {
      id: "syncboard",
      label: "Explain SyncBoard (Real-Time Kanban)",
      query: "How does SyncBoard handle real-time Kanban collaboration and O(1) card ordering?",
      answer: "SyncBoard is a real-time collaborative Kanban platform built with React 19, Node.js, PostgreSQL, and Socket.IO. When cards are dragged and dropped, rather than renumbering every card in the column (an expensive O(N) database update), I designed a fractional-indexing scheme in PostgreSQL where repositioning only updates that single card's index (O(1)). On the frontend, React 19 optimistic updates make moves feel instantaneous, while Socket.IO rooms are scoped per board so events broadcast only to users viewing that board.",
      tags: ["SyncBoard", "React 19", "Socket.IO", "PostgreSQL", "Real-Time"],
      keyPoints: [
        "O(1) card repositioning via mathematical fractional indexing in PostgreSQL",
        "Optimistic UI updates in React 19 with background server validation",
        "Board-scoped Socket.IO rooms eliminating global event broadcast overhead",
        "Full-stack containerized single-service deployment on Render"
      ]
    },
    {
      id: "trekpedia",
      label: "Explain TrekPedia (Offline PWA & Claude AI)",
      query: "How does TrekPedia work offline in the Himalayas and how is Claude API integrated?",
      answer: "TrekPedia is a mountain trek encyclopedia covering 210+ routes across India, Nepal, and Bhutan. Since cellular connectivity vanishes in remote mountain valleys, I architected it as an installable Progressive Web App (PWA) with a custom service worker and CacheStorage, keeping saved routes, elevation profiles, and gear checklists accessible without a connection. I also integrated the Claude API for natural-language search, allowing trekkers to describe what they want in plain English instead of wrestling with rigid dropdown filters.",
      tags: ["TrekPedia", "Claude API", "PWA", "Service Workers", "Leaflet.js"],
      keyPoints: [
        "Offline-first PWA with service worker caching for 210+ Himalayan routes",
        "Claude API natural-language search translating conversational prompts into routes",
        "Interactive route maps rendered with Leaflet.js and dynamic elevation data",
        "Side-by-side trek comparison engine and verified community review system"
      ]
    },
    {
      id: "cloud-leadership",
      label: "Google Cloud Arcade Legend & GDG Leadership",
      query: "Tell me about your Google Cloud Arcade Legend achievement and GDG leadership.",
      answer: "I achieved Google Cloud Arcade Legend status by completing 359 hands-on cloud labs and 76 courses, earning 121 verified skill badges and over 55,000 Arcade points. This gave me deep practical experience in containerization with Docker, IAM security, BigQuery analytics, and serverless architectures. Concurrently, as Community Coordinator & Training Lead at GDG on Campus, I coordinate a community of 200+ students at Poornima University, conducting hands-on technical workshops and mentoring peers in core CS and full-stack development.",
      tags: ["Google Cloud", "Arcade Legend", "Leadership", "GDG on Campus"],
      keyPoints: [
        "Completed 359 hands-on cloud labs and 76 courses (121 skill badges)",
        "Coordinates 200+ student developers at Poornima University GDG chapter",
        "Organizes hands-on cloud study jams and mentors junior students in DSA"
      ]
    },
    {
      id: "stack",
      label: "Core Tech Stack & Engineering Philosophy",
      query: "What is your primary technology stack and engineering philosophy?",
      answer: "My core stack includes Java, Python, and JavaScript/TypeScript across React 19, Tailwind CSS, Node.js/Express, FastAPI, PostgreSQL, and Redis. My philosophy centers on 'failure-first engineering': anticipating network dropouts, connection limits, and concurrency races at the design phase. Whether using Redis cache-aside, fractional indexing, or service worker caching, I engineer systems that remain fast, deterministic, and dependable under real-world conditions.",
      tags: ["Tech Stack", "Engineering Philosophy", "System Design"],
      keyPoints: [
        "Languages: Java, Python, JavaScript, TypeScript",
        "Backend & DB: Node.js, Express, FastAPI, PostgreSQL, Redis, Socket.IO",
        "Frontend: React 19, Tailwind CSS, Vite, Leaflet.js, PWA",
        "Philosophy: Deterministic state, O(1) optimizations, failure-resilient architecture"
      ]
    }
  ] as InterviewQnA[],

  // Milestones & Real-World Proof
  milestones: [
    {
      id: "gcp-legend",
      organization: "Google Cloud",
      roleOrAchievement: "Google Cloud Arcade Legend",
      category: "Certifications",
      date: "2025",
      badge: "Arcade Legend",
      description: "Completed 359 hands-on labs and 76 courses across Google Cloud, mastering containerization, IAM security, cloud architecture, and data pipelines. Earned 121 skill badges and 55,267 Arcade points.",
      location: "Google Cloud Skills Boost",
      verifiedStats: "359 Labs · 121 Badges · 55k+ Points"
    },
    {
      id: "gdg-coord",
      organization: "Google Developer Groups on Campus",
      roleOrAchievement: "Community Coordinator & Training Lead",
      category: "Leadership",
      date: "AUG 2025 – PRESENT",
      badge: "Community Coordinator",
      description: "Coordinate a campus community of 200+ student developers at Poornima University. Organize technical workshops, Google Cloud study jams, and mentor junior students on core CS fundamentals and project building.",
      location: "Poornima University, Jaipur",
      verifiedStats: "200+ Students Coordinated"
    },
    {
      id: "mckinsey-forward",
      organization: "McKinsey.org",
      roleOrAchievement: "McKinsey Forward Program Graduate",
      category: "Certifications",
      date: "2025",
      badge: "Program Graduate",
      description: "Completed McKinsey's flagship leadership development initiative covering structured problem-solving, digital agility, effective communication, and collaborative leadership.",
      location: "Global",
      verifiedStats: "Leadership & Strategy"
    },
    {
      id: "gcp-career-launchpad",
      organization: "Google Cloud",
      roleOrAchievement: "Career Launchpad – Data Analytics",
      category: "Certifications",
      date: "2025",
      badge: "Verified Credential",
      description: "Professional certification validating competence in BigQuery data processing, SQL data modeling, data visualization, and cloud analytics pipelines.",
      location: "Google Cloud",
      verifiedStats: "Data Analytics Specialization"
    },
    {
      id: "ibm-ai",
      organization: "IBM",
      roleOrAchievement: "Artificial Intelligence Fundamentals",
      category: "Certifications",
      date: "2025",
      badge: "IBM Certified",
      description: "Validated fundamental expertise in neural networks, natural language processing, machine learning workflows, and generative AI model evaluation.",
      location: "IBM Training",
      verifiedStats: "AI Fundamentals"
    },
    {
      id: "leetcode-stats",
      organization: "LeetCode",
      roleOrAchievement: "Algorithmic Problem Solving",
      category: "Work",
      date: "ONGOING",
      badge: "Active Solver",
      description: "Consistent problem solving in Java and Python focusing on Data Structures & Algorithms: binary search, graph traversals, dynamic programming, and system design patterns.",
      location: "leetcode.com/u/AayushAskandani",
      verifiedStats: "Java & Python DSA"
    }
  ] as Milestone[],

  // Terminal commands and answers
  terminal: {
    welcomeMessage: "Windows PowerShell v7.4.2 [Ask Aayush Terminal]\nType 'help' to see available commands or ask questions directly.\n",
    commands: {
      help: "Available commands:\n  help        - Show this manual\n  whoami      - Developer bio, education & credentials\n  projects    - List engineering projects with live URLs\n  skills      - List complete technical stack\n  story       - 9-chapter journey logs\n  interview   - Launch AI voice interviewer\n  milestones  - Google Cloud Arcade Legend & GDG leadership\n  contact     - Get phone, email, and social handles\n  clear       - Clear terminal buffer\n  sudo hire   - Fast-track interview pipeline",
      whoami: "Aayush Askandani — Full-Stack Software Engineer & Systems Builder.\nB.Tech CSE at Poornima University (2024–2028, CGPA 7.7/10)\nGoogle Cloud Arcade Legend (359 labs, 121 skill badges, 55,267 points)\nCommunity Coordinator & Training Lead at GDG on Campus",
      projects: "1. LINKFORGE · High-Throughput URL Shortener & Bio-Link (React, Node, PostgreSQL, Redis)\n   Live: https://link-forge-webapp.vercel.app | Repo: https://github.com/aayushaskandani/LinkForge\n2. SYNCBOARD · Real-Time Collaborative Kanban (React 19, Socket.IO, PostgreSQL O(1) Indexing)\n   Live: https://syncboard-2byi.onrender.com | Repo: https://github.com/aayushaskandani/syncboard\n3. TREKPEDIA · Offline Mountain Trek Encyclopedia (JavaScript, Supabase, Leaflet, Claude API)\n   Live: https://trekpedia.netlify.app | Repo: https://github.com/aayushaskandani/TrekPedia\nInspect BUILDER_LAB.EXE or modern Work section for full architecture dossiers.",
      skills: "Languages: Java, Python, JavaScript, TypeScript\nFrontend: React 19, Vite, Tailwind CSS, Leaflet.js, PWA Service Workers\nBackend: Node.js, Express.js, FastAPI, Socket.IO, REST APIs, JWT Auth\nDatabases: PostgreSQL, Redis, MySQL, MongoDB, Supabase\nDevOps & Tools: Docker, Git, GitHub Actions, Linux, Postman, Render, Vercel",
      story: "9 Chapters available: CH01 (Old Laptop) through CH09 (Systems Builder).\nInspect STORY_MODE.EXE or modern story section for complete narrative logs.",
      interview: "Interactive AI Voice Interviewer active. Ask questions about LinkForge, SyncBoard, TrekPedia, or system design.",
      milestones: "• Google Cloud Arcade Legend: 359 labs, 76 courses, 121 badges, 55,267 points\n• GDG on Campus: Community Coordinator & Training Lead (200+ students)\n• McKinsey.org Forward Program Graduate\n• Google Cloud Career Launchpad – Data Analytics\n• IBM Artificial Intelligence Fundamentals",
      contact: "Phone: +91 85049 54425\nEmail: aayushaskandani64@gmail.com\nGitHub: https://github.com/aayushaskandani\nLinkedIn: https://linkedin.com/in/aayush-askandani\nLeetCode: https://leetcode.com/u/AayushAskandani",
      "sudo hire": "ACCESS GRANTED: Priority interview pipeline unlocked. Send an offer or interview invite to aayushaskandani64@gmail.com or call +91 85049 54425. Let's build exceptional software together!",
    }
  }
};
