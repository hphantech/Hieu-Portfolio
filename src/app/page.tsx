import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { WorkPreview } from "@/components/sections/work-preview";
import { socialLinks } from "@/content/site";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <WorkPreview />

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
