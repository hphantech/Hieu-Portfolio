import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { projects } from "@/content/projects";
import { socialLinks } from "@/content/site";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <About />
      <Skills />
      <Experience />

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

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="mx-auto w-full max-w-5xl px-6 py-20"
      >
        <SectionHeading
          id="contact-heading"
          index="05"
          title="Contact"
          description="Open to internship opportunities, collaborations, and feedback."
        />
        <Reveal>
          <address className="not-italic">
            <ul className="text-muted space-y-3 text-base">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <span className="text-foreground font-medium">
                    {link.label}:{" "}
                  </span>
                  <a
                    href={link.href}
                    target={link.icon === "mail" ? undefined : "_blank"}
                    rel={
                      link.icon === "mail" ? undefined : "noopener noreferrer"
                    }
                    className="text-accent transition-opacity hover:opacity-70"
                    data-cursor-hover
                  >
                    {link.href}
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </Reveal>
      </section>
    </main>
  );
}
