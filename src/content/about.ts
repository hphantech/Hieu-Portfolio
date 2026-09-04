/**
 * About-section copy and media.
 * Swap image URLs for your own photos when ready.
 */
export const about = {
  headline: "A bit more about me.",
  lead: "I'm Hieu — a Frontend Developer in the Netherlands who cares about craft, clarity, and interfaces that feel alive without shouting.",
  paragraphs: [
    "I study and build with React, Next.js, and TypeScript. I like kinetic details when they earn their place — motion that guides, not distracts — and accessibility baked in from the start.",
    "Outside of code I'm usually sketching ideas, wandering with a camera, or diving into music and games. Those habits feed how I see layout, rhythm, and storytelling on the web.",
  ],
  /** Personal / atmosphere photos shown in the mosaic. */
  gallery: [
    {
      src: "/images/brand.png",
      alt: "Portrait of Hieu",
      caption: "Me",
    },
    {
      src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
      alt: "Laptop and notebook on a desk",
      caption: "Where I work",
    },
    {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      alt: "Quiet city street at dusk",
      caption: "Netherlands evenings",
    },
  ],
  skills: [
    {
      label: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    },
    {
      label: "Craft",
      items: ["Accessibility", "Responsive UI", "Design systems", "Performance"],
    },
    {
      label: "Tools",
      items: ["Git", "Figma", "Vercel", "Cursor"],
    },
  ],
  hobbies: [
    {
      title: "Photography",
      note: "Light, texture, and quiet frames.",
      src: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80",
      alt: "Vintage camera",
    },
    {
      title: "Music",
      note: "Lofi loops while I ship late nights.",
      src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
      alt: "Music studio equipment",
    },
    {
      title: "Games",
      note: "Worlds, systems, and interaction design.",
      src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      alt: "Controller on a desk",
    },
    {
      title: "Sketching",
      note: "Rough ideas before they become UI.",
      src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
      alt: "Sketchbook and pencils",
    },
  ],
} as const;
