export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Stat {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface SectionContent {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  features?: Feature[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  company: string;
  industry: string;
  summary: string;
  metrics: Stat[];
  coverImage: string;
  content: string;
}

export interface PageContent {
  title: string;
  description: string;
  hero: SectionContent;
  sections: SectionContent[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
