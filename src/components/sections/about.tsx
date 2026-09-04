import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { about } from "@/content/about";

import styles from "./about.module.css";

/** Personal bio, gallery, skills, and hobbies. */
export function About() {
  return (
    <section id="about" aria-label="About" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <header className={styles.header}>
            <h2 className={styles.headline}>{about.headline}</h2>
            <p className={styles.lead}>{about.lead}</p>
            <div className={styles.body}>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </header>
        </Reveal>

        <Reveal delay={0.06}>
          <div className={styles.gallery}>
            {about.gallery.map((shot) => (
              <figure key={shot.src} className={styles.galleryItem}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className={styles.galleryImg}
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
                <figcaption className={styles.galleryCaption}>
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Skills</h3>
            <div className={styles.skills}>
              {about.skills.map((group) => (
                <div key={group.label}>
                  <p className={styles.skillGroupLabel}>{group.label}</p>
                  <ul className={styles.skillList}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.block}>
            <h3 className={styles.blockTitle}>Hobbies</h3>
            <div className={styles.hobbies}>
              {about.hobbies.map((hobby) => (
                <article key={hobby.title} className={styles.hobby}>
                  <div className={styles.hobbyMedia}>
                    <Image
                      src={hobby.src}
                      alt={hobby.alt}
                      fill
                      className={styles.hobbyImg}
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                  <div>
                    <h4 className={styles.hobbyTitle}>{hobby.title}</h4>
                    <p className={styles.hobbyNote}>{hobby.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
