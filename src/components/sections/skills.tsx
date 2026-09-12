import { skills } from "@/content/skills";

import styles from "./skills.module.css";

/** Simple recruiter-facing skills list — languages, frameworks, tools. */
export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className={styles.section}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="skills-heading" className={styles.headline}>
            {skills.headline}
          </h2>
          <p className={styles.lead}>{skills.lead}</p>
        </header>

        <div className={styles.grid}>
          {skills.groups.map((group) => (
            <div key={group.label}>
              <h3 className={styles.groupLabel}>{group.label}</h3>
              <ul className={styles.list}>
                {group.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
