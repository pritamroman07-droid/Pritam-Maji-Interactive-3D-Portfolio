"use client";

import { Github, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Footer() {
  const [visitors, setVisitors] = useState<number | null>(null);

  useEffect(() => {
    let counted = false;
    try {
      counted = localStorage.getItem("pm-visitor") === "1";
    } catch {
      /* ignore */
    }
    if (!counted) {
      api
        .incrementVisitors()
        .then((d) => setVisitors(d.visitors))
        .catch(() => {});
      try {
        localStorage.setItem("pm-visitor", "1");
      } catch {
        /* ignore */
      }
    } else {
      api
        .getVisitors()
        .then((d) => setVisitors(d.visitors))
        .catch(() => {});
    }
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      <div className="aurora aurora--purple -bottom-32 left-1/4 h-72 w-72" aria-hidden />
      <div className="container-x relative py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold">
              Pritam Maji
            </p>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">
              Computer Science student and developer — building real-world web applications and
              learning something new every day.
            </p>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2.5 text-sm text-muted transition hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
            >
              <Github size={16} aria-hidden />
              @{site.githubUsername}
            </a>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">Navigate</p>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">Get in touch</p>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-accent" aria-hidden />
                <a href={`mailto:${site.email}`} className="transition hover:text-fg">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0 text-accent" aria-hidden />
                {site.locationShort}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted">© 2026 Pritam Maji. All rights reserved.</p>
          <p className={cn("font-mono text-xs text-muted")}>
            {visitors !== null
              ? `${visitors.toLocaleString("en-IN")} visitors`
              : "tracking visitors…"}
          </p>
        </div>
      </div>
    </footer>
  );
}