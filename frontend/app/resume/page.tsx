import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PrintButton } from "@/components/ui/print-button";
import { resumeDownloadUrl } from "@/lib/api";
import { achievements, certificates, education, projects, skills } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume — Pritam Maji",
  description: "Pritam Maji's resume — full stack developer and creative designer.",
};

export default function ResumePage() {
  const programming = skills.filter((s) => s.category === "Programming");
  const design = skills.filter((s) => s.category === "Design");

  return (
    <main className="container-x py-32 lg:py-36">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Resume</p>
          <h1 className="mt-1 font-display text-4xl font-bold">Curriculum Vitae</h1>
        </div>
        <div className="flex gap-3">
          <a
            href={resumeDownloadUrl}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-alt px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            <Download size={14} aria-hidden />
            Download
          </a>
          <PrintButton />
          </div>
        </div>

      <article className="glass mx-auto max-w-4xl rounded-3xl p-8 sm:p-12">
        <header className="border-b border-border/50 pb-8 text-center">
          <h2 className="font-display text-4xl font-black tracking-tight">{site.name}</h2>
          <p className="mt-2 font-display text-lg text-gradient">Full Stack Developer · Creative Designer</p>
          <p className="mt-2 text-sm text-muted">
            {site.email} · {site.location} · {site.url.replace(/^https?:\/\//, "")}
          </p>
        </header>

        <section className="mt-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Summary</h3>
          <p className="mt-3 leading-relaxed text-muted">
            Computer Science student crafting immersive, high-performance web experiences where
            engineering precision meets artistic vision. Experienced across the full stack with a
            strong eye for motion, typography and detail.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Skills</h3>
          <div className="mt-3 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold">Programming</p>
              <ul className="space-y-1.5">
                {programming.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 text-sm text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    <span className="w-32 shrink-0">{s.name}</span>
                    <span className="h-1 flex-1 overflow-hidden rounded-full bg-border/50">
                      <span className="block h-full rounded-full bg-gradient-to-r from-accent to-accent-alt" style={{ width: `${s.level}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Design</p>
              <ul className="space-y-1.5">
                {design.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 text-sm text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-alt" aria-hidden />
                    <span className="w-32 shrink-0">{s.name}</span>
                    <span className="h-1 flex-1 overflow-hidden rounded-full bg-border/50">
                      <span className="block h-full rounded-full bg-gradient-to-r from-accent to-accent-alt" style={{ width: `${s.level}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Education</h3>
          <div className="mt-3 space-y-4">
            {education.map((e) => (
              <div key={e.title} className="rounded-xl border border-border/50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-display font-bold">{e.title}</h4>
                  <span className="font-mono text-xs text-faint">{e.period}</span>
                </div>
                <p className="text-sm text-muted">{e.place}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Selected Projects</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {projects
              .filter((p) => p.featured)
              .map((p) => (
                <div key={p.id} className="rounded-xl border border-border/50 p-4">
                  <h4 className="font-display font-bold">{p.title}</h4>
                  <p className="text-xs text-accent">{p.tagline}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.description}</p>
                  <p className="mt-2 font-mono text-[11px] text-faint">{p.tech.join(" · ")}</p>
                </div>
              ))}
          </div>
        </section>

        <section className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Achievements</h3>
            <ul className="mt-3 space-y-3">
              {achievements.slice(0, 4).map((a) => (
                <li key={a.id} className="text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-fg">{a.title}</span> — {a.year}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Certificates</h3>
            <ul className="mt-3 space-y-3">
              {certificates.map((c) => (
                <li key={c.id} className="text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-fg">{c.title}</span> — {c.issuer}, {c.year}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </main>
  );
}