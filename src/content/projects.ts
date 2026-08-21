import type { Project } from "@/types/content";

/**
 * TODO: replace these with your real projects and case studies.
 * `slug` drives the /work/[slug] route — keep it URL-safe (lowercase, hyphenated).
 * `cover` should be a website screenshot (landscape) for the More Work carousel.
 */
const sharedBody = [
  "Add a paragraph describing the problem or brief for this project.",
  "Add a paragraph describing your approach, key technical decisions, and any constraints.",
  "Add a paragraph describing the outcome, what you learned, or what you'd improve next.",
] as const;

/** Placeholder landscape shots — swap for real page screenshots. */
const covers = [
  "https://images.unsplash.com/photo-1769921546096-7a648d953a3e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1777726515600-65be20641e1b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1776582929657-9710d9cfa46a?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1776582929656-78ad8b515d75?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1775990630948-3c1f696f4ab1?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1775380744191-8fbff371c40b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1774775479879-082fd47d41e1?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1773544517453-95c148cb42b7?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1771385809377-9b0348e1f8dc?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1775990631076-f6f208079475?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1769921546096-7a648d953a3e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1777726515600-65be20641e1b?q=80&w=1200&auto=format&fit=crop",
] as const;

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Campus course planner",
    summary:
      "A scheduling tool that helps students build conflict-free timetables across devices.",
    role: "Frontend Developer",
    year: "2025",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    cover: covers[0],
    links: [
      { label: "Live site", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    body: [...sharedBody],
  },
  {
    slug: "project-two",
    title: "Local gallery guide",
    summary:
      "A mobile-first map of exhibitions with filters, saved lists, and accessible cards.",
    role: "Frontend Developer",
    year: "2025",
    tech: ["React", "REST API"],
    cover: covers[1],
    links: [{ label: "GitHub", href: "#" }],
    body: [...sharedBody],
  },
  {
    slug: "project-three",
    title: "Studio landing refresh",
    summary:
      "A kinetic marketing page rebuilt in semantic HTML with motion that respects reduced preference.",
    role: "Frontend Developer",
    year: "2024",
    tech: ["JavaScript", "HTML", "CSS"],
    cover: covers[2],
    links: [{ label: "GitHub", href: "#" }],
    body: [...sharedBody],
  },
  {
    slug: "project-four",
    title: "Component library playground",
    summary:
      "An internal sandbox for documenting reusable UI patterns with live previews.",
    role: "Frontend Developer",
    year: "2025",
    tech: ["React", "TypeScript", "Storybook"],
    cover: covers[3],
    links: [{ label: "GitHub", href: "#" }],
    body: [...sharedBody],
  },
  {
    slug: "project-five",
    title: "Internship tracker",
    summary:
      "A personal dashboard for applications, deadlines, and follow-ups in one calm view.",
    role: "Frontend Developer",
    year: "2025",
    tech: ["Next.js", "Supabase"],
    cover: covers[4],
    links: [{ label: "GitHub", href: "#" }],
    body: [...sharedBody],
  },
  {
    slug: "project-six",
    title: "Accessible form kit",
    summary:
      "Form primitives with labels, errors, and focus states tuned for WCAG AA contrast.",
    role: "Frontend Developer",
    year: "2024",
    tech: ["React", "ARIA", "Tailwind CSS"],
    cover: covers[5],
    links: [{ label: "GitHub", href: "#" }],
    body: [...sharedBody],
  },
  {
    slug: "project-seven",
    title: "Motion recipe book",
    summary:
      "A gallery of GSAP patterns — entrances, scroll reveals, and hover micro-interactions.",
    role: "Frontend Developer",
    year: "2025",
    tech: ["GSAP", "Next.js"],
    cover: covers[6],
    links: [{ label: "GitHub", href: "#" }],
    body: [...sharedBody],
  },
  {
    slug: "project-eight",
    title: "Portfolio CMS experiment",
    summary:
      "Content modules typed in TypeScript so case studies stay editable without touching UI.",
    role: "Frontend Developer",
    year: "2024",
    tech: ["TypeScript", "MDX"],
    cover: covers[7],
    links: [{ label: "GitHub", href: "#" }],
    body: [...sharedBody],
  },
  {
    slug: "project-nine",
    title: "Weather glance widget",
    summary:
      "A small responsive widget that pulls forecast data and degrades gracefully offline.",
    role: "Frontend Developer",
    year: "2024",
    tech: ["JavaScript", "Fetch API"],
    cover: covers[8],
    links: [{ label: "GitHub", href: "#" }],
    body: [...sharedBody],
  },
  {
    slug: "project-ten",
    title: "Design token sync",
    summary:
      "A script + UI that maps Figma tokens into CSS variables for a consistent theme.",
    role: "Frontend Developer",
    year: "2025",
    tech: ["Node.js", "CSS", "Figma"],
    cover: covers[9],
    links: [{ label: "GitHub", href: "#" }],
    body: [...sharedBody],
  },
  {
    slug: "project-eleven",
    title: "Reading list app",
    summary:
      "Save articles, tag them, and filter by status — built with optimistic UI updates.",
    role: "Frontend Developer",
    year: "2023",
    tech: ["React", "LocalStorage"],
    cover: covers[10],
    links: [{ label: "GitHub", href: "#" }],
    body: [...sharedBody],
  },
  {
    slug: "project-twelve",
    title: "Event RSVP microsite",
    summary:
      "A focused one-pager with a registration flow, confirmation states, and email deep links.",
    role: "Frontend Developer",
    year: "2023",
    tech: ["Next.js", "Tailwind CSS"],
    cover: covers[11],
    links: [
      { label: "Live site", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    body: [...sharedBody],
  },
];

/** Projects shown in the sticky stack (featured). */
export const featuredProjects = projects.slice(0, 5);

/** Remaining projects for the landscape screenshot carousel. */
export const moreProjects = projects.slice(5);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
