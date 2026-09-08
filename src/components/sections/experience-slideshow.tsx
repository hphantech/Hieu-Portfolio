"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import type { ExperienceImage } from "@/content/experience";
import { cn } from "@/lib/utils";

import styles from "./work-stack.module.css";

const AUTO_MS = 3800;

type ExperienceSlideshowProps = {
  images: readonly ExperienceImage[];
  label: string;
};

/** Full-bleed image slider — drag/swipe + autoplay. */
export function ExperienceSlideshow({
  images,
  label,
}: ExperienceSlideshowProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    duration: 28,
  });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || images.length < 2 || paused) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [emblaApi, images.length, paused]);

  if (images.length === 1) {
    return (
      <div
        className={cn(styles.slideshow, styles.slideshowSingle)}
        aria-label={label}
      >
        <div className={styles.slide}>
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className={styles.slideImg}
            sizes="(max-width: 767px) 92vw, 70vw"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.slideshow}
      aria-label={label}
      aria-roledescription="carousel"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className={styles.slideshowViewport} ref={emblaRef}>
        <div className={styles.slideshowTrack}>
          {images.map((image) => (
            <div className={styles.slide} key={image.src}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={styles.slideImg}
                sizes="(max-width: 767px) 92vw, 70vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.slideshowDots} role="tablist" aria-label="Slides">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show image ${i + 1}`}
            className={cn(
              styles.slideshowDot,
              i === index && styles.slideshowDotActive,
            )}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
