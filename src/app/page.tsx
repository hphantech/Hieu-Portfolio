import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { WorkPreview } from "@/components/sections/work-preview";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <WorkPreview />
      <Contact />
    </main>
  );
}
