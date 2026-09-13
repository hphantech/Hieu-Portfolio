"use client";

import {
  FlyText,
  flyPresets,
  type FlyTextConfig,
} from "@/components/motion/fly-text";
import { cn } from "@/lib/utils";

type FlyTextBeatProps = {
  label: string;
  text: string;
  /** Full-viewport solo beat vs shorter bridge. */
  density?: "solo" | "bridge";
  preset?: Partial<FlyTextConfig>;
  className?: string;
};

/** One flying-text line between sections. */
export function FlyTextBeat({
  label,
  text,
  density = "bridge",
  preset = flyPresets.breeze,
  className,
}: FlyTextBeatProps) {
  return (
    <section
      aria-label={label}
      className={cn(
        "bg-background text-foreground flex w-full flex-col justify-center px-6 sm:px-10",
        density === "solo"
          ? "min-h-[70svh] py-0 sm:min-h-dvh"
          : "min-h-[48vh] py-[6vh] sm:min-h-[58vh] sm:py-[8vh]",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-3xl">
        <FlyText
          as="p"
          className="text-[clamp(1.5rem,4.2vw,2.75rem)] leading-[1.15] font-extrabold tracking-[-0.03em]"
          {...preset}
        >
          {text}
        </FlyText>
      </div>
    </section>
  );
}
