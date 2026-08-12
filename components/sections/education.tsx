"use client";

import { Award, BookOpen, CheckCircle2, Flag, GraduationCap, Library } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { education } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Education() {
  return (
    <section id="education" className="section relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="Education"
          title="Learning is a Lifelong Design"
          description="Foundations, milestones and the road ahead."
        />

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-accent via-accent-alt to-transparent sm:left-1/2" aria-hidden />

          {education.map((item, i) => (
            <div
              key={item.title}
              className={cn("relative mb-14 pl-16 sm:w-1/2 sm:pl-0", i % 2 === 0 ? "sm:pr-14 sm:text-right" : "sm:ml-auto sm:pl-14")}
            >
              <span
                className={cn(
                  "absolute left-5 top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:left-auto",
                  i % 2 === 0 ? "sm:right-0 sm:translate-x-1/2" : "sm:left-0 sm:-translate-x-1/2",
                )}
              >
                <span className="absolute h-4 w-4 rounded-full bg-accent/30 animate-ping" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-accent to-accent-alt" />
              </span>

              <Reveal direction={i % 2 === 0 ? "left" : "right"}>
                <div className="glass group rounded-2xl p-6 transition hover:border-accent/50">
                  <div className={cn("flex items-center gap-2 text-xs font-mono text-accent", i % 2 === 0 && "sm:justify-end")}>
                    <GraduationCap size={14} aria-hidden />
                    {item.period}
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.place}</p>
                  <p className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">
                    <BookOpen size={12} aria-hidden />
                    {item.semester}
                  </p>

                  <div className="mt-4">
                    <div className="mb-1.5 flex items-center justify-between text-xs text-faint">
                      <span>Overall Progress</span>
                      <span className="font-mono text-accent">{item.progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-border/50">
                      <Reveal className="h-full rounded-full bg-gradient-to-r from-accent to-accent-alt">
                        <div style={{ width: `${item.progress}%` }} className="h-full" />
                      </Reveal>
                    </div>
                  </div>

                  <ul className={cn("mt-4 flex flex-wrap gap-2", i % 2 === 0 && "sm:justify-end")}>
                    {item.subjects.map((subject) => (
                      <li key={subject} className="chip">
                        <Library size={11} aria-hidden />
                        {subject}
                      </li>
                    ))}
                  </ul>

                  {item.achievements.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {item.achievements.map((a) => (
                        <li key={a} className={cn("flex items-center gap-2 text-sm text-muted", i % 2 === 0 && "sm:flex-row-reverse")}>
                          <CheckCircle2 size={14} className="shrink-0 text-emerald-400" aria-hidden />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.goals.length > 0 && (
                    <div className="mt-4 rounded-xl border border-accent-alt/25 bg-accent-alt/5 p-3">
                      <p className={cn("mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent-alt", i % 2 === 0 && "sm:flex-row-reverse sm:justify-end")}>
                        <Flag size={12} aria-hidden />
                        Future Goals
                      </p>
                      <ul className={cn("space-y-1", i % 2 === 0 && "sm:space-y-1")}>
                        {item.goals.map((g) => (
                          <li key={g} className="text-xs text-muted">
                            {g}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          ))}

          <div className="relative flex justify-center pt-2">
            <div className="glass flex items-center gap-3 rounded-full px-6 py-3 text-sm">
              <Award size={16} className="text-accent" aria-hidden />
              <span className="text-muted">Committed to learning one thing every single day.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
