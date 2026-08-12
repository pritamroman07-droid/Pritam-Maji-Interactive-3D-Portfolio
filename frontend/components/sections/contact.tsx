"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { api } from "@/lib/api";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const initialForm = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const set = (key: keyof typeof initialForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await api.sendContact(form);
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm(initialForm);
      }, 4000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border/60 bg-surface/60 px-4 py-3 text-sm text-fg outline-none transition placeholder:text-muted focus:border-accent/60";

  return (
    <section id="contact" className="section relative">
      <div className="aurora aurora--blue -left-24 bottom-0 h-80 w-80 opacity-20" aria-hidden />
      <div className="aurora aurora--purple right-0 top-0 h-80 w-80 opacity-20" aria-hidden />
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Talk"
          description="Have a project idea, an internship opportunity, or just want to connect? My inbox is open."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-5">
            <Reveal>
              <div className="glass rounded-2xl p-6 transition hover:border-accent/50">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Mail size={18} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted">Email</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="block truncate font-medium transition hover:text-accent"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6 transition hover:border-accent/50">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-alt/15 text-accent-alt">
                    <MapPin size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs text-muted">Location</p>
                    <p className="font-medium">{site.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="glass relative overflow-hidden rounded-2xl p-6">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">A little note</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  I&apos;m a student, so I may not reply instantly — but I do read every message and
                  respond as soon as I can.
                </p>
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-2xl" aria-hidden />
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="glass flex items-center gap-3 rounded-2xl p-6 transition hover:border-accent/50">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden>
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-muted">GitHub</p>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noreferrer"
                    className="block truncate font-medium transition hover:text-accent"
                  >
                    {site.githubUsername}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.15}>
            <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-muted">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    required
                    minLength={2}
                    maxLength={80}
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-muted">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-medium text-muted">
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  required
                  minLength={3}
                  maxLength={120}
                  value={form.subject}
                  onChange={set("subject")}
                  placeholder="What's this about?"
                  className={inputClass}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-muted">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell me about your project…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 flex items-center gap-2 text-sm font-medium text-emerald-400"
                    role="status"
                  >
                    <CheckCircle2 size={16} aria-hidden />
                    Message sent! I&apos;ll get back to you soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-sm font-medium text-red-400"
                    role="alert"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileTap={{ scale: 0.97 }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl btn-primary px-6 py-3.5 font-semibold disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} aria-hidden />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}