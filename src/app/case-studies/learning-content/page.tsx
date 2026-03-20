import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Content Case Study — Oona.Works',
  description: 'Learning Content Case Study',
};

export default function LearningContentCaseStudy() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-[132px]">
      <div className="text-center">
        <h1 className="text-h3 text-foreground">Learning Content Case Study</h1>
        <p className="text-body-lg text-muted-foreground mt-4">Coming soon</p>
      </div>
    </div>
  );
}
