"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Github, ListChecks, Search } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { projectCategories, projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Projects() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (q === "" ||
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))),
    );
  }, [category, query]);

  return (
    <section id="projects" className="section relative">
      <div className="aurora aurora--blue -left-24 top-1/3 h-80 w-80 opacity-20" aria-hidden />
      <div className="container-x">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've Built"
          description="A curated selection of work — from full stack platforms to immersive 3D experiences."
        />

        {/* Filters */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  category === c
                    ? "border-transparent bg-gradient-to-r from-accent to-accent-alt text-white shadow-glow"
                    : "border-border/60 text-muted hover:border-accent/60 hover:text-fg",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative lg:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tech…"
              aria-label="Search projects"
              className="w-full rounded-full border border-border/60 bg-surface/60 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-faint focus:border-accent/60"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i * 0.06, 0.3)}>
              <TiltCard className="group h-full rounded-2xl" intensity={8}>
                <article className="glass flex h-full flex-col overflow-hidden rounded-2xl transition group-hover:border-accent/50">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {project.featured && (
                      <span className="absolute left-4 top-4 rounded-full bg-accent/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                        Featured
                      </span>
                    )}
                    <span className="absolute bottom-4 left-4 rounded-full glass px-3 py-1 text-[11px] font-medium text-white">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold">{project.title}</h3>
                    <p className="mt-1 text-sm font-medium text-accent">{project.tagline}</p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
                      <button
                        onClick={() => setSelected(project)}
                        className="text-sm font-semibold text-accent transition hover:opacity-80"
                      >
                        View details →
                      </button>
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} on GitHub`}
                            className="rounded-full border border-border/60 p-2 text-muted transition hover:border-accent/60 hover:text-accent"
                          >
                            <Github size={14} aria-hidden />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} live demo`}
                            className="rounded-full border border-border/60 p-2 text-muted transition hover:border-accent/60 hover:text-accent"
                          >
                            <ExternalLink size={14} aria-hidden />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-10 text-center text-muted">No projects match your filters.</p>
        )}
      </div>

      {/* Detail modal */}
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} labelledBy="project-modal-title">
        {selected && (
          <div>
            <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selected.image} alt={selected.title} className="h-full w-full object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-accent/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                {selected.category}
              </span>
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

            <div className="mt-8 flex gap-3">
              {selected.github && (
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm font-semibold transition hover:border-accent/60"
                >
                  <Github size={14} aria-hidden />
                  Source Code
                </a>
              )}
              {selected.demo && (
                <a
                  href={selected.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-alt px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
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
