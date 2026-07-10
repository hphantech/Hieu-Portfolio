import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import type { Project } from "@/types/content";

type CaseStudyProps = {
  project: Project;
};

export function CaseStudy({ project }: CaseStudyProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-20">
      <Reveal>
        <Link
          href="/#work"
          className="text-muted inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
          data-cursor-hover
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to work
        </Link>
      </Reveal>

      <Reveal as="header" className="mt-8">
        <p className="text-accent text-sm font-medium tracking-[0.2em] uppercase">
          Case study
        </p>
        <h1 className="text-foreground mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <dl className="text-muted mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <div className="flex gap-2">
            <dt className="text-foreground font-medium">Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-foreground font-medium">Year</dt>
            <dd>{project.year}</dd>
          </div>
        </dl>
        <ul
          aria-label={`Technologies used in ${project.title}`}
          className="mt-5 flex flex-wrap gap-2"
        >
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="border-border bg-surface text-muted rounded-md border px-2.5 py-1 font-mono text-xs"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal
        as="div"
        delay={0.1}
        className="border-border bg-surface mt-10 aspect-video rounded-2xl border"
      >
        {/* TODO: replace with a real project screenshot or GIF. */}
        <div className="flex h-full items-center justify-center">
          <span className="text-muted text-sm">
            Add a project screenshot here
          </span>
        </div>
      </Reveal>

      <Reveal
        as="div"
        delay={0.15}
        className="prose-invert mt-10 space-y-5 text-base leading-7"
      >
        {project.body.map((paragraph, index) => (
          <p key={index} className="text-foreground/90">
            {paragraph}
          </p>
        ))}
      </Reveal>

      {project.links.length > 0 ? (
        <Reveal
          as="div"
          delay={0.2}
          className="mt-10 flex flex-wrap gap-4 border-t pt-8"
        >
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-foreground inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
              data-cursor-hover
            >
              {link.label}
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          ))}
        </Reveal>
      ) : null}
    </article>
  );
}
