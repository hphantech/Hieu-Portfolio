"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import styles from "./mute-button.module.css";

type MuteButtonProps = {
  /** Looped track. Wave still animates without a src. */
  src?: string;
  className?: string;
};

const SIZE = 45;

/**
 * Lusion-style sound button: soft grey disc + thick black sine-wave stroke.
 * Wave amplitude animates while unmuted.
 * Tries to autoplay on enter; unlocks on first gesture if the browser blocks it.
 */
export function MuteButton({ src, className }: MuteButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mutedRef = useRef(true);
  const autoplayPendingRef = useRef(Boolean(src));
  const phaseRef = useRef(0);
  const ampRef = useRef(0.22);
  const ampTargetRef = useRef(0.22);
  const rafRef = useRef(0);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!src) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    autoplayPendingRef.current = true;

    const unlockEvents = ["pointerdown", "keydown", "touchstart"] as const;

    const start = async () => {
      try {
        await audio.play();
        mutedRef.current = false;
        autoplayPendingRef.current = false;
        setIsMuted(false);
        for (const event of unlockEvents) {
          window.removeEventListener(event, onGesture);
        }
        return true;
      } catch {
        return false;
      }
    };

    const onGesture = () => {
      if (!autoplayPendingRef.current || !mutedRef.current) return;
      void start();
    };

    void start().then((ok) => {
      if (ok) return;
      for (const event of unlockEvents) {
        window.addEventListener(event, onGesture, { passive: true });
      }
    });

    const onHeroReady = () => {
      if (autoplayPendingRef.current && mutedRef.current) {
        void start();
      }
    };
    window.addEventListener("portfolio:hero-ready", onHeroReady);

    return () => {
      for (const event of unlockEvents) {
        window.removeEventListener(event, onGesture);
      }
      window.removeEventListener("portfolio:hero-ready", onHeroReady);
    };
  }, [src]);

  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        audio.pause();
        return;
      }
      // Resume only if the user still has sound unmuted.
      if (!mutedRef.current) {
        void audio.play().catch(() => {
          mutedRef.current = true;
          setIsMuted(true);
        });
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Soft cool-grey disc (matches Lusion)
      ctx.beginPath();
      ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 0.5, 0, Math.PI * 2);
      ctx.fillStyle = "#e4e6ee";
      ctx.fill();

      const padX = SIZE * 0.2;
      const midY = SIZE / 2 + SIZE * 0.02;
      const amp = ampRef.current * SIZE;
      const phase = phaseRef.current;

      ctx.beginPath();
      ctx.lineWidth = SIZE * 0.145;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#111111";

      /*
       * Lusion glyph: one smooth hump (peak in the middle). While unmuted,
       * phase scrolls so the wave reads as a live signal.
       */
      const steps = 64;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = padX + t * (SIZE - padX * 2);
        const y =
          midY -
          Math.sin(t * Math.PI + phase) * amp -
          Math.sin(t * Math.PI * 2 + phase * 1.4) * amp * 0.12;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(32, now - last) / 1000;
      last = now;

      // Muted = quieter static arch; unmuted = taller + scrolling
      ampTargetRef.current = mutedRef.current ? 0.2 : 0.26;
      ampRef.current += (ampTargetRef.current - ampRef.current) * 0.14;

      if (!mutedRef.current && !prefersReducedMotion) {
        phaseRef.current += dt * 3.6;
      } else {
        // Ease phase toward a rest pose (peak centered)
        const rest = 0;
        phaseRef.current += (rest - phaseRef.current) * 0.08;
      }

      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onClick = async () => {
    const nextMuted = !mutedRef.current;
    mutedRef.current = nextMuted;
    autoplayPendingRef.current = false;
    setIsMuted(nextMuted);

    const audio = audioRef.current;
    if (nextMuted) {
      audio?.pause();
      return;
    }
    if (src && audio) {
      audio.volume = 0.45;
      try {
        await audio.play();
      } catch {
        mutedRef.current = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      {src ? (
        <audio
          ref={audioRef}
          src={src}
          loop
          preload="auto"
          autoPlay
          playsInline
        />
      ) : null}
      <button
        id="header-right-sound-btn"
        type="button"
        className={cn(styles.button, className)}
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        aria-pressed={!isMuted}
        onClick={onClick}
      >
        <span className="sr-only">Toggle sound</span>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={SIZE}
          height={SIZE}
          aria-hidden="true"
        />
      </button>
    </>
  );
}
