"use client";

import { Compass, GraduationCap, Wrench } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, timeline } from "@/lib/data";

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
                <p className="mb-4 text-lg leading-relaxed text-muted">{paragraph}</p>
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
              <ol className="relative space-y-6 border-l border-border/60 pl-6">
                {timeline.map((item, i) => (
                  <Reveal key={item.year} delay={0.1 + i * 0.1} className="relative">
                    <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-gradient-to-br from-accent to-accent-alt shadow-glow" />
                    <p className="font-mono text-xs text-accent">{item.year}</p>
                    <h4 className="mt-1 font-display font-bold">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}