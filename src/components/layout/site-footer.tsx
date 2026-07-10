import { ArrowUp } from "lucide-react";

import { SocialIcon } from "@/components/social-icon";
import { site, socialLinks } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-muted flex flex-col gap-1 text-sm">
          <p>
            © {year} {site.name}. Built with Next.js and Tailwind CSS.
          </p>
          <p>Portfolio in progress — February 2026</p>
        </div>

        <div className="flex items-center gap-5">
          <ul className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.icon === "mail" ? undefined : "_blank"}
                  rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                  className="text-muted hover:text-foreground transition-colors"
                  data-cursor-hover
                >
                  <span className="sr-only">{link.label}</span>
                  <SocialIcon icon={link.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#main-content"
            className="text-muted hover:text-foreground border-border inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
            data-cursor-hover
          >
            <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
