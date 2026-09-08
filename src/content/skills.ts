/**
 * Skills shown on the home page.
 * Edit groups/items here — the section only renders them.
 */
export const skills = {
  headline: "Skills",
  lead: "Tools and craft I use to ship clear, kinetic interfaces.",
  groups: [
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
} as const;
