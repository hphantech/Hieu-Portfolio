import type { NavItem, SocialLink } from "@/types/content";

/**
 * Core identity + contact details.
 * TODO: replace every placeholder value below before submitting the application.
 */
export const site = {
  name: "Hieu Phan",
  role: "Frontend Developer",
  tagline:
    "Building accessible, kinetic interfaces with React, Next.js, and TypeScript.",
  location: "Netherlands", // TODO: confirm city
  university: "Add your Dutch university name here", // TODO
  studyProgram: "Add your degree / field of study here", // TODO
  availability:
    "Available for a Frontend Developer internship from September 2026",
  email: "hello@example.com", // TODO: replace with your real email
  resumeUrl: "/resume-placeholder.pdf", // TODO: add a real CV file to /public and update this path
  url: "https://hieu-portfolio-five.vercel.app", // TODO: replace with a custom domain if you set one up
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/hphantech", icon: "github" }, // TODO: confirm URL
  { label: "LinkedIn", href: "https://linkedin.com/in/", icon: "linkedin" }, // TODO: add your LinkedIn URL
  { label: "Email", href: `mailto:${site.email}`, icon: "mail" },
];

export const seoDefaults = {
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  keywords: [
    "frontend developer",
    "React",
    "Next.js",
    "TypeScript",
    "portfolio",
    "internship",
  ],
};
