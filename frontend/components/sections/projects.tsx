"use client";

import { useState } from "react";
import { ExternalLink, Github, ListChecks } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { projects, type Project } from "@/lib/data";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section relative">
      <div className="aurora aurora--blue -left-24 top-1/3 h-80 w-80 opacity-20" aria-hidden />
      <div className="container-x">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've Built"
          description="Projects I've actually built — from AI billing to project management and e-commerce."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i * 0.08, 0.3)}>
              <TiltCard className="group h-full rounded-2xl" intensity={6}>
                <article className="glass flex h-full flex-col overflow-hidden rounded-2xl transition group-hover:border-accent/50">
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={`${project.title} — GitHub repository preview`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden />
                    <span className="absolute bottom-4 left-4 rounded-full glass px-3 py-1 text-[11px] font-medium text-fg dark:text-white">
                      {project.owner}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-display text-xl font-bold sm:text-2xl">{project.title}</h3>
                    <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border/50 pt-5">
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full btn-primary px-5 py-2.5 text-sm font-semibold"
                      >
                        <Github size={14} aria-hidden />
                        View on GitHub
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-accent/60"
                        >
                          <ExternalLink size={14} aria-hidden />
                          Live Demo
                        </a>
                      )}
                      <button
                        onClick={() => setSelected(project)}
                        aria-label={`Open details for ${project.title}`}
                        className="ml-auto rounded-full border border-border/60 p-2.5 text-muted transition hover:border-accent/60 hover:text-accent"
                      >
                        <ListChecks size={15} aria-hidden />
                      </button>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-muted">
            More experiments live on{" "}
            <a
              href="https://github.com/pritamroman07-droid"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-accent underline-offset-4 hover:underline"
            >
              my GitHub
            </a>
            .
          </p>
        </Reveal>
      </div>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} labelledBy="project-modal-title">
        {selected && (
          <div>
            <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-xl bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.image}
                alt={`${selected.title} — GitHub repository preview`}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 id="project-modal-title" className="font-display text-2xl font-bold">
              {selected.title}
            </h3>
            <p className="mt-1 font-medium text-accent">{selected.tagline}</p>
            <p className="mt-4 leading-relaxed text-muted">{selected.description}</p>

            <h4 className="mt-6 mb-3 flex items-center gap-2 font-display font-bold">
              <ListChecks size={16} className="text-accent" aria-hidden />
              Key Features
            </h4>
            <ul className="grid gap-2 sm:grid-cols-2">
              {selected.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {selected.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={selected.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full btn-primary px-5 py-2.5 text-sm font-semibold"
              >
                <Github size={14} aria-hidden />
                View Source Code
              </a>
              {selected.demo && (
                <a
                  href={selected.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold text-fg transition hover:border-accent/60"
                >
                  <ExternalLink size={14} aria-hidden />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}