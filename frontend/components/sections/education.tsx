"use client";

import { BookOpen, Flag, GraduationCap, Library } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { education } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Education"
          title="Studying, Building, Improving"
          description="Where I'm learning the fundamentals — and what I'm working towards."
        />

        <div className="mx-auto max-w-3xl">
          {education.map((item) => (
            <Reveal key={item.title}>
              <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-10">
                <div className="aurora aurora--blue -right-20 -top-20 h-56 w-56 opacity-25" aria-hidden />

                <div className="relative">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-accent">
                        <GraduationCap size={14} aria-hidden />
                        {item.period}
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold leading-snug sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{item.place}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      <BookOpen size={12} aria-hidden />
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl leading-relaxed text-muted">{item.description}</p>

                  <p className="mt-8 mb-3 flex items-center gap-2 font-display text-sm font-bold">
                    <Library size={15} className="text-accent" aria-hidden />
                    Key Subjects
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {item.subjects.map((subject) => (
                      <li key={subject} className="chip">
                        {subject}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 rounded-xl border border-accent-alt/25 bg-accent-alt/5 p-4">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent-alt">
                      <Flag size={12} aria-hidden />
                      Building Towards
                    </p>
                    <ul className="space-y-1.5">
                      {item.goals.map((goal) => (
                        <li key={goal} className="text-sm text-muted">
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}