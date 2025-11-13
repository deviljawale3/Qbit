
import React, { useState, useEffect } from 'react';

const AdConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consentGiven = localStorage.getItem('qbit_ad_consent') === 'true';
      // Assume ads are enabled if this component is rendered.
      if (!consentGiven) {
        setVisible(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('qbit_ad_consent', 'true');
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-orange-400/20 p-4 text-center z-[10000]">
      <p className="text-sm text-gray-300 inline mr-4">
        We show third-party ads to support this service. By using the site you consent to cookies and ads.
      </p>
      <button
        onClick={handleDismiss}
        className="px-4 py-1 text-xs font-bold text-black bg-yellow-400 hover:bg-yellow-300 transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
};

export default AdConsent;
