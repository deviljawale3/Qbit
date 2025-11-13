
import React, { useEffect, useState } from 'react';
import { getCookie } from '../utils/cookies';

declare global {
  interface Window {
    adsbygoogle?: object[];
  }
}

interface AdSlotProps {
  id?: string;
  style?: React.CSSProperties;
  adSlot: string;
  adClient: string;
  adFormat?: string;
  isResponsive?: boolean;
}

const AdSlot: React.FC<AdSlotProps> = ({ id, style, adSlot, adClient, adFormat = 'auto', isResponsive = true }) => {
  const [adsEnabled, setAdsEnabled] = useState(true);

  useEffect(() => {
    // Ads are disabled if the cookie is set (by bot detector)
    if (getCookie('ads_disabled') === '1') {
      setAdsEnabled(false);
      return;
    }

    try {
       if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
       }
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, [id, adSlot, adClient]);

  if (!adsEnabled || !adSlot || !adClient) {
    return null; // Don't render for bots or if config is missing
  }
  
  return (
    <div id={id} style={style} className="adsbygoogle-container" key={id}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '50px' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={isResponsive.toString()}
      ></ins>
    </div>
  );
};

export default AdSlot;
