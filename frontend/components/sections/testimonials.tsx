"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6500);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section className="section relative">
      <div className="aurora aurora--purple left-1/3 top-0 h-64 w-64 opacity-20" aria-hidden />
      <div className="container-x">
        <SectionHeading
          eyebrow="Testimonials"
          title="Kind Words from Great People"
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="relative min-h-[320px] sm:min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.id}
                initial={{ opacity: 0, y: 32, scale: 0.97, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, scale: 0.98, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-3xl p-8 sm:p-12"
              >
                <Quote size={36} className="text-accent/60" aria-hidden />
                <blockquote className="mt-4 text-lg leading-relaxed text-muted sm:text-xl">
                  “{current.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-alt font-display text-sm font-bold text-white shadow-glow">
                    {current.initials}
                  </span>
                  <span>
                    <span className="block font-display font-bold">{current.name}</span>
                    <span className="block text-sm text-faint">{current.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial from ${t.name}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-gradient-to-r from-accent to-accent-alt" : "w-2 bg-border",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
