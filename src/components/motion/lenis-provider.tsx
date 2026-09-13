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

/** Avoid ScrollTrigger refresh jumps when the mobile URL bar shows/hides. */
ScrollTrigger.config({ ignoreMobileResize: true });

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

function isSamePageHashLink(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href");
  if (!href || !href.startsWith("#") || href === "#") return null;
  const id = decodeURIComponent(href.slice(1));
  if (!id) return null;
  // Ignore new-tab / modified clicks so browser defaults still work.
  return id;
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
      // Keep native touch scrolling; Lenis only eases wheel. Avoids touch jumps.
      syncTouch: false,
      touchMultiplier: 1,
    });

    instance.on("scroll", ScrollTrigger.update);

    const tickerFn = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    /** Route in-page anchors through Lenis so native smooth-scroll can't fight it. */
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;

      const id = isSamePageHashLink(anchor);
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      event.preventDefault();
      instance.scrollTo(el, {
        offset: 0,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      history.pushState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);

    store.set(instance);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tickerFn);
      instance.destroy();
      store.set(null);
    };
  }, [store]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
