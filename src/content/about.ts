/**
 * About-section media chapters.
 * Swap image URLs for your own photos when ready.
 */
export const about = {
  /**
   * Full-viewport scroll chapters — one hobby / interest per screen.
   * `layout` varies composition so each beat feels distinct:
   * - duo: copy left, two tall frames right
   * - mirror: media left, copy right
   * - hero: one dominant frame + a floating inset
   * - cascade: staggered overlap collage
   */
  chapters: [
    {
      id: "photography",
      label: "Photography",
      layout: "duo" as const,
      copy: "I chase light, texture, and quiet frames — photography trained my eye for composition long before I opened a design tool.",
      images: [
        {
          src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
          alt: "Person photographing a landscape",
        },
        {
          src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
          alt: "Quiet street at dusk",
        },
      ],
    },
    {
      id: "music",
      label: "Music",
      layout: "mirror" as const,
      copy: "Lofi loops and late-night playlists keep me in flow — rhythm and pacing show up in how I time motion on the page.",
      images: [
        {
          src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80",
          alt: "Music studio equipment",
        },
        {
          src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=900&q=80",
          alt: "DJ mixer and headphones",
        },
      ],
    },
    {
      id: "games",
      label: "Games",
      layout: "hero" as const,
      copy: "Worlds, systems, and interaction design — games taught me how feedback, discovery, and delight keep someone exploring.",
      images: [
        {
          src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80",
          alt: "Controller on a desk",
        },
        {
          src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
          alt: "Colorful game controllers",
        },
      ],
    },
    {
      id: "sketching",
      label: "Sketching",
      layout: "cascade" as const,
      copy: "Rough ideas before they become UI — sketching keeps me honest about hierarchy, spacing, and what actually needs to exist.",
      images: [
        {
          src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80",
          alt: "Sketchbook and pencils",
        },
        {
          src: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=80",
          alt: "Hand drawing on paper",
        },
        {
          src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
          alt: "Laptop with code on a desk",
        },
      ],
    },
  ],
} as const;
