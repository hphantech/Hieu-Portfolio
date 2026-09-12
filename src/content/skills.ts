/**
 * Skills shown on the home page — keep this scannable for recruiters.
 */
export const skills = {
  headline: "Skills",
  lead: "Languages, frameworks, and tools I use to build websites and apps.",
  groups: [
    {
      label: "Languages",
      items: ["TypeScript", "JavaScript", "HTML", "CSS"],
    },
    {
      label: "Frameworks & libraries",
      items: ["React", "Next.js", "React Native", "Tailwind CSS", "GSAP"],
    },
    {
      label: "Tools",
      items: ["Git", "Figma", "Vercel", "Cursor", "VS Code"],
    },
  ],
} as const;
