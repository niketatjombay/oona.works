import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workforce Intelligence — Oona.Works',
  description: 'Workforce Intelligence',
};

export default function WorkforceIntelligence() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-[132px]">
      <div className="text-center">
        <h1 className="text-h3 text-foreground">Workforce Intelligence</h1>
        <p className="text-body-lg text-muted-foreground mt-4">Coming soon</p>
      </div>
    </div>
  );
}
