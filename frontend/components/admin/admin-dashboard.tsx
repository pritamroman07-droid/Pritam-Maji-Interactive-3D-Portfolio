"use client";

import { useState } from "react";
import {
  BarChart3,
  Inbox,
  Lock,
  LogOut,
  Mail,
  RefreshCw,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { api } from "@/lib/api";
import { formatDate, maskEmail } from "@/lib/utils";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

const TOKEN_KEY = "pm-admin-token";

export function AdminApp() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  });

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return token ? <Dashboard token={token} onLogout={handleLogout} /> : <Login onSuccess={setToken} />;
}

/* ── Login ─────────────────────────────────────────────────── */

function Login({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token } = await api.login(username, password);
      localStorage.setItem(TOKEN_KEY, token);
      onSuccess(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border/60 bg-white/80 px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:border-accent/60 dark:bg-surface/60";

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <form onSubmit={submit} className="glass w-full max-w-sm rounded-3xl p-8">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/25 to-accent-alt/25 text-accent shadow-glow">
          <Lock size={22} aria-hidden />
        </div>
        <h1 className="text-center font-display text-2xl font-bold">Admin Login</h1>
        <p className="mt-1 text-center text-sm text-muted">
          Restricted area — credentials live in the API&apos;s environment.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-user" className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted">
              <User size={12} aria-hidden />
              Username
            </label>
            <input
              id="admin-user"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="admin-pass" className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted">
              <Lock size={12} aria-hidden />
              Password
            </label>
            <input
              id="admin-pass"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className={inputClass}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-xl border border-red-400/30 bg-red-50 p-3 text-sm text-red-600 dark:bg-red-400/10 dark:text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl btn-primary py-3 font-semibold"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

/* ── Dashboard ──────────────────────────────────────────────── */

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = async () => {
    setLoaded(false);
    try {
      const data = await api.getMessages(token);
      setMessages(data.messages);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
      if (err instanceof Error && err.message.includes("token")) onLogout();
    } finally {
      setLoaded(true);
    }
  };

  if (!loaded) {
    load();
  }

  const remove = async (id: string) => {
    setDeleting(id);
    try {
      await api.deleteMessage(token, id);
      setMessages((m) => m.filter((x) => x.id !== id));
    } finally {
      setDeleting(null);
    }
  };

  const byDay = messages.reduce<Record<string, number>>((acc, m) => {
    const day = new Date(m.createdAt).toISOString().slice(0, 10);
    acc[day] = (acc[day] ?? 0) + 1;
    return acc;
  }, {});
  const days = Object.keys(byDay).sort().slice(-14);
  const maxDay = Math.max(1, ...Object.values(byDay));

  const cards = [
    { label: "Total Messages", value: messages.length, icon: Inbox, tint: "text-accent" },
    { label: "Last Day Activity", value: days.length ? byDay[days[days.length - 1]] : 0, icon: BarChart3, tint: "text-cyan-600 dark:text-cyan-300" },
    { label: "Session", value: "12h", icon: Lock, tint: "text-accent-alt" },
  ];

  return (
    <div>
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Admin Dashboard</p>
          <h1 className="mt-1 font-display text-4xl font-bold">Message Center</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={load}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm transition hover:border-accent/60"
          >
            <RefreshCw size={14} aria-hidden />
            Refresh
          </button>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm text-muted transition hover:border-red-400/60 hover:text-red-400"
          >
            <LogOut size={14} aria-hidden />
            Logout
          </button>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="glass rounded-2xl p-6">
            <card.icon size={18} className={card.tint} aria-hidden />
            <p className="mt-3 font-display text-3xl font-black text-gradient">{card.value}</p>
            <p className="mt-1 text-xs text-muted">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold">
            <Inbox size={18} className="text-accent" aria-hidden />
            Contact Messages
          </h2>

          {error && (
            <p className="mb-4 rounded-xl border border-red-400/30 bg-red-50 p-4 text-sm text-red-600 dark:bg-red-400/10 dark:text-red-300">
              {error}
            </p>
          )}

          {loaded && messages.length === 0 && (
            <div className="glass rounded-2xl p-10 text-center text-muted">
              No messages yet. Share the contact form and watch them arrive here.
            </div>
          )}

          <ul className="space-y-4">
            {messages.map((m) => (
              <li key={m.id} className="glass rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-bold">{m.subject}</h3>
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent">
                        {m.name}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted">
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
                    <span className="text-[10px] text-muted opacity-0 transition group-hover:opacity-100">
                      {byDay[day]}
                    </span>
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent-alt transition group-hover:brightness-125"
                      style={{ height: `${(byDay[day] / maxDay) * 100}%`, minHeight: byDay[day] > 0 ? 6 : 2 }}
                      title={`${day}: ${byDay[day]}`}
                    />
                    <span className="text-[9px] text-muted">{day.slice(5)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass mt-4 rounded-2xl p-6 text-sm text-muted">
            <Mail size={16} className="mb-2 text-accent" aria-hidden />
            <p className="leading-relaxed">
              Wire the API&apos;s <code className="rounded bg-border/40 px-1 font-mono text-xs">CONTACT_WEBHOOK_URL</code>{" "}
              env var to auto-forward submissions to Discord / Slack / Zapier.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted">
              <Users size={12} aria-hidden />
              Visitors counter lives in the API stats endpoint.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}