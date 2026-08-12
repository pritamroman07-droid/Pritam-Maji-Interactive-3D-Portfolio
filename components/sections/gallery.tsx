"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { gallery } from "@/lib/data";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((cur) => (cur === null ? cur : (cur + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <section id="gallery" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Gallery"
          title="Visual Experiments"
          description="Design explorations and creative coding — a peek into my visual playground."
        />

        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {gallery.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i * 0.05, 0.3)} className="break-inside-avoid">
              <TiltCard className="group rounded-2xl" intensity={6}>
                <button
                  onClick={() => setActive(i)}
                  aria-label={`Open ${item.title}`}
                  className="relative block w-full overflow-hidden rounded-2xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className={`w-full object-cover transition duration-700 group-hover:scale-110 ${item.tall ? "aspect-[3/4]" : "aspect-square"}`}
                  />
                  <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                    <span className="flex w-full items-center justify-between">
                      <span className="text-sm font-semibold text-white">{item.title}</span>
                      <Expand size={14} className="text-white" aria-hidden />
                    </span>
                  </span>
                </button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${gallery[active].title} lightbox`}
            onClick={close}
          >
            <button
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full glass p-3 text-white"
            >
              <ChevronLeft size={20} aria-hidden />
            </button>
            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-4xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gallery[active].src}
                alt={gallery[active].title}
                className="max-h-[75vh] w-auto rounded-2xl shadow-glow-lg"
              />
              <figcaption className="mt-4 text-center text-sm text-white/80">
                {gallery[active].title} — {active + 1} / {gallery.length}
              </figcaption>
            </motion.figure>
            <button
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full glass p-3 text-white"
            >
              <ChevronRight size={20} aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
