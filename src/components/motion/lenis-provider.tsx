"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

/** Current Lenis instance, or `null` when disabled / not yet mounted. */
export function useLenisInstance() {
  return useContext(LenisContext);
}

type LenisStore = {
  subscribe: (onStoreChange: () => void) => () => void;
  getSnapshot: () => Lenis | null;
  getServerSnapshot: () => null;
  set: (next: Lenis | null) => void;
};

function createLenisStore(): LenisStore {
  let instance: Lenis | null = null;
  const listeners = new Set<() => void>();

  return {
    subscribe(onStoreChange) {
      listeners.add(onStoreChange);
      return () => {
        listeners.delete(onStoreChange);
      };
    },
    getSnapshot() {
      return instance;
    },
    getServerSnapshot() {
      return null;
    },
    set(next) {
      instance = next;
      listeners.forEach((listener) => listener());
    },
  };
}

/**
 * Site-wide Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger
 * scrub animations stay in sync (autoRaf alone can freeze/desync ST).
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createLenisStore);

  const lenis = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
      autoRaf: false,
      touchMultiplier: 1.15,
      syncTouch: false,
    });

    instance.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    store.set(instance);

    return () => {
      gsap.ticker.remove(tickerFn);
      instance.destroy();
      store.set(null);
    };
  }, [store]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
