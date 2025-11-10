
import React, { useEffect } from 'react';
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
  TermsOfServicePage,
  AboutPage,
  ContactPage,
} from './pages/InfoPages';
import { CyberpunkLogo } from './components/Cyberpunk';

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

const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 bg-black/50 border-t border-orange-400/10">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                <div className="text-center sm:text-left">
                    <p>&copy; {new Date().getFullYear()} Qbit Project. All rights reserved.</p>
                    <p className="text-orange-400/80 theme-glow-primary">Introduced By - DeeJay AI Labs</p>
                </div>
                <div className="flex gap-4 mt-4 sm:mt-0 flex-wrap justify-center">
                    <Link to="/privacy" className="hover:text-orange-300 transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-orange-300 transition-colors">Terms</Link>
                    <Link to="/about" className="hover:text-orange-300 transition-colors">About</Link>
                    <Link to="/contact" className="hover:text-orange-300 transition-colors">Contact</Link>
                </div>
            </div>
        </footer>
    );
}


export default function App() {
    useEffect(() => {
        // Register global error listeners for improved debugging
        window.addEventListener("error", (e) => console.error("Global error caught:", e.error));
        window.addEventListener("unhandledrejection", (e) => console.error("Unhandled rejection caught:", e.reason));
    }, []);

    return (
        <ErrorBoundary>
            <Router>
                <div className="min-h-screen bg-black text-gray-200 circuit-bg flex flex-col">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/privacy" element={<PrivacyPolicyPage />} />
                            <Route path="/terms" element={<TermsOfServicePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="*" element={<HomePage />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </ErrorBoundary>
    );
}
