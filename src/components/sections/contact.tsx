import { Download, Send } from "lucide-react";

import { GithubGlassCard } from "@/components/github-glass-card";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SocialIcon } from "@/components/social-icon";
import { site, socialLinks } from "@/content/site";

export function Contact() {
  const email = socialLinks.find((link) => link.icon === "mail");

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="w-full px-4 py-12 sm:px-6 sm:py-16"
    >
      <GithubGlassCard>
        <Reveal>
          <div className="flex max-w-md flex-col gap-4 sm:max-w-lg sm:gap-5">
            <div className="space-y-2">
              <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Let&apos;s build something.
              </h2>
              <p className="text-muted-foreground text-sm leading-snug sm:text-base sm:leading-relaxed">
                Frontend internship from September 2026. Drag the card — or
                reach out.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {email ? (
                <Magnetic>
                  <a
                    href={email.href}
                    className="bg-foreground text-background inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-85"
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
                  className="border-border text-foreground hover:bg-surface inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
                >
                  Download CV
                  <Download aria-hidden="true" className="h-4 w-4" />
                </a>
              </Magnetic>
            </div>

            <address className="not-italic">
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.icon === "mail" ? undefined : "_blank"}
                      rel={
                        link.icon === "mail" ? undefined : "noopener noreferrer"
                      }
                      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition-colors"
                    >
                      <SocialIcon icon={link.icon} className="h-3.5 w-3.5" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </address>
          </div>
        </Reveal>
      </GithubGlassCard>
    </section>
  );
}
