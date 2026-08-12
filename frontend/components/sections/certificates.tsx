"use client";

import { BadgeCheck, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { certificates } from "@/lib/data";

export function Certificates() {
  return (
    <section id="certificates" className="section relative">
      <div className="aurora aurora--cyan -right-24 top-1/4 h-72 w-72 opacity-20" aria-hidden />
      <div className="container-x">
        <SectionHeading
          eyebrow="Certificates"
          title="Proof of Continuous Growth"
          description="Credentials earned along the way — always hungry for more."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <Reveal key={cert.id} delay={Math.min(i * 0.06, 0.3)}>
              <TiltCard className="group h-full rounded-2xl" intensity={7}>
                <article className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition group-hover:border-accent/50">
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100">
                      <BadgeCheck size={32} className="text-accent" aria-hidden />
                    </span>
                  </div>
                  <h3 className="font-display font-bold leading-snug">{cert.title}</h3>
                  <p className="mt-1 flex items-center justify-between text-sm text-muted">
                    <span>{cert.issuer}</span>
                    <span className="font-mono text-xs text-faint">{cert.year}</span>
                  </p>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition hover:opacity-80"
                    >
                      Verify credential
                      <ExternalLink size={11} aria-hidden />
                    </a>
                  )}
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
