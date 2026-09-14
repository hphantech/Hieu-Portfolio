export type ExperienceVideo = {
  src: string;
  label: string;
  /** CSS aspect-ratio value, e.g. "9 / 16" — keeps frames flush with no letterbox. */
  aspectRatio?: string;
};

export type ExperienceImage = {
  src: string;
  alt: string;
};

export type ExperienceItem = {
  id: string;
  org: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
  /** Optional app / product clips shown on the card. */
  videos?: readonly ExperienceVideo[];
  /** Optional project stills / screenshots shown on the card. */
  images?: readonly ExperienceImage[];
};

/**
 * Experience cards for the sticky stack (keep to 3 for the scroll animation).
 */
export const experiences: ExperienceItem[] = [
  {
    id: "yulin-studios",
    org: "Yulin Studios",
    role: "Software Engineer · Founder",
    period: "Jan 2026 to Present",
    summary:
      "My own studio and brand. I started Yulin Studios to build websites and webshops for businesses and strengthen their online presence. Still active with partners like Chayue Tea and more clients underway.",
    highlights: [
      "Lead software engineering across client sites and shops",
      "Ongoing client work that grows each business’s online footprint",
    ],
    tags: ["Websites", "Webshops", "Clients", "Team"],
    images: [
      {
        src: "/images/experience/chayue-landing.jpg",
        alt: "Chayue Tea landing page by Yulin Studios",
      },
      {
        src: "/images/experience/yulin-selected-work.png",
        alt: "Yulin Studios selected live client sites",
      },
      {
        src: "/images/experience/phelise-wireframes.png",
        alt: "PHÉLISE web wireframes in progress",
      },
    ],
  },
  {
    id: "cyberaventura",
    org: "Cyberaventura",
    role: "Mobile App Developer · Internship",
    period: "Feb 2026 to Jun 2026",
    summary:
      "Internship project: a mobile app prototype based on Cyberaventura’s existing website. A Duolingo-style experience that teaches cybersecurity through games and short lessons. Not live, built as a prototype for the internship.",
    highlights: [
      "Translated the web product into a mobile-first app flow",
      "Matched the brand while shaping screens for phone use",
    ],
    tags: ["Internship", "Mobile", "UI", "Gamification"],
    videos: [
      {
        src: "/videos/cyberaventura-1.mp4",
        label: "Cyberaventura mobile app walkthrough",
        aspectRatio: "384 / 848",
      },
      {
        src: "/videos/cyberaventura-2.mp4",
        label: "Cyberaventura gamified cybersecurity lessons",
        aspectRatio: "768 / 480",
      },
    ],
  },
  {
    id: "squareaim",
    org: "SquareAim",
    role: "Co-Maker · Frontend",
    period: "2024 to 2025",
    summary:
      "School Co-Maker at SquareAim, a web agency. We built a local prototype football planner app so people nearby can find others who want to play and join pickup games. Not a live product, a prototype for the Co-Maker.",
    highlights: [
      "Helped shape flows for finding and joining nearby matches",
      "Built frontend pieces around profiles, availability, and meetups",
      "Worked with the team to turn the brief into a usable local prototype",
    ],
    tags: ["Co-Maker", "Prototype", "Mobile", "Football"],
    images: [
      {
        src: "/images/experience/squareaim-logo.png",
        alt: "SquareAim football planner app logo",
      },
    ],
  },
];
