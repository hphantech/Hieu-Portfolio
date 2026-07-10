import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  id: string;
  /** Editorial index label, e.g. "01". */
  index: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  id,
  index,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal as="header" className="mb-10 max-w-2xl">
      <div className="flex items-baseline gap-3">
        <span aria-hidden="true" className="text-muted font-mono text-sm">
          {index}
        </span>
        <h2
          id={id}
          className="text-accent text-sm font-medium tracking-[0.2em] uppercase"
        >
          {title}
        </h2>
      </div>
      {description ? (
        <p className="text-muted mt-3 text-lg">{description}</p>
      ) : null}
    </Reveal>
  );
}
