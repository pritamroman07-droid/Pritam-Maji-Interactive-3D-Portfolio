"use client";

import { useState } from "react";
import { BarChart3, Inbox, Mail, RefreshCw, Trash2, Users } from "lucide-react";
import { formatDate, maskEmail } from "@/lib/utils";
import type { ContactMessage } from "@/lib/db";

export function AdminDashboard({ initialStats }: { initialStats: { visitors: number; messages: number } }) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/admin/api/messages");
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to load");
      setMessages(data.messages);
      setLoaded(true);
    } catch {
      setError("Could not load messages. Check the admin credentials.");
      setLoaded(true);
    }
  };

  const remove = async (id: string) => {
    setDeleting(id);
    try {
      await fetch(`/admin/api/messages?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      setMessages((m) => m.filter((x) => x.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  if (!loaded) {
    load();
  }

  const byDay = messages.reduce<Record<string, number>>((acc, m) => {
    const day = new Date(m.createdAt).toISOString().slice(0, 10);
    acc[day] = (acc[day] ?? 0) + 1;
    return acc;
  }, {});
  const days = Object.keys(byDay).sort().slice(-14);
  const maxDay = Math.max(1, ...Object.values(byDay));

  const cards = [
    { label: "Total Messages", value: messages.length, icon: Inbox, tint: "text-accent" },
    { label: "Visitors", value: initialStats.visitors, icon: Users, tint: "text-accent-alt" },
    { label: "Last Day Activity", value: days.length ? byDay[days[days.length - 1]] : 0, icon: BarChart3, tint: "text-cyan-300" },
  ];

  return (
    <div className="container-x py-32">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Admin Dashboard</p>
          <h1 className="mt-1 font-display text-4xl font-bold">Message Center</h1>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm transition hover:border-accent/60"
        >
          <RefreshCw size={14} aria-hidden />
          Refresh
        </button>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="glass rounded-2xl p-6">
            <card.icon size={18} className={card.tint} aria-hidden />
            <p className="mt-3 font-display text-3xl font-black text-gradient">{card.value}</p>
            <p className="mt-1 text-xs text-faint">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold">
            <Inbox size={18} className="text-accent" aria-hidden />
            Contact Messages
          </h2>

          {error && <p className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">{error}</p>}

          {loaded && messages.length === 0 && (
            <div className="glass rounded-2xl p-10 text-center text-muted">
              No messages yet. Share the contact form and watch them arrive here.
            </div>
          )}

          <ul className="space-y-4">
            {messages.map((m) => (
              <li key={m.id} className="glass group rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-bold">{m.subject}</h3>
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">
                        {m.name}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-faint">
                      {maskEmail(m.email)} · {formatDate(m.createdAt)}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{m.message}</p>
                  </div>
                  <button
                    onClick={() => remove(m.id)}
                    disabled={deleting === m.id}
                    aria-label={`Delete message from ${m.name}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted transition hover:border-red-400/60 hover:text-red-400 disabled:opacity-50"
                  >
                    <Trash2 size={14} aria-hidden />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold">
            <BarChart3 size={18} className="text-accent" aria-hidden />
            Inbound Volume
          </h2>
          <div className="glass rounded-2xl p-6">
            {days.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted">No data yet.</p>
            ) : (
              <div className="flex h-44 items-end gap-2">
                {days.map((day) => (
                  <div key={day} className="group flex flex-1 flex-col items-center gap-1">
                    <span className="text-[10px] text-faint opacity-0 transition group-hover:opacity-100">
                      {byDay[day]}
                    </span>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent-alt transition group-hover:brightness-125"
                      style={{ height: `${(byDay[day] / maxDay) * 100}%`, minHeight: byDay[day] > 0 ? 6 : 2 }}
                      title={`${day}: ${byDay[day]}`}
                    />
                    <span className="text-[9px] text-faint">{day.slice(5)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass mt-4 rounded-2xl p-6 text-sm text-muted">
            <Mail size={16} className="mb-2 text-accent" aria-hidden />
            <p className="leading-relaxed">
              Tip: reply directly to{" "}
              <a className="text-accent underline-offset-2 hover:underline" href="mailto:">
                messages
              </a>{" "}
              from your own mailbox — or wire the{" "}
              <code className="rounded bg-border/40 px-1 font-mono text-xs">CONTACT_WEBHOOK_URL</code>{" "}
              env var to auto-forward submissions to Discord / Slack / Zapier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}