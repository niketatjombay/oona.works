import type { UseCaseContent } from '@/types';

export const RECRUITMENT: UseCaseContent = {
  metadata: {
    title: 'Recruitment Intelligence | oona.works',
    description:
      'LIVE Candidate Filtering, Role fitment dashboards and new hire integration success metrics powered by oona.works.',
  },
  banner: {
    badge: 'USE CASES',
    title: 'Recruitment Intelligence',
    subtitle:
      'With oona.works, consulting firms help clients with :\n >  LIVE Candidate Filtering & Role fitment dashboard\n >  New hire integration success metrics',
    heroImage: '/images/uc-hero-recruitment.png',
    heroImageAlt: 'Recruitment Intelligence hero',
  },
  dashboard: {
    title: 'LIVE Recruitment Intelligence Dashboard',
    subtitle:
      "(Illustrative and fully customizable for an organization's needs.)",
    image: '/images/uc-dashboard-recruitment.png',
    imageAlt: 'Recruitment Intelligence dashboard',
  },
  stats: [
    {
      type: 'static',
      display: '70-75%',
      label: 'Reduction in time to screen candidates',
    },
    {
      type: 'static',
      display: '40-60hrs',
      label: 'of recruiter time saved monthly',
    },
    { type: 'static', display: '30-40%', label: 'Reduction in time to hire' },
  ],
};
