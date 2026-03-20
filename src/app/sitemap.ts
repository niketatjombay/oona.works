import type { MetadataRoute } from 'next';
import { ROUTES } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oona.works';
  const routes = [
    ROUTES.home,
    ...Object.values(ROUTES.caseStudies),
    ...Object.values(ROUTES.useCases),
    ROUTES.enterpriseSecurity,
  ];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));
}
