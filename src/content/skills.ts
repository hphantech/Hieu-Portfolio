import type { SkillGroup } from "@/types/content";

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["HTML", "CSS / SASS", "TypeScript", "JavaScript"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Practices",
    skills: [
      "Semantic HTML",
      "Accessibility (A11y)",
      "Responsive Design",
      "REST APIs",
    ],
  },
  {
    title: "Tooling",
    skills: ["Git & GitHub", "ESLint / Prettier", "Figma"],
  },
];

/** Flattened list, used for marquee/ticker-style displays. */
export const skillsTicker: string[] = skillGroups.flatMap(
  (group) => group.skills,
);
