import type { CSSProperties } from "react";
import Link from "next/link";

import { SectionHeading } from "@/components/section-heading";
import { featuredProjects } from "@/content/projects";
import { cn } from "@/lib/utils";

import styles from "./work-stack.module.css";

const TONE_CLASSES = [
  styles.itemToneA,
  styles.itemToneB,
  styles.itemToneC,
  styles.itemToneD,
  styles.itemToneE,
] as const;

/** Sticky card stack for Work — CSS scroll-driven tilt as cards cover each other. */
export function WorkPreview() {
  const stackProjects = featuredProjects;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className={styles.section}
    >
      <div className={styles.headingWrap}>
        <SectionHeading
          id="work-heading"
          index="02"
          title="Work"
          description="Selected projects — scroll to stack through them, then open a case study."
        />
      </div>

      <div className={styles.stack}>
        {stackProjects.map((project, index) => (
          <article
            key={project.slug}
            className={cn(styles.item, TONE_CLASSES[index % TONE_CLASSES.length])}
            style={{ "--stack-i": index + 1 } as CSSProperties}
          >
            <div className={styles.inner}>
              <div className={styles.top}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.meta}>{project.summary}</p>
              </div>
              <div className={styles.bottom}>
                <p className="m-0 text-sm opacity-70">
                  {project.year} · {project.role}
                </p>
                <ul
                  aria-label={`Technologies used in ${project.title}`}
                  className={styles.tech}
                >
                  {project.tech.map((tech) => (
                    <li key={tech} className={styles.techItem}>
                      {tech}
                    </li>
                  ))}
                </ul>
                <Link href={`/work/${project.slug}`} className={styles.cta}>
                  View case study →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
