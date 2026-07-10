"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

import { Cursor } from "@/components/motion/cursor";

/**
 * App-wide motion boundary: centralizes `prefers-reduced-motion` handling
 * via MotionConfig and mounts the decorative custom cursor once.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <Cursor />
      {children}
    </MotionConfig>
  );
}
