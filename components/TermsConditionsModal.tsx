import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface TermsConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsConditionsModal: React.FC<TermsConditionsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="relative w-full max-w-3xl max-h-[80vh] bg-black/50 backdrop-blur-xl border border-orange-400/30 shadow-lg shadow-orange-500/20 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            aria-modal="true"
            role="dialog"
            aria-labelledby="terms-heading"
          >
            <div className="p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
              
              <h2 id="terms-heading" className="text-3xl font-orbitron font-bold text-orange-400 theme-glow-primary mb-6">Terms &amp; Conditions &amp; Disclaimer</h2>

              <div className="space-y-4 text-gray-300">
                <h3 className="font-orbitron text-yellow-400 text-lg">Usage Responsibility</h3>
                <p>Qbit is a link-shortening and message-customization tool. This app is designed solely for legitimate, productive, and ethical purposes.</p>

                <h3 className="font-orbitron text-yellow-400 text-lg">No Liability for Misuse</h3>
                <p>The creators, developers, contributors, and distributors of Qbit are NOT responsible for any misuse of this application, including but not limited to:</p>
                <ul className="list-disc list-inside pl-4 space-y-1 text-gray-400">
                    <li>Phishing</li>
                    <li>Fraudulent messaging</li>
                    <li>Deceptive redirects</li>
                    <li>Any malicious or unauthorized activity</li>
                </ul>
                <p>Users are fully responsible for all actions performed using this application.</p>

                <h3 className="font-orbitron text-yellow-400 text-lg">Prohibited Use</h3>
                <p>You must NOT use Qbit to generate misleading, harmful, illegal, or fraudulent links or QR codes.</p>
                
                <h3 className="font-orbitron text-yellow-400 text-lg">User Consent</h3>
                <p>By using Qbit, you automatically agree to these Terms &amp; Conditions and accept full responsibility for your actions.</p>
                
                <h3 className="font-orbitron text-yellow-400 text-lg">Disclaimer</h3>
                <p>Qbit provides no guarantees, warranties, or assurances regarding the safety or legitimacy of links created by users.</p>

                <h3 className="font-orbitron text-yellow-400 text-lg">Contact</h3>
                <p>For support or reporting abuse: <a href="mailto:deejayailabs3@gmail.com" className="text-orange-400 hover:underline">deejayailabs3@gmail.com</a></p>

                <h3 className="font-orbitron text-yellow-400 text-lg">Credit</h3>
                <p>“By Deejay AI Lab“</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TermsConditionsModal;
