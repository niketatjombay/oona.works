import type { UseCaseContent } from '@/types';

export const LEARNING: UseCaseContent = {
  metadata: {
    title: 'Learning Intelligence | oona.works',
    description:
      'Auto-generated learning content, completion tracking and instant learning gap fulfilment powered by oona.works.',
  },
  banner: {
    badge: 'USE CASES',
    title: 'Learning Intelligence',
    subtitle:
      'With oona.works, consulting firms help clients with :\n >  Auto generation of learning content\n >  Learning completion & assessment scores\n >  Instant learning gap fulfilment',
    heroImage: '/images/uc-hero-learning.png',
    heroImageAlt: 'Learning Intelligence hero',
  },
  dashboard: {
    title: 'LIVE Learning Intelligence Dashboard',
    subtitle:
      "(Illustrative and fully customizable for an organization's needs.)",
    image: '/images/uc-dashboard-learning.png',
    imageAlt: 'Learning Intelligence dashboard',
  },
  stats: [
    {
      type: 'static',
      display: '70-90%',
      label: 'Reduction in learning content creation time',
    },
    {
      type: 'static',
      display: '5-10X',
      label: 'Faster training content generation',
    },
    {
      type: 'static',
      display: '30-50%',
      label: 'Acceleration in Skill Acquisition',
    },
  ],
};
