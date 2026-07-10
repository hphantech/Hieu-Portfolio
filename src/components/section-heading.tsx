type SectionHeadingProps = {
  id: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  id,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="mb-10 max-w-2xl">
      <h2
        id={id}
        className="text-accent text-sm font-medium tracking-[0.2em] uppercase"
      >
        {title}
      </h2>
      {description ? (
        <p className="text-muted mt-3 text-lg">{description}</p>
      ) : null}
    </header>
  );
}
