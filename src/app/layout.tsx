import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Analytics } from '@vercel/analytics/react';
import { PageTransitionWrapper } from '@/components/animations';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://oona.works'),
  title: {
    default: 'Oona.Works — Your AI Partner in HR Transformation',
    template: '%s — Oona.Works',
  },
  description:
    'AI-powered HR transformation platform for enterprise consulting firms.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oona.works',
    siteName: 'Oona.Works',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Oona.Works',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
