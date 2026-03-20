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

export interface CaseStudyContent {
  metadata: { title: string; description: string };
  banner: {
    badge: string;
    title: string;
    heroImage: string;
    heroImageAlt: string;
  };
  problem: string;
  summary: string;
  howItWorks: {
    title: string;
    steps: { number: number; title: string; description: string }[];
  };
  outcomes: {
    title: string;
    items: string[];
  };
  quote: string;
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
