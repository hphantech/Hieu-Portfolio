import Link from "next/link";

export default function WorkNotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start justify-center px-6 py-20"
    >
      <p className="text-accent text-sm font-medium tracking-[0.2em] uppercase">
        404
      </p>
      <h1 className="text-foreground mt-3 text-3xl font-bold tracking-tight">
        Project not found
      </h1>
      <p className="text-muted mt-3 text-base leading-7">
        That case study doesn&apos;t exist, or the link may be out of date.
      </p>
      <Link
        href="/#work"
        className="text-accent mt-6 inline-flex text-sm font-medium transition-opacity hover:opacity-70"
        data-cursor-hover
      >
        ← Back to work
      </Link>
    </main>
  );
}
