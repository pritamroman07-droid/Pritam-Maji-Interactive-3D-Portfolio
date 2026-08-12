import { marqueeItems } from "@/lib/data";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative overflow-hidden border-y border-border/50 py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="flex w-max marquee-track gap-10">
        {items.map((item, i) => (
          <div key={i} className="flex shrink-0 items-center gap-10">
            <span className="font-display text-lg font-semibold uppercase tracking-widest text-faint transition hover:text-accent">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-accent-alt" />
          </div>
        ))}
      </div>
    </div>
  );
}
