import { site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 border-t">
      <div className="text-muted mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. Built with Next.js and Tailwind CSS.
        </p>
        <p>Portfolio in progress — February 2026</p>
      </div>
    </footer>
  );
}
