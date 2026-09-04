"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { moreProjects } from "@/content/projects";
import { cn } from "@/lib/utils";

import styles from "./work-carousel.module.css";

/**
 * 3D cover-flow carousel for additional work — wide landscape frames
 * suited to website page screenshots. Past the last slide: a subtle
 * “want to see more?” CTA that links to the full archive.
 */
export function WorkCarousel() {
  const slides = moreProjects.filter((p) => p.cover);
  const ctaIndex = slides.length;
  const total = slides.length + 1;

  const [activeIndex, setActiveIndex] = useState(
    Math.min(2, Math.max(0, slides.length - 1)),
  );
  const prefersReducedMotion = useReducedMotion();
  const isCta = activeIndex === ctaIndex;

  if (slides.length === 0) return null;

  const spring = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, bounce: 0.15, duration: 0.85 };

  const toPrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const toNext = () =>
    setActiveIndex((prev) => Math.min(total - 1, prev + 1));
  const toSlide = (index: number) => setActiveIndex(index);

  return (
    <section
      id="more-work"
      aria-label="More projects"
      className={styles.section}
    >
      <div className={styles.stage}>
        <div className={styles.viewport}>
          <motion.div
            className={styles.track}
            animate={{
              x: `${(-activeIndex * 100) / total}%`,
            }}
            transition={spring}
          >
            {slides.map((project, i) => {
              const isActive = activeIndex === i;
              const offset = activeIndex - i;

              return (
                <div key={project.slug} className={styles.slide}>
                  <motion.div
                    className={styles.card}
                    animate={{
                      rotateY: prefersReducedMotion ? 0 : offset * 42,
                      scale: isActive ? 1 : 0.88,
                    }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: "spring", bounce: 0.08, duration: 1 }
                    }
                  >
                    {isActive ? (
                      <Link
                        href={`/work/${project.slug}`}
                        className={styles.frame}
                        aria-label={`Open case study: ${project.title}`}
                      >
                        <Image
                          src={project.cover!}
                          alt={`Screenshot of ${project.title}`}
                          width={1280}
                          height={800}
                          className={styles.image}
                          sizes="(max-width: 768px) 85vw, 36rem"
                          priority
                        />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={styles.frame}
                        onClick={() => toSlide(i)}
                        aria-label={`Show ${project.title}`}
                      >
                        <Image
                          src={project.cover!}
                          alt={`Screenshot of ${project.title}`}
                          width={1280}
                          height={800}
                          className={styles.image}
                          sizes="(max-width: 768px) 85vw, 36rem"
                        />
                      </button>
                    )}

                    <motion.div
                      className={styles.caption}
                      animate={{
                        filter: isActive ? "blur(0px)" : "blur(2px)",
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.35 }
                      }
                    >
                      <p className={styles.captionTitle}>{project.title}</p>
                      <span
                        className={styles.captionMeta}
                        aria-hidden={!isActive}
                      >
                        {project.year} · {project.role}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}

            <div className={styles.slide}>
              <motion.div
                className={styles.ctaCard}
                animate={{
                  rotateY: prefersReducedMotion
                    ? 0
                    : (activeIndex - ctaIndex) * 42,
                  scale: isCta ? 1 : 0.88,
                  opacity: isCta ? 1 : 0.45,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", bounce: 0.08, duration: 1 }
                }
              >
                <p className={styles.ctaEyebrow}>Want to see more?</p>
                <p className={styles.ctaCopy}>
                  The full archive has every project in one place.
                </p>
                <Link href="/work" className={styles.ctaButton}>
                  Browse all projects
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            onClick={toPrev}
            disabled={activeIndex === 0}
            aria-label="Previous project"
            className={styles.controlBtn}
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
          </button>

          <div
            className={styles.dots}
            role="tablist"
            aria-label="Project slides"
          >
            {slides.map((project, i) => (
              <button
                key={project.slug}
                type="button"
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Go to ${project.title}`}
                onClick={() => toSlide(i)}
                className={cn(
                  styles.dot,
                  activeIndex === i ? styles.dotActive : styles.dotIdle,
                )}
              />
            ))}
            <button
              type="button"
              role="tab"
              aria-selected={isCta}
              aria-label="See more projects"
              onClick={() => toSlide(ctaIndex)}
              className={cn(
                styles.dot,
                isCta ? styles.dotActive : styles.dotIdle,
              )}
            />
          </div>

          <button
            type="button"
            onClick={toNext}
            disabled={isCta}
            aria-label="Next project"
            className={styles.controlBtn}
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
