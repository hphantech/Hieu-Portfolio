import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Skills } from "@/components/sections/skills";
import { WorkCarousel } from "@/components/sections/work-carousel";
import { FlyTextBeat } from "@/components/motion/fly-text-beat";
import { flyPresets } from "@/components/motion/fly-text";
import { ScatterAssemble } from "@/components/scatter-assemble";
import { SplitWordHeadline } from "@/components/split-word-headline";
import { StoryLines } from "@/components/story-lines";
import { story } from "@/content/story";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <Intro />
      <ScatterAssemble text={story.beforeExperience[0]} />
      <Experience />
      <Skills />
      <FlyTextBeat
        label="More work"
        density="solo"
        text={story.beforeMoreWork[0]}
        preset={flyPresets.breeze}
      />
      <WorkCarousel />
      <SplitWordHeadline>
        {story.beforeAbout}
        <sup>↓</sup>
      </SplitWordHeadline>
      <About />
      <StoryLines
        label="Get in touch"
        density="bridge"
        lines={story.beforeContact}
      />
      <Contact />
    </main>
  );
}
