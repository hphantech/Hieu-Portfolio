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
 * TODO: replace with your real internships / co-makers / roles.
 */
export const experiences: ExperienceItem[] = [
  {
    id: "yulin-studios",
    org: "Yulin Studios",
    role: "Software Engineer · Founder",
    period: "2024 — Present",
    summary:
      "Started my own studio to build websites and webshops for businesses and strengthen their online presence — still active with partners like Chayue Tea and more clients underway.",
    highlights: [
      "Lead software engineering across client sites and shops",
      "Small core team: InfoSec (brother-in-law), BIM (partner), plus freelance engineering when projects scale",
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
    role: "Mobile App Developer",
    period: "2025",
    summary:
      "Built the mobile app version of Cyberaventura’s existing website — a Duolingo-style experience that teaches cybersecurity through games and short lessons.",
    highlights: [
      "Translated the web product into a mobile-first app flow",
      "Kept learning loops short, clear, and game-like",
      "Matched the brand while shaping screens for phone use",
    ],
    tags: ["Mobile", "UI", "Gamification", "Product"],
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
    period: "2024 — 2025",
    summary:
      "Co-Maker project for a football planner app — match with people nearby who want to play, like Tinder but for pickup football games.",
    highlights: [
      "Helped shape flows for finding and joining random matches",
      "Built frontend pieces around profiles, availability, and meetups",
      "Worked with the team to turn the “football Tinder” idea into a usable product",
    ],
    tags: ["Co-Maker", "Mobile", "Matching", "Football"],
    images: [
      {
        src: "/images/experience/squareaim-logo.png",
        alt: "SquareAim football planner app logo",
      },
    ],
  },
];
