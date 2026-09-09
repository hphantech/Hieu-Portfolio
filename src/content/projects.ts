import type { Project } from "@/types/content";

/**
 * TODO: replace these with your real projects and case studies.
 * `slug` drives the /work/[slug] route — keep it URL-safe (lowercase, hyphenated).
 * `cover` should be a website screenshot (landscape) for the More Work carousel.
 */
const sharedBody = [
  "The brief asked for a clear product surface that felt fast, readable, and easy to hand off — without burying the real work behind fluff.",
  "I focused on structure first: layout, interaction states, and the few motion moments that actually help orientation. Then I tightened type, spacing, and accessibility so the build held up on real devices.",
  "What shipped is a working slice of the product story: stronger hierarchy, cleaner flows, and room to extend without rewriting the foundation.",
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
    slug: "chayue-tea",
    title: "Chayue Tea",
    summary:
      "A fresh bubble-tea and fruit-drink brand site for Chayue Tea — menu, story, and ordering paths built to feel as clean as the drinks.",
    role: "Software Engineer · Yulin Studios",
    year: "2025",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "UI"],
    cover: "/images/work/chayue-tea.jpg",
    links: [{ label: "Live site", href: "https://www.chayuetea.nl/" }],
    body: [
      "Chayue Tea needed a website that matched the product: real tea, real fruit, and a calm everyday brand — not a noisy template shop.",
      "Through Yulin Studios I helped shape the frontend experience around the menu, locations, story, and order flow, with a clear hierarchy so visitors land on fresh drinks and know what to do next.",
      "The live site is at chayuetea.nl — a polished public surface for the brand, built to convert browsing into exploring the menu and ordering.",
    ],
  },
  {
    slug: "jens-bing",
    title: "Jen's Bing",
    summary:
      "A concept website for Jen's Bing — cute Taiwanese food and bubble tea in Amsterdam, designed around reserve, menu, and visit flows.",
    role: "Software Engineer · Yulin Studios",
    year: "2025",
    tech: ["Next.js", "TypeScript", "UI", "Concept"],
    cover: "/images/work/jens-bing.jpg",
    links: [{ label: "Live concept", href: "https://jensbing.vercel.app/" }],
    body: [
      "Jen's Bing asked for a concept site that feels as playful as the brand: Taiwanese food, bubble tea, and a warm Amsterdam shop energy.",
      "We designed the homepage around a clear split — story and CTAs on one side, the real storefront on the other — plus paths into drinks, food, gallery, visit, and reserve.",
      "The concept is live at jensbing.vercel.app as a polished direction for how the brand could show up online.",
    ],
  },
  {
    slug: "fu-dumplings",
    title: "FU Dumplings & Noodles",
    summary:
      "A concept site for FU dumplings & noodles — handmade dumplings, fresh noodles, and a bold Rotterdam-to-Amsterdam brand presence.",
    role: "Software Engineer · Yulin Studios",
    year: "2025",
    tech: ["Next.js", "TypeScript", "UI", "Concept"],
    cover: "/images/work/fu-dumplings.jpg",
    links: [
      { label: "Live concept", href: "https://fu-dumpling-ih7t.vercel.app/" },
    ],
    body: [
      "FU dumplings & noodles needed a site that feels as loud and appetizing as the food — handmade dumplings, fresh noodles, daily energy.",
      "We built a concept landing around a strong hero, clear order and menu paths, and a visual language that matches the brand’s red, cream, and illustration style.",
      "The concept is live at fu-dumpling-ih7t.vercel.app as a direction for how the shop can show up online.",
    ],
  },
  {
    slug: "golden-fade-barbers",
    title: "Golden Fade Barbers",
    summary:
      "My very first client — a live barbershop site for Golden Fade Barbers in Almere, built around booking, treatments, and a clean dark-and-gold brand.",
    role: "Software Engineer · Yulin Studios",
    year: "2024",
    tech: ["Next.js", "TypeScript", "UI", "Client"],
    cover: "/images/work/golden-fade-barbers.png",
    links: [{ label: "Live site", href: "https://www.goldenfadebarbers.com/" }],
    body: [
      "Golden Fade Barbers was my very first real client. The brief was clear: a sharp site for men’s and kids’ cuts in Almere, with booking that actually works.",
      "I built the frontend around the shop’s dark-and-gold look — treatments, about, results, contact, and a direct path to book an appointment online.",
      "The live site is at goldenfadebarbers.com — still online as the shop’s public face.",
    ],
  },
  {
    slug: "som-protein",
    title: "SØM Protein",
    summary:
      "A premium concept site for SØM Protein — protein-based smoothies with a calm, dark brand and clear paths into drinks and the story.",
    role: "Software Engineer · Yulin Studios",
    year: "2025",
    tech: ["Next.js", "TypeScript", "UI", "Concept"],
    cover: "/images/work/som-protein.png",
    links: [{ label: "Live concept", href: "https://s-m-pearl.vercel.app/" }],
    body: [
      "SØM Protein needed a site that feels as clean as the product: protein smoothies, transparent macros, and a premium shelf presence.",
      "We designed a dark, minimal concept around the drinks lineup, story, and find-us flows — with the cans as the hero.",
      "The concept is live at s-m-pearl.vercel.app as a direction for the brand online.",
    ],
  },
  {
    slug: "hoi-tin-cafe",
    title: "Hoi Tin Café",
    summary:
      "A concept site for Hoi Tin Café on Zeedijk — matcha, coffee, and Hong Kong comfort bites with a calm, storefront-led homepage.",
    role: "Software Engineer · Yulin Studios",
    year: "2025",
    tech: ["Next.js", "TypeScript", "UI", "Concept"],
    cover: "/images/work/hoi-tin-cafe.jpg",
    links: [
      { label: "Live concept", href: "https://hoi-tin-cafe.vercel.app/" },
    ],
    body: [
      "Hoi Tin Café needed a site that feels as quiet and intentional as the shop on Zeedijk — matcha, coffee, and Hong Kong–style comfort food.",
      "We built a concept around a full-bleed storefront hero, clear menu and visit paths, and typography that matches the café’s cream-and-serif brand.",
      "The concept is live at hoi-tin-cafe.vercel.app as a direction for how the café can show up online.",
    ],
  },
  {
    slug: "old-portfolio",
    title: "Old portfolio",
    summary:
      "My previous personal portfolio — a dark, starfield hero with intro, skills, and projects, built while learning the stack I still use today.",
    role: "Software Engineering student",
    year: "2024",
    tech: ["Next.js", "React", "TypeScript", "UI"],
    cover: "/images/work/old-portfolio.png",
    links: [
      {
        label: "Live site",
        href: "https://portfolio-delta-one-26.vercel.app/",
      },
    ],
    body: [
      "Before this site, I shipped a darker personal portfolio with a starfield background, a centered intro, and sections for about, skills, and projects.",
      "It was where I practiced React, Next.js, and TypeScript end to end — and kept a clear path from “hi” to view projects and contact.",
      "The old portfolio is still live at portfolio-delta-one-26.vercel.app.",
    ],
  },
  {
    slug: "k-station",
    title: "K Station",
    summary:
      "A free concept for K Station — Utrecht & Den Haag’s fun stop for K-culture — that hooked the client and led to a real build still in progress.",
    role: "Software Engineer · Yulin Studios",
    year: "2025",
    tech: ["Next.js", "TypeScript", "UI", "Concept"],
    cover: "/images/work/k-station.jpg",
    links: [{ label: "Live concept", href: "https://k-station.vercel.app/" }],
    body: [
      "K Station is a walk-in stop for K-pop, K-beauty, stationery, merch, and more — with stores in Utrecht and Den Haag. We made a free concept site to show how the brand could feel online: loud pink energy, store photos, and clear visit paths.",
      "They liked the first concept enough to plan a meeting with us. We’re still developing their new website — this free concept is the one that hooked them in.",
      "The concept is live at k-station.vercel.app.",
    ],
  },
];

/** Projects shown in the sticky stack (featured). */
export const featuredProjects = projects.slice(0, 5);

/** Remaining projects for the landscape screenshot carousel. */
export const moreProjects = projects.slice(5);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
