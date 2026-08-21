"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * App-wide motion boundary: centralizes `prefers-reduced-motion` handling
 * via MotionConfig for every Framer Motion component in the tree.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
