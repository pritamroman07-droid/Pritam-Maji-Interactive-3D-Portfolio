import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <div className="mb-14 max-w-3xl">
      <Reveal>
        <p className="mb-3 flex items-center gap-3 font-mono text-sm uppercase tracking-[0.25em] text-accent">
          <span className="inline-block h-px w-10 bg-gradient-to-r from-accent to-transparent" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 id={id} className="font-display text-4xl font-bold leading-tight sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
