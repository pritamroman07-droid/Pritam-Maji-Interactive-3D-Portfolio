"use client";

import { useMemo, useState } from "react";
import { Atom, Coffee, Database, GitBranch, Image, Palette, PenTool, Scissors, Server, Terminal, Video, Zap, Code2 } from "lucide-react";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/ui/tilt-card";
import { skills, type Skill } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  code: Code2,
  palette: Palette,
  atom: Atom,
  zap: Zap,
  server: Server,
  database: Database,
  git: GitBranch,
  coffee: Coffee,
  snake: Terminal,
  pen: PenTool,
  "pen-tool": PenTool,
  image: Image,
  video: Video,
  scissors: Scissors,
};

export function Skills() {
  const [filter, setFilter] = useState<"All" | Skill["category"]>("All");

  const visible = useMemo(
    () => (filter === "All" ? skills : skills.filter((s) => s.category === filter)),
    [filter],
  );

  return (
    <section id="skills" className="section relative">
      <div className="aurora aurora--purple -left-24 bottom-0 h-80 w-80 opacity-20" aria-hidden />
      <div className="container-x">
        <SectionHeading
          eyebrow="Skills"
          title="Arsenal of Abilities"
          description="A blend of engineering depth and design sensibility — measured honestly."
        />

        <Reveal className="mb-10 flex flex-wrap gap-3">
          {(["All", "Programming", "Design"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition",
                filter === f
                  ? "border-transparent bg-gradient-to-r from-accent to-accent-alt text-white shadow-glow"
                  : "border-border/60 text-muted hover:border-accent/60 hover:text-fg",
              )}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {visible.map((skill, i) => {
            const Icon = iconMap[skill.icon] ?? Code2;
            return (
              <Reveal key={skill.name} delay={Math.min(i * 0.04, 0.4)}>
                <TiltCard className="group h-full rounded-2xl">
                  <div className="glass flex h-full flex-col items-center gap-4 rounded-2xl p-6 transition group-hover:border-accent/50">
                    <Icon size={18} className="text-accent" aria-hidden />
                    <ProgressRing value={skill.level} label={skill.name} />
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          skill.category === "Programming" ? "bg-accent" : "bg-accent-alt",
                        )}
                      />
                      <span className="text-[10px] uppercase tracking-widest text-faint">
                        {skill.category}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
