import { Briefcase, GraduationCap } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experienceEntries } from "@/content/experience";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto w-full max-w-5xl px-6 py-20"
    >
      <SectionHeading
        id="experience-heading"
        index="03"
        title="Experience"
        description="Education and hands-on work, most recent first."
      />
      <ol className="border-border relative space-y-10 border-l pl-8 sm:pl-10">
        {experienceEntries.map((entry, index) => {
          const Icon = entry.type === "education" ? GraduationCap : Briefcase;
          return (
            <Reveal
              key={entry.id}
              as="li"
              delay={index * 0.08}
              className="relative"
            >
              <span className="bg-background border-accent text-accent absolute top-0 -left-[41px] flex h-8 w-8 items-center justify-center rounded-full border-2 sm:-left-[49px]">
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
              <div className="border-border bg-surface rounded-2xl border p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-foreground text-lg font-semibold">
                    {entry.title}
                  </h3>
                  <span className="text-muted font-mono text-xs">
                    {entry.start}
                    {entry.end ? ` — ${entry.end}` : ""}
                  </span>
                </div>
                <p className="text-muted mt-1 text-sm">
                  {entry.organization}
                  {entry.location ? ` · ${entry.location}` : ""}
                </p>
                <p className="text-muted mt-3 text-base leading-7">
                  {entry.description}
                </p>
                {entry.tags ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <li
                        key={tag}
                        className="bg-background text-muted rounded-md px-2.5 py-1 font-mono text-xs"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
