import React from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";

// Dynamic client-only ErrorBoundary to avoid server-side import of client code
const ErrorBoundary = dynamic(() => import("@/components/ErrorBoundary"), { ssr: false });

// Font simulation (from your original index.html)
const fontFamilies = {
  shareTechMono: "'Share Tech Mono', monospace",
  orbitron: "'Orbitron', sans-serif",
};

export const metadata: Metadata = {
  title: "Qbit - Advanced URL Shortener & QR Code Generator",
  description:
    "Shorten, customize, and track your links with Qbit. A fast, reliable, and secure URL shortener with instant QR code generation and detailed analytics.",
  themeColor: "#ff8c00",

  openGraph: {
    type: "website",
    url: "https://qbiturl.vercel.app/",
    siteName: "Qbit Shortener",
    title: "Qbit - Advanced URL Shortener & QR Code Generator",
    description: "A fast, reliable, and secure URL shortener with QR codes and analytics.",
    images: [
      {
        url: "https://qbiturl.vercel.app/social-preview.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    url: "https://qbiturl.vercel.app/",
    title: "Qbit - Advanced URL Shortener & QR Code Generator",
    description: "A fast, reliable, and secure URL shortener with QR codes and analytics.",
    images: ["https://qbiturl.vercel.app/social-preview.png"],
  },

  robots: {
    index: true,
    follow: true,
    noai: true,
    noimageai: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gsc = process.env.NEXT_PUBLIC_GSC || "";

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {gsc ? <meta name="google-site-verification" content={gsc} /> : null}
        <meta name="robots" content="noai, noimageai" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fixed Google Fonts weights: specify explicit weights */}
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body {
                font-family: ${fontFamilies.shareTechMono};
                background-color: #0a0a0a;
                color: #e0e0e0;
                margin: 0;
                padding: 0;
              }
              .font-orbitron { font-family: ${fontFamilies.orbitron}; }
              .theme-glow-primary { text-shadow: 0 0 5px rgba(255,140,0,0.7); }
              .theme-border { border: 1px solid rgba(255,140,0,0.3); }
              .circuit-bg { background-size: 2rem 2rem; background-position: center center; }
            `,
          }}
        />
      </head>

      <body>
        {/* Ads / external scripts placed in body so they run only client-side */}
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3803108248367773"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Script id="tailwind-cdn" src="https://cdn.tailwindcss.com?plugins=typography" strategy="afterInteractive" />

        {/* ErrorBoundary is loaded client-side only */}
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
