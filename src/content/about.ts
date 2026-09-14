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
      id: "mochi",
      label: "Life outside code",
      layout: "duo" as const,
      headline: "I have a dog named Mochi.",
      body: [
        "Honestly one of the best parts of my day :))) After too many hours on a laptop, hanging out with her just hits different.",
        "Walks, couch stealing, way too many photos… that chaos + calm combo is exactly what I need. Not a “break from work”, just time that matters.",
        "If you know me IRL you already know. Mochi is family, full stop.",
      ],
      images: [
        {
          src: "/images/about/mochi-1.jpg",
          alt: "Mochi sitting on the coffee table at home",
        },
        {
          src: "/images/about/mochi-2.jpg",
          alt: "Mochi looking at the camera on the bed",
        },
      ],
    },
    {
      id: "travel",
      label: "Traveling",
      layout: "cascade" as const,
      headline: "Traveling is my reset button.",
      body: [
        "I did a full semester in Bangkok as an IT minor exchange. New city, new people, totally different pace. Loved it.",
        "Food stalls, late nights figuring stuff out, campus chaos… it was a lot, in the best way :))",
        "When I’m home I still try to get out whenever I can. New places clear my head better than any productivity tip ever will.",
      ],
      images: [
        {
          src: "/images/about/travel-hike.jpg",
          alt: "Looking out over a mountain valley while hiking",
        },
        {
          src: "/images/about/travel-bangkok.jpg",
          alt: "KMITL International Day stall in Bangkok",
        },
        {
          src: "/images/about/travel-shenzhen.jpg",
          alt: "I Love Shenzhen outdoor sculpture",
        },
      ],
    },
    {
      id: "cooking",
      label: "Cooking",
      layout: "hero" as const,
      headline: "I cook. And I freestyle a lot.",
      body: [
        "I don’t always follow recipes. Open the fridge, see what’s there, make it taste good. Half the fun is improvising :)",
        "Sometimes it’s a full plate of chicken rice. Sometimes it’s “wait does this even work”. Either way I love plating it up and sharing it.",
        "Same vibe as building stuff. Try it, taste it, tweak it, done.",
      ],
      images: [
        {
          src: "/images/about/cook-1.jpg",
          alt: "Homemade Hainanese chicken rice plated at home",
        },
      ],
    },
  ],
} as const;
