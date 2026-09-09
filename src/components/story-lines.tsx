"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useRef } from "react";

import type { StoryBeat, StoryLayout } from "@/content/story";
import { cn } from "@/lib/utils";

import styles from "./story-lines.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function toBeats(lines: readonly string[] | readonly StoryBeat[]): StoryBeat[] {
  return lines.map((line) =>
    typeof line === "string" ? { text: line } : line,
  );
}

const layoutClass: Record<StoryLayout, string> = {
  mediaRight: styles.layoutMediaRight,
  mediaLeft: styles.layoutMediaLeft,
  mediaWide: styles.layoutMediaWide,
  mediaFloat: styles.layoutMediaFloat,
};

type StoryLinesProps = {
  lines: readonly string[] | readonly StoryBeat[];
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
 * Beats may include images with varied layouts per sentence.
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
  const beats = toBeats(lines);

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
          gsap.set(section.querySelectorAll(`.${styles.mediaFrame}`), {
            autoAlpha: 1,
            y: 0,
            x: 0,
          });
          return;
        }

        containers.forEach((container) => {
          const text = container.querySelector<HTMLElement>(`.${styles.split}`);
          const frames = gsap.utils.toArray<HTMLElement>(
            container.querySelectorAll(`.${styles.mediaFrame}`),
          );
          if (!text) return;

          const fromLeft = container.classList.contains(styles.layoutMediaLeft);
          const fromBelow = container.classList.contains(
            styles.layoutMediaFloat,
          );

          const split = SplitText.create(text, {
            type: "words,lines",
            mask: "lines",
            linesClass: "story-line",
            autoSplit: true,
            onSplit: (self) => {
              gsap.set(self.lines, { yPercent: 100 });
              if (frames.length) {
                gsap.set(frames, {
                  autoAlpha: 0,
                  y: fromBelow ? 72 : fromLeft ? 24 : 48,
                  x: fromLeft ? -48 : fromBelow ? 0 : 36,
                });
              }

              const tl = gsap.timeline({
                defaults: { ease: "power1.out" },
                scrollTrigger: {
                  trigger: container,
                  scrub: 1.2,
                  start: "clamp(top 90%)",
                  end: "clamp(center 40%)",
                  invalidateOnRefresh: true,
                },
              });

              // Media-left: images lead, then copy. Otherwise copy leads.
              const textAt = fromLeft ? 0.14 : 0;
              const mediaAt = fromLeft ? 0 : 0.1;

              tl.to(
                self.lines,
                {
                  yPercent: 0,
                  stagger: 0.14,
                  immediateRender: false,
                },
                textAt,
              );

              if (frames.length) {
                tl.to(
                  frames,
                  {
                    autoAlpha: 1,
                    y: 0,
                    x: 0,
                    stagger: fromLeft ? 0.14 : 0.1,
                    immediateRender: false,
                  },
                  mediaAt,
                );
              }

              return tl;
            },
          });

          splits.push(split);
        });

        gsap.set(texts, { autoAlpha: 1 });
        ScrollTrigger.refresh();
      };

      gsap.set(texts, { autoAlpha: 0 });
      gsap.set(section.querySelectorAll(`.${styles.mediaFrame}`), {
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

      {beats.map((beat) => {
        const mediaCount = (beat.video ? 1 : 0) + (beat.images?.length ?? 0);
        const hasMedia = mediaCount > 0;
        const layout = beat.layout ?? "mediaRight";
        let frameIndex = 0;

        return (
          <div
            key={beat.text}
            className={cn(
              styles.container,
              hasMedia && styles.containerWithMedia,
              hasMedia && layoutClass[layout],
            )}
          >
            <div className={styles.copy}>
              <p className={styles.split}>{beat.text}</p>
            </div>

            {hasMedia ? (
              <div
                className={cn(
                  styles.media,
                  mediaCount >= 3 ? styles.mediaTrio : styles.mediaDuo,
                )}
              >
                {beat.video ? (
                  <div
                    className={cn(
                      styles.mediaFrame,
                      styles[
                        `mediaFrame${++frameIndex}` as keyof typeof styles
                      ],
                    )}
                  >
                    <video
                      className={styles.mediaVideo}
                      src={beat.video.src}
                      aria-label={beat.video.label}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                    />
                  </div>
                ) : null}
                {beat.images?.map((image) => (
                  <div
                    key={image.src}
                    className={cn(
                      styles.mediaFrame,
                      styles[
                        `mediaFrame${++frameIndex}` as keyof typeof styles
                      ],
                    )}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={styles.mediaImg}
                      sizes="(max-width: 900px) 90vw, 42vw"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}

      {density === "chapter" ? (
        <div className={styles.spacer} aria-hidden="true" />
      ) : null}
    </section>
  );
}
