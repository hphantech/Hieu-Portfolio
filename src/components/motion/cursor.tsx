"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const HOVER_TARGET_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';

function subscribeToFinePointer(callback: () => void) {
  const mediaQuery = window.matchMedia("(pointer: fine)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

/** Synchronizes with the `(pointer: fine)` media query without a setState-in-effect. */
function useHasFinePointer() {
  return useSyncExternalStore(
    subscribeToFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );
}

/**
 * Decorative, desktop-only cursor follower.
 *
 * - Never intercepts pointer events (pointer-events-none) and never touches
 *   focus state, so keyboard navigation and screen readers are unaffected.
 * - Disabled entirely on touch devices and when `prefers-reduced-motion` is set.
 */
export function Cursor() {
  const shouldReduceMotion = useReducedMotion();
  const hasFinePointer = useHasFinePointer();
  const isEnabled = hasFinePointer && !shouldReduceMotion;
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 30, stiffness: 400 });
  const springY = useSpring(cursorY, { damping: 30, stiffness: 400 });

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setIsVisible(true);
    },
    [cursorX, cursorY],
  );

  const handlePointerOver = useCallback((event: PointerEvent) => {
    const target = event.target as Element | null;
    setIsHovering(Boolean(target?.closest(HOVER_TARGET_SELECTOR)));
  }, []);

  const handlePointerLeaveWindow = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    if (!isEnabled) {
      document.documentElement.classList.remove("custom-cursor-active");
      return;
    }

    document.documentElement.classList.add("custom-cursor-active");

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerleave", handlePointerLeaveWindow);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerleave", handlePointerLeaveWindow);
    };
  }, [
    isEnabled,
    handlePointerMove,
    handlePointerOver,
    handlePointerLeaveWindow,
  ]);

  if (!isEnabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="border-accent pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        width: isHovering ? 48 : 24,
        height: isHovering ? 48 : 24,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
    />
  );
}
