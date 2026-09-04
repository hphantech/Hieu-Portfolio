import type { CSSProperties } from "react";

import { experiences } from "@/content/experience";
import { cn } from "@/lib/utils";

import styles from "./work-stack.module.css";

const TONE_CLASSES = [
  styles.itemToneA,
  styles.itemToneB,
  styles.itemToneC,
] as const;

/** Sticky 3-card stack for internships, co-makers, and collaborations. */
export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className={styles.section}
    >
      <div className={styles.stack}>
        {experiences.map((item, index) => (
          <article
            key={item.id}
            className={cn(styles.item, TONE_CLASSES[index % TONE_CLASSES.length])}
            style={{ "--stack-i": index + 1 } as CSSProperties}
          >
            <div className={styles.inner}>
              <div className={styles.top}>
                <h3 className={styles.title}>{item.org}</h3>
                <p className={styles.meta}>{item.summary}</p>
              </div>
              <div className={styles.bottom}>
                <p className="m-0 text-sm opacity-70">
                  {item.period} · {item.role}
                </p>
                <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-sm leading-snug opacity-90">
                  {item.highlights.map((line) => (
                    <li key={line}>— {line}</li>
                  ))}
                </ul>
                <ul
                  aria-label={`Focus areas at ${item.org}`}
                  className={styles.tech}
                >
                  {item.tags.map((tag) => (
                    <li key={tag} className={styles.techItem}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
