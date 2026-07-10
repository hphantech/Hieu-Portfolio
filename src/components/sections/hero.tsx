"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import { site, socialLinks } from "@/content/site";

const headline = `Hi, I'm ${site.name}.`;
const words = headline.split(" ");

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const word = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const blobY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 120],
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="border-border/60 bg-surface relative overflow-hidden border-b"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: blobY }}
        className="from-accent/25 pointer-events-none absolute top-[-10%] right-[-10%] h-[420px] w-[420px] rounded-full bg-gradient-to-br to-transparent blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-accent mb-4 inline-flex items-center gap-2 text-sm font-medium tracking-[0.2em] uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-accent relative inline-flex h-2 w-2 rounded-full" />
          </span>
          {site.role}
        </motion.p>

        <motion.h1
          id="hero-heading"
          className="text-foreground max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl sm:leading-tight"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {words.map((w, index) => (
            <motion.span
              key={`${w}-${index}`}
              variants={word}
              className="mr-3 inline-block"
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-muted mt-6 max-w-2xl text-lg leading-8"
        >
          {site.tagline} Based in the {site.location}, I&apos;m building this
          portfolio to showcase my work ahead of frontend internship
          applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#work"
            className="bg-foreground text-background inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-85"
            data-cursor-hover
          >
            View work
          </a>
          <a
            href={socialLinks[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-foreground hover:bg-surface inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition-colors"
            data-cursor-hover
          >
            GitHub
          </a>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldReduceMotion ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex"
      >
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="border-muted/40 text-muted flex h-9 w-6 items-start justify-center rounded-full border p-1"
        >
          <span className="bg-muted h-1.5 w-1.5 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
