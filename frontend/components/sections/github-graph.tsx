"use client";

import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { api } from "@/lib/api";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Cell = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const levelClass: Record<Cell["level"], string> = {
  0: "bg-border/30",
  1: "bg-accent/25",
  2: "bg-accent/50",
  3: "bg-accent/80",
  4: "bg-gradient-to-br from-accent to-accent-alt",
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function GitHubGraph() {
  const [cells, setCells] = useState<Cell[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [unavailable, setUnavailable] = useState(false);
  const [username] = useState(site.githubUsername);

  useEffect(() => {
    let cancelled = false;
    api
      .getGithubContributions(username)
      .then((data) => {
        if (cancelled) return;
        setCells(data.contributions);
        setTotal(data.totalContributions);
      })
      .catch(() => {
        if (!cancelled) setUnavailable(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <Reveal>
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold">
            <Github size={18} className="text-accent" aria-hidden />
            GitHub Activity
            {total > 0 && <span className="text-muted">— {total.toLocaleString("en-IN")} contributions</span>}
          </h3>
          {!loading && !unavailable && (
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-accent underline-offset-4 hover:underline"
            >
              @{username}
            </a>
          )}
        </div>

        {unavailable ? (
          <div className="rounded-xl border border-border/50 p-8 text-center">
            <p className="text-sm text-muted">
              GitHub activity is unavailable right now — the API needs a{" "}
              <code className="rounded bg-border/40 px-1 font-mono text-xs">GITHUB_TOKEN</code>{" "}
              configured on the backend to fetch it.
            </p>
          </div>
        ) : loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-10 w-10 animate-spin-slow rounded-full border-2 border-border border-t-accent" role="status">
              <span className="sr-only">Loading GitHub activity</span>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[720px]">
              <div className="mb-2 flex gap-3 pl-8 text-[10px] uppercase tracking-widest text-muted">
                {months.map((m, i) => (
                  <span key={m} className={cn("w-0", i % 2 === 0 ? "flex-1" : "")}>
                    {m}
                  </span>
                ))}
              </div>
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((cell) => (
                      <div
                        key={cell.date}
                        title={`${cell.date}: ${cell.count} contributions`}
                        role="img"
                        aria-label={`${cell.date}: ${cell.count} contributions`}
                        className={cn(
                          "h-[11px] w-[11px] rounded-[3px] transition hover:scale-125",
                          levelClass[cell.level],
                        )}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted">
                Less
                {([0, 1, 2, 3, 4] as const).map((l) => (
                  <span key={l} className={cn("h-[10px] w-[10px] rounded-[2px]", levelClass[l])} aria-hidden />
                ))}
                More
              </div>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
}