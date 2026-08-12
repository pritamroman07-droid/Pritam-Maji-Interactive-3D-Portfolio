import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Hero, TechMarquee } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Contact />
    </>
  );
}