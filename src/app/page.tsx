import Link from "next/link";

import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { aboutParagraphs, quickFacts } from "@/content/about";
import { experienceEntries } from "@/content/experience";
import { projects } from "@/content/projects";
import { skillGroups, skillsTicker } from "@/content/skills";
import { site, socialLinks } from "@/content/site";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <section
        aria-labelledby="hero-heading"
        className="border-border/60 bg-surface border-b"
      >
        <Reveal
          as="div"
          className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28"
        >
          <p className="text-accent mb-4 text-sm font-medium tracking-[0.2em] uppercase">
            {site.role}
          </p>
          <h1
            id="hero-heading"
            className="text-foreground max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl sm:leading-tight"
          >
            Hi, I&apos;m {site.name}.
          </h1>
          <p className="text-muted mt-6 max-w-2xl text-lg leading-8">
            {site.tagline} Based in the {site.location}, I&apos;m building this
            portfolio to showcase my work ahead of frontend internship
            applications.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="bg-foreground text-background inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
              data-cursor-hover
            >
              View work
            </a>
            <a
              href={socialLinks[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border text-foreground hover:bg-surface inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition-colors"
              data-cursor-hover
            >
              GitHub
            </a>
          </div>
        </Reveal>
      </section>

      <section
        id="about"
        aria-labelledby="about-heading"
        className="mx-auto w-full max-w-5xl px-6 py-20"
      >
        <SectionHeading
          id="about-heading"
          title="About"
          description="A short introduction to who you are, what you're studying, and what kind of frontend work excites you."
        />
        <Reveal className="grid gap-10 md:grid-cols-[2fr_1fr]">
          <div className="text-muted max-w-3xl space-y-4 text-base leading-8">
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <dl className="border-border bg-surface grid gap-4 self-start rounded-2xl border p-6 text-sm">
            {quickFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-muted">{fact.label}</dt>
                <dd className="text-foreground mt-1 font-medium">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="border-border/60 bg-surface border-y"
      >
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <SectionHeading
            id="skills-heading"
            title="Skills"
            description="Technologies and practices I'm building with."
          />
          <Reveal className="grid gap-8 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-muted text-sm font-medium tracking-[0.15em] uppercase">
                  {group.title}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border-border bg-background text-foreground rounded-full border px-4 py-2 text-sm"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
          <Marquee items={skillsTicker} className="mt-10" />
        </div>
      </section>

      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="mx-auto w-full max-w-5xl px-6 py-20"
      >
        <SectionHeading
          id="experience-heading"
          title="Experience"
          description="Education and hands-on work, most recent first."
        />
        <ol className="space-y-6">
          {experienceEntries.map((entry, index) => (
            <Reveal
              key={entry.id}
              as="li"
              delay={index * 0.08}
              className="border-border bg-surface rounded-2xl border p-6"
            >
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
            </Reveal>
          ))}
        </ol>
      </section>

      <section
        id="work"
        aria-labelledby="work-heading"
        className="border-border/60 bg-surface border-y"
      >
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <SectionHeading
            id="work-heading"
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
