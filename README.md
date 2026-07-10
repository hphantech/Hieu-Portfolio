# Hieu Phan — Portfolio

A personal portfolio site built with **Next.js**, **TypeScript**, and **Tailwind CSS**, prepared for frontend internship applications.

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
- [ ] `src/content/about.ts` — real bio paragraphs and quick facts (university, program)
- [ ] `src/content/experience.ts` — real education and work/project history
- [ ] `src/content/projects.ts` — real projects, links, and case-study write-ups
- [ ] `public/` — real resume PDF, favicon, and Open Graph image
- [ ] Confirm the accent color and any project screenshots reflect your taste

## Roadmap

- [x] Typed content architecture
- [ ] Motion system (custom cursor, scroll reveals, hero animation)
- [ ] Work case-study route (`/work/[slug]`)
- [ ] SEO metadata, sitemap, and accessibility pass
- [ ] Deploy to production (Vercel recommended)
