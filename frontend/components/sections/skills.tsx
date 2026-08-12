"use client";

import { Atom, Code2, Database, Palette, Scissors, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { creativeSkills, skills } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  palette: Palette,
  atom: Atom,
  database: Database,
  scissors: Scissors,
};

function SkillCard({ name, description, icon, delay }: { name: string; description: string; icon: string; delay: number }) {
  const Icon = iconMap[icon] ?? Code2;
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group glass flex h-full flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-glow">
        <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent transition duration-300 group-hover:scale-110">
          <Icon size={20} aria-hidden />
        </span>
        <h3 className="font-display text-lg font-bold">{name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </Reveal>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section relative">
      <div className="aurora aurora--purple -left-24 bottom-0 h-80 w-80 opacity-20" aria-hidden />
      <div className="container-x">
        <SectionHeading
          eyebrow="Skills"
          title="What I Work With"
          description="The technologies I use to learn, experiment and build — growing steadily, one project at a time."
        />

        <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          Programming & Web Development
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              description={skill.description}
              icon={skill.icon}
              delay={Math.min(i * 0.05, 0.3)}
            />
          ))}
        </div>

        <h3 className="mb-5 mt-14 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          Creative
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {creativeSkills.map((skill, i) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              description={skill.description}
              icon={skill.icon}
              delay={0.1 + i * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}