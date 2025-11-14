

import React from 'react';

const AdConsent: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-orange-400/20 p-4 text-center z-[10000]">
      <p className="text-sm text-gray-300 inline mr-4">
        We show third-party ads to support this service. By using the site you consent to cookies and ads.
      </p>
      <button
        onClick={onDismiss}
        className="px-4 py-1 text-xs font-bold text-black bg-yellow-400 hover:bg-yellow-300 transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
};

export default AdConsent;