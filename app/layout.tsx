
import type { Metadata } from 'next';
import Script from 'next/script';

// NOTE: In a real Next.js project, you would use next/font.
// This is a simulation based on the provided index.html.
const fontFamilies = {
  shareTechMono: "'Share Tech Mono', monospace",
  orbitron: "'Orbitron', sans-serif",
};

export const metadata: Metadata = {
  // SEO & Core Metadata
  title: 'Qbit - Advanced URL Shortener & QR Code Generator',
  description: 'Shorten, customize, and track your links with Qbit. A fast, reliable, and secure URL shortener with instant QR code generation and detailed analytics.',
  themeColor: '#ff8c00',

  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    url: 'https://qbit.link/',
    siteName: 'Qbit Shortener',
    title: 'Qbit - Advanced URL Shortener & QR Code Generator',
    description: 'A fast, reliable, and secure URL shortener with QR codes and analytics.',
    images: [
      {
        url: 'https://qbit.link/social-preview.png',
        width: 1200,
        height: 630,
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    url: 'https://qbit.link/',
    title: 'Qbit - Advanced URL Shortener & QR Code Generator',
    description: 'A fast, reliable, and secure URL shortener with QR codes and analytics.',
    images: ['https://qbit.link/social-preview.png'],
  },

  // Verification, Ads & Robots
  other: {
    'google-adsense-account': 'ca-pub-3803108248367773',
    'google-site-verification': 'PLACEHOLDER_CODE',
  },
  robots: {
    index: true,
    follow: true,
    noai: true,
    noimageai: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* AdSense Verification & AI Protection Meta Tags */}
        <meta name="google-adsense-account" content="ca-pub-3803108248367773" />
        <meta name="robots" content="noai, noimageai" />
        
        {/* AdSense Script */}
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3803108248367773"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Tailwind CDN & Fonts from original project */}
        <Script id="tailwind-cdn" src="https://cdn.tailwindcss.com?plugins=typography"></Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400..900&display=swap" rel="stylesheet" />
        {/* Inline styles from original project */}
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            font-family: ${fontFamilies.shareTechMono};
            background-color: #0a0a0a;
            color: #e0e0e0;
          }
          .font-orbitron {
            font-family: ${fontFamilies.orbitron};
          }
          .theme-glow-primary {
            text-shadow: 0 0 5px rgba(255, 140, 0, 0.7), 0 0 10px rgba(255, 140, 0, 0.5), 0 0 15px rgba(255, 140, 0, 0.3);
          }
          .theme-glow-secondary {
            text-shadow: 0 0 5px rgba(255, 215, 0, 0.8), 0 0 10px rgba(255, 215, 0, 0.6), 0 0 15px rgba(255, 215, 0, 0.4);
          }
          .theme-border {
            border: 1px solid rgba(255, 140, 0, 0.3);
            box-shadow: 0 0 10px rgba(255, 140, 0, 0.2) inset, 0 0 5px rgba(255, 140, 0, 0.2);
          }
          .circuit-bg {
            background-image:
              linear-gradient(rgba(255, 140, 0, 0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 140, 0, 0.07) 1px, transparent 1px);
            background-size: 2rem 2rem;
            background-position: center center;
          }
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}