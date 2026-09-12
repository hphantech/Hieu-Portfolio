import type { NavItem, SocialLink } from "@/types/content";

/**
 * Core identity + contact details.
 */
export const site = {
  name: "Hieu Phan",
  role: "Software Engineer",
  tagline:
    "Building accessible, kinetic interfaces with React, Next.js, and TypeScript.",
  location: "Almere, Netherlands",
  university: "Windesheim University of Applied Sciences",
  studyProgram: "Software Engineering",
  availability: "Available for a graduation internship starting February 2027",
  email: "hphan.tech@gmail.com",
  /** Add your CV as /public/resume.pdf and keep this path in sync. */
  resumeUrl: "/resume.pdf",
  /** Ambient loop for the nav mute button. */
  musicUrl: "/alex-morgan-lofi-midnight-club-568164.mp3",
  url: "https://hieu-portfolio-five.vercel.app",
  repoUrl: "https://github.com/hphantech/Hieu-Portfolio",
  githubUsername: "hphantech",
  socialGithubUrl: "https://github.com/hphantech",
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/hphantech", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hyutech/",
    icon: "linkedin",
  },
  { label: "Email", href: `mailto:${site.email}`, icon: "mail" },
];

export const seoDefaults = {
  title: site.name,
  description: site.tagline,
  keywords: [
    "software engineer",
    "frontend developer",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio",
    "internship",
  ],
};
