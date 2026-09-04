import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { WorkCarousel } from "@/components/sections/work-carousel";
import { WorkPreview } from "@/components/sections/work-preview";
import { StoryLines } from "@/components/story-lines";
import { story } from "@/content/story";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <Intro />
      <StoryLines
        label="Featured work"
        density="bridge"
        lines={story.beforeWork}
      />
      <WorkPreview />
      <StoryLines
        label="More work"
        density="bridge"
        lines={story.beforeMoreWork}
      />
      <WorkCarousel />
      <StoryLines
        label="Get in touch"
        density="bridge"
        lines={story.beforeContact}
      />
      <Contact />
    </main>
  );
}
