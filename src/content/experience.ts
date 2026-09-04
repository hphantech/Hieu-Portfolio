export type ExperienceItem = {
  id: string;
  org: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
};

/**
 * Experience cards for the sticky stack (keep to 3 for the scroll animation).
 * TODO: replace with your real internships / co-makers / roles.
 */
export const experiences: ExperienceItem[] = [
  {
    id: "internship-frontend",
    org: "Studio placeholder",
    role: "Frontend Intern",
    period: "2025 — 2026",
    summary:
      "Shipped accessible UI in React and Next.js — components, motion polish, and tight design collaboration.",
    highlights: [
      "Built reusable interface pieces with TypeScript",
      "Improved a11y across key flows",
      "Paired with design on kinetic details",
    ],
    tags: ["React", "Next.js", "TypeScript", "A11y"],
  },
  {
    id: "comaker",
    org: "Co-Maker project",
    role: "Frontend Developer",
    period: "2024 — 2025",
    summary:
      "Partnered with classmates and stakeholders to turn a brief into a working product — from wireframes to deploy.",
    highlights: [
      "Owned the frontend architecture",
      "Integrated APIs and loading states",
      "Presented demos to mentors and peers",
    ],
    tags: ["Teamwork", "Next.js", "Tailwind", "Git"],
  },
  {
    id: "campus-collab",
    org: "Campus / community",
    role: "Volunteer & collaborator",
    period: "2023 — 2024",
    summary:
      "Helped student and community initiatives with landing pages, event sites, and quick experiments.",
    highlights: [
      "Fast turnarounds under real deadlines",
      "Clear handoff docs for non-devs",
      "Learned to scope ruthlessly",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Vercel"],
  },
];
