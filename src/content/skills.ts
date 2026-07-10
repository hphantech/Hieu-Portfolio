import type { SkillGroup } from "@/types/content";

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: "languages",
    skills: ["HTML", "CSS / SASS", "TypeScript", "JavaScript"],
  },
  {
    title: "Frameworks & Libraries",
    icon: "frameworks",
    skills: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Practices",
    icon: "practices",
    skills: [
      "Semantic HTML",
      "Accessibility (A11y)",
      "Responsive Design",
      "REST APIs",
    ],
  },
  {
    title: "Tooling",
    icon: "tooling",
    skills: ["Git & GitHub", "ESLint / Prettier", "Figma"],
  },
];

/** Flattened list, used for marquee/ticker-style displays. */
export const skillsTicker: string[] = skillGroups.flatMap(
  (group) => group.skills,
);
