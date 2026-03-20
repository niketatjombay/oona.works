import { CaseStudyContent } from '@/types';

export const PERFORMANCE_MANAGEMENT: CaseStudyContent = {
  metadata: {
    title: 'Bringing Consistency to Performance Management | oona.works',
    description:
      'How oona.works implemented an AI-powered Performance Intelligence system at a leading BFSI company to standardize KPI frameworks and enable structured performance conversations.',
  },
  banner: {
    badge: 'CASE STUDY',
    title:
      'Bringing Consistency to Performance Management at a Leading BFSI Company',
    heroImage: '/images/cs-hero-2.png',
    heroImageAlt: 'Performance management dashboard showing KPI analytics',
  },
  problem:
    'We worked with a leading BFSI company with a large distributed workforce to strengthen the quality and consistency of its performance management process. While KPIs were defined across roles, there was significant variation in how they were interpreted & measured.\n\nThis made it difficult to:\n\n• Ensure KPI quality and consistency across roles and teams\n• Anchor performance evaluations in objective, evidence-based data\n• Enable managers to conduct structured, high-quality performance conversations\n• Reduce subjectivity and bias in performance ratings',
  summary:
    'oona.works implemented an AI-powered Performance Intelligence system to standardize KPI frameworks and enable structured manager-led performance conversations.',
  howItWorks: {
    title: 'How it works',
    steps: [
      {
        number: 1,
        title: 'KPI Ingestion',
        description:
          'AI pulled existing KPIs and goal sheets across roles and functions.',
      },
      {
        number: 2,
        title: 'KPI Validation',
        description:
          'The system evaluated KPIs for clarity, measurability, and alignment to business outcomes.',
      },
      {
        number: 3,
        title: 'KPI Standardization',
        description:
          'KPIs were refined into structured, comparable formats with clear success metrics.',
      },
      {
        number: 4,
        title: 'Flagging Inconsistencies',
        description:
          'Inconsistencies between rating and evidence were flagged.',
      },
      {
        number: 5,
        title: 'Conversation Script Generation',
        description:
          'Managers were equipped with evidence-led feedback scripts.',
      },
    ],
  },
  outcomes: {
    title:
      'The AI system transformed performance management into a structured performance intelligence system.',
    items: [
      'Improved quality and consistency of KPIs across roles',
      'More objective, evidence-based performance conversations',
      'Reduced bias in performance ratings and feedback',
    ],
  },
  quote:
    'By adding an AI intelligence layer to performance management, oona.works helped the organization convert fragmented KPIs and unstructured reviews into a consistent, data-driven performance system.',
};
