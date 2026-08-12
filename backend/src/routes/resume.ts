import { Router } from "express";
import { achievements, certificates, creativeSkills, education, projects, skills } from "./content";

const router = Router();

router.get("/", (_req, res) => {
  const skillList = skills.map((s) => `- ${s.name}: ${s.description}`).join("\n");
  const creativeList = creativeSkills.map((s) => `- ${s.name}: ${s.description}`).join("\n");
  const work = projects.map((p) => `- ${p.title} (${p.category}):\n    ${p.description}\n    Tech: ${p.tech.join(", ")}`).join("\n");
  const edu = education.map((e) => `- ${e.title} — ${e.place} (${e.period})`).join("\n");
  const awards = achievements.map((a) => `- ${a.title} (${a.year})`).join("\n");
  const certs = certificates.map((c) => `- ${c.title} — ${c.issuer} (${c.year})`).join("\n");

  const resume = `PRITAM MAJI
============
Computer Science Student & Developer | Hooghly, West Bengal, India — 712416
pritamroman07@gmail.com | github.com/pritamroman07-droid

SUMMARY
-------
Diploma in Computer Science & Engineering student who loves building practical
web applications with C, C++, JavaScript and React.js, backed by MongoDB and
MySQL on the data side — learning through real projects.

SKILLS
------
Programming & Web Development
${skillList}

Creative
${creativeList}

EDUCATION
---------
${edu}

PROJECTS
--------
${work}

ACHIEVEMENTS
------------
${awards || "- None"}

CERTIFICATES
------------
${certs || "- None"}

REFERENCES
----------
Available upon request.

Generated from the portfolio API — content lives in src/routes/content.ts.
`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Content-Disposition", 'attachment; filename="Pritam-Maji-Resume.txt"');
  res.setHeader("Cache-Control", "public, max-age=3600");
  return res.send(resume);
});

export default router;