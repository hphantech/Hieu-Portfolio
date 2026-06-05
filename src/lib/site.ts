export const siteConfig = {
  name: "Hieu Phan",
  role: "Frontend Developer",
  tagline:
    "Building accessible, responsive interfaces with React, Next.js, and TypeScript.",
  location: "Netherlands",
  email: "hello@hieuphan.dev",
  links: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
  },
  skills: [
    "Semantic HTML",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Accessibility (A11y)",
    "REST APIs",
  ],
  projects: [
    {
      title: "Project One",
      description:
        "A short description of your first project. Replace this with a real case study.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      href: "#",
    },
    {
      title: "Project Two",
      description:
        "Another placeholder project. Highlight the problem, your approach, and the outcome.",
      tech: ["React", "REST API"],
      href: "#",
    },
  ],
} as const;

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
