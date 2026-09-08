import type { Metadata } from "next";
import { redirect } from "next/navigation";

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
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.summary,
      type: "article",
    },
  };
}

/** Deep links land on the work carousel — details open as popups there. */
export default async function WorkPage({
  params,
}: {
  params: Promise<WorkPageParams>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    redirect("/#work");
  }

  redirect("/#work");
}
