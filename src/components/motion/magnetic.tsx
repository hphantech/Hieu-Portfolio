"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { type ReactNode, useRef } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How strongly the element follows the pointer (0–1). */
  strength?: number;
};

const spring = { stiffness: 150, damping: 15, mass: 0.1 };

/**
 * Wraps a CTA so it "pulls" gently toward the pointer on hover.
 * Desktop-only in effect: touch devices never fire mousemove, so nothing
 * needs to be disabled there. Falls back to a static wrapper for
 * `prefers-reduced-motion`, and never intercepts focus/keyboard behavior.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: MagneticProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
