"use client";

import { Atom, BookOpen, Braces, Code2, Database, GraduationCap, Library, Network, Sigma } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { education } from "@/lib/data";

const subjectIcons: Record<string, typeof Code2> = {
  "Software Engineering": Code2,
  Physics: Atom,
  Chemistry: Library,
  Mathematics: Sigma,
  "Object-Oriented Programming in C++": Braces,
  "Data Structures": Network,
  "Database Management": Database,
};

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
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-950">
                      <BookOpen size={12} aria-hidden />
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl leading-relaxed text-muted">{item.description}</p>

                  <p className="mt-8 mb-3 flex items-center gap-2 font-display text-sm font-bold">
                    <Library size={15} className="text-accent" aria-hidden />
                    Subjects & Areas of Study
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {item.subjects.map((subject) => {
                      const Icon = subjectIcons[subject] ?? BookOpen;
                      return (
                        <Reveal key={subject} delay={0.1}>
                          <div className="glass flex h-full items-center gap-3 rounded-xl px-4 py-3.5 transition hover:border-accent/50">
                            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/25 via-accent-alt/20 to-violet-500/25 text-white ring-1 ring-accent/20">
                              <Icon size={16} aria-hidden />
                            </span>
                            <p className="text-sm font-semibold leading-snug">{subject}</p>
                          </div>
                        </Reveal>
                      );
                    })}
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