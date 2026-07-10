import Link from "next/link";

import { navItems, site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="border-border/60 bg-background/80 border-b backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-6 py-5">
        <Link
          href="/"
          className="text-foreground text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
        >
          {site.name}
        </Link>

        <nav aria-label="Primary">
          <ul className="text-muted flex flex-wrap items-center gap-5 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
