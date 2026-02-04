import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Privacy Null - Redact Secrets Before Sending to AI | pnull.com',
    template: '%s | Privacy Null',
  },
  description: 'Free online tool to redact sensitive information like API keys, tokens, passwords before sending to ChatGPT or other AI. 100% local processing, no data uploads.',
  keywords: ['Privacy Null', 'data sanitization', 'redact API keys', 'remove sensitive data', 'ChatGPT privacy', 'local redaction tool'],
  authors: [{ name: 'pnull.com' }],
  creator: 'pnull.com',
  publisher: 'pnull.com',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'zh_CN',
    url: 'https://pnull.com',
    siteName: 'Privacy Null',
    title: 'Privacy Null - Redact Secrets Before Sending to AI',
    description: 'Free online tool to redact sensitive information before sending to AI. 100% local, no uploads.',
    images: [
      {
        url: 'https://pnull.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Privacy Null',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Null - Redact Secrets Before AI',
    description: 'Free tool to redact API keys, tokens, passwords before sending to AI. 100% local processing.',
    images: ['https://pnull.com/og-image.png'],
  },
  alternates: {
    canonical: 'https://pnull.com',
    languages: {
      'en': 'https://pnull.com',
      'zh': 'https://pnull.com/zh',
    },
  },
  icons: {
    icon: '/icon.svg',
  },
  verification: {
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://stats.nkkk.de/script.js"
          data-website-id="fef661a1-017c-4f4c-8e06-166cfa62ebc1"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
