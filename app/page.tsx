import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Certificates } from "@/components/sections/certificates";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Gallery } from "@/components/sections/gallery";
import { GitHubGraph } from "@/components/sections/github-graph";
import { Hero, TechMarquee } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <About />
      <Skills />
      <Achievements />
      <Education />
      <Projects />
      <Gallery />
      <Certificates />
      <Testimonials />
      <div className="container-x py-24">
        <GitHubGraph />
      </div>
      <Contact />
    </>
  );
}