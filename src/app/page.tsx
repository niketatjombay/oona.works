import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Oona.Works — Your AI Partner in HR Transformation' },
  description:
    'AI-powered HR transformation platform for enterprise consulting firms. Deploy AI across the full HR ecosystem.',
};

import {
  HeroSection,
  ValuePropSection,
  PlatformSection,
  LifecycleSection,
  StatsSection,
  WhyUsSection,
  CaseStudiesSection,
  AboutSection,
  ContactSection,
} from '@/components/sections/home';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ValuePropSection />
      <PlatformSection />
      <LifecycleSection />
      <StatsSection />
      <WhyUsSection />
      <CaseStudiesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
