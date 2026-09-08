/**
 * Narrative beats for the storytelling portfolio.
 * Edit copy here — components only render and animate.
 * Optional `images` / `video` + `layout` keep each visual beat unique.
 */
export type StoryImage = {
  src: string;
  alt: string;
};

export type StoryVideo = {
  src: string;
  /** Accessible name for the video. */
  label: string;
};

export type StoryLayout =
  | "mediaRight"
  | "mediaLeft"
  | "mediaWide"
  | "mediaFloat";

export type StoryBeat = {
  text: string;
  images?: readonly StoryImage[];
  /** Optional lead video — rendered as the first (largest) collage frame. */
  video?: StoryVideo;
  /** Visual composition when media is present. Defaults to mediaRight. */
  layout?: StoryLayout;
};

export const story = {
  intro: [
    {
      text: "Hi! and welcome to my portfolio :)",
    },
    {
      text: "If your looking through my portfolio, it probably means you want to know more about me ^^",
    },
    {
      text: "My name is Hieu, I am 20 years old and I am a student at University of applied sciences Windesheim in Almere, The Netherlands.",
      layout: "mediaRight" as const,
      images: [
        {
          src: "/images/intro/campus.jpg",
          alt: "Windesheim Flevoland campus building",
        },
        {
          src: "/images/intro/certificate.jpg",
          alt: "Hieu signing a certificate",
        },
      ],
    },
    {
      text: "I am currently studying to become a Frontend Developer, and I am looking for a internship from September 2026.",
    },
    {
      text: "I also run a business called Yulin Studios where me and my team help and make websites/webshop for other businesses",
      layout: "mediaWide" as const,
      images: [
        {
          src: "/images/intro/chayue-hero.jpg",
          alt: "Chayue Tea website hero designed by Yulin Studios",
        },
        {
          src: "/images/intro/chayue-drink.jpg",
          alt: "Chayue Tea mango pomelo sago drink",
        },
      ],
      video: {
        src: "/videos/yulin-studios.mp4",
        label: "Yulin Studios project walkthrough",
      },
    },
  ] as const satisfies readonly StoryBeat[],
  beforeAbout: "Wanna know more about me?",
  beforeExperience: ["Work Experience"],
  beforeMoreWork: [
    "Want to see the work itself? Here's a few projects.",
  ],
  beforeContact: [
    "That's a glimpse of how I like to build.",
    "If it feels like a fit — I'd love to hear from you.",
  ],
} as const;
