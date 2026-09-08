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
        "She is honestly one of the best parts of my day. After long stretches of building websites, fixing bugs, or sitting in front of a laptop, hanging out with Mochi pulls me straight back into real life.",
        "We go on walks, she steals the couch, I take way too many photos of her, and somehow that mix of chaos and calm is exactly what I need. I always try to spend time with her — not as a break from work, but because that time matters to me.",
        "If you know me outside school or projects, you already know: Mochi is family, and she shows up in my life a lot more than any side project ever will.",
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
      label: "Travel & hiking",
      layout: "cascade" as const,
      headline: "I like to travel — and I really like hiking.",
      body: [
        "Going somewhere new resets how I think. I went to Bangkok for a full semester as an IT minor exchange student, studied there, worked with people from different countries, and got thrown into a completely different rhythm than home.",
        "That exchange was not just classes. It was food stalls, late nights figuring things out, campus events, and learning how to settle into a city that moves fast.",
        "When I am not studying or building, I go hiking whenever I can. Mountains, long trails, quiet views — being outside clears my head better than any productivity hack. Travel and hiking are how I recharge, and they keep me curious.",
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
      headline: "I like to cook — and I improvise.",
      body: [
        "I do not always follow a strict recipe. Half the fun is opening the fridge, seeing what is there, and turning it into something that actually tastes good.",
        "Sometimes that means a full plate like chicken rice with broth and sides. Sometimes it is just experimenting until it works. Cooking is my creative reset: taste, adjust, plate it, and enjoy it with people I care about.",
        "That same improvising mindset shows up in how I build interfaces too — try something, feel if it works, refine it, and ship.",
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
