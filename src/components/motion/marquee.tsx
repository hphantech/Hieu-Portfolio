import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
};

/**
 * Infinite scrolling ticker, implemented with a pure CSS animation so it
 * needs no client-side JavaScript. The animation is automatically paused by
 * the global `prefers-reduced-motion` rule in globals.css.
 */
export function Marquee({ items, className, duration = 24 }: MarqueeProps) {
  return (
    <div className={cn("group overflow-hidden", className)}>
      <div
        className="animate-marquee flex w-max gap-8 group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s` }}
      >
        {/* Real, screen-reader-visible list. */}
        <ul className="flex gap-8" aria-label="Skills">
          {items.map((item) => (
            <li
              key={item}
              className="text-muted font-mono text-sm whitespace-nowrap"
            >
              {item}
            </li>
          ))}
        </ul>
        {/* Visual-only duplicate so the loop appears seamless; hidden from assistive tech. */}
        <ul className="flex gap-8" aria-hidden="true">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="text-muted font-mono text-sm whitespace-nowrap"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
