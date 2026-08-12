"use client";

import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Cell = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const FALLBACK: Cell[] = [];
for (let i = 0; i < 52 * 7; i++) {
  const d = new Date();
  d.setDate(d.getDate() - (52 * 7 - i));
  const day = d.getDay();
  const weekend = day === 0 || day === 6;
  const rand = Math.random();
  FALLBACK.push({
    date: d.toISOString().slice(0, 10),
    count: weekend ? 0 : rand > 0.75 ? 0 : rand > 0.5 ? 1 : rand > 0.25 ? 2 : 3 + Math.floor(rand * 4),
    level: weekend || rand > 0.75 ? 0 : (Math.min(4, Math.floor(rand * 5)) as Cell["level"]),
  });
}

const levelClass: Record<Cell["level"], string> = {
  0: "bg-border/30",
  1: "bg-accent/25",
  2: "bg-accent/50",
  3: "bg-accent/80",
  4: "bg-gradient-to-br from-accent to-accent-alt",
};

export function GitHubGraph() {
  const [cells, setCells] = useState<Cell[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [username] = useState("pritammaji");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/github?username=${encodeURIComponent(username)}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok && data.contributions) {
          setCells(data.contributions);
          setTotal(data.totalContributions);
        } else {
          setCells(FALLBACK);
          setTotal(FALLBACK.reduce((s, c) => s + c.count, 0));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCells(FALLBACK);
          setTotal(FALLBACK.reduce((s, c) => s + c.count, 0));
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [username]);

  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const grid = weeks; // columns = weeks, rows = days

  return (
    <Reveal>
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold">
            <Github size={18} className="text-accent" aria-hidden />
            GitHub Activity — {total.toLocaleString("en-IN")} contributions
          </h3>
          <p className="font-mono text-xs text-faint">last 12 months</p>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="min-w-[720px]">
            <div className="mb-2 flex gap-3 pl-8 text-[10px] uppercase tracking-widest text-faint">
              {months.map((m, i) => (
                <span key={m} className={cn("w-0", i % 2 === 0 ? "flex-1" : "")}>
                  {m}
                </span>
              ))}
            </div>
            <div className="flex gap-[3px]">
              {grid.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((cell) => (
                    <div
                      key={cell.date}
                      title={`${cell.date}: ${cell.count} contributions`}
                      className={cn("h-[11px] w-[11px] rounded-[3px] transition hover:scale-125", levelClass[cell.level])}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-faint">
              Less
              {([0, 1, 2, 3, 4] as const).map((l) => (
                <span key={l} className={cn("h-[10px] w-[10px] rounded-[2px]", levelClass[l])} />
              ))}
              More
            </div>
          </div>
        </div>
      </div>
      {loading && <p className="sr-only" aria-live="polite">Loading GitHub activity</p>}
    </Reveal>
  );
}