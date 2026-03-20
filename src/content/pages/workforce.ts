import type { UseCaseContent } from '@/types';

export const WORKFORCE: UseCaseContent = {
  metadata: {
    title: 'Talent Intelligence | oona.works',
    description:
      'LIVE Talent Readiness Dashboards and Workforce Skills visibility powered by oona.works.',
  },
  banner: {
    badge: 'USE CASES',
    title: 'Talent Intelligence',
    subtitle:
      'With oona.works, consulting firms can show their clients :\n > LIVE Talent Readiness Dashboards\n > LIVE Visibility into Workforce Skills, Capabilities & Gaps',
    heroImage: '/images/uc-hero-workforce.png',
    heroImageAlt: 'Talent Intelligence hero',
  },
  dashboard: {
    title: 'LIVE Talent Intelligence Dashboard',
    subtitle:
      "(Illustrative and fully customizable for an organization's needs.)",
    image: '/images/uc-dashboard-workforce.png',
    imageAlt: 'Talent Intelligence dashboard',
  },
  stats: [
    {
      type: 'static',
      display: '60-70%',
      label: 'Reduced time spent on analysis',
    },
    { type: 'static', display: '40-60 hrs', label: 'saved per month' },
    {
      type: 'static',
      display: '20-35%',
      label: 'Increase in internal role fulfilment',
    },
    { type: 'static', display: 'Faster', label: 'Talent deployment' },
  ],
};
