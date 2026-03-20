import { CaseStudyContent } from '@/types';

export const TALENT_INTELLIGENCE: CaseStudyContent = {
  metadata: {
    title: 'Transforming Talent Intelligence | oona.works',
    description:
      'How oona.works implemented an AI-powered Talent Intelligence system at a global agro chemical company to create a dynamic, data-driven approach to leadership pipelines.',
  },
  banner: {
    badge: 'CASE STUDY',
    title:
      'Transforming talent intelligence at a global agro chemical company.',
    heroImage: '/images/cs-hero-1.png',
    heroImageAlt:
      'Talent intelligence dashboard showing leadership pipeline analytics',
  },
  problem:
    "We worked with one of the world's largest agri-science companies, operating in over 130 countries and employing thousands of professionals across R&D, manufacturing, and global commercial roles. With a large and diverse workforce, the company wanted to strengthen succession planning and internal talent mobility, but existing processes relied heavily on manual reviews and static succession lists.\n\nThis made it difficult to:\n\n• See real-time leadership bench strength\n• Identify cross-functional mobility opportunities\n• Evaluate successor readiness consistently",
  summary:
    'oona.works implemented an AI-powered Talent Intelligence system to create a dynamic, data-driven approach to leadership pipelines.',
  howItWorks: {
    title: 'How it works',
    steps: [
      {
        number: 1,
        title: 'Role Intelligence',
        description:
          'Analyzed leadership roles and translated expectations into structured role criteria.',
      },
      {
        number: 2,
        title: 'Capability Clustering',
        description:
          'Grouped roles into capability clusters to reveal logical career and mobility pathways.',
      },
      {
        number: 3,
        title: 'Unified Talent Profiles',
        description:
          'Created a consolidated AI profile for every employee using existing HR data.',
      },
      {
        number: 4,
        title: 'AI Role Matching',
        description:
          'Compared employee profiles against role requirements across the organization.',
      },
      {
        number: 5,
        title: 'Readiness Scoring',
        description:
          'Generated AI-based readiness levels for each employee-role combination.',
      },
      {
        number: 6,
        title: 'Talent Intelligence Outputs',
        description:
          'Produced successor stacks for roles and career-fit views for employees.',
      },
      {
        number: 7,
        title: 'HRMS Integration',
        description:
          'Fed insights back into existing HR systems as a continuous intelligence layer.',
      },
    ],
  },
  outcomes: {
    title:
      'The AI system transformed succession planning from static lists to a dynamic talent intelligence engine.',
    items: [
      'Clear visibility into global leadership bench strength',
      'Faster data-driven succession decisions',
      'Identification of cross-functional mobility opportunities',
      'More objective and consistent readiness evaluation',
      'Stronger internal leadership pipeline development',
    ],
  },
  quote:
    'By adding an AI intelligence layer to existing HR systems, oona.works helped the organization convert fragmented HR data into actionable succession planning insights at scale.',
};
