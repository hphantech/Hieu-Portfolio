"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { ProjectModal } from "@/components/work/project-modal";
import { useLenisInstance } from "@/components/motion/lenis-provider";
import { moreProjects } from "@/content/projects";
import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

import styles from "./work-carousel.module.css";

/**
 * 3D cover-flow carousel for additional work — wide landscape frames
 * suited to website page screenshots.
 */
export function WorkCarousel() {
  const slides = moreProjects.filter((p) => p.cover);
  const total = slides.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenisInstance();

  useEffect(() => {
    if (!lenis) return;
    if (selected) {
      lenis.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      lenis.start();
      document.documentElement.style.overflow = "";
    };
  }, [selected, lenis]);

  if (slides.length === 0) return null;

  const spring = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, bounce: 0.15, duration: 0.85 };

  const toPrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));
  const toNext = () => setActiveIndex((prev) => Math.min(total - 1, prev + 1));
  const toSlide = (index: number) => setActiveIndex(index);

  return (
    <section id="work" aria-label="Projects" className={styles.section}>
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
                    <button
                      type="button"
                      className={styles.frame}
                      onClick={() =>
                        isActive ? setSelected(project) : toSlide(i)
                      }
                      aria-label={
                        isActive
                          ? `Open details: ${project.title}`
                          : `Show ${project.title}`
                      }
                    >
                      <Image
                        src={project.cover!}
                        alt={`Screenshot of ${project.title}`}
                        width={1280}
                        height={800}
                        className={styles.image}
                        sizes="(max-width: 768px) 85vw, 36rem"
                        priority={isActive}
                      />
                    </button>

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
          </div>

          <button
            type="button"
            onClick={toNext}
            disabled={activeIndex === total - 1}
            aria-label="Next project"
            className={styles.controlBtn}
          >
            <ChevronRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
