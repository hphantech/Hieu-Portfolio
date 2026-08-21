"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { useLenisInstance } from "@/components/motion/lenis-provider";
import { PixelatedImageReveal } from "@/components/pixelated-image-reveal";
import { Typewriter } from "@/components/typewriter";
import { site, socialLinks } from "@/content/site";
import { cn } from "@/lib/utils";

import styles from "./hero.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HERO_IMAGE_DEFAULT = "/images/hero/default.png";
const HERO_IMAGE_ACTIVE = "/images/hero/active.png";

/** Split so the loader box grows in the middle of "Hieu": "Hi" + box + "eu". */
const LOADER_START = ["H", "i"];
const LOADER_END = ["e", "u"];
const NAME_WORDS = [
  ["H", "i", "e", "u"],
  ["P", "h", "a", "n"],
];

const TYPEWRITER_LINES = [
  site.role,
  "React · Next.js · TypeScript",
  "Building kinetic interfaces",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const lenis = useLenisInstance();

  /** Pause Lenis for the intro so smooth scroll can't fight the top pin. */
  useEffect(() => {
    if (!lenis) return;
    if (introDone) {
      lenis.start();
      // Body unlock + Lenis resume change document height — refresh ST once.
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }
    lenis.stop();
    lenis.scrollTo(0, { immediate: true });
  }, [lenis, introDone]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      /**
       * On refresh the browser often restores scroll to wherever you left off
       * (e.g. the footer). The intro also locks `html`/`body` to 100dvh, so
       * that restored offset makes the view look “stuck” mid-page while the
       * hero is still playing. Disable restoration and pin to the top until
       * the intro finishes.
       */
      const previousRestoration = history.scrollRestoration;
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
      const keepAtTop = () => {
        if (window.scrollY !== 0) window.scrollTo(0, 0);
      };
      window.addEventListener("scroll", keepAtTop, { passive: true });
      // Restoration can land after layout effects — re-pin on load/pageshow.
      window.addEventListener("load", keepAtTop);
      window.addEventListener("pageshow", keepAtTop);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      /** Collapses every duration to ~instant for reduced-motion. */
      const s = prefersReducedMotion ? 0.001 : 1;

      const loaderLetters = section.querySelectorAll<HTMLElement>(
        `.${styles.loaderLetter}`,
      );
      const box = section.querySelectorAll<HTMLElement>(`.${styles.box}`);
      const growingImage = section.querySelectorAll<HTMLElement>(
        `.${styles.growingImage}`,
      );
      const headingStart = section.querySelectorAll<HTMLElement>(
        `.${styles.headingStart}`,
      );
      const headingEnd = section.querySelectorAll<HTMLElement>(
        `.${styles.headingEnd}`,
      );
      const nameLetters = section.querySelectorAll<HTMLElement>(
        `.${styles.nameLetter}`,
      );
      const kickerWords = section.querySelectorAll<HTMLElement>(
        `.${styles.kickerWord}`,
      );
      const ctas = section.querySelectorAll<HTMLElement>(`.${styles.cta}`);

      /**
       * Establish the hidden starting state entirely through GSAP (never via
       * a CSS `transform`) so `yPercent` starts from a clean slate. Runs in
       * the layout phase via useGSAP, before the browser paints — so refresh
       * doesn't flash a blank/hidden section then pop in.
       */
      gsap.set(loaderLetters, { yPercent: 100, opacity: 1 });
      gsap.set(nameLetters, { yPercent: 100, opacity: 1 });
      gsap.set(kickerWords, { yPercent: 100, opacity: 1 });
      gsap.set(box, { width: "0em" });
      gsap.set(growingImage, { width: "0%" });
      gsap.set(ctas, { opacity: 0, y: 16 });

      let unlocked = false;
      const unlockScroll = () => {
        if (unlocked) return;
        unlocked = true;
        window.removeEventListener("scroll", keepAtTop);
        window.removeEventListener("load", keepAtTop);
        window.removeEventListener("pageshow", keepAtTop);
        if ("scrollRestoration" in history) {
          history.scrollRestoration = previousRestoration || "auto";
        }
      };

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => {
          section.classList.remove(styles.isLoading);
          unlockScroll();
          setIntroDone(true);
          window.dispatchEvent(new CustomEvent("portfolio:hero-ready"));
        },
      });

      if (loaderLetters.length) {
        tl.to(loaderLetters, {
          yPercent: 0,
          stagger: 0.025 * s,
          duration: 1.25 * s,
        });
      }

      if (box.length) {
        tl.to(box, { width: "1em", duration: 1.25 * s }, `<${1.25 * s}`);
      }
      if (growingImage.length) {
        tl.to(growingImage, { width: "100%", duration: 1.25 * s }, "<");
      }
      if (headingStart.length) {
        tl.to(headingStart, { x: "-0.05em", duration: 1.25 * s }, "<");
      }
      if (headingEnd.length) {
        tl.to(headingEnd, { x: "0.05em", duration: 1.25 * s }, "<");
      }

      if (growingImage.length) {
        tl.to(
          growingImage,
          { width: "100vw", height: "100dvh", duration: 2 * s },
          `<${1.25 * s}`,
        );
      }
      if (box.length) {
        tl.to(box, { width: "110vw", duration: 2 * s }, "<");
      }

      if (nameLetters.length) {
        tl.to(
          nameLetters,
          {
            yPercent: 0,
            duration: 1.25 * s,
            ease: "expo.out",
            stagger: 0.025 * s,
          },
          `<${1.2 * s}`,
        );
      }
      if (kickerWords.length) {
        tl.to(
          kickerWords,
          {
            yPercent: 0,
            duration: 1.25 * s,
            ease: "expo.out",
            stagger: 0.06 * s,
          },
          "<",
        );
      }
      if (ctas.length) {
        tl.to(
          ctas,
          {
            opacity: 1,
            y: 0,
            duration: 0.6 * s,
            ease: "power2.out",
            stagger: 0.08 * s,
          },
          `<${0.4 * s}`,
        );
      }

      return () => {
        unlockScroll();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className={cn(styles.header, styles.isLoading)}
    >
      <div className={styles.loader} aria-hidden="true">
        <div className={cn(styles.h1Base, styles.loaderRow)}>
          <div className={styles.headingStart}>
            {LOADER_START.map((letter, index) => (
              <span
                key={index}
                className={cn(styles.letter, styles.loaderLetter)}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className={styles.box}>
            <div className={styles.boxInner}>
              <div className={styles.growingImage}>
                <div className={styles.growingImageWrap}>
                  <PixelatedImageReveal
                    fill
                    className={styles.pixelReveal}
                    defaultSrc={HERO_IMAGE_DEFAULT}
                    activeSrc={HERO_IMAGE_ACTIVE}
                    alt="Hieu Phan"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.headingEnd}>
            {LOADER_END.map((letter, index) => (
              <span
                key={index}
                className={cn(styles.letter, styles.loaderLetter)}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.top}>
          <p className={cn(styles.kicker, styles.kickerWord)}>
            {introDone ? (
              <Typewriter
                text={TYPEWRITER_LINES}
                speed={70}
                deleteSpeed={40}
                delay={1800}
                loop
              />
            ) : null}
          </p>

          <p className={styles.status}>
            {site.availability.split(" ").map((word, index) => (
              <span
                key={index}
                className={cn(styles.letter, styles.kickerWord)}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        <div className={styles.bottom}>
          <h1
            id="hero-heading"
            className={cn(styles.h1Base, styles.nameHeading)}
            aria-label={site.name}
          >
            <span aria-hidden="true" className="flex flex-wrap">
              {NAME_WORDS.map((word, wordIndex) => (
                <span key={wordIndex} className={styles.nameWord}>
                  {word.map((letter, letterIndex) => (
                    <span
                      key={letterIndex}
                      className={cn(styles.letter, styles.nameLetter)}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <div className={styles.ctaRow}>
            <a
              href="#work"
              className={cn(
                styles.cta,
                "inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-85",
              )}
            >
              View work
            </a>
            <a
              href={socialLinks[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                styles.cta,
                "inline-flex items-center justify-center rounded-full border border-black/20 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-black/5",
              )}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
