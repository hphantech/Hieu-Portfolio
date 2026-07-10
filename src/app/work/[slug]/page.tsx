import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/work/case-study";
import { getProjectBySlug, projects } from "@/content/projects";
import { site } from "@/content/site";

type WorkPageParams = {
  slug: string;
};

export function generateStaticParams(): WorkPageParams[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<WorkPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: `Project not found — ${site.name}` };
  }

  return {
    title: `${project.title} — ${site.name}`,
    description: project.summary,
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<WorkPageParams>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main id="main-content" className="flex-1">
      <CaseStudy project={project} />
    </main>
  );
}
