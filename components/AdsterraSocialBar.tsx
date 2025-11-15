import React, { useEffect } from 'react';
import { areAdsDisabled } from '../utils/botDetector';

const AdsterraSocialBar: React.FC = () => {
  useEffect(() => {
    // Do not show ads if a bot is detected.
    if (areAdsDisabled()) {
      return;
    }

    const scriptId = 'adsterra-social-bar-script';
    // Prevent duplicate script injection on fast re-renders.
    if (document.getElementById(scriptId)) {
        return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.src = '//pl28057356.effectivegatecpm.com/e3/f2/8c/e3f28c1b30356812569586b15646e0f9.js';
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

  // Per instructions, render a container for the ad. The ad script will inject the ad.
  return <div id="adsterra-socialbar-container" aria-hidden="true" />;
};

export default AdsterraSocialBar;
