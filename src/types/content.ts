export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
};

export type SkillGroupIcon =
  "languages" | "frameworks" | "practices" | "tooling";

export type SkillGroup = {
  title: string;
  icon: SkillGroupIcon;
  skills: string[];
};

export type ExperienceEntry = {
  id: string;
  type: "education" | "work";
  title: string;
  organization: string;
  location?: string;
  start: string;
  end?: string;
  description: string;
  tags?: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  tech: string[];
  cover?: string;
  links: ProjectLink[];
  body: string[];
};
