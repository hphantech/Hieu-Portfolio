"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import styles from "./mute-button.module.css";

gsap.registerPlugin(useGSAP);

type MuteButtonProps = {
  /** Looped track. Bars still animate without a src. */
  src?: string;
  className?: string;
};

/** Bar center-x in the 18×16 viewBox (matches reference mute SVG). */
const BAR_XS = [0, 4, 8, 12, 16] as const;
const BAR_W = 2;
const VIEW_H = 16;
const MUTED_H = 2.5;

function barAttrs(height: number) {
  const h = gsap.utils.clamp(MUTED_H, VIEW_H, height);
  return { height: h, y: (VIEW_H - h) / 2 };
}

/** Equalizer-bar mute control — circular disc with bouncing sound bars. */
export function MuteButton({ src, className }: MuteButtonProps) {
  const rootRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const barsRef = useRef<(SVGRectElement | null)[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mutedRef = useRef(true);
  const autoplayPendingRef = useRef(Boolean(src));
  const waveTweensRef = useRef<gsap.core.Tween[]>([]);
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

  useGSAP(
    () => {
      const bars = barsRef.current.filter((bar): bar is SVGRectElement =>
        Boolean(bar),
      );
      const fill = fillRef.current;
      if (!bars.length || !fill) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      waveTweensRef.current.forEach((tween) => tween.kill());
      waveTweensRef.current = [];

      gsap.set(fill, { transformOrigin: "50% 50%" });

      if (isMuted) {
        bars.forEach((bar, i) => {
          gsap.to(bar, {
            attr: barAttrs(MUTED_H),
            duration: 0.35,
            delay: i * 0.03,
            ease: "power2.out",
            overwrite: true,
          });
        });
        gsap.to(fill, {
          scale: 0,
          duration: 0.3,
          ease: "power2.in",
          overwrite: true,
        });
        return;
      }

      gsap.to(fill, {
        scale: 1.05,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });

      if (reduceMotion) {
        const heights = [7, 12, 16, 9, 14];
        bars.forEach((bar, i) => {
          gsap.set(bar, { attr: barAttrs(heights[i]!) });
        });
        return;
      }

      // Bounce each bar’s height around the vertical center — no scale drift.
      const ranges = [
        [5, 12],
        [7, 16],
        [4, 14],
        [6, 15],
        [5, 13],
      ] as const;

      bars.forEach((bar, i) => {
        const [minH, maxH] = ranges[i]!;
        gsap.set(bar, { attr: barAttrs(minH) });
        const tween = gsap.to(bar, {
          keyframes: [
            { attr: barAttrs(maxH), duration: 0.32 + i * 0.04 },
            { attr: barAttrs(minH), duration: 0.32 + i * 0.04 },
          ],
          ease: "sine.inOut",
          repeat: -1,
          delay: i * 0.07,
        });
        waveTweensRef.current.push(tween);
      });

      return () => {
        waveTweensRef.current.forEach((tween) => tween.kill());
        waveTweensRef.current = [];
      };
    },
    { scope: rootRef, dependencies: [isMuted] },
  );

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

  const muted = barAttrs(MUTED_H);

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
        ref={rootRef}
        id="header-right-sound-btn"
        type="button"
        className={cn(styles.button, className)}
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        aria-pressed={!isMuted}
        onClick={onClick}
      >
        <span className="sr-only">Toggle Sound</span>
        <div className={styles.bg} aria-hidden="true" />
        <svg className={styles.icon} viewBox="0 0 18 16" aria-hidden="true">
          {BAR_XS.map((x, i) => (
            <rect
              key={x}
              ref={(el) => {
                barsRef.current[i] = el;
              }}
              className={styles.bar}
              x={x}
              y={muted.y}
              width={BAR_W}
              height={muted.height}
              rx={1}
            />
          ))}
        </svg>
        <div className={styles.inner} aria-hidden="true">
          <span ref={fillRef} className={styles.fill} />
        </div>
      </button>
    </>
  );
}
