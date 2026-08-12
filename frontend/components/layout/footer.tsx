"use client";

import { Github, Instagram, Linkedin, Mail, MapPin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const socialIcons = [
  { href: site.socials.github, icon: Github, label: "GitHub" },
  { href: site.socials.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: site.socials.instagram, icon: Instagram, label: "Instagram" },
  { href: site.socials.x, icon: Twitter, label: "X" },
  { href: site.socials.youtube, icon: Youtube, label: "YouTube" },
];

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
      fetch("/api/visitor", { method: "POST" })
        .then((r) => r.json())
        .then((d) => setVisitors(d.visitors))
        .catch(() => {});
      try {
        localStorage.setItem("pm-visitor", "1");
      } catch {
        /* ignore */
      }
    } else {
      fetch("/api/visitor")
        .then((r) => r.json())
        .then((d) => setVisitors(d.visitors))
        .catch(() => {});
    }
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      <div className="aurora aurora--purple -bottom-32 left-1/4 h-72 w-72" />
      <div className="container-x relative py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold">
              Pritam<span className="text-accent">.</span>Maji
            </p>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">
              Full stack developer & creative designer crafting immersive digital experiences
              where code meets art.
            </p>
            <div className="mt-6 flex gap-3">
              {socialIcons.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="rounded-full border border-border/60 p-2.5 text-muted transition hover:-translate-y-1 hover:border-accent/60 hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-faint">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.slice(0, 8).map((link) => (
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
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-faint">
              Connect
            </p>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-accent" />
                <a href={`mailto:${site.email}`} className="transition hover:text-fg">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-accent" />
                {site.location}
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulseglow" />
                Available for freelance work
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} {site.name}. Crafted with Next.js, Three.js & a lot of
            coffee.
          </p>
          <p className={cn("font-mono text-xs text-faint")}>
            {visitors !== null
              ? `${visitors.toLocaleString("en-IN")} visitors`
              : "tracking visitors…"}
            <span className="mx-2 text-border">|</span>
            <span className="text-accent">Open to work</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
