"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { useLenisInstance } from "@/components/motion/lenis-provider";
import { Reveal } from "@/components/motion/reveal";
import { ProjectModal } from "@/components/work/project-modal";
import { projects } from "@/content/projects";
import type { Project } from "@/types/content";

export function WorkArchive() {
  const [selected, setSelected] = useState<Project | null>(null);
  const lenis = useLenisInstance();

  useEffect(() => {
    if (!lenis) return;
    if (selected) {
      lenis.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      lenis.start();
      document.documentElement.style.overflow = "";
    };
  }, [selected, lenis]);

  return (
    <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-6 py-20">
      <Reveal>
        <Link
          href="/#work"
          className="text-muted-foreground inline-flex text-sm font-medium transition-opacity hover:opacity-70"
        >
          ← Back to home
        </Link>
      </Reveal>

      <Reveal as="header" className="mt-8">
        <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
          All projects
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl text-lg">
          Open a case study in a popup — no extra page load.
        </p>
      </Reveal>

      <ul className="mt-12 divide-y divide-black/10">
        {projects.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={Math.min(index * 0.04, 0.3)}>
            <button
              type="button"
              onClick={() => setSelected(project)}
              className="group flex w-full flex-col gap-1 py-5 text-left transition-opacity hover:opacity-70 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="text-foreground text-lg font-medium tracking-tight sm:text-xl">
                {project.title}
              </span>
              <span className="text-muted-foreground shrink-0 font-mono text-xs">
                {project.year}
                <span className="mx-2 opacity-40">·</span>
                {project.role}
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
