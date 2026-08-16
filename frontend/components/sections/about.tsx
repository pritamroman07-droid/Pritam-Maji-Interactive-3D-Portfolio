"use client";

import { motion } from "framer-motion";
import { Code2, Compass, GraduationCap, School, Wrench } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, timeline, type TimelineItem } from "@/lib/data";

const phaseIcons = [School, GraduationCap, Code2];

function TimelineMarker({ item, index }: { item: TimelineItem; index: number }) {
  if (item.phase === "current") {
    return (
      <span className="absolute -left-[32px] top-2 flex h-3 w-3 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-gradient-to-br from-accent to-accent-alt shadow-glow" />
      </span>
    );
  }

  const Icon = phaseIcons[index % phaseIcons.length];
  return (
    <span className="absolute -left-[41px] top-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-surface shadow-card transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
      <Icon size={14} className="text-accent" aria-hidden />
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="section relative">
      <div className="aurora aurora--blue right-0 top-0 h-72 w-72 opacity-20" aria-hidden />
      <div className="container-x">
        <SectionHeading
          eyebrow="About Me"
          title="A Developer Who Learns by Building"
          description="Computer Science student, curious programmer and builder of practical web applications."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="mb-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{paragraph}</p>
              </Reveal>
            ))}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {about.focusAreas.map((area, i) => (
                <Reveal key={area.title} delay={0.2 + i * 0.08}>
                  <div className="card-light h-full rounded-2xl p-5">
                    {i === 0 && <Compass size={18} className="mb-3 text-accent" aria-hidden />}
                    {i === 1 && <Wrench size={18} className="mb-3 text-accent" aria-hidden />}
                    {i === 2 && <GraduationCap size={18} className="mb-3 text-accent" aria-hidden />}
                    <h3 className="font-display text-sm font-bold">{area.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{area.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal direction="left" delay={0.15}>
            <div className="card-light relative rounded-2xl p-6 sm:p-8">
              <h3 className="mb-6 flex items-center gap-2 font-display text-xl font-bold">
                <GraduationCap size={20} className="text-accent" aria-hidden />
                My Journey
              </h3>
              <motion.ol
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative origin-top space-y-7 border-l border-border/60 pl-6"
              >
                {timeline.map((item, i) => (
                  <Reveal key={`${item.year}-${item.title}`} delay={0.1 + i * 0.1} className="relative">
                    <li className="group relative">
                      <TimelineMarker item={item} index={i} />

                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-accent">
                        <span>{item.year}</span>
                        {item.phase === "current" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" aria-hidden />
                            Current
                          </span>
                        )}
                      </div>

                      <h4 className="mt-1.5 font-display text-lg font-bold">{item.title}</h4>
                      <p className="mt-0.5 text-sm font-semibold text-fg/80">{item.subtitle}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>

                      {item.phrase && (
                        <p className="mt-3 font-display text-sm font-bold text-gradient">
                          {item.phrase}
                        </p>
                      )}
                    </li>
                  </Reveal>
                ))}
              </motion.ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}