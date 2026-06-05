import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <section
        aria-labelledby="hero-heading"
        className="border-b border-border/60 bg-surface"
      >
        <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            {siteConfig.role}
          </p>
          <h1
            id="hero-heading"
            className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-tight"
          >
            Hi, I&apos;m {siteConfig.name}.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {siteConfig.tagline} Based in the {siteConfig.location}, I&apos;m
            building this portfolio to showcase my work ahead of frontend
            internship applications.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              View projects
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              GitHub
            </a>
          </div>
        </div>
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
        <div className="max-w-3xl space-y-4 text-base leading-8 text-muted">
          <p>
            I&apos;m a frontend developer focused on turning designs into
            polished, accessible experiences across screen sizes — from wide
            desktop layouts down to 320px mobile viewports.
          </p>
          <p>
            This site is a starting point. Over the coming months I&apos;ll add
            real projects, case studies, and notes on topics like semantic HTML,
            React, Next.js, and accessibility.
          </p>
        </div>
      </section>

      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="border-y border-border/60 bg-surface"
      >
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <SectionHeading
            id="skills-heading"
            title="Skills"
            description="Technologies and practices I'm building with."
          />
          <ul className="flex flex-wrap gap-3">
            {siteConfig.skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="mx-auto w-full max-w-5xl px-6 py-20"
      >
        <SectionHeading
          id="projects-heading"
          title="Projects"
          description="Placeholder cards for now — swap these with real work and write-ups."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {siteConfig.projects.map((project) => (
            <article
              key={project.title}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-3 flex-1 text-base leading-7 text-muted">
                {project.description}
              </p>
              <ul
                aria-label={`Technologies used in ${project.title}`}
                className="mt-5 flex flex-wrap gap-2"
              >
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md bg-background px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <a
                href={project.href}
                className="mt-6 inline-flex text-sm font-medium text-accent transition-opacity hover:opacity-70"
              >
                View project →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="border-t border-border/60 bg-surface"
      >
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <SectionHeading
            id="contact-heading"
            title="Contact"
            description="Open to internship opportunities, collaborations, and feedback."
          />
          <address className="not-italic">
            <ul className="space-y-3 text-base text-muted">
              <li>
                <span className="font-medium text-foreground">Email: </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-accent transition-opacity hover:opacity-70"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="font-medium text-foreground">GitHub: </span>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent transition-opacity hover:opacity-70"
                >
                  {siteConfig.links.github}
                </a>
              </li>
              <li>
                <span className="font-medium text-foreground">LinkedIn: </span>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent transition-opacity hover:opacity-70"
                >
                  {siteConfig.links.linkedin}
                </a>
              </li>
            </ul>
          </address>
        </div>
      </section>
    </main>
  );
}
