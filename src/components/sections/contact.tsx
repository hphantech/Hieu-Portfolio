import { Download, Send } from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SocialIcon } from "@/components/social-icon";
import { site, socialLinks } from "@/content/site";

export function Contact() {
  const email = socialLinks.find((link) => link.icon === "mail");

  return (
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
        <p className="text-foreground max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          {site.availability}. If that sounds like a match, I&apos;d love to
          hear from you.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {email ? (
            <Magnetic>
              <a
                href={email.href}
                className="bg-foreground text-background inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
                data-cursor-hover
              >
                Say hello
                <Send aria-hidden="true" className="h-4 w-4" />
              </a>
            </Magnetic>
          ) : null}

          <Magnetic>
            <a
              href={site.resumeUrl}
              download
              className="border-border text-foreground hover:bg-surface inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
              data-cursor-hover
            >
              Download CV
              <Download aria-hidden="true" className="h-4 w-4" />
            </a>
          </Magnetic>
        </div>
      </Reveal>

      <Reveal as="div" delay={0.1} className="mt-12">
        <address className="not-italic">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-base">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.icon === "mail" ? undefined : "_blank"}
                  rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                  className="text-muted hover:text-foreground inline-flex items-center gap-2 transition-colors"
                  data-cursor-hover
                >
                  <SocialIcon icon={link.icon} className="h-4 w-4" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </address>
      </Reveal>
    </section>
  );
}
