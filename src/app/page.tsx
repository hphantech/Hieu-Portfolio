import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { WorkCarousel } from "@/components/sections/work-carousel";
import { WorkPreview } from "@/components/sections/work-preview";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <Intro />
      <WorkPreview />
      <WorkCarousel />
      <Contact />
    </main>
  );
}
