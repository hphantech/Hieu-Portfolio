import type { CSSProperties } from "react";

import { experiences } from "@/content/experience";
import { cn } from "@/lib/utils";

import { ExperienceSlideshow } from "./experience-slideshow";
import styles from "./work-stack.module.css";

const TONE_CLASSES = [
  styles.itemToneA,
  styles.itemToneB,
  styles.itemToneC,
] as const;

/** Sticky 3-card stack for internships, co-makers, and collaborations. */
export function Experience() {
  return (
    <section id="experience" aria-label="Experience" className={styles.section}>
      <div className={styles.stack}>
        {experiences.map((item, index) => {
          const hasVideos = Boolean(item.videos?.length);
          const hasImages = Boolean(item.images?.length);
          const hasMedia = hasVideos || hasImages;

          return (
            <article
              key={item.id}
              className={cn(
                styles.item,
                TONE_CLASSES[index % TONE_CLASSES.length],
              )}
              style={{ "--stack-i": index + 1 } as CSSProperties}
            >
              <div
                className={cn(
                  styles.inner,
                  hasMedia && styles.innerWithMedia,
                  hasImages && styles.innerWithGallery,
                )}
              >
                <div className={styles.top}>
                  <h3 className={styles.title}>{item.org}</h3>
                  <p className={styles.meta}>{item.summary}</p>
                </div>

                {hasVideos ? (
                  <div
                    className={styles.media}
                    aria-label={`${item.org} demos`}
                  >
                    {item.videos!.map((video) => {
                      const ar = video.aspectRatio ?? "9 / 16";
                      const [w, h] = ar.split("/").map((n) => Number(n.trim()));
                      const landscape = Boolean(w && h && w > h);

                      return (
                        <div
                          key={video.src}
                          className={styles.mediaFrame}
                          data-orient={landscape ? "landscape" : "portrait"}
                          style={
                            {
                              "--media-ar": ar,
                            } as CSSProperties
                          }
                        >
                          <video
                            className={styles.mediaVideo}
                            src={video.src}
                            aria-label={video.label}
                            muted
                            loop
                            playsInline
                            autoPlay
                            preload="metadata"
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {hasImages ? (
                  <ExperienceSlideshow
                    images={item.images!}
                    label={`${item.org} work`}
                  />
                ) : null}

                <div className={styles.bottom}>
                  <p className="m-0 text-sm opacity-70">
                    {item.period} · {item.role}
                  </p>
                  <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-sm leading-snug opacity-90">
                    {item.highlights.map((line) => (
                      <li key={line}>— {line}</li>
                    ))}
                  </ul>
                  <ul
                    aria-label={`Focus areas at ${item.org}`}
                    className={styles.tech}
                  >
                    {item.tags.map((tag) => (
                      <li key={tag} className={styles.techItem}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
