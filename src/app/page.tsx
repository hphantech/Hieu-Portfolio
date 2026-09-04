import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { WorkCarousel } from "@/components/sections/work-carousel";
import { StoryLines } from "@/components/story-lines";
import { story } from "@/content/story";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <Intro />
      <StoryLines
        label="About"
        density="bridge"
        lines={story.beforeAbout}
      />
      <About />
      <StoryLines
        label="Experience"
        density="bridge"
        lines={story.beforeExperience}
      />
      <Experience />
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
