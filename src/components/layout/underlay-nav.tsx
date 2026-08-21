"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { motion, useReducedMotion, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { SocialIcon } from "@/components/social-icon";
import { navItems, site, socialLinks } from "@/content/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

import styles from "./underlay-nav.module.css";

gsap.registerPlugin(CustomEase);

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

/** "Home" isn't a tracked scroll section, it's active whenever none of the others are. */
const menuLinks = [{ label: "Home", href: "#main-content" }, ...navItems];

/**
 * Fixed header + GSAP-driven slide-out ("underlay") menu.
 *
 * Design: the menu panel sits behind the page content (`[data-main]`, z-2)
 * at z-1, fixed to the right edge. Opening the menu doesn't move the menu
 * itself — it slides `[data-main]` (and a click-catching overlay glued to
 * it) to the left, revealing the panel that was hidden underneath the whole
 * time. The fixed header (logo + toggle) never moves, so it's always
 * reachable. `[data-main]` is rendered by the root layout, outside this
 * component, so it's queried by attribute rather than passed as a ref.
 */
export function UnderlayNav() {
  const { scrollYProgress } = useScroll();
  const activeId = useActiveSection(sectionIds);
  const prefersReducedMotion = useReducedMotion();

  const [isOpen, setIsOpen] = useState(false);

  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toggleBtn = toggleBtnRef.current;
    const menuEl = menuRef.current;
    const overlayEl = overlayRef.current;
    const darkEl = darkRef.current;
    const mainEl = document.querySelector<HTMLElement>("[data-main]");

    if (!toggleBtn || !menuEl || !overlayEl || !darkEl || !mainEl) return;

    const toggleLabels = toggleBtn.querySelectorAll<HTMLElement>(
      "[data-toggle-label]",
    );
    const toggleBars =
      toggleBtn.querySelectorAll<HTMLElement>("[data-toggle-bar]");
    const largeItems = menuEl.querySelectorAll<HTMLElement>("[data-reveal-l]");
    const smallItems = menuEl.querySelectorAll<HTMLElement>("[data-reveal-s]");
    const menuBorder = menuEl.querySelector<HTMLElement>(
      "[data-bottom-border]",
    );
    const corners = overlayEl.querySelectorAll<HTMLElement>("[data-corner]");
    const overlayBorders =
      overlayEl.querySelectorAll<HTMLElement>("[data-border-row]");
    const linkEls = menuEl.querySelectorAll<HTMLAnchorElement>("a");

    CustomEase.create("energy", "M0,0 C0.32,0.72 0,1 1,1");

    // Reduced motion: keep the exact same timeline/interruption logic (so
    // behavior stays identical), just collapse every duration to ~instant.
    const s = prefersReducedMotion ? 0.001 : 1;

    const closedColor = getComputedStyle(toggleBtn).color;
    const openColor = getComputedStyle(menuEl).color;

    let isOpenInternal = false;
    let tl: gsap.core.Timeline;
    let enterEndTime = 0;

    const getMenuOffset = () => -menuEl.offsetWidth;

    gsap.set(overlayEl, { visibility: "hidden", pointerEvents: "none" });
    gsap.set(darkEl, { autoAlpha: 0 });
    gsap.set(mainEl, { x: 0 });
    gsap.set(toggleLabels, { yPercent: 0 });
    gsap.set(toggleBars, { y: 0, rotation: 0 });
    if (menuBorder) gsap.set(menuBorder, { scaleX: 0 });
    if (overlayBorders[0]) gsap.set(overlayBorders[0], { yPercent: -100 });
    if (overlayBorders[1]) gsap.set(overlayBorders[1], { yPercent: 100 });
    gsap.set(corners, { scale: 0 });

    function buildTimeline() {
      tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "energy",
          easeReverse: "power2.inOut",
        },
      });

      tl.set(overlayEl, { visibility: "visible", pointerEvents: "auto" }, 0);

      /**
       * `fromTo` (not `to`) is deliberate: `tl.invalidate()` — called on every
       * reopen so `getMenuOffset()` re-measures the menu after a resize — also
       * wipes the cached *start* value of every tween in the timeline, not
       * just its end value. A `.to()` tween's start is implicit (whatever the
       * element's live position happens to be), so invalidating while a close
       * is only a few ms into flight recaptures "start" as "still basically
       * open" instead of the true closed position — `restart()` then animates
       * from ~open to ~open, and the menu silently gets stuck open. Pinning
       * `x: 0` explicitly keeps this tween's start correct no matter when
       * it's interrupted.
       */
      tl.fromTo(
        [mainEl, overlayEl],
        { x: 0 },
        {
          x: getMenuOffset,
          duration: 0.7 * s,
        },
        0,
      )

        .to(
          darkEl,
          {
            autoAlpha: 1,
            duration: 0.5 * s,
          },
          0,
        )

        .to(
          corners,
          {
            scale: 1,
            duration: 0.5 * s,
          },
          0,
        )

        .to(
          overlayBorders,
          {
            yPercent: 0,
            duration: 0.5 * s,
          },
          0,
        )

        .to(
          toggleLabels,
          {
            yPercent: -100,
            duration: 0.4 * s,
          },
          0,
        )

        .to(
          toggleBtn,
          {
            color: openColor,
            duration: 0.4 * s,
          },
          0,
        )

        .to(
          toggleBars[0],
          {
            y: "0.25em",
            rotation: 45,
            duration: 0.35 * s,
            ease: "back.out(1.4)",
            easeReverse: "power3.out",
          },
          0.05 * s,
        )

        .to(
          toggleBars[1],
          {
            y: "-0.25em",
            rotation: -45,
            duration: 0.35 * s,
            ease: "back.out(1.4)",
            easeReverse: "power3.out",
          },
          0.05 * s,
        )

        .fromTo(
          largeItems,
          { autoAlpha: 0, xPercent: 25 },
          {
            autoAlpha: 1,
            xPercent: 0,
            duration: 0.7 * s,
            stagger: 0.05 * s,
          },
          0,
        )

        .fromTo(
          smallItems,
          { autoAlpha: 0, yPercent: 100 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.5 * s,
            stagger: 0.03 * s,
            ease: "power3.out",
          },
          0.3 * s,
        );

      if (menuBorder) {
        tl.to(
          menuBorder,
          {
            scaleX: 1,
            duration: 0.5 * s,
          },
          "<",
        );
      }

      enterEndTime = tl.duration();

      tl.addPause();

      tl.to(
        [largeItems, smallItems],
        {
          autoAlpha: 0,
          duration: 0.3 * s,
        },
        "<",
      )

        .fromTo(
          [mainEl, overlayEl],
          { x: getMenuOffset },
          {
            x: 0,
            duration: 0.6 * s,
          },
          "<",
        )

        .to(
          darkEl,
          {
            autoAlpha: 0,
            duration: 0.35 * s,
            ease: "power2.inOut",
          },
          "<",
        )

        .to(
          corners,
          {
            scale: 0,
            duration: 0.5 * s,
          },
          "<",
        );

      if (overlayBorders[0]) {
        tl.to(
          overlayBorders[0],
          {
            yPercent: -100,
            duration: 0.5 * s,
          },
          "<",
        );
      }

      if (overlayBorders[1]) {
        tl.to(
          overlayBorders[1],
          {
            yPercent: 100,
            duration: 0.5 * s,
          },
          "<",
        );
      }

      tl.to(
        toggleBtn,
        {
          color: closedColor,
          duration: 0.25 * s,
        },
        "<+=0.1",
      )

        .to(
          toggleLabels,
          {
            yPercent: 0,
            duration: 0.25 * s,
            ease: "power3.in",
          },
          "<",
        )

        .to(
          toggleBars,
          {
            y: 0,
            rotation: 0,
            duration: 0.25 * s,
            ease: "power3.in",
          },
          "<",
        )

        .set(overlayEl, {
          visibility: "hidden",
          pointerEvents: "none",
        });
    }

    function toggle() {
      isOpenInternal = !isOpenInternal;
      setIsOpen(isOpenInternal);
      document.body.setAttribute(
        "data-menu-status",
        isOpenInternal ? "open" : "",
      );

      if (isOpenInternal) {
        tl.invalidate();
        if (tl.time() >= enterEndTime) tl.timeScale(1).restart();
        else tl.timeScale(1).play();
      } else if (tl.time() < enterEndTime) {
        tl.timeScale(1).reverse();
      } else {
        /**
         * Closing from the fully-open resting position means the playhead
         * sits exactly on the `addPause()` inserted at `enterEndTime`.
         * Resuming with a bare `.play()` from that exact instant can get
         * re-paused on the very next tick — GSAP treats resuming play from
         * the same spot a pause lives at as "still at the pause", so it
         * fires again immediately and the close animation never advances
         * (the menu is then stuck open forever, even though React's `isOpen`
         * state has already flipped to closed). Nudging the playhead a hair
         * past that boundary before playing avoids the re-trigger.
         */
        tl.timeScale(1).play(Math.max(tl.time(), enterEndTime + 0.001));
      }
    }

    buildTimeline();

    toggleBtn.addEventListener("click", toggle);

    const handleOverlayClick = () => {
      if (isOpenInternal) toggle();
    };
    overlayEl.addEventListener("click", handleOverlayClick);

    const handleLinkClick = () => {
      if (isOpenInternal) toggle();
    };
    linkEls.forEach((link) => link.addEventListener("click", handleLinkClick));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpenInternal) {
        toggle();
        toggleBtn.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (isOpenInternal) {
          gsap.set([mainEl, overlayEl], { x: getMenuOffset() });
        } else {
          tl.invalidate();
        }
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      toggleBtn.removeEventListener("click", toggle);
      overlayEl.removeEventListener("click", handleOverlayClick);
      linkEls.forEach((link) =>
        link.removeEventListener("click", handleLinkClick),
      );
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
      tl?.kill();
      document.body.removeAttribute("data-menu-status");
    };
  }, [prefersReducedMotion]);

  return (
    <>
      <header className="text-foreground fixed inset-x-0 top-0 z-[100]">
        <motion.div
          aria-hidden="true"
          className="bg-accent absolute inset-x-0 top-0 h-[2px] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        <div className="flex items-center justify-between p-5 sm:p-8">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-70"
          >
            {site.name}
          </Link>

          <button
            ref={toggleBtnRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls="underlay-nav-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="-m-4 flex items-center gap-3 p-4"
          >
            <span
              aria-hidden="true"
              className="flex h-6 w-12 flex-col items-end overflow-hidden text-base font-medium"
            >
              <span data-toggle-label className="leading-6">
                Menu
              </span>
              <span data-toggle-label className="leading-6">
                Close
              </span>
            </span>
            <span
              aria-hidden="true"
              className="flex h-6 w-6 flex-col items-center justify-center gap-1.5"
            >
              <span data-toggle-bar className="block h-0.5 w-6 bg-current" />
              <span data-toggle-bar className="block h-0.5 w-6 bg-current" />
            </span>
          </button>
        </div>
      </header>

      <nav
        ref={menuRef}
        id="underlay-nav-menu"
        aria-label="Primary"
        inert={!isOpen}
        className="bg-foreground text-background fixed inset-y-0 right-0 z-[1] w-[80vw] md:w-[30em]"
      >
        <div className="flex h-full w-full flex-col justify-between gap-8 overflow-auto p-8 pt-28 sm:p-10 sm:pt-32">
          <ul className="flex w-full flex-col">
            {menuLinks.map((item) => {
              const id = item.href.replace("#", "");
              const isActive =
                item.label === "Home" ? activeId === null : activeId === id;
              return (
                <li key={item.href} data-reveal-l>
                  <a
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-4 py-2 text-4xl font-bold tracking-tight transition-colors sm:text-5xl",
                      isActive ? "bg-accent text-white" : "hover:opacity-70",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="relative w-full pt-8">
            <div
              data-bottom-border
              className="absolute inset-x-0 top-0 h-px origin-left bg-current opacity-15"
            />
            <div className="flex flex-col gap-8 sm:flex-row">
              <div className="flex flex-1 flex-col items-start gap-4">
                <div data-reveal-s>
                  <span className="text-sm opacity-50">Socials</span>
                </div>
                <ul className="flex flex-col gap-3">
                  {socialLinks.map((link) => (
                    <li key={link.label} data-reveal-s>
                      <a
                        href={link.href}
                        target={link.icon === "mail" ? undefined : "_blank"}
                        rel={
                          link.icon === "mail"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="inline-flex items-center gap-2 text-base transition-opacity hover:opacity-70"
                      >
                        <SocialIcon icon={link.icon} className="h-4 w-4" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-1 flex-col items-start gap-4">
                <div data-reveal-s>
                  <span className="text-sm opacity-50">Quick Links</span>
                </div>
                <ul className="flex flex-col gap-3">
                  <li data-reveal-s>
                    <a
                      href={site.resumeUrl}
                      download
                      className="text-base transition-opacity hover:opacity-70"
                    >
                      Download CV
                    </a>
                  </li>
                  <li data-reveal-s>
                    <a
                      href={site.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base transition-opacity hover:opacity-70"
                    >
                      View source ↗
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        ref={overlayRef}
        data-underlay-nav-overlay
        aria-hidden="true"
        className="invisible fixed inset-0 z-[100] overflow-clip"
      >
        <div ref={darkRef} className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col justify-between">
          <div data-border-row className="flex flex-col items-end">
            <div className="bg-surface h-4 w-full" />
            <div data-corner className={cn("h-8 w-8", styles.corner)} />
          </div>
          <div data-border-row className="flex flex-col items-end">
            <div data-corner className={cn("h-8 w-8", styles.cornerBottom)} />
            <div className="bg-surface h-4 w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
