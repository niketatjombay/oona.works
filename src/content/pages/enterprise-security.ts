import type { EnterpriseSecurityContent } from '@/types';

export const ENTERPRISE_SECURITY: EnterpriseSecurityContent = {
  metadata: {
    title: 'Enterprise-Grade Security',
    description:
      'The intelligent data backbone that turns fragmented HR systems into a governed, auditable, AI-powered workforce platform.',
  },
  banner: {
    badge: 'AI ORCHESTRATION FOR HR TRANSFORMATION',
    title:
      'The intelligent data backbone that turns fragmented HR systems into a governed, auditable, AI-powered workforce platform.',
    heroImage: '/images/es-hero.png',
    heroImageAlt: 'Enterprise security hero',
  },
  body: `Oona.Works is an AI Orchestration platform that unifies an organization's HR data landscape — connecting disparate source systems (HRIS, ATS, LMS, performance tools) into a single normalized data layer, then layering intelligent analytics and AI-driven insights on top.`,
  whyTitle: 'Why It Matters for CHROs',
  whyText: `It ingests, maps, and harmonizes records from across the enterprise, giving HR leaders a coherent, real-time view of workforce outcomes, process performance, and talent signals — without requiring data engineering resources or custom integration work.\n\nEvery data movement is tracked end-to-end: ingestion batches, transformation mappings, and record-level provenance are logged with full authorship and timestamps, so HR and compliance teams always know where a data point came from, who touched it, and when — making audits and regulatory reviews a matter of minutes, not weeks.`,
  quote:
    '"Not just intelligent — but trustworthy, auditable, and built to grow as HR\'s strategic ambitions do."',
  pillarsTitle: 'Core Value Pillars',
  pillars: [
    {
      title: 'Unified Intelligence',
      description:
        'Eliminates fragmentation across people systems — one normalized data layer, one coherent view of the workforce.',
    },
    {
      title: 'Governance by Design',
      description:
        'Role-based access controls, client-scoped data isolation, and immutable audit trails baked into every action — not bolted on.',
    },
    {
      title: 'AI Orchestration',
      description:
        'LLM-powered assistants backed by OpenAI, Anthropic, Azure, and AWS Bedrock surface workforce intelligence on demand.',
    },
    {
      title: 'Enterprise Scale',
      description:
        'Multi-tenant architecture serves a single business unit or a global portfolio of divisions — no re-architecting required.',
    },
    {
      title: 'Full Traceability',
      description:
        'Record-level provenance with authorship and timestamps across every ingestion, transformation, and outcome — audit-ready by default.',
    },
    {
      title: 'Reliable at Volume',
      description:
        'Asynchronous background processing handles high-volume data operations reliably without degrading the user experience.',
    },
  ],
};
