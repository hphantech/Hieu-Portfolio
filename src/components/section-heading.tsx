type SectionHeadingProps = {
  id: string;
  title: string;
  description?: string;
};

export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <header className="mb-10 max-w-2xl">
      <h2
        id={id}
        className="text-sm font-medium uppercase tracking-[0.2em] text-accent"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-lg text-muted">{description}</p>
      ) : null}
    </header>
  );
}
