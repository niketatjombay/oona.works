import type { NavItem, SiteConfig } from '@/types';

export const ROUTES = {
  home: '/',
  caseStudies: {
    talentIntelligence: '/case-studies/talent-intelligence',
    performanceManagement: '/case-studies/performance-management',
    learningContent: '/case-studies/learning-content',
  },
  useCases: {
    workforce: '/use-cases/workforce',
    performance: '/use-cases/performance',
    learning: '/use-cases/learning',
    recruitment: '/use-cases/recruitment',
  },
  enterpriseSecurity: '/enterprise-security',
  contact: 'mailto:oona@oona.works',
} as const;

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: ROUTES.home },
  {
    label: 'Case Studies',
    href: ROUTES.caseStudies.talentIntelligence,
    children: [
      {
        label: 'Talent Intelligence',
        href: ROUTES.caseStudies.talentIntelligence,
      },
      {
        label: 'Performance Management',
        href: ROUTES.caseStudies.performanceManagement,
      },
      {
        label: 'Learning Content',
        href: ROUTES.caseStudies.learningContent,
      },
    ],
  },
  {
    label: 'Use Cases',
    href: ROUTES.useCases.workforce,
    children: [
      {
        label: 'Workforce Intelligence',
        href: ROUTES.useCases.workforce,
      },
      {
        label: 'Performance Intelligence',
        href: ROUTES.useCases.performance,
      },
      {
        label: 'Learning Intelligence',
        href: ROUTES.useCases.learning,
      },
      {
        label: 'Recruitment Intelligence',
        href: ROUTES.useCases.recruitment,
      },
    ],
  },
];

export const FOOTER_DATA = {
  emailLabel: 'Write to us',
  email: 'oona@oona.works',
  copyright: `© ${new Date().getFullYear()} Oona.Works. All rights reserved.`,
};

export const SITE_CONFIG: SiteConfig = {
  name: 'Oona.Works',
  description: 'Your AI Partner in HR Transformation',
  url: 'https://oona.works',
  ogImage: '/images/og-image.png',
  links: {},
};

export const CONTACT_EMAIL = 'oona@oona.works';
export const CONTACT_CTA_LABEL = 'Contact Us ~ Email';
export const NEXT_CASE_STUDY_LABEL = 'Next Case Study';
