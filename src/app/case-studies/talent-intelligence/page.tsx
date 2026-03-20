import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Talent Intelligence Case Study — Oona.Works',
  description: 'Talent Intelligence Case Study',
};

export default function TalentIntelligenceCaseStudy() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-[132px]">
      <div className="text-center">
        <h1 className="text-h3 text-foreground">Talent Intelligence Case Study</h1>
        <p className="text-body-lg text-muted-foreground mt-4">Coming soon</p>
      </div>
    </div>
  );
}
