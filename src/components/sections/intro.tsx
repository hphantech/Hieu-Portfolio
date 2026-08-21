"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

import { introParagraphs } from "@/content/intro";

import styles from "./intro.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * Scroll-scrubbed SplitText line reveals (demo pattern):
 * return the tween from onSplit + autoSplit so resize/fonts re-split cleanly.
 *
 * Tall containers + clamp(top/bottom center) give a long scrub distance
 * like the CodePen. set→to avoids the first-scroll from() snap glitch.
 */
export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);

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
            linesClass: "intro-line",
            autoSplit: true,
            onSplit: (self) => {
              // Explicit start state — avoids from() snapping on first scrub tick.
              gsap.set(self.lines, { yPercent: 120 });
              return gsap.to(self.lines, {
                yPercent: 0,
                stagger: 0.1,
                ease: "none",
                immediateRender: false,
                scrollTrigger: {
                  trigger: container,
                  scrub: true,
                  start: "clamp(top center)",
                  end: "clamp(bottom center)",
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

      // Hide until split + line offsets are applied (prevents plain-text flash).
      gsap.set(texts, { autoAlpha: 0 });

      void document.fonts.ready.then(() => {
        if (!alive) return;
        setup();
      });

      const onHeroReady = () => {
        if (!alive) return;
        // Layout height changes when the hero unlocks — refresh without rebuild.
        ScrollTrigger.refresh();
      };
      window.addEventListener("portfolio:hero-ready", onHeroReady);

      return () => {
        alive = false;
        window.removeEventListener("portfolio:hero-ready", onHeroReady);
        clearSplits();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="intro-heading"
      className={styles.section}
    >
      <h2 id="intro-heading" className="sr-only">
        About
      </h2>

      <div className={styles.spacer} aria-hidden="true" />

      {introParagraphs.map((paragraph, index) => (
        <div key={index} className={styles.container}>
          <p className={styles.split}>{paragraph}</p>
        </div>
      ))}

      <div className={styles.spacer} aria-hidden="true" />
    </section>
  );
}
