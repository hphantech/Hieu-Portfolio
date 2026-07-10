"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type RevealTag = "div" | "section" | "li" | "article" | "span" | "p" | "header";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
  /** Stagger delay in seconds, useful when revealing a list of Reveal items. */
  delay?: number;
  /** Distance (px) content travels in from. */
  distance?: number;
};

const baseTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as const,
};

/**
 * Fades + slides content into view once when it enters the viewport.
 * Falls back to a plain, static render when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  distance = 24,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...baseTransition, delay },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
