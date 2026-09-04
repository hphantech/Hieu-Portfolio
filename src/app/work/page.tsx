import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "All projects",
  description: `Full project archive — ${site.name}`,
};

export default function WorkIndexPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-6 py-20">
      <Reveal>
        <Link
          href="/#more-work"
          className="text-muted-foreground inline-flex text-sm font-medium transition-opacity hover:opacity-70"
        >
          ← Back
        </Link>
      </Reveal>

      <Reveal as="header" className="mt-8">
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
          All projects
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl text-lg">
          Everything in one place — open a case study for the full story.
        </p>
      </Reveal>

      <ul className="mt-12 divide-y divide-black/10">
        {projects.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={Math.min(index * 0.04, 0.3)}>
            <Link
              href={`/work/${project.slug}`}
              className="group flex flex-col gap-1 py-5 transition-opacity hover:opacity-70 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="text-foreground text-lg font-medium tracking-tight sm:text-xl">
                {project.title}
              </span>
              <span className="text-muted-foreground shrink-0 font-mono text-xs">
                {project.year}
                <span className="mx-2 opacity-40">·</span>
                {project.role}
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </main>
  );
}
