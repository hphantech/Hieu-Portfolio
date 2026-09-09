"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { cn } from "@/lib/utils";

import styles from "./pixelated-image-reveal.module.css";

gsap.registerPlugin(useGSAP);

type PixelatedImageRevealProps = {
  defaultSrc: string;
  activeSrc: string;
  alt?: string;
  className?: string;
  /** Skip the square aspect spacer — use when the parent already sizes the card. */
  fill?: boolean;
};

/**
 * Hover/tap swaps between two images through a random pixel grid (GSAP).
 * Touch devices toggle on click; desktop uses mouseenter / mouseleave.
 */
export function PixelatedImageReveal({
  defaultSrc,
  activeSrc,
  alt = "",
  className,
  fill = false,
}: PixelatedImageRevealProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const card = cardRef.current;
      if (!card || !contextSafe) return;

      const animationStepDuration = 0.3;
      const gridSize = 7;
      const pixelSize = 100 / gridSize;
      const pixelGrid = card.querySelector<HTMLElement>(
        "[data-pixelated-image-reveal-grid]",
      );
      const activeLayer = card.querySelector<HTMLElement>(
        "[data-pixelated-image-reveal-active]",
      );
      if (!pixelGrid || !activeLayer) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;

      pixelGrid.replaceChildren();

      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          const pixel = document.createElement("div");
          pixel.className = styles.pixel;
          pixel.style.width = `${pixelSize}%`;
          pixel.style.height = `${pixelSize}%`;
          pixel.style.left = `${col * pixelSize}%`;
          pixel.style.top = `${row * pixelSize}%`;
          pixelGrid.appendChild(pixel);
        }
      }

      const pixels = pixelGrid.querySelectorAll<HTMLElement>(
        `.${styles.pixel}`,
      );
      const staggerDuration = animationStepDuration / pixels.length;
      let isActive = false;
      let delayedCall: gsap.core.Tween | undefined;

      const setActiveVisible = (activate: boolean) => {
        activeLayer.style.display = activate ? "block" : "none";
        activeLayer.style.pointerEvents = activate ? "none" : "";
      };

      const animatePixels = contextSafe((activate: boolean) => {
        isActive = activate;
        gsap.killTweensOf(pixels);
        delayedCall?.kill();

        if (prefersReducedMotion) {
          gsap.set(pixels, { display: "none" });
          setActiveVisible(activate);
          return;
        }

        gsap.set(pixels, { display: "none" });

        gsap.to(pixels, {
          display: "block",
          duration: 0,
          stagger: { each: staggerDuration, from: "random" },
        });

        delayedCall = gsap.delayedCall(animationStepDuration, () => {
          setActiveVisible(activate);
        });

        gsap.to(pixels, {
          display: "none",
          duration: 0,
          delay: animationStepDuration,
          stagger: { each: staggerDuration, from: "random" },
        });
      });

      const onEnter = () => {
        if (!isActive) animatePixels(true);
      };
      const onLeave = () => {
        if (isActive) animatePixels(false);
      };
      const onClick = () => {
        animatePixels(!isActive);
      };

      if (isTouchDevice) {
        card.addEventListener("click", onClick);
        return () => {
          card.removeEventListener("click", onClick);
          delayedCall?.kill();
          gsap.killTweensOf(pixels);
        };
      }

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      return () => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
        delayedCall?.kill();
        gsap.killTweensOf(pixels);
      };
    },
    { scope: cardRef },
  );

  return (
    <div
      ref={cardRef}
      data-hover=""
      data-pixelated-image-reveal=""
      className={cn(styles.card, fill && styles.fill, className)}
    >
      <div className={styles.aspect} aria-hidden="true" />
      <div className={styles.defaultLayer}>
        {/* eslint-disable-next-line @next/next/no-img-element -- external demo assets; swap for next/image when local */}
        <img
          src={defaultSrc}
          width={800}
          alt={alt}
          className={styles.img}
          draggable={false}
        />
      </div>
      <div
        data-pixelated-image-reveal-active=""
        className={styles.activeLayer}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeSrc}
          width={800}
          alt=""
          className={styles.img}
          draggable={false}
        />
      </div>
      <div
        data-pixelated-image-reveal-grid=""
        className={styles.pixels}
        aria-hidden="true"
      />
    </div>
  );
}
