"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";

import type { Project } from "@/types/content";

import styles from "./project-modal.module.css";

gsap.registerPlugin(useGSAP);

const emptySubscribe = () => () => {};

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

/** Animated project detail popup — no route change. */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [visibleProject, setVisibleProject] = useState<Project | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const open = Boolean(project);

  // Keep last project visible while the close animation runs.
  if (project && project.slug !== visibleProject?.slug) {
    setVisibleProject(project);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      if (!overlay || !panel || !visibleProject) return;

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!open) {
        if (reduce) {
          gsap.set([overlay, panel], { clearProps: "all" });
          setVisibleProject(null);
          return;
        }
        const tl = gsap.timeline({
          onComplete: () => setVisibleProject(null),
        });
        tl.to(
          panel,
          {
            autoAlpha: 0,
            y: 28,
            scale: 0.96,
            duration: 0.28,
            ease: "power2.in",
          },
          0,
        ).to(
          overlay,
          { autoAlpha: 0, duration: 0.22, ease: "power1.in" },
          0.05,
        );
        return;
      }

      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(panel, { autoAlpha: 0, y: 36, scale: 0.94 });

      if (reduce) {
        gsap.set(overlay, { autoAlpha: 1 });
        gsap.set(panel, { autoAlpha: 1, y: 0, scale: 1 });
        closeBtnRef.current?.focus();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => closeBtnRef.current?.focus(),
      });
      tl.to(overlay, { autoAlpha: 1, duration: 0.3, ease: "power2.out" }).to(
        panel,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
        0.05,
      );
    },
    { dependencies: [open, visibleProject?.slug] },
  );

  const onBackdrop = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose],
  );

  if (!mounted || !visibleProject) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="presentation"
      onMouseDown={onBackdrop}
    >
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        data-lenis-prevent-wheel
        onWheel={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          ref={closeBtnRef}
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close project details"
        >
          <X aria-hidden="true" className="size-5" />
        </button>

        <div className={styles.media}>
          {visibleProject.cover ? (
            <Image
              src={visibleProject.cover}
              alt={`Screenshot of ${visibleProject.title}`}
              fill
              className={styles.mediaImg}
              sizes="(max-width: 900px) 96vw, 1180px"
              priority
            />
          ) : (
            <div className={styles.mediaFallback}>No preview yet</div>
          )}
        </div>

        <div className={styles.body}>
          <p className={styles.eyebrow}>
            {visibleProject.year} · {visibleProject.role}
          </p>
          <h2 id={titleId} className={styles.title}>
            {visibleProject.title}
          </h2>
          <p className={styles.summary}>{visibleProject.summary}</p>

          <ul className={styles.tech} aria-label="Technologies">
            {visibleProject.tech.map((tech) => (
              <li key={tech} className={styles.techItem}>
                {tech}
              </li>
            ))}
          </ul>

          <div className={styles.copy}>
            {visibleProject.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {visibleProject.links.length > 0 ? (
            <div className={styles.links}>
              {visibleProject.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {link.label}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
