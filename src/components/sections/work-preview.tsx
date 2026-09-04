import type { CSSProperties } from "react";
import Link from "next/link";

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

/** Sticky card stack for featured work. */
export function WorkPreview() {
  const stackProjects = featuredProjects;

  return (
    <section
      id="work"
      aria-label="Featured projects"
      className={styles.section}
    >
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
