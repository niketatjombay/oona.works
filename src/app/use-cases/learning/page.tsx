import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learning Intelligence — Oona.Works',
  description: 'Learning Intelligence',
};

export default function LearningIntelligence() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-[132px]">
      <div className="text-center">
        <h1 className="text-h3 text-foreground">Learning Intelligence</h1>
        <p className="text-body-lg text-muted-foreground mt-4">Coming soon</p>
      </div>
    </div>
  );
}
