export const profile = {
  name: "Muhammed Raahim Ghori",
  tagline: "Software Developer • Building elegant, robust systems",
  location: "Mississauga, ON",
  bio:
    "Full-stack developer building performant, maintainable web apps with clean architecture and a sharp eye for DX and UX. I thrive in TypeScript and FastAPI, shipping pragmatic, customer-focused solutions end to end.",
  availability: "Open to remote roles & in-person roles",
  email: "raahimghori@gmail.com",
  github: "https://github.com/rxaxhim",
  linkedin: "https://linkedin.com/in/muhammedghori/",
  resumeUrl: "https://drive.google.com/file/d/11eQg3XDPg3NtXkxHyMxd11ZKw_53Kk68/view?usp=sharing", // replace with actual resume link
  photoUrl: "/images/raahim.jpg" // add your portrait image url here
};

export const skills = [
  { name: "TypeScript", level: 90 },
  { name: "React", level: 92 },
  { name: "Node.js", level: 85 },
  { name: "Express", level: 88 },
  { name: "FastAPI", level: 80 },
  { name: "JavaScript", level: 93 },
  { name: "Python", level: 82 },
  { name: "HTML", level: 95 },
  { name: "CSS", level: 90 },
  { name: "TailwindCSS", level: 95 },
  { name: "MongoDB", level: 82 },
  { name: "PostgreSQL", level: 80 },
  { name: "SQL", level: 80 },
  { name: "Docker", level: 75 },
  { name: "Kubernetes", level: 60 },
  { name: "Git", level: 95 },
  { name: "AWS", level: 85 },
  { name: "Azure", level: 85 },
  { name: "Terraform", level: 72 },
  { name: ".NET", level: 74 },
  { name: "Electron", level: 85 },
  { name: "CI/CD", level: 90 },
  { name: "SonarQube", level: 80 },
  { name: "BlackDuck", level: 80 },
];

export const projects = [
  {
    id: "p1",
    title: "Cloud Microservice Application",
    description:
      "AWS-backed microservice with Docker, REST APIs, and CI/CD via GitHub Actions.",
    tech: ["Docker", "AWS ECS", "S3", "DynamoDB", "GitHub Actions"],
    image:
      "https://travanleo.com/wp-content/uploads/2022/07/1_wvPlEuyPwIux9_WX-eGf9Q.png", // servers / cloud
    link: "#",
  },
  {
    id: "p2",
    title: "MeetUps Social Media App",
    description:
      "Full-stack platform with maps, search, and feeds using React, Node.js, and AWS.",
    tech: ["React", "Node.js", "AWS", "Maps API", "Elasticsearch"],
    image:
      "https://images.squarespace-cdn.com/content/v1/5dcf63e44e72ce1d58b0365b/1740511758999-RWTVPTR24YTAFXHMA5UN/meetup.jpg", // maps
    link: "#",
  },
  {
    id: "p3",
    title: "Inventory Management System",
    description:
      "C# .NET + MongoDB system with document indexing for fast lookups.",
    tech: ["C# .NET", "MongoDB"],
    image:
      "https://www.continualimprovementconsultant.com/wp-content/uploads/2021/05/modern-enterprise-quality-management-systems.jpg", // warehouse
    link: "#",
  },
  {
    id: "p4",
    title: "Automated License Plate Recognition",
    description:
      "AI-powered license plate detection using Python, OpenCV, and TensorFlow.",
    tech: ["Python", "OpenCV", "TensorFlow"],
    image:
      "https://www.videoanalitika.lt/en/blog/files/OpenCV-License-Plate-Recognition---Advanced-Vehicle-Identification-with-Computer-Vision-2.png", // car / street
    link: "#",
  },
];

export const experience = [
  {
    company: "Hexagon Manufacturing Intelligence — Oakville, ON",
    role: "Full-Stack Developer",
    period: "Apr 2023 — Jan 2025",
    summary:
      "Lead dev on Nexus Drive (Electron) used by 1,000+ users; sped releases 40% and cut API latency/errors.",
    highlights: [
      "Automated CI/CD with Terraform & Azure DevOps (−40% release time)",
      "Reduced payloads + added caching (−35% response, −50% errors)",
      "Built Node.js AI chatbot with Azure Cognitive Services (−45% query time)",
    ],
  },
  {
    company: "Project Human City — Toronto, ON",
    role: "Back-end Developer",
    period: "Nov 2022 — Apr 2023",
    summary:
      "Shipped moderation APIs and AI content filters; containerized services to cut latency.",
    highlights: [
      "Moderation API (Node.js/Express) blocking 99.8% unauthorized uploads",
      "AI filters with TensorFlow & OpenCV (95%+ accuracy)",
      "Express, Docker, PostgreSQL microservices (−30% backend latency)",
    ],
  },
  {
    company: "YourURLs — Mississauga, ON",
    role: "Full-Stack Developer",
    period: "Jan 2022 — Sep 2022",
    summary:
      "Optimized infra, payments, tests, and deploys for a faster, more reliable platform.",
    highlights: [
      "Tuned AWS + automated deploys (−25% operational cost)",
      "Integrated Stripe payments (+50% transaction speed)",
      "Jest & Hurl tests (coverage 60% → 95%); Nginx + Docker (+35% reliability)",
    ],
  },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];