"use client";

import { motion, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { navItems, site } from "@/content/site";
import { useActiveSection } from "@/hooks/use-active-section";

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

export function SiteHeader() {
  const { scrollYProgress } = useScroll();
  const activeId = useActiveSection(sectionIds);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-sm">
      <motion.div
        aria-hidden="true"
        className="bg-accent absolute inset-x-0 top-0 h-[2px] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-6 py-5">
        <Link
          href="/"
          className="text-foreground text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
          data-cursor-hover
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="text-muted flex flex-wrap items-center gap-5 text-sm">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "text-foreground font-medium"
                        : "hover:text-foreground",
                    )}
                    data-cursor-hover
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="border-border text-foreground inline-flex items-center justify-center rounded-md border p-2 sm:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="sr-only">
            {isMenuOpen ? "Close menu" : "Open menu"}
          </span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            {isMenuOpen ? (
              <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen ? (
        <nav id="mobile-nav" aria-label="Primary" className="sm:hidden">
          <ul className="border-border/60 flex flex-col border-t px-6 py-4 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted hover:text-foreground block py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
