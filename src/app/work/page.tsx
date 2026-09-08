import type { Metadata } from "next";

import { WorkArchive } from "@/components/work/work-archive";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "All projects",
  description: `Full project archive — ${site.name}`,
};

export default function WorkIndexPage() {
  return <WorkArchive />;
}
