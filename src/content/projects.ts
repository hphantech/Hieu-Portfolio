import type { Project } from "@/types/content";

/**
 * TODO: replace these with your real projects and case studies.
 * `slug` drives the /work/[slug] route — keep it URL-safe (lowercase, hyphenated).
 */
export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Add your first project title",
    summary:
      "A one-sentence summary of the problem this project solved and the outcome.",
    role: "Add your role, e.g. Frontend Developer",
    year: "2025",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    links: [
      { label: "Live site", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    body: [
      "Add a paragraph describing the problem or brief for this project.",
      "Add a paragraph describing your approach, key technical decisions, and any constraints.",
      "Add a paragraph describing the outcome, what you learned, or what you'd improve next.",
    ],
  },
  {
    slug: "project-two",
    title: "Add your second project title",
    summary:
      "A one-sentence summary of the problem this project solved and the outcome.",
    role: "Add your role, e.g. Frontend Developer",
    year: "2025",
    tech: ["React", "REST API"],
    links: [{ label: "GitHub", href: "#" }],
    body: [
      "Add a paragraph describing the problem or brief for this project.",
      "Add a paragraph describing your approach, key technical decisions, and any constraints.",
      "Add a paragraph describing the outcome, what you learned, or what you'd improve next.",
    ],
  },
  {
    slug: "project-three",
    title: "Add your third project title",
    summary:
      "A one-sentence summary of the problem this project solved and the outcome.",
    role: "Add your role, e.g. Frontend Developer",
    year: "2024",
    tech: ["JavaScript", "HTML", "CSS"],
    links: [{ label: "GitHub", href: "#" }],
    body: [
      "Add a paragraph describing the problem or brief for this project.",
      "Add a paragraph describing your approach, key technical decisions, and any constraints.",
      "Add a paragraph describing the outcome, what you learned, or what you'd improve next.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
