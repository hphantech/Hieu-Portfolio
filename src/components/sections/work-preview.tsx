import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/content/projects";

export function WorkPreview() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-border/60 bg-surface border-y"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        <SectionHeading
          id="work-heading"
          index="04"
          title="Work"
          description="Placeholder projects for now — swap these with real case studies."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              as="article"
              delay={index * 0.08}
              className="border-border bg-background flex h-full flex-col rounded-2xl border p-6"
            >
              <h3 className="text-foreground text-xl font-semibold">
                {project.title}
              </h3>
              <p className="text-muted mt-3 flex-1 text-base leading-7">
                {project.summary}
              </p>
              <ul
                aria-label={`Technologies used in ${project.title}`}
                className="mt-5 flex flex-wrap gap-2"
              >
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="bg-surface text-muted rounded-md px-2.5 py-1 font-mono text-xs"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <Link
                href={`/work/${project.slug}`}
                className="text-accent mt-6 inline-flex text-sm font-medium transition-opacity hover:opacity-70"
                data-cursor-hover
              >
                View case study →
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
