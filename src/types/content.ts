/**
 * Content types for portfolio v5.
 *
 * Shapes mirror the v4.1 source data so the port is lossless; v5 adds only
 * presentational grouping (see `kind` in Project, derived not asserted).
 */

export interface Profile {
  name: string;
  title: string;
  institution: string;
  description: string;
  email: string;
  imageUrl?: string;
  blogUrl?: string;
  cvUrl?: string;
  googleScholarUrl?: string;
  twitterUsername?: string;
  githubUsername?: string;
  linkedinUsername?: string;
  funDescription?: string;
  secretDescription?: string;
  altName?: string;
  institutionUrl?: string;
}

export interface GalleryImage {
  urlImage: string;
  label: string;
}

export interface Project {
  title: string;
  description: string;
  technologies?: string[];
  imageUrl?: string;
  projectUrl?: string;
  projectGallery?: GalleryImage[];
  codeUrl?: string;
}

export interface Role {
  date: string;
  title: string;
  company: string;
  description: string[];
  companyUrl?: string;
}

export interface Education {
  year: string;
  institution: string;
  degree: string;
  advisor?: string;
  thesis?: string;
  thesisUrl?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  shortDescription?: string;
  credentialUrl?: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillGroup {
  category: string;
  skills: SkillItem[];
}

export interface SectionLink {
  id: string;
  label: string;
  index: string;
}
