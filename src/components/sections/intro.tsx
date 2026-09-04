import { StoryLines } from "@/components/story-lines";
import { story } from "@/content/story";

/** Opening chapter — who I am, what I build, what I'm looking for. */
export function Intro() {
  return (
    <StoryLines label="Introduction" density="chapter" lines={story.intro} />
  );
}
