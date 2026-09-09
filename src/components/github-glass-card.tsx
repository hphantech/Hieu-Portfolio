"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { site } from "@/content/site";
import { cn } from "@/lib/utils";

import styles from "./github-glass-card.module.css";

const SCALE_STEP = 0.1;
const MAX_SCALE = 1.6;
const MIN_SCALE = 0.75;
const STAGE_PAD = 24;
/** Gap between the copy column and the default card position. */
const ASIDE_GAP = 20;

type GithubStats = {
  publicRepos: number;
  followers: number;
  avatarUrl: string;
  login: string;
  name: string | null;
};

type GithubGlassCardProps = {
  className?: string;
  /** Left-side copy / CTAs rendered inside the full-width drag stage. */
  children?: ReactNode;
};

/**
 * Liquid-glass GitHub profile card — draggable across the full stage width.
 */
export function GithubGlassCard({ className, children }: GithubGlassCardProps) {
  const clusterRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hasDraggedRef = useRef(false);
  const [scale, setScale] = useState(1);
  const [stats, setStats] = useState<GithubStats | null>(null);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    left: number;
    top: number;
  }>({ active: false, startX: 0, startY: 0, left: 0, top: 0 });

  const githubUrl =
    site.socialGithubUrl ?? `https://github.com/${site.githubUsername}`;
  const username = site.githubUsername;

  useEffect(() => {
    let cancelled = false;
    void fetch(`https://api.github.com/users/${username}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        setStats({
          publicRepos: data.public_repos ?? 0,
          followers: data.followers ?? 0,
          avatarUrl: data.avatar_url,
          login: data.login,
          name: data.name,
        });
      })
      .catch(() => {
        /* Offline / rate limit — fall back to defaults below. */
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  const placeClusterRight = useCallback(() => {
    const cluster = clusterRef.current;
    const stage = stageRef.current;
    if (!cluster || !stage || hasDraggedRef.current) return;

    cluster.style.position = "absolute";
    cluster.style.margin = "0";
    cluster.style.right = "auto";
    cluster.style.translate = "none";

    const aside = stage.querySelector(`.${styles.aside}`) as HTMLElement | null;
    const maxLeft = Math.max(
      STAGE_PAD,
      stage.clientWidth - cluster.offsetWidth - STAGE_PAD,
    );
    // Sit beside the copy on wide layouts; fall back to the stage edge on narrow.
    const besideAside =
      aside && stage.clientWidth > 900
        ? aside.offsetLeft + aside.offsetWidth + ASIDE_GAP
        : maxLeft;
    const left = Math.min(Math.max(STAGE_PAD, besideAside), maxLeft);
    const top = Math.max(
      STAGE_PAD,
      (stage.clientHeight - cluster.offsetHeight) / 2,
    );
    cluster.style.left = `${left}px`;
    cluster.style.top = `${top}px`;
  }, []);

  useEffect(() => {
    placeClusterRight();
    window.addEventListener("resize", placeClusterRight);
    return () => window.removeEventListener("resize", placeClusterRight);
  }, [placeClusterRight]);

  const zoom = useCallback((delta: number) => {
    setScale((prev) =>
      Math.min(MAX_SCALE, Math.max(MIN_SCALE, +(prev + delta).toFixed(2))),
    );
  }, []);

  useEffect(() => {
    const cluster = clusterRef.current;
    const stage = stageRef.current;
    if (!cluster || !stage) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) return;

      hasDraggedRef.current = true;
      const rect = cluster.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      dragRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        left: rect.left - stageRect.left,
        top: rect.top - stageRect.top,
      };
      cluster.classList.add(styles.dragging);
      cluster.setPointerCapture(e.pointerId);
      cluster.style.position = "absolute";
      cluster.style.right = "auto";
      cluster.style.translate = "none";
      cluster.style.left = `${dragRef.current.left}px`;
      cluster.style.top = `${dragRef.current.top}px`;
      cluster.style.margin = "0";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      e.preventDefault();
      const stageRect = stage.getBoundingClientRect();
      const clusterRect = cluster.getBoundingClientRect();
      let nextLeft =
        dragRef.current.left + (e.clientX - dragRef.current.startX);
      let nextTop = dragRef.current.top + (e.clientY - dragRef.current.startY);

      const maxLeft = stageRect.width - clusterRect.width;
      const maxTop = stageRect.height - clusterRect.height;
      nextLeft = Math.min(Math.max(0, nextLeft), Math.max(0, maxLeft));
      nextTop = Math.min(Math.max(0, nextTop), Math.max(0, maxTop));

      cluster.style.left = `${nextLeft}px`;
      cluster.style.top = `${nextTop}px`;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      cluster.classList.remove(styles.dragging);
      try {
        cluster.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    };

    cluster.addEventListener("pointerdown", onPointerDown);
    cluster.addEventListener("pointermove", onPointerMove);
    cluster.addEventListener("pointerup", onPointerUp);
    cluster.addEventListener("pointercancel", onPointerUp);

    return () => {
      cluster.removeEventListener("pointerdown", onPointerDown);
      cluster.removeEventListener("pointermove", onPointerMove);
      cluster.removeEventListener("pointerup", onPointerUp);
      cluster.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const displayName = stats?.name || site.name;
  const login = stats?.login || username;
  const avatar = stats?.avatarUrl || `https://github.com/${username}.png`;
  const repos = stats?.publicRepos ?? "—";
  const followers = stats?.followers ?? "—";

  return (
    <div ref={stageRef} className={cn(styles.stage, className)}>
      <svg width="0" height="0" className={styles.filterSvg} aria-hidden="true">
        <defs>
          <filter
            id="liquid-glass-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.012"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="85"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {children ? <div className={styles.aside}>{children}</div> : null}

      <div
        ref={clusterRef}
        className={styles.cluster}
        style={{ ["--scale-factor" as string]: String(scale) }}
      >
        <img
          src="/images/pointing-character-v3.png"
          alt=""
          width={180}
          height={220}
          className={styles.pointer}
          draggable={false}
          aria-hidden="true"
        />

        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.avatarRing}>
              {/* eslint-disable-next-line @next/next/no-img-element -- GitHub avatar CDN / redirect */}
              <img
                src={avatar}
                alt=""
                width={76}
                height={76}
                className={styles.avatar}
                draggable={false}
              />
            </div>

            <div className={styles.info}>
              <h3 className={styles.name}>{displayName}</h3>
              <p className={styles.handle}>@{login}</p>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{repos}</span>
                <span className={styles.statLabel}>Repos</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>{followers}</span>
                <span className={styles.statLabel}>Followers</span>
              </div>
            </div>

            <a
              className={styles.githubBtn}
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className={styles.githubIcon}
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
              Follow
            </a>

            <div className={styles.zoomControls}>
              <button
                type="button"
                className={styles.zoomBtn}
                aria-label="Decrease card size"
                onClick={() => zoom(-SCALE_STEP)}
              >
                −
              </button>
              <button
                type="button"
                className={styles.zoomBtn}
                aria-label="Increase card size"
                onClick={() => zoom(SCALE_STEP)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
