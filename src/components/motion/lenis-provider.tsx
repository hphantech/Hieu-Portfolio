"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

/** Current Lenis instance, or `null` when disabled / not yet mounted. */
export function useLenisInstance() {
  return useContext(LenisContext);
}

/**
 * Site-wide Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger
 * scrub animations stay in sync (autoRaf alone can freeze/desync ST).
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
      autoRaf: false,
    });

    instance.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      gsap.ticker.remove(tickerFn);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
