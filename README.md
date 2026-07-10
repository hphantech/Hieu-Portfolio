# Hieu Phan — Portfolio

A personal portfolio site built with **Next.js**, **TypeScript**, and **Tailwind CSS**, prepared for frontend internship applications.

**Live:** [hieu-portfolio-five.vercel.app](https://hieu-portfolio-five.vercel.app)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Project structure

```
src/
├── app/              # Next.js App Router pages, layout, and routes
├── components/       # Reusable UI components
├── content/          # Editable site copy and data (edit these files, not the components)
├── lib/              # Shared utilities (e.g. the cn() classname helper)
└── types/            # Shared content types
```

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production server
- `npm run lint` — run ESLint
- `npm run format` — format the codebase with Prettier
- `npm run format:check` — check formatting without writing changes

## Content checklist

Every placeholder below lives in `src/content/` and is marked with a `TODO` comment. Replace all of these before submitting an application:

- [ ] `src/content/site.ts` — real email, resume/CV file, confirmed city
- [ ] `src/content/site.ts` — real GitHub and LinkedIn URLs
- [ ] `src/content/site.ts` — `url` — swap for a custom domain if you set one up (currently the Vercel deployment URL, used for metadata/OG/sitemap)
- [ ] `src/content/about.ts` — real bio paragraphs and quick facts (university, program)
- [ ] `src/content/experience.ts` — real education and work/project history
- [ ] `src/content/projects.ts` — real projects, links, and case-study write-ups (including a real screenshot/GIF per project, with descriptive alt text once added)
- [ ] `public/` — real resume PDF matching `site.resumeUrl`
- [ ] Confirm the accent color reflects your taste
- [ ] Optional: replace the generated "HP" monogram favicon/OG image (`src/app/icon.tsx`, `apple-icon.tsx`, `opengraph-image.tsx`) with real brand art

## Roadmap

- [x] Typed content architecture
- [x] Motion system (custom cursor, scroll reveals, hero animation, marquee, magnetic CTAs)
- [x] Work case-study route (`/work/[slug]`)
- [x] SEO metadata, sitemap, and accessibility pass
- [x] Deploy to production (Vercel)
