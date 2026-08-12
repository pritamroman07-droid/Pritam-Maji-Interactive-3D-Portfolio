"use client";

import { GraduationCap, Rocket, Target } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { stats, timeline } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="section relative">
      <div className="aurora aurora--blue right-0 top-0 h-72 w-72 opacity-20" aria-hidden />
      <div className="container-x">
        <SectionHeading
          eyebrow="About Me"
          title="Turning Ideas into Immersive Experiences"
          description="A Computer Science student who believes technology should feel magical — combining engineering precision with artistic vision."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-muted">
                I&apos;m <span className="font-semibold text-fg">Pritam Maji</span>, a full stack
                developer and creative designer from West Bengal, India. My journey started with a
                single line of code in a school computer lab — today I build{" "}
                <span className="text-accent">cinematic web experiences</span> powered by React,
                Next.js, Three.js and Node.js.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                I love living at the intersection of code and design — where performance meets
                aesthetics, and every scroll feels intentional. When I&apos;m not shipping projects,
                I&apos;m competing in hackathons, contributing to open source, or playing football.
              </p>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={0.15 + i * 0.08}>
                  <div className="glass rounded-2xl p-5 text-center transition hover:border-accent/50">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="font-display text-3xl font-black text-gradient"
                    />
                    <p className="mt-1 text-xs text-faint">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <Reveal direction="left">
              <div className="glass relative rounded-2xl p-6 sm:p-8">
                <h3 className="mb-6 flex items-center gap-2 font-display text-xl font-bold">
                  <GraduationCap size={20} className="text-accent" />
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

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border/50 p-4">
                    <Target size={16} className="mb-2 text-accent" />
                    <p className="text-sm font-semibold">Career Goal</p>
                    <p className="mt-1 text-xs text-muted">
                      Senior full stack engineer at a product-first company
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/50 p-4">
                    <Rocket size={16} className="mb-2 text-accent-alt" />
                    <p className="text-sm font-semibold">Current Focus</p>
                    <p className="mt-1 text-xs text-muted">
                      Advanced 3D web & scalable backend systems
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
