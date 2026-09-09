"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { skills } from "@/content/skills";

import styles from "./skills.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Scannable skill groups — scrubbed in as you scroll. */
export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const header = section.querySelector<HTMLElement>(`.${styles.header}`);
      const groups = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(`.${styles.group}`),
      );
      const items = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(`.${styles.item}`),
      );

      if (prefersReducedMotion) {
        gsap.set([header, ...groups, ...items], { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.set(header, { autoAlpha: 0, y: 28 });
      gsap.set(groups, { autoAlpha: 0, y: 36 });
      gsap.set(items, { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: section,
          scrub: 0.9,
          start: "clamp(top 85%)",
          end: "clamp(center 50%)",
          invalidateOnRefresh: true,
        },
      });

      tl.to(header, { autoAlpha: 1, y: 0, duration: 0.5 }, 0)
        .to(groups, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.55 }, 0.08)
        .to(items, { autoAlpha: 1, y: 0, stagger: 0.03, duration: 0.4 }, 0.18);

      const onHeroReady = () => ScrollTrigger.refresh();
      window.addEventListener("portfolio:hero-ready", onHeroReady);
      return () => {
        window.removeEventListener("portfolio:hero-ready", onHeroReady);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-labelledby="skills-heading"
      className={styles.section}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Toolkit</p>
          <h2 id="skills-heading" className={styles.headline}>
            {skills.headline}
          </h2>
          <p className={styles.lead}>{skills.lead}</p>
        </header>

        <div className={styles.grid}>
          {skills.groups.map((group) => (
            <div key={group.label} className={styles.group}>
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
