import { CaseStudyContent } from '@/types';

export const LEARNING_CONTENT: CaseStudyContent = {
  metadata: {
    title: '"Always-updated" Learning Content | oona.works',
    description:
      'How oona.works implemented an AI-powered Learning Intelligence system at a leading securities depository to transform existing content into structured learning experiences at scale.',
  },
  banner: {
    badge: 'CASE STUDY',
    title:
      '\u201CAlways-updated\u201D learning content for a Leading Securities Depository',
    heroImage: '/images/cs-hero-3.png',
    heroImageAlt:
      'Learning content platform showing structured training modules',
  },
  problem:
    'We worked with a leading securities depository to solve their challenges in generating live and updated learning material. Over time, they had accumulated a vast repository of regulatory documents, operational manuals, training material, and product guides used by internal teams and ecosystem partners. But content was difficult to convert into structured learning experiences at scale.\n\nThis made it difficult to:\n\n\u2022 Convert large volumes of operational content into structured training\n\u2022 Deliver role-specific learning across functions\n\u2022 Keep training material updated with regulatory and operational changes\n\u2022 Enable employees to quickly find answers from internal knowledge repositories',
  summary:
    'oona.works implemented an AI-powered Learning Intelligence system to transform existing organizational content into structured, role-relevant learning experiences at scale.',
  howItWorks: {
    title: 'How it works',
    steps: [
      {
        number: 1,
        title: 'Data Ingestion',
        description:
          'AI pulled content from document repositories, shared drives, and LMS platforms.',
      },
      {
        number: 2,
        title: 'Content Segmentation',
        description:
          'Large documents were broken into smaller logical knowledge units.',
      },
      {
        number: 3,
        title: 'Content Extraction',
        description:
          'Relevant text and learning material were extracted from each segment.',
      },
      {
        number: 4,
        title: 'Role Mapping',
        description:
          'Each knowledge unit was mapped to the most relevant roles or learner groups.',
      },
      {
        number: 5,
        title: 'Mapping Consolidation',
        description:
          'A master role \u00D7 content framework was created for structured learning delivery.',
      },
      {
        number: 6,
        title: 'AI Content Generation',
        description:
          'The system generated lessons, quizzes, update notifications, and validated learning material.',
      },
    ],
  },
  outcomes: {
    title: 'The AI system transformed static knowledge repositories into a dynamic learning intelligence platform.',
    items: [
      'Rapid conversion of existing operational content into structured lessons',
      'Delivery of role-relevant training at scale',
      'Scenario-based quizzes that improved learning retention',
      'Automated detection of content updates and regulatory changes',
      'A chatbot enabling instant answers from internal knowledge',
    ],
  },
  quote:
    "By adding an AI intelligence layer on top of existing knowledge repositories, oona.works helped the organization transform fragmented documentation into an 'always updated' learning platform.",
};
