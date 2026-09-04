"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

import { cn } from "@/lib/utils";

import styles from "./story-lines.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type StoryLinesProps = {
  lines: readonly string[];
  /** Accessible heading announced to screen readers. */
  label: string;
  id?: string;
  /**
   * `chapter` = tall scroll chapters (intro).
   * `bridge` = shorter beats between sections.
   */
  density?: "chapter" | "bridge";
  className?: string;
};

/**
 * Scroll-scrubbed SplitText line reveals for storytelling copy.
 */
export function StoryLines({
  lines,
  label,
  id,
  density = "bridge",
  className,
}: StoryLinesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingId = id ? `${id}-heading` : undefined;

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const containers = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(`.${styles.container}`),
      );
      const texts = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(`.${styles.split}`),
      );

      let splits: SplitText[] = [];
      let alive = true;

      const clearSplits = () => {
        splits.forEach((split) => split.revert());
        splits = [];
      };

      const setup = () => {
        if (!alive) return;
        clearSplits();

        if (prefersReducedMotion) {
          gsap.set(texts, { autoAlpha: 1 });
          return;
        }

        containers.forEach((container) => {
          const text = container.querySelector<HTMLElement>(`.${styles.split}`);
          if (!text) return;

          const split = SplitText.create(text, {
            type: "words,lines",
            mask: "lines",
            linesClass: "story-line",
            autoSplit: true,
            onSplit: (self) => {
              gsap.set(self.lines, { yPercent: 100 });
              return gsap.to(self.lines, {
                yPercent: 0,
                stagger: 0.16,
                ease: "power1.out",
                immediateRender: false,
                scrollTrigger: {
                  trigger: text,
                  // Number = lag (seconds) — smoothes the scrub catch-up.
                  scrub: 1.4,
                  start: "clamp(top 92%)",
                  end: "clamp(center 42%)",
                  invalidateOnRefresh: true,
                },
              });
            },
          });

          splits.push(split);
        });

        gsap.set(texts, { autoAlpha: 1 });
        ScrollTrigger.refresh();
      };

      gsap.set(texts, { autoAlpha: 0 });

      void document.fonts.ready.then(() => {
        if (!alive) return;
        setup();
      });

      const onHeroReady = () => {
        if (!alive) return;
        ScrollTrigger.refresh();
      };
      window.addEventListener("portfolio:hero-ready", onHeroReady);

      return () => {
        alive = false;
        window.removeEventListener("portfolio:hero-ready", onHeroReady);
        clearSplits();
      };
    },
    { scope: sectionRef, dependencies: [lines] },
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={headingId}
      className={cn(
        styles.section,
        density === "chapter" ? styles.chapter : styles.bridge,
        className,
      )}
    >
      <h2 id={headingId} className="sr-only">
        {label}
      </h2>

      {density === "chapter" ? (
        <div className={styles.spacer} aria-hidden="true" />
      ) : null}

      {lines.map((line) => (
        <div key={line} className={styles.container}>
          <p className={styles.split}>{line}</p>
        </div>
      ))}

      {density === "chapter" ? (
        <div className={styles.spacer} aria-hidden="true" />
      ) : null}
    </section>
  );
}
