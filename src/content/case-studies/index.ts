export { TALENT_INTELLIGENCE } from './talent-intelligence';
export { PERFORMANCE_MANAGEMENT } from './performance-management';
export { LEARNING_CONTENT } from './learning-content';

export const CASE_STUDY_ORDER = [
  {
    slug: 'talent-intelligence',
    title:
      'Transforming talent intelligence at a global agro chemical company.',
    image: '/images/case-study-1.jpg',
  },
  {
    slug: 'performance-management',
    title:
      'Bringing Consistency to Performance Management at a Leading BFSI Company',
    image: '/images/case-study-2.jpg',
  },
  {
    slug: 'learning-content',
    title:
      '"Always-updated" learning content for a Leading Securities Depository',
    image: '/images/case-study-3.jpg',
  },
] as const;
