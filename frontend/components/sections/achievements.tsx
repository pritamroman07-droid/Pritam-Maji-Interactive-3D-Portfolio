"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { achievements, type Achievement } from "@/lib/data";

function getImages(item: Achievement): string[] {
  if (item.images && item.images.length > 0) return item.images;
  if (item.image) return [item.image];
  return [];
}

function AchievementCard({ item }: { item: Achievement }) {
  const [selected, setSelected] = useState<Achievement | null>(null);
  const imgs = getImages(item);
  const [imgIndex, setImgIndex] = useState(0);
  const hasMultiple = imgs.length > 1;

  const prev = () => setImgIndex((i) => (i === 0 ? imgs.length - 1 : i - 1));
  const next = () => setImgIndex((i) => (i === imgs.length - 1 ? 0 : i + 1));

  return (
    <>
      <TiltCard className="group h-full rounded-2xl" intensity={6}>
        <article className="glass flex h-full flex-col overflow-hidden rounded-2xl transition group-hover:border-accent/50">
          {imgs.length > 0 ? (
            <div className="relative aspect-[4/3] overflow-hidden bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgs[imgIndex]}
                alt={item.title}
                width={512}
                height={384}
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

              {hasMultiple && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white"
                  >
                    <ChevronRight size={14} />
                  </button>
                  <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
                    {imgs.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => { e.stopPropagation(); setImgIndex(idx); }}
                        aria-label={`Photo ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === imgIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center bg-surface/50 py-8">
              <span className="rounded-full glass px-4 py-2 text-sm font-medium text-fg dark:text-white">
                {item.category}
              </span>
              {item.highlight && (
                <span className="ml-2 rounded-full bg-accent/90 px-3 py-1 text-[11px] font-bold text-white">
                  {item.highlight}
                </span>
              )}
            </div>
          )}

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

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} labelledBy={`modal-${item.id}`}>
        {selected && (
          <div>
            {getImages(selected).length > 0 && (
              <ModalGallery item={selected} />
            )}
            <h3 id={`modal-${item.id}`} className="font-display text-2xl font-bold">
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
    </>
  );
}

function ModalGallery({ item }: { item: Achievement }) {
  const imgs = getImages(item);
  const [idx, setIdx] = useState(0);
  const hasMultiple = imgs.length > 1;

  return (
    <div className="relative mb-5 overflow-hidden rounded-xl bg-surface">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgs[idx]}
        alt={`${item.title} ${idx + 1}`}
        width={800}
        height={600}
        className="aspect-[4/3] w-full object-cover"
      />
      {item.highlight && (
        <span className="absolute top-4 right-4 rounded-full bg-accent/90 px-4 py-1.5 text-sm font-bold text-white">
          {item.highlight}
        </span>
      )}
      {hasMultiple && (
        <>
          <button
            onClick={() => setIdx((i) => (i === 0 ? imgs.length - 1 : i - 1))}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setIdx((i) => (i === imgs.length - 1 ? 0 : i + 1))}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {imgs.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Photo ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === idx ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Achievements() {
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
              <AchievementCard item={item} />
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
    </section>
  );
}
