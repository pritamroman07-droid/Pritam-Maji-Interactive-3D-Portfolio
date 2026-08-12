"use client";

import { useState } from "react";
import { Award, Code2, Medal, Star, Trophy, Volleyball } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { achievements, type Achievement } from "@/lib/data";

const iconMap = {
  trophy: Trophy,
  medal: Medal,
  award: Award,
  code: Code2,
  sport: Volleyball,
  star: Star,
};

export function Achievements() {
  const [selected, setSelected] = useState<Achievement | null>(null);

  return (
    <section id="achievements" className="section relative">
      <div className="aurora aurora--cyan right-0 top-1/4 h-72 w-72 opacity-20" aria-hidden />
      <div className="container-x">
        <SectionHeading
          eyebrow="Achievements"
          title="Moments of Glory"
          description="Milestones that shaped the builder I am today. Click any card for the full story."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <Reveal key={item.id} delay={Math.min(i * 0.07, 0.4)}>
                <TiltCard className="group h-full rounded-2xl">
                  <button
                    onClick={() => setSelected(item)}
                    className="glass flex h-full w-full flex-col rounded-2xl p-6 text-left transition group-hover:border-accent/50"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-alt/20 text-accent shadow-glow transition group-hover:scale-110">
                        <Icon size={22} aria-hidden />
                      </span>
                      <span className="rounded-full border border-border/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-faint">
                        {item.type} · {item.year}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold leading-snug">{item.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                    <span className="mt-5 text-xs font-medium text-accent transition group-hover:translate-x-1">
                      Read more →
                    </span>
                  </button>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} labelledBy="achievement-modal-title">
        {selected && (
          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/25 to-accent-alt/25 text-accent shadow-glow">
                {(() => {
                  const Icon = iconMap[selected.icon];
                  return <Icon size={26} aria-hidden />;
                })()}
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  {selected.type} · {selected.year}
                </p>
                <h3 id="achievement-modal-title" className="font-display text-2xl font-bold">
                  {selected.title}
                </h3>
              </div>
            </div>
            <p className="leading-relaxed text-muted">{selected.description}</p>
          </div>
        )}
      </Modal>
    </section>
  );
}
