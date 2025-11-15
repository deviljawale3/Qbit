

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as BrowserRouterImpl,
  HashRouter as HashRouterImpl,
  Routes,
  Route,
  Link
} from "react-router-dom";

// Import components
import ErrorBoundary from './ErrorBoundary';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import {
  PrivacyPolicyPage,
  AboutPage,
  ContactPage,
} from './pages/InfoPages';
import { CyberpunkLogo } from './components/Cyberpunk';
import TermsConditionsModal from './components/TermsConditionsModal';
import { detectAndSetBotCookie } from './utils/botDetector';
import AdsterraSocialBar from './components/AdsterraSocialBar';

const isPreview =
  typeof window !== "undefined" &&
  (window.self !== window.top ||
   window.location.hostname.includes("studio.google") ||
   window.location.hostname.includes("googleusercontent.com"));

const Router = isPreview ? HashRouterImpl : BrowserRouterImpl;

console.info("Qbit router selection:", isPreview ? "hash (preview)" : "browser (prod)", {
  hostname: typeof window !== "undefined" ? window.location.hostname : "unknown"
});


// Re-create Header and Footer to preserve layout
const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-20 border-b border-orange-400/10">
                    <Link to="/" className="flex items-center gap-2">
                        <CyberpunkLogo />
                        <span className="font-orbitron text-2xl font-bold text-white tracking-widest">QBIT</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

const Footer: React.FC<{ onTermsClick: () => void }> = ({ onTermsClick }) => {
    return (
        <footer className="relative z-10 bg-black/50 border-t border-orange-400/10">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                <div className="text-center sm:text-left">
                    <p>&copy; {new Date().getFullYear()} Qbit Project. All rights reserved.</p>
                    <p className="text-orange-400/80 theme-glow-primary">Introduced By - DeeJay AI Labs</p>
                </div>
                <div className="flex gap-4 mt-4 sm:mt-0 flex-wrap justify-center">
                    <Link to="/privacy" className="hover:text-orange-300 transition-colors">Privacy Policy</Link>
                    <button onClick={onTermsClick} className="hover:text-orange-300 transition-colors">Terms &amp; Conditions + Disclaimer</button>
                    <Link to="/about" className="hover:text-orange-300 transition-colors">About</Link>
                    <Link to="/contact" className="hover:text-orange-300 transition-colors">Contact</Link>
                </div>
            </div>
        </footer>
    );
}


export default function App() {
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
    const [adConsentGiven, setAdConsentGiven] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Run bot detection on initial load
        detectAndSetBotCookie();

        // Register global error listeners for improved debugging
        window.addEventListener("error", (e) => console.error("Global error caught:", e.error));
        window.addEventListener("unhandledrejection", (e) => console.error("Unhandled rejection caught:", e.reason));
        
        // Check consent status on mount
        setAdConsentGiven(localStorage.getItem('qbit_ad_consent') === 'true');

        // Check mobile status
        const checkSize = () => {
            setIsMobile(typeof window !== 'undefined' && window.innerWidth < 900);
        };
        checkSize();
        window.addEventListener('resize', checkSize);

        return () => window.removeEventListener('resize', checkSize);
    }, []);

    useEffect(() => {
        // Manage body padding for fixed-bottom ads to prevent content overlap.
        // This is now centralized and site-wide.
        let padding = 0;
        if (!adConsentGiven) {
            padding = 70; // Height for AdConsent banner
        } else {
            // Social bar is always present if consent is given.
            padding = 70; // Approx. height for Social Bar
            if (isMobile) {
                padding += 50; // Add height for the bottom AdSense banner on mobile
            }
        }
        document.body.style.paddingBottom = `${padding}px`;

        // Cleanup function to reset padding
        return () => {
            document.body.style.paddingBottom = '0';
        };
    }, [adConsentGiven, isMobile]);

    const handleConsentDismiss = () => {
        localStorage.setItem('qbit_ad_consent', 'true');
        setAdConsentGiven(true);
    };

    const homePageProps = { isMobile, adConsentGiven, onConsentDismiss: handleConsentDismiss };

    return (
        <ErrorBoundary>
            <Router>
                <div className="min-h-screen bg-black text-gray-200 circuit-bg flex flex-col">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage {...homePageProps} />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/privacy" element={<PrivacyPolicyPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="*" element={<HomePage {...homePageProps} />} />
                        </Routes>
                    </main>
                    <Footer onTermsClick={() => setIsTermsModalOpen(true)} />
                </div>
                <TermsConditionsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
                {adConsentGiven && <AdsterraSocialBar />}
            </Router>
        </ErrorBoundary>
    );
}
