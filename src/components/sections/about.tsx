import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { aboutParagraphs, quickFacts } from "@/content/about";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto w-full max-w-5xl px-6 py-20"
    >
      <SectionHeading
        id="about-heading"
        index="01"
        title="About"
        description="A short introduction to who you are, what you're studying, and what kind of frontend work excites you."
      />
      <Reveal className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="text-muted max-w-3xl space-y-4 text-base leading-8">
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <dl className="border-border bg-surface grid gap-4 self-start rounded-2xl border p-6 text-sm">
          {quickFacts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-muted">{fact.label}</dt>
              <dd className="text-foreground mt-1 font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
