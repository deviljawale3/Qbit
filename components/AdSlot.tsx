
import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  id?: string;
  style?: React.CSSProperties;
}

const AdSlot: React.FC<AdSlotProps> = ({ id, style }) => {
  const adRef = useRef<HTMLDivElement | null>(null);
  const injectedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !adRef.current || injectedRef.current) {
      return;
    }

    const adSnippet = process.env.NEXT_PUBLIC_ADSTERRA_SNIPPET;

    if (adSnippet && adSnippet.trim() !== '') {
      try {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = adSnippet;
        adRef.current.appendChild(script);
        injectedRef.current = true;
      } catch (e) {
        console.error("Failed to inject ad snippet:", e);
      }
    }
  }, []);

  const adsterraEnabled = process.env.NEXT_PUBLIC_ADSTERRA_SNIPPET && process.env.NEXT_PUBLIC_ADSTERRA_SNIPPET.trim() !== '';

  return (
    <div
      ref={adRef}
      id={id}
      data-ad-provider="adsterra"
      style={{ minHeight: adsterraEnabled ? '50px' : '0', ...style }}
      aria-hidden={!adsterraEnabled}
    />
  );
};

export default AdSlot;
