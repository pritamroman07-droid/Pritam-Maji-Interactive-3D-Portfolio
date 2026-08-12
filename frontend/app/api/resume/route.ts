import { NextResponse } from "next/server";
import { projects, skills, education, achievements, certificates } from "@/lib/data";
import { site } from "@/lib/site";

export async function GET() {
  const work = projects
    .map(
      (p) =>
        `- ${p.title} (${p.category}): ${p.description}`,
    )
    .join("\n");

  const skillList = skills.map((s) => `${s.name} (${s.level}%)`).join(", ");
  const edu = education
    .map((e) => `- ${e.title} — ${e.place} (${e.period})`)
    .join("\n");
  const awards = achievements
    .map((a) => `- ${a.title} (${a.year})`)
    .join("\n");
  const certs = certificates
    .map((c) => `- ${c.title} — ${c.issuer} (${c.year})`)
    .join("\n");

  const resume = `PRITAM MAJI
============
Full Stack Developer & Creative Designer | ${site.location}
${site.email} | ${site.url}

SUMMARY
-------
Computer Science student passionate about building immersive, high-performance web
experiences where engineering meets design.

SKILLS
------
${skillList}

EXPERIENCE
----------
- Freelance Full Stack Developer (2024 — Present)
  Designed and shipped websites, dashboards and brand identities for small businesses.
- Institute Hackathon Champion (2025)
  Led a 4-person team to build an AI-powered campus assistant in 24 hours.

EDUCATION
---------
${edu}

PROJECTS
--------
${work}

ACHIEVEMENTS
------------
${awards}

CERTIFICATES
------------
${certs}

REFERENCES
----------
Available upon request.

Generated from www.pritammaji.dev — updated automatically.
`;

  return new NextResponse(resume, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Pritam-Maji-Resume.txt"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}