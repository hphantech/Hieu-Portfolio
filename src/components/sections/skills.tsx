import { Accessibility, FileCode, Layers, Wrench } from "lucide-react";

import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { skillGroups, skillsTicker } from "@/content/skills";
import type { SkillGroupIcon } from "@/types/content";

const icons: Record<SkillGroupIcon, typeof Layers> = {
  languages: FileCode,
  frameworks: Layers,
  practices: Accessibility,
  tooling: Wrench,
};

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-border/60 bg-surface border-y"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        <SectionHeading
          id="skills-heading"
          index="02"
          title="Skills"
          description="Technologies and practices I'm building with."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, index) => {
            const Icon = icons[group.icon];
            return (
              <Reveal
                key={group.title}
                delay={index * 0.08}
                className="border-border bg-background rounded-2xl border p-6"
              >
                <div className="text-muted flex items-center gap-2">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  <h3 className="text-sm font-medium tracking-[0.15em] uppercase">
                    {group.title}
                  </h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border-border bg-surface text-foreground rounded-full border px-4 py-2 text-sm"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
        <Marquee items={skillsTicker} className="mt-10" />
      </div>
    </section>
  );
}
