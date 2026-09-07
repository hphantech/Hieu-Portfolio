"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import styles from "./split-word-headline.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type SplitWordHeadlineProps = {
  /** Headline copy. Nested `<sup>` elements are left intact (not split). */
  children: ReactNode;
  id?: string;
  className?: string;
};

/**
 * Full-viewport SplitText word pop — the only focus in the middle of the
 * screen. Plays on enter, reverses on scroll-up, replays every pass.
 */
export function SplitWordHeadline({
  children,
  id,
  className,
}: SplitWordHeadlineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      if (!section || !heading) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      let split: SplitText | undefined;
      let tl: gsap.core.Timeline | undefined;
      let trigger: ScrollTrigger | undefined;
      let alive = true;

      const teardown = () => {
        trigger?.kill();
        trigger = undefined;
        tl?.kill();
        tl = undefined;
        split?.revert();
        split = undefined;
      };

      const setup = () => {
        if (!alive) return;
        teardown();

        if (prefersReducedMotion) {
          gsap.set(heading, { autoAlpha: 1 });
          return;
        }

        split = SplitText.create(heading, {
          type: "words",
          wordsClass: `${styles.word}++`,
          ignore: "sup",
        });

        const words = split.words;
        gsap.set(heading, { autoAlpha: 1 });
        gsap.set(words, {
          y: 140,
          opacity: 0,
          scale: 0.55,
          rotation: (i) => (i % 2 === 0 ? -55 : 55),
          transformOrigin: "50% 50%",
        });

        tl = gsap.timeline({ paused: true }).to(words, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.75,
          stagger: 0.2,
          ease: "back.out(2.2)",
          easeReverse: "power2.in",
        });

        trigger = ScrollTrigger.create({
          trigger: section,
          // Fire when this chapter owns the middle of the viewport.
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => {
            tl?.timeScale(1).play();
          },
          onEnterBack: () => {
            tl?.timeScale(1).play();
          },
          onLeaveBack: () => {
            tl?.timeScale(1.6).reverse();
          },
          onLeave: () => {
            tl?.timeScale(1.6).reverse();
          },
          invalidateOnRefresh: true,
        });

        // If refresh lands with the section already in view, snap to end state.
        if (trigger.isActive) {
          tl.progress(1);
        }

        ScrollTrigger.refresh();
      };

      gsap.set(heading, { autoAlpha: 0 });

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
        teardown();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(styles.section, className)}
    >
      <div className={styles.container}>
        <h2 ref={headingRef} className={styles.headline}>
          {children}
        </h2>
      </div>
    </section>
  );
}
