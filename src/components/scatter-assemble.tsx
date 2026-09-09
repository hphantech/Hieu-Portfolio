"use client";

import { Space_Grotesk } from "next/font/google";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import styles from "./scatter-assemble.module.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
});

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ox: number;
  oy: number;
  delay: number;
};

type ScatterAssembleProps = {
  /** Short headline sampled into particles. */
  text: string;
  className?: string;
};

function spring2D(s: Particle, tx: number, ty: number, k = 0.08, d = 0.75) {
  s.vx += (tx - s.x) * k;
  s.vx *= d;
  s.x += s.vx;
  s.vy += (ty - s.y) * k;
  s.vy *= d;
  s.y += s.vy;
}

/**
 * Canvas scatter → assemble text (scroll-triggered, portfolio-colored).
 */
export function ScatterAssemble({ text, className }: ScatterAssembleProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let frame = 0;
    let particles: Particle[] = [];
    let running = false;
    let alive = true;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const sampleText = (value: string, density = 4) => {
      const w = canvas.clientWidth || section.clientWidth;
      const h = canvas.clientHeight || section.clientHeight;
      const off = document.createElement("canvas");
      const octx = off.getContext("2d");
      if (!octx) return [] as { x: number; y: number }[];

      off.width = w;
      off.height = h;

      const fs = Math.min(
        h * 0.28,
        (w / Math.max(value.length, 1)) * 1.35,
        120,
      );
      octx.font = `700 ${fs}px ${spaceGrotesk.style.fontFamily}, sans-serif`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#fff";
      octx.fillText(value, w / 2, h / 2);

      const { data } = octx.getImageData(0, 0, w, h);
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < h; y += density) {
        for (let x = 0; x < w; x += density) {
          if (data[(y * w + x) * 4 + 3] > 128) pts.push({ x, y });
        }
      }
      return pts;
    };

    const clear = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const assemble = () => {
      if (!alive) return;
      stop();
      resize();

      const start = () => {
        if (!alive) return;

        if (prefersReducedMotion) {
          clear();
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;
          const fs = Math.min(
            h * 0.28,
            (w / Math.max(text.length, 1)) * 1.35,
            120,
          );
          ctx.fillStyle = "#141414";
          ctx.font = `700 ${fs}px ${spaceGrotesk.style.fontFamily}, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(text, w / 2, h / 2);
          return;
        }

        const pts = sampleText(text, 4);
        if (!pts.length) return;

        particles = pts.map((o) => ({
          x: Math.random() * canvas.clientWidth,
          y: Math.random() * canvas.clientHeight,
          vx: 0,
          vy: 0,
          ox: o.x,
          oy: o.y,
          delay: Math.floor(Math.random() * 50),
        }));

        frame = 0;
        running = true;

        const tick = () => {
          if (!alive || !running) return;
          frame += 1;
          const w = canvas.clientWidth;
          const h = canvas.clientHeight;

          ctx.fillStyle = "rgba(255,255,255,0.18)";
          ctx.fillRect(0, 0, w, h);

          ctx.fillStyle = "rgba(20,20,20,0.85)";
          for (const p of particles) {
            if (frame < p.delay) continue;
            spring2D(p, p.ox, p.oy, 0.055, 0.8);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.35, 0, Math.PI * 2);
            ctx.fill();
          }

          raf = requestAnimationFrame(tick);
        };

        clear();
        raf = requestAnimationFrame(tick);
      };

      void document.fonts.ready.then(start);
    };

    resize();
    clear();

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          assemble();
        } else {
          stop();
          clear();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(section);

    const onResize = () => {
      resize();
      if (running || prefersReducedMotion) assemble();
      else clear();
    };
    window.addEventListener("resize", onResize);

    return () => {
      alive = false;
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [text]);

  return (
    <section
      ref={sectionRef}
      aria-label={text}
      className={cn(styles.section, spaceGrotesk.className, className)}
    >
      <h2 className="sr-only">{text}</h2>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </section>
  );
}
