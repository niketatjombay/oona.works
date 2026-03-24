import type { UseCaseContent } from '@/types';

export const PERFORMANCE: UseCaseContent = {
  metadata: {
    title: 'Performance Intelligence | oona.works',
    description:
      'Instant KPI Validation, Goal Cascading Dashboards and AI-generated Performance Scripts powered by oona.works.',
  },
  banner: {
    badge: 'USE CASES',
    title: 'Performance Intelligence',
    subtitle:
      'With oona.works, consulting firms can show their clients :\n > Instant KPI Validation & Goal Cascading Dashboards\n > On-the-go, AI-generated Performance Scripts for managers.',
    heroImage: '/images/uc-hero-performance.png',
    heroImageAlt: 'Performance Intelligence hero',
  },
  dashboard: {
    title: 'LIVE Performance Intelligence Dashboard',
    subtitle:
      "(Illustrative and fully customizable for an organization's needs.)",
    image: '/images/uc-dashboard-performance.png',
    imageAlt: 'Performance Intelligence dashboard',
  },
  stats: [
    {
      type: 'animated',
      value: 50,
      suffix: '-60%',
      label: 'Reduced in time spent on performance review prep',
    },
    {
      type: 'animated',
      value: 15,
      suffix: '-20%',
      label: 'Improvement in goal alignment',
    },
    {
      type: 'animated',
      value: 20,
      suffix: '-30%',
      label: 'Improvement in quality of feedback',
    },
  ],
  platform: {
    image: '/images/platform-overview.png',
    imageAlt: 'Platform overview – Performance Intelligence highlighted',
  },
};
