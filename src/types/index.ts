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

export interface EnterpriseSecurityContent {
  metadata: { title: string; description: string };
  banner: {
    badge: string;
    title: string;
    heroImage: string;
    heroImageAlt: string;
  };
  body: string;
  whyTitle: string;
  whyText: string;
  quote: string;
  pillarsTitle: string;
  pillars: { title: string; description: string }[];
}

export type UseCaseStat = {
  type: 'static';
  display: string;
  label: string;
} | {
  type: 'animated';
  value: number;
  suffix?: string;
  label: string;
};

export interface UseCaseContent {
  metadata: { title: string; description: string };
  banner: {
    badge: string;
    title: string;
    subtitle: string;
    heroImage: string;
    heroImageAlt: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    image: string;
    imageAlt: string;
  };
  stats: UseCaseStat[];
}
