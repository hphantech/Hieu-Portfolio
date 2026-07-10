import type { ExperienceEntry } from "@/types/content";

/**
 * TODO: replace with your real education and work/project history.
 * Sort order is preserved as written (most recent first is recommended).
 */
export const experienceEntries: ExperienceEntry[] = [
  {
    id: "university",
    type: "education",
    title: "Add your degree / field of study",
    organization: "Add your Dutch university name",
    location: "Netherlands",
    start: "2023",
    end: "Present",
    description:
      "Add a short description of relevant coursework, projects, or focus areas.",
    tags: ["Computer Science"],
  },
  {
    id: "project-one",
    type: "work",
    title: "Add a role or project title",
    organization: "Add the company or personal project name",
    start: "2025",
    end: "2025",
    description:
      "Add a short description of what you built, the stack used, and the outcome or impact.",
    tags: ["React", "Next.js"],
  },
];
