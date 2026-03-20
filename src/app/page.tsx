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
