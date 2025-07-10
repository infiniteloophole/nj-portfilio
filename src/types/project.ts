export type ProjectType = 'web' | 'mobile' | 'api' | 'other';

export interface ProjectLink {
  github?: string;
  live?: string;
  video?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  type: ProjectType;
  links: ProjectLink;
  technologies: string[];
  image?: string;
  longDescription?: string;
  role?: string;
  features?: string[];
  challenges?: string[];
  results?: string[];
  category?: string;
  year?: string;
}

export interface ProjectShowcaseProps {
  projects: Project[];
}
