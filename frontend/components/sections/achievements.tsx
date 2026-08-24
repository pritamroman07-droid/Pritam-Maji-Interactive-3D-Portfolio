"use client";

import { useState } from "react";
import { Calendar, Users } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { achievements, type Achievement } from "@/lib/data";

export function Achievements() {
  const [selected, setSelected] = useState<Achievement | null>(null);

  return (
    <section id="achievements" className="section relative">
      <div className="aurora aurora--blue -right-24 top-1/4 h-80 w-80 opacity-20" aria-hidden />
      <div className="container-x">
        <SectionHeading
          eyebrow="Achievements"
          title="Things I'm Proud Of"
          description="Certifications, competitions, events and milestones from my journey."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i * 0.08, 0.3)}>
                <TiltCard className="group h-full rounded-2xl" intensity={6}>
                  <article className="glass flex h-full flex-col overflow-hidden rounded-2xl transition group-hover:border-accent/50">
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden />
                      {item.highlight && (
                        <span className="absolute top-3 right-3 rounded-full bg-accent/90 px-3 py-1 text-[11px] font-bold text-white">
                          {item.highlight}
                        </span>
                      )}
                      <span className="absolute bottom-3 left-3 rounded-full glass px-3 py-1 text-[11px] font-medium text-fg dark:text-white">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="font-display text-lg font-bold sm:text-xl">{item.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} aria-hidden />
                          {item.date}
                        </span>
                        {item.partner && (
                          <span className="flex items-center gap-1">
                            <Users size={12} aria-hidden />
                            {item.partner}
                          </span>
                        )}
                        {item.status && (
                          <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-semibold text-accent">
                            {item.status}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>
                      <button
                        onClick={() => setSelected(item)}
                        aria-label={`View details for ${item.title}`}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                      >
                        View Details
                      </button>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
          ))}
        </div>

        {achievements.length === 0 && (
          <Reveal>
            <p className="text-center text-muted">
              Achievement photos coming soon. Add your photos to{" "}
              <code className="rounded bg-surface px-2 py-1 text-sm">/public/achievements/</code>
            </p>
          </Reveal>
        )}
      </div>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} labelledBy="achievement-modal-title">
        {selected && (
          <div>
            <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.image}
                alt={selected.title}
                className="h-full w-full object-cover"
              />
              {selected.highlight && (
                <span className="absolute top-4 right-4 rounded-full bg-accent/90 px-4 py-1.5 text-sm font-bold text-white">
                  {selected.highlight}
                </span>
              )}
            </div>
            <h3 id="achievement-modal-title" className="font-display text-2xl font-bold">
              {selected.title}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} aria-hidden />
                {selected.date}
              </span>
              {selected.partner && (
                <span className="flex items-center gap-1.5">
                  <Users size={14} aria-hidden />
                  Partner: {selected.partner}
                </span>
              )}
              {selected.status && (
                <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
                  {selected.status}
                </span>
              )}
            </div>
            <p className="mt-4 leading-relaxed text-muted">{selected.description}</p>
          </div>
        )}
      </Modal>
    </section>
  );
}
