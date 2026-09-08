"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";

import { about } from "@/content/about";
import { cn } from "@/lib/utils";

import styles from "./about.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const layoutClass: Record<(typeof about.chapters)[number]["layout"], string> = {
  duo: styles.layoutDuo,
  mirror: styles.layoutMirror,
  hero: styles.layoutHero,
  cascade: styles.layoutCascade,
};

/**
 * About: full-viewport hobby chapters with varied layouts.
 * Scroll-scrubbed (no pin) so Lenis stays smooth — same pattern as StoryLines.
 */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const chapters = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(`.${styles.chapter}`),
      );
      const texts = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(`.${styles.split}`),
      );
      const bodies = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(`.${styles.chapterBody}`),
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
          gsap.set(bodies, { autoAlpha: 1, y: 0 });
          gsap.set(section.querySelectorAll(`.${styles.chapterFrame}`), {
            autoAlpha: 1,
            y: 0,
          });
          gsap.set(section.querySelectorAll(`.${styles.index}`), {
            autoAlpha: 0.08,
          });
          gsap.set(section.querySelectorAll(`.${styles.chapterLabel}`), {
            autoAlpha: 1,
            y: 0,
          });
          return;
        }

        chapters.forEach((chapter) => {
          const text = chapter.querySelector<HTMLElement>(`.${styles.split}`);
          const body = chapter.querySelector<HTMLElement>(
            `.${styles.chapterBody}`,
          );
          const frames = gsap.utils.toArray<HTMLElement>(
            chapter.querySelectorAll(`.${styles.chapterFrame}`),
          );
          const imgs = gsap.utils.toArray<HTMLElement>(
            chapter.querySelectorAll(`.${styles.chapterImg}`),
          );
          const label = chapter.querySelector<HTMLElement>(
            `.${styles.chapterLabel}`,
          );
          const index = chapter.querySelector<HTMLElement>(`.${styles.index}`);
          if (!text) return;

          const split = SplitText.create(text, {
            type: "words,lines",
            mask: "lines",
            linesClass: "about-line",
            autoSplit: true,
            onSplit: (self) => {
              gsap.set(self.lines, { yPercent: 100 });
              gsap.set(frames, { autoAlpha: 0, y: 64 });
              gsap.set(imgs, { yPercent: 12 });
              if (label) gsap.set(label, { autoAlpha: 0, y: 20 });
              if (body) gsap.set(body, { autoAlpha: 0, y: 24 });
              if (index) gsap.set(index, { autoAlpha: 0 });

              const tl = gsap.timeline({
                defaults: { ease: "power1.out" },
                scrollTrigger: {
                  trigger: chapter,
                  scrub: 0.85,
                  start: "clamp(top 90%)",
                  end: "clamp(top 35%)",
                  invalidateOnRefresh: true,
                },
              });

              if (index) {
                tl.to(
                  index,
                  {
                    autoAlpha: 0.09,
                    duration: 0.5,
                    immediateRender: false,
                  },
                  0,
                );
              }

              if (label) {
                tl.to(
                  label,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.35,
                    immediateRender: false,
                  },
                  0,
                );
              }

              tl.to(
                self.lines,
                {
                  yPercent: 0,
                  stagger: 0.08,
                  immediateRender: false,
                },
                0.04,
              );

              if (body) {
                tl.to(
                  body,
                  {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.45,
                    immediateRender: false,
                  },
                  0.12,
                );
              }

              tl.to(
                frames,
                {
                  autoAlpha: 1,
                  y: 0,
                  stagger: 0.1,
                  immediateRender: false,
                },
                0.08,
              ).to(
                imgs,
                {
                  yPercent: 0,
                  stagger: 0.08,
                  immediateRender: false,
                },
                0.08,
              );

              return tl;
            },
          });

          splits.push(split);
        });

        gsap.set(texts, { autoAlpha: 1 });
        ScrollTrigger.refresh();
      };

      gsap.set(texts, { autoAlpha: 0 });
      gsap.set(bodies, { autoAlpha: 0 });
      gsap.set(section.querySelectorAll(`.${styles.chapterFrame}`), {
        autoAlpha: 0,
      });

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
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-label="About"
      className={styles.section}
    >
      <div className={styles.spacer} aria-hidden="true" />

      {about.chapters.map((chapter, chapterIndex) => (
        <article
          key={chapter.id}
          className={cn(styles.chapter, layoutClass[chapter.layout])}
          aria-labelledby={`about-${chapter.id}`}
        >
          <span className={styles.index} aria-hidden="true">
            {String(chapterIndex + 1).padStart(2, "0")}
          </span>

          <div className={styles.chapterInner}>
            <div className={styles.chapterCopy}>
              <p className={styles.chapterLabel}>{chapter.label}</p>
              <h3 id={`about-${chapter.id}`} className={styles.split}>
                {chapter.headline}
              </h3>
              <div className={styles.chapterBody}>
                {chapter.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className={styles.chapterMedia}>
              {chapter.images.map((image, index) => (
                <div
                  key={image.src}
                  className={cn(
                    styles.chapterFrame,
                    styles[`frame${index + 1}` as keyof typeof styles],
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={styles.chapterImg}
                    sizes="(max-width: 900px) 92vw, 55vw"
                    priority={chapterIndex === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}

      <div className={styles.spacer} aria-hidden="true" />
    </section>
  );
}
