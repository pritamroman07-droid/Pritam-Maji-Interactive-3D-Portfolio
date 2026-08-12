"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm(initialForm);
      }, 4000);
    } catch {
      setStatus("error");
      setError("Network error — is your connection alive?");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border/60 bg-surface/60 px-4 py-3 text-sm outline-none transition placeholder:text-faint focus:border-accent/60";

  return (
    <section id="contact" className="section relative">
      <div className="aurora aurora--blue -left-24 bottom-0 h-80 w-80 opacity-20" aria-hidden />
      <div className="aurora aurora--purple right-0 top-0 h-80 w-80 opacity-20" aria-hidden />
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Create Something Together"
          description="Have a project in mind, a role to fill, or just want to say hi? My inbox is always open."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-5">
            <Reveal>
              <div className="glass rounded-2xl p-6 transition hover:border-accent/50">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Mail size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs text-faint">Email</p>
                    <a href={`mailto:${site.email}`} className="font-medium transition hover:text-accent">
                      {site.email}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6 transition hover:border-accent/50">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-alt/15 text-accent-alt">
                    <MapPin size={18} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs text-faint">Location</p>
                    <p className="font-medium">{site.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="glass relative overflow-hidden rounded-2xl p-6">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-faint">Availability</p>
                <p className="mt-2 font-display text-2xl font-bold text-gradient">Open for freelance</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Currently accepting projects, internships and collaborations starting this month.
                </p>
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-2xl" aria-hidden />
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
                    Message sent! I&apos;ll get back to you within 24 hours.
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
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-alt px-6 py-3.5 font-semibold text-white shadow-glow transition hover:shadow-glow-lg disabled:opacity-60 sm:w-auto"
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