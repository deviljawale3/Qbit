"use client";
import React, { useEffect } from 'react';
import { areAdsDisabled } from '../utils/botDetector';

const AdsterraNativeBanner: React.FC = () => {
  useEffect(() => {
    // Do not show ads if a bot is detected or consent is not given.
    if (areAdsDisabled()) {
      return;
    }

    const scriptId = 'adsterra-native-banner-script';
    // Prevent duplicate script injection on fast re-renders.
    if (document.getElementById(scriptId)) {
        return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.src = '//pl23758117.profitablegatecpm.com/13/21/29/1321290352f1906a928508a287c293c6.js';
    script.async = true;

    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts.
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  // The script will find its place; we don't need to render a visible container.
  return <div id="adsterra-native-banner-container" aria-hidden="true" />;
};

export default AdsterraNativeBanner;
