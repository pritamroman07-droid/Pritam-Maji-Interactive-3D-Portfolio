"use client";

import { motion } from "framer-motion";
import { Code2, Compass, GraduationCap, Rocket, School, Target, Wrench } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, timeline, type TimelineItem } from "@/lib/data";

const phaseIcons = [School, GraduationCap, Code2, Rocket, Target];

function TimelineMarker({ item, index }: { item: TimelineItem; index: number }) {
  if (item.phase === "current") {
    return (
      <span className="absolute -left-[32px] top-2 flex h-3 w-3 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-gradient-to-br from-accent to-accent-alt shadow-glow" />
      </span>
    );
  }

  const Icon = phaseIcons[index % phaseIcons.length];
  return (
    <span className="absolute -left-[41px] top-1 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-surface shadow-glow transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
      <Icon
        size={14}
        className={item.phase === "future" ? "text-accent-alt" : "text-accent"}
        aria-hidden
      />
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
                <p className="mb-4 max-w-2xl text-lg leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {about.focusAreas.map((area, i) => (
                <Reveal key={area.title} delay={0.2 + i * 0.08}>
                  <div className="glass h-full rounded-2xl p-5 transition hover:border-accent/50">
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
            <div className="glass relative rounded-2xl p-6 sm:p-8">
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
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden />
                            Current
                          </span>
                        )}
                        {item.phase === "future" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-alt/40 bg-accent-alt/10 px-2 py-0.5 text-[10px] font-medium text-accent-alt">
                            <Target size={10} aria-hidden />
                            Future Goal
                          </span>
                        )}
                      </div>

                      <h4
                        className={
                          item.phase === "future"
                            ? "mt-1.5 font-display text-lg font-bold text-accent-alt"
                            : "mt-1.5 font-display text-lg font-bold"
                        }
                      >
                        {item.title}
                      </h4>
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