"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { cn } from "@/lib/utils";

import styles from "./fly-text.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type FlyTextOrder = "random" | "ltr" | "rtl" | "outward";

export type FlyTextConfig = {
  windAngle: number;
  windStrength: number;
  scatter: number;
  maxRotation: number;
  stagger: number;
  depth: number;
  reverse: boolean;
  order: FlyTextOrder;
  randomness: number;
  gustiness: number;
  gustFrequency: number;
  gustPhaseSpread: number;
  startY: number | null;
  animationDuration: number;
  easing: string | null;
};

const DEFAULTS: FlyTextConfig = {
  windAngle: 25,
  windStrength: 400,
  scatter: 80,
  maxRotation: 360,
  stagger: 0.5,
  depth: 120,
  reverse: false,
  order: "random",
  randomness: 0,
  gustiness: 0,
  gustFrequency: 1,
  gustPhaseSpread: 1,
  startY: null,
  animationDuration: 1,
  easing: null,
};

/** Presets for section-to-section variation. */
export const flyPresets = {
  skillsTitle: {
    reverse: true,
    order: "ltr" as const,
    windAngle: 150,
    windStrength: 500,
    scatter: 90,
    maxRotation: 450,
    gustiness: 120,
    stagger: 0.9,
    depth: 140,
    startY: 0.9,
    animationDuration: 0.7,
    easing: "elastic.out(1,0.7)",
  },
  skillsLead: {
    windAngle: 120,
    windStrength: 50,
    scatter: 50,
    maxRotation: 570,
    stagger: 1.5,
    order: "outward" as const,
    randomness: 0.2,
    gustiness: 200,
    gustFrequency: 0.4,
    gustPhaseSpread: 0.4,
    depth: 290,
    startY: 0.5,
    animationDuration: 0.7,
  },
  blast: {
    windAngle: 42,
    windStrength: 700,
    scatter: 350,
    maxRotation: 720,
    stagger: 0.3,
    depth: 220,
    startY: 0.55,
    animationDuration: 0.6,
  },
  breeze: {
    windAngle: 18,
    windStrength: 550,
    scatter: 100,
    maxRotation: 480,
    stagger: 0.7,
    depth: 160,
    startY: 0.55,
    animationDuration: 0.6,
  },
} as const satisfies Record<string, Partial<FlyTextConfig>>;

type FlyCharEl = HTMLSpanElement & { _x: number; _normX: number };

function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

function seededRandom(seed: number) {
  let s = seed >>> 0;
  const splitmix32 = () => {
    s = (s + 0x9e3779b9) | 0;
    let t = s ^ (s >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return ((t ^ (t >>> 15)) >>> 0) as number;
  };
  const rand = sfc32(splitmix32(), splitmix32(), splitmix32(), splitmix32());
  for (let i = 0; i < 12; i++) rand();
  return rand;
}

const SEED = 42;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function charStartTime(
  char: FlyCharEl,
  total: number,
  order: FlyTextOrder,
  stagger: number,
  randomness: number,
  rand: () => number,
) {
  if (total <= 1) return 0;
  const x = char._normX;
  let ordered: number;
  switch (order) {
    case "ltr":
      ordered = x * stagger;
      break;
    case "rtl":
      ordered = (1 - x) * stagger;
      break;
    case "outward":
      ordered = (1 - Math.abs(x - 0.5) * 2) * stagger;
      break;
    default:
      return rand() * stagger;
  }
  return ordered * (1 - randomness) + rand() * stagger * randomness;
}

function measureAndCreateChars(
  el: HTMLElement,
  raw: string,
  placeholder: HTMLElement,
  overlay: HTMLElement,
) {
  const containerRect = el.getBoundingClientRect();
  const textNode = placeholder.firstChild;
  if (!textNode) return [] as FlyCharEl[];

  const chars: FlyCharEl[] = [];

  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === " ") continue;

    const range = document.createRange();
    range.setStart(textNode, i);
    range.setEnd(textNode, i + 1);
    const box = range.getBoundingClientRect();

    const span = document.createElement("span") as FlyCharEl;
    span.textContent = raw[i]!;
    span.className = styles.char;
    span.style.cssText = [
      "position:absolute",
      `left:${box.left - containerRect.left}px`,
      `top:${box.top - containerRect.top}px`,
      `width:${box.width}px`,
      `height:${box.height}px`,
      "white-space:nowrap",
    ].join(";");
    span._x = box.left - containerRect.left;
    overlay.appendChild(span);
    chars.push(span);
  }

  if (!chars.length) return chars;

  const xs = chars.map((c) => c._x);
  const xMin = Math.min(...xs);
  const xRange = Math.max(...xs) - xMin || 1;
  chars.forEach((c) => {
    c._normX = (c._x - xMin) / xRange;
  });

  return chars;
}

function buildTimeline(
  el: HTMLElement,
  chars: FlyCharEl[],
  p: FlyTextConfig,
  rand: () => number,
) {
  const tl = gsap.timeline({ paused: true });
  const range = (min: number, max: number) => min + rand() * (max - min);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const from = p.reverse ? { opacity: 0 } : { opacity: 1 };
    const to = p.reverse ? { opacity: 1 } : { opacity: 0 };
    tl.fromTo(el, from, { ...to, duration: 1 });
    return tl;
  }

  const mobile = window.matchMedia("(max-width: 640px)").matches;
  const strengthScale = mobile ? 0.35 : 1;
  const windStrength = p.windStrength * strengthScale;
  const scatter = p.scatter * strengthScale;
  const depth = p.depth * strengthScale;
  const maxRotation = p.maxRotation * (mobile ? 0.45 : 1);

  const rad = (p.windAngle * Math.PI) / 180;
  const windX = Math.cos(rad);
  const windY = -Math.sin(rad);
  const perpX = Math.sin(rad);
  const perpY = Math.cos(rad);

  const sharedAmp =
    p.gustiness > 0 ? range(0.1, 1) * p.gustiness * (rand() > 0.5 ? 1 : -1) : 0;

  chars.forEach((char, i) => {
    const startTime = charStartTime(
      char,
      chars.length,
      p.order,
      p.stagger,
      p.randomness,
      rand,
    );
    const duration = range(1 - p.randomness * 0.5, 1 + p.randomness * 0.5);
    const scatterAngle = range(0, Math.PI * 2);
    const scatterDist = range(0, scatter);
    const syncPhase = Math.PI * p.gustFrequency * startTime;
    const indexPhase = (i / Math.max(1, chars.length - 1)) * Math.PI * 2;
    const phase = lerp(syncPhase, indexPhase, p.gustPhaseSpread);

    const fx = windX * windStrength + Math.cos(scatterAngle) * scatterDist;
    const fy = windY * windStrength + Math.sin(scatterAngle) * scatterDist;
    const fz = range(-depth, depth);
    const rx = range(-maxRotation, maxRotation);
    const ry = range(-maxRotation * 0.7, maxRotation * 0.7);
    const rz = range(-maxRotation * 0.3, maxRotation * 0.3);

    const scattered = {
      x: fx,
      y: fy,
      z: fz,
      rotationX: rx,
      rotationY: ry,
      rotationZ: rz,
      opacity: 0,
    };
    const natural = {
      x: 0,
      y: 0,
      z: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      opacity: 1,
    };

    if (p.gustiness > 0) {
      const individualAmp =
        range(0.1, 1) * p.gustiness * (rand() > 0.5 ? 1 : -1);
      const amp = lerp(sharedAmp, individualAmp, p.gustPhaseSpread);
      const s0 = Math.sin(phase);
      const s1 = Math.sin(Math.PI * p.gustFrequency + phase);
      const gustSine = (t: number) =>
        amp *
        (Math.sin(Math.PI * p.gustFrequency * t + phase) - s0 - t * (s1 - s0));

      const sineAt = (t: number) => {
        const s = p.reverse ? 1 - t : t;
        return {
          x: s * fx + perpX * gustSine(t),
          y: s * fy + perpY * gustSine(t),
          z: s * fz,
          rotationX: rx * s,
          rotationY: ry * s,
          rotationZ: rz * s,
          opacity: clamp01((1 - s) / 0.6),
        };
      };

      gsap.set(char, sineAt(0));
      const proxy = { t: 0 };
      tl.to(
        proxy,
        {
          t: 1,
          duration,
          ease: p.easing ? p.easing : "power3.in",
          immediateRender: true,
          onUpdate() {
            gsap.set(char, sineAt(proxy.t));
          },
        },
        startTime,
      );
    } else {
      const [from, to] = p.reverse
        ? [scattered, natural]
        : [natural, scattered];
      tl.fromTo(
        char,
        from,
        {
          ...to,
          duration,
          ease: p.easing ?? (p.reverse ? "power3.out" : "power3.in"),
        },
        startTime,
      );
    }
  });

  if (p.animationDuration > 0 && p.animationDuration < 1) {
    tl.call(() => {}, [], tl.duration() / p.animationDuration);
  }

  return tl;
}

type FlyTextProps = {
  as?: "h1" | "h2" | "h3" | "p" | "span";
  children: string;
  className?: string;
  id?: string;
} & Partial<FlyTextConfig>;

/**
 * Scroll-scrubbed letter scatter / reveal (GSAP + CSS 3D).
 * Pass plain string children — characters are measured and re-layered.
 */
export function FlyText({
  as: Tag = "p",
  children,
  className,
  id,
  ...overrides
}: FlyTextProps) {
  const rootRef = useRef<HTMLHeadingElement & HTMLParagraphElement>(null);
  const config: FlyTextConfig = { ...DEFAULTS, ...overrides };
  const configKey = JSON.stringify(config);

  useGSAP(
    () => {
      const el = rootRef.current;
      if (!el) return;

      const raw = children.replace(/\s+/g, " ").trim();
      if (!raw) return;

      let killed = false;
      let st: ScrollTrigger | null = null;
      let tl: gsap.core.Timeline | null = null;
      let ro: ResizeObserver | null = null;
      let resizeTimer: ReturnType<typeof setTimeout> | undefined;
      let lastW = 0;
      let lastH = 0;
      let rand = seededRandom(SEED);

      if (getComputedStyle(el).position === "static") {
        el.style.position = "relative";
      }

      const placeholder = document.createElement("span");
      placeholder.setAttribute("aria-hidden", "true");
      placeholder.style.cssText =
        "visibility:hidden;pointer-events:none;user-select:none;";
      placeholder.textContent = raw;

      const overlay = document.createElement("span");
      overlay.setAttribute("aria-hidden", "true");
      overlay.style.cssText =
        "position:absolute;top:0;left:0;width:100%;height:100%;overflow:visible;pointer-events:none;";

      el.append(placeholder, overlay);

      const setup = () => {
        if (killed) return;
        st?.kill();
        tl?.kill();
        overlay.replaceChildren();

        const chars = measureAndCreateChars(el, raw, placeholder, overlay);
        if (!chars.length) return;

        gsap.set(chars, { transformPerspective: 500 });
        rand = seededRandom(SEED);
        tl = buildTimeline(el, chars, config, rand);

        const startPct = Math.round(
          (config.startY ?? (config.reverse ? 0.85 : 0.65)) * 100,
        );

        st = ScrollTrigger.create({
          trigger: el,
          start: `top ${startPct}%`,
          end: config.reverse ? "top 20%" : "bottom top",
          scrub: 1,
          animation: tl,
        });
      };

      const boot = async () => {
        try {
          await document.fonts.ready;
        } catch {
          /* optional */
        }
        if (killed) return;
        setup();

        ro = new ResizeObserver((entries) => {
          const entry = entries[0];
          if (!entry) return;
          rand = seededRandom(SEED);
          const box = entry.contentBoxSize?.[0];
          const w = box?.inlineSize ?? entry.contentRect.width;
          const h = box?.blockSize ?? entry.contentRect.height;
          if (w === lastW && h === lastH) return;
          lastW = w;
          lastH = h;
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(setup, 200);
        });
        ro.observe(el);
      };

      void boot();

      return () => {
        killed = true;
        clearTimeout(resizeTimer);
        ro?.disconnect();
        st?.kill();
        tl?.kill();
        placeholder.remove();
        overlay.remove();
      };
    },
    {
      scope: rootRef,
      dependencies: [children, configKey],
      revertOnUpdate: true,
    },
  );

  return (
    <Tag ref={rootRef} id={id} className={cn(styles.flyText, className)}>
      <span className={styles.srOnly}>{children}</span>
    </Tag>
  );
}
