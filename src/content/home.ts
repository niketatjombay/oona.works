// Types (co-located, home-page-specific)
interface HeroContent { headline: string; ctaLabel: string; ctaHref: string; }
interface CardContent { title: string; body: string; governance?: string; }
interface LifecycleCard { title: string; items: string[]; href?: string; }
interface LifecycleColumn { cards: LifecycleCard[]; }
interface StatItem { label: string; sublabel: string; }
interface WhyUsCard { bold: string; prefix?: string; rest: string; }
interface ArticleCard { title: string; image: string; href: string; }
interface FormField { label: string; placeholder: string; }

export const HOME_HERO: HeroContent = {
  headline: 'Your AI Partner in\nHR Transformation!',
  ctaLabel: 'Talk to us',
  ctaHref: 'mailto:oona@oona.works',
};

export const HOME_VALUE_PROP = {
  leftCard: {
    title: "Your clients are asking about AI... But, they don't want just advice and best practices — They also want real AI implementation!",
    body: "oona.works can become your AI foundation for HR transformation projects!\n\nYou bring the consulting expertise.\noona.works provides the AI foundation to deliver intelligence at scale.",
  } as CardContent,
  rightCard: {
    title: 'What we do!',
    body: "oona.works empowers HR consulting firms to deliver AI-powered HR transformation to their clients — without building tech in-house!\n\nIt connects to a client's existing HR systems (HRMS, ATS, LMS, PMS) to create a single, structured understanding of their organization. This intelligence layer gives you:\n\n\u2022 A complete view of workforce data across systems\n\u2022 Diagnosis of workforce challenges\n\u2022 AI-driven solutions for real organizational contexts",
    governance: 'All while ensuring\nEnterprise-grade data governance  I  Full audit trails  I  Secure access',
  } as CardContent,
};

export const HOME_PLATFORM = {
  title: 'HOW we do it',
  subtitle: "oona.works is an AI Orchestration platform that unifies an organization's HR systems (HRMS, ATS, LMS, PMS) into a single data layer, then adds AI-driven insights on top.",
};

export const HOME_LIFECYCLE = {
  title: 'AI Intelligence across the HR Lifecycle',
  subtitle: 'With oona.works, consulting firms can deploy AI across the full HR ecosystem.',
  columns: [
    {
      cards: [
        { title: 'Talent Intelligence', items: ['Competency Architecture', 'Skills Intelligence', 'Internal Talent Marketplace with Learning Paths', 'Live Succession Planning'], href: '/use-cases/workforce' },
        { title: 'Performance Intelligence', items: ['Goal Alignment', 'KPI Validation & Calibration', 'AI Guided Performance Conversations'], href: '/use-cases/performance' },
      ],
    },
    {
      cards: [
        { title: 'Learning Intelligence', items: ['AI Generated Learning Content (Policy, Functional, Regulatory)', 'Skill Simulation Engine', 'Always-on AI Coaching'], href: '/use-cases/learning' },
        { title: 'Recruitment Intelligence', items: ['Candidate Filtering & Matching', 'Automated Interview & Evaluation', 'New Hire Success'], href: '/use-cases/recruitment' },
      ],
    },
    {
      cards: [
        { title: 'HR Operations Intelligence', items: ['HR MIS Dashboard', 'Policy & Benefits Chatbot', 'Attrition Intelligence', 'and more\u2026'], href: undefined },
      ],
    },
  ] as LifecycleColumn[],
};

export const HOME_STATS = {
  heading: 'How your $150K\nHR consulting project can become a $450K AI transformation engagement with oona.works',
  subtitle: 'Simply because we empower you to:',
  ctaLabel: 'Know More',
  ctaHref: 'mailto:oona@oona.works',
  stats: [
    { label: 'WIN', sublabel: 'AI-led HR transformation mandates' },
    { label: 'COMPETE', sublabel: 'with tech-first consulting firms' },
    { label: '2-3X', sublabel: 'INCREASE IN PROJECT VALUE' },
    { label: '40\u201360% FASTER', sublabel: 'delivery' },
  ] as StatItem[],
};

export const HOME_WHY_US = {
  title: 'Why US?',
  subtitle: 'Because nobody knows HR + AI like oona.works',
  cards: [
    { bold: 'Team', rest: 'with deep HR expertise, and real product building experience' },
    { bold: 'real-world HR data', prefix: 'AI agents trained on millions of ', rest: ' points, methodologies & frameworks.' },
    { bold: 'Modular integrations', rest: ' with HRMS, ATS, LMS, payroll & performance systems.' },
  ] as WhyUsCard[],
  securityCta: { label: 'Enterprise Grade Security', href: '/enterprise-security' },
};

export const HOME_CASE_STUDIES = {
  title: 'Case Studies',
  articles: [
    { title: 'Transforming talent intelligence at a global agro chemical company.', image: '/images/case-study-1.jpg', href: '/case-studies/talent-intelligence' },
    { title: 'Bringing Consistency to Performance Management at a Leading BFSI Company', image: '/images/case-study-2.jpg', href: '/case-studies/performance-management' },
    { title: '"Always-updated" learning content for a Leading Securities Depository', image: '/images/case-study-3.jpg', href: '/case-studies/learning-content' },
  ] as ArticleCard[],
};

export const HOME_ABOUT = {
  title: 'About Us',
  body: 'The founding team is a group of HR tech founders who built & ran a sustainable company for 15 years.\n\nThey are now combining their HR domain expertise with innovation in AI to redefine HR!',
};

export const HOME_CONTACT = {
  overline: 'OONA.WORKS',
  title: 'Get in touch!',
  subtitle: 'We would love to show you the power of AI for HR transformation!',
  submitLabel: 'Submit',
  successMessage: "Thank you! We'll be in touch soon.",
  fields: {
    firstName: { label: 'First Name', placeholder: 'First Name' } as FormField,
    lastName: { label: 'Last Name', placeholder: 'Last Name' } as FormField,
    email: { label: 'Email', placeholder: 'Email' } as FormField,
    message: { label: 'Tell us more.', placeholder: '' } as FormField,
  },
};
