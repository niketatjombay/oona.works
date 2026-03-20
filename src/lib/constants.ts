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
  { label: 'Case Studies', href: ROUTES.caseStudies.talentIntelligence },
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
