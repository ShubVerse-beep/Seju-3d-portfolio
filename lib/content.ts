// Edit everything about your portfolio in this one file.
// Project links: paste your URLs into `liveUrl` / `repoUrl`. Leave "" to show "Link coming soon".

export const profile = {
  firstName: "Sejal",
  lastName: "Rai",
  fullName: "Sejal Manoj Rai",
  initials: "SR",
  role: "App Developer · XR Creator · Web Designer",
  roles: ["App Developer", "XR Creator", "Web Designer"],
  tagline:
    "Final-year Computer Engineering student building cross-platform apps, immersive VR worlds and polished websites.",
  bio: "I'm a Computer Engineering student at St. John College of Engineering and Management (CGPA 9.6) who loves turning ideas into interactive products. From Flutter apps wired to real backends, to VR space explorations and WordPress builds, I care about smooth UX, performance and shipping things people actually use.",
  email: "sejalrai9156@gmail.com",
  phone: "+91-9156046848",
  linkedin: "https://linkedin.com/in/sejal-rai-18334a321",
  github: "",
  resumeUrl: "",
  region: "Palghar, Mumbai · IN",
  photo: "/images/sejal.jpg",
}

export const stats = [
  { value: "9.6", label: "CGPA", sub: "Computer Engg." },
  { value: "3+", label: "Internships", sub: "App · XR · Web" },
  { value: "1st", label: "Hackathon", sub: "CU Innovation" },
]

export const skillsRowA = [
  "Flutter",
  "Dart",
  "Node.js",
  "MongoDB",
  "MongoDB Atlas",
  "REST APIs",
  "HTML",
  "CSS",
  "JavaScript",
  "WordPress",
  "MySQL",
  "XAMPP",
]

export const skillsRowB = [
  "AR / VR",
  "Unity",
  "Game Dev",
  "Spatial Audio",
  "3D Interaction",
  "Figma",
  "UI / UX",
  "SEO Basics",
  "GitHub",
  "VS Code",
  "Data Analytics",
  "MS Office",
]

export const expertise = [
  {
    id: "01",
    title: "App Development",
    description: "Cross-platform Flutter apps with authentication, APIs and real-time data.",
    chips: ["Flutter", "Dart", "REST"],
  },
  {
    id: "02",
    title: "Backend & Data",
    description: "Node.js services connected to MongoDB Atlas and MySQL, deployed for live use.",
    chips: ["Node.js", "MongoDB", "MySQL"],
  },
  {
    id: "03",
    title: "AR / VR & Games",
    description: "Immersive 3D environments with intuitive controls, spatial audio and interaction.",
    chips: ["AR/VR", "3D", "Game Dev"],
  },
  {
    id: "04",
    title: "Web & WordPress",
    description: "Responsive, SEO-ready websites with custom themes, plugins and animations.",
    chips: ["WordPress", "HTML/CSS", "Figma"],
  },
]

export type Project = {
  id: string
  title: string
  year: string
  status: string
  description: string
  stack: string[]
  liveUrl: string
  repoUrl: string
}

export const projects: Project[] = [
  {
    id: "01",
    title: "GramHealth",
    year: "2026",
    status: "Healthcare · AI",
    description:
      "An offline-first rural healthcare platform with multi-role access for patients, doctors, and ASHA workers. Features AI clinical triage, voice consultations, and offline sync.",
    stack: ["Flutter", "Dart", "Node.js", "Prisma", "AI Triage"],
    liveUrl: "",
    repoUrl: "https://github.com/Sejal-rai-1608/GramHealthApp",
  },
  {
    id: "02",
    title: "Eternia",
    year: "2026",
    status: "Full-Stack Web",
    description:
      "An anonymous mental wellness platform for Indian college students compliant with DPDP Act 2023. Features WebRTC teleconsultation, zero-PII auth, and an internal credit economy.",
    stack: ["React", "TypeScript", "Vite", "Supabase", "WebRTC"],
    liveUrl: "",
    repoUrl: "https://github.com/Sejal-rai-1608/Eternia_web",
  },
  {
    id: "03",
    title: "TruthLens AI",
    year: "2026",
    status: "AI · Web App",
    description:
      "A multi-agent misinformation detection platform that verifies text, images, and videos using automated workflows, Mistral Large, Tavily Search, and Google Fact Check APIs.",
    stack: ["Next.js", "TypeScript", "n8n", "Mistral", "Tavily"],
    liveUrl: "",
    repoUrl: "https://github.com/Sejal-rai-1608/truthlens-ai",
  },
  {
    id: "04",
    title: "Heritage App",
    year: "2026",
    status: "Mobile App",
    description:
      "A bilingual community engagement mobile app (SWAJAN) supporting English and Gujarati. Includes a job vacancy portal with resume uploads, verified promotions, and member directories.",
    stack: ["Flutter", "Dart", "Provider", "Material 3"],
    liveUrl: "",
    repoUrl: "https://github.com/Sejal-rai-1608/Heritage-App",
  },
  {
    id: "05",
    title: "Policy Plus",
    year: "2026",
    status: "Mobile App",
    description:
      "A cross-platform insurance policy management and exploration mobile application. Features insurance plan comparison, claim tracking, OTP verification, and visual analytics charts.",
    stack: ["Flutter", "Dart", "Firebase", "FL Chart"],
    liveUrl: "",
    repoUrl: "https://github.com/Sejal-rai-1608/Policy_Plus",
  },
]

export const experience = [
  {
    role: "App Development Intern",
    org: "Cosmic Web Solutions (Freelance)",
    period: "2026",
    points: ["Flutter apps with API and backend integration", "Real-time projects focused on UI/UX, performance and deployment"],
  },
  {
    role: "AR/VR Intern",
    org: "Immersive Apps",
    period: "2025",
    points: ["Interactive 3D environments", "VR design, user interaction and spatial visualisation"],
  },
  {
    role: "WordPress Developer Intern",
    org: "DLLE",
    period: "2025",
    points: ["Responsive websites with WordPress", "Themes, plugins and basic SEO"],
  },
  {
    role: "PR Head · Joint Secretary",
    org: "SPCA & BIS, St. John College",
    period: "2025",
    points: ["Hosted a major student-led innovation event", "Led communications for technical committees"],
  },
]

export const certifications = [
  { title: "App Development", issuer: "CWS", date: "Mar 2026" },
  { title: "Data Analytics", issuer: "Deloitte", date: "Jul 2025" },
  { title: "AR & VR Development", issuer: "IOFT", date: "Dec 2024" },
  { title: "Game Development", issuer: "IOFT", date: "Dec 2024" },
]

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Certifications" },
  { href: "#contact", label: "Contact" },
]
