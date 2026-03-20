import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Performance Management Case Study — Oona.Works',
  description: 'Performance Management Case Study',
};

export default function PerformanceManagementCaseStudy() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-[132px]">
      <div className="text-center">
        <h1 className="text-h3 text-foreground">Performance Management Case Study</h1>
        <p className="text-body-lg text-muted-foreground mt-4">Coming soon</p>
      </div>
    </div>
  );
}
