import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PrintButton } from "@/components/ui/print-button";
import { resumeDownloadUrl } from "@/lib/api";
import { creativeSkills, education, projects, skills } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume — Pritam Maji",
  description: "Pritam Maji's resume — Computer Science student and developer.",
};

export default function ResumePage() {
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
            className="inline-flex items-center gap-2 rounded-full btn-primary px-5 py-2.5 text-sm font-semibold"
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
          <p className="mt-2 font-display text-lg text-gradient">
            Computer Science Student & Developer
          </p>
          <p className="mt-2 text-sm text-muted">
            {site.email} · {site.location}
          </p>
          <p className="mt-1 text-sm text-muted">
            <a href={site.github} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">
              {site.githubUsername}
            </a>{" "}
            on GitHub
          </p>
        </header>

        <section className="mt-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Summary</h3>
          <p className="mt-3 leading-relaxed text-muted">
            Diploma in Computer Science & Engineering student who loves building practical web
            applications. Working with C, C++, JavaScript and React.js, with MongoDB and MySQL on
            the data side — learning through real projects rather than just courses.
          </p>
        </section>

        <section className="mt-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Skills</h3>
          <div className="mt-3 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-semibold">Programming & Web Development</p>
              <ul className="space-y-1.5">
                {skills.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 text-sm text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    <span className="w-24 shrink-0 text-fg">{s.name}</span>
                    <span className="text-faint">{s.description}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">Creative</p>
              <ul className="space-y-1.5">
                {creativeSkills.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 text-sm text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-alt" aria-hidden />
                    <span className="w-24 shrink-0 text-fg">{s.name}</span>
                    <span className="text-faint">{s.description}</span>
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
                  <span className="font-mono text-xs text-muted">{e.period}</span>
                </div>
                <p className="text-sm text-muted">{e.place}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Projects</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <div key={p.id} className="rounded-xl border border-border/50 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display font-bold">{p.title}</h4>
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-accent underline-offset-4 hover:underline"
                    >
                      demo ↗
                    </a>
                  )}
                </div>
                <p className="text-xs text-accent">{p.tagline}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.description}</p>
                <p className="mt-2 font-mono text-[11px] text-muted">{p.tech.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}