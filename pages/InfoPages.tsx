
import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from '../components/UI';
import { ArrowLeft } from 'lucide-react';

const PageContainer: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-300">
    <div className="bg-black/40 backdrop-blur-md theme-border p-8 relative">
        <Link to="/" className="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors" aria-label="Back to Home">
            <Button variant="secondary" className="!px-3 !py-1 !text-xs">
                <ArrowLeft size={16} />
            </Button>
        </Link>
        <h1 className="text-4xl font-orbitron font-bold text-orange-400 theme-glow-primary mb-2 mt-8 text-center">{title}</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">Last updated: 09/11/2025</p>
        <div className="space-y-4 prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-yellow-400 prose-headings:font-orbitron prose-a:text-orange-400 hover:prose-a:text-orange-200 prose-ul:list-disc prose-li:my-1 prose-li:text-gray-300 prose-li::marker:text-orange-400">
          {children}
        </div>
    </div>
  </main>
);

export const PrivacyPolicyPage: React.FC = () => (
  <PageContainer title="Privacy Policy">
    <p>Qbit ("us", "we", or "our") operates the Qbit web application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
    
    <h2>Information Collection and Use</h2>
    <p>We do not collect any personally identifiable information (PII). Any data you enter, such as URLs to be shortened, is processed and may be stored temporarily in your browser's local storage for session persistence but is not transmitted to a central server for permanent storage or analysis.</p>
    
    <h2>Log Data & Analytics</h2>
    <p>We may collect information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, and other statistics. This data is used in an aggregated, anonymized form for basic analytics to understand service usage and is not linked to individual users.</p>
    
    <h2>Cookies</h2>
    <p>Cookies are files with a small amount of data. We may use cookies for essential functionalities, like maintaining your session state. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
    
    <h2>Advertising Partners</h2>
    <p>We may display advertisements served by Google, Adsterra, and other third-party vendors. These vendors use cookies to serve ads based on your prior visits to this or other websites. Google’s use of advertising cookies enables it and its partners to serve ads based on your visit to our Service and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Google’s Ads Settings at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">https://adssettings.google.com</a>. You may also opt out of some personalized advertising via your browser settings or via the ad network’s opt-out tools.</p>

    <h2>Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us by email: <a href="mailto:deejayailabs3@gmail.com">deejayailabs3@gmail.com</a>.</p>
  </PageContainer>
);

export const AboutPage: React.FC = () => (
    <PageContainer title="About Qbit">
        <p>Qbit is a modern, fast, and reliable URL shortener designed for the digital age. We provide a simple way to shorten long links and instantly generate corresponding QR codes, making sharing and tracking easier than ever.</p>
        <p>Built by DeeJay AI Labs, Qbit is a demonstration of efficient, user-focused web tooling. Our mission is to provide a powerful link management tool that is free, accessible, and respects user privacy.</p>
        
        <h2>Key Features</h2>
        <ul>
            <li>Instantly shorten any valid URL.</li>
            <li>Generate and download high-quality QR codes in PNG, JPG, and SVG formats.</li>
            <li>No login or registration required to use the core service.</li>
            <li>A privacy-first approach: we do not track your personal data.</li>
        </ul>

        <p>For inquiries, please contact us at <a href="mailto:deejayailabs3@gmail.com">deejayailabs3@gmail.com</a>.</p>
    </PageContainer>
);

export const ContactPage: React.FC = () => (
    <PageContainer title="Contact Us">
        <p>Have a question or feedback? We'd love to hear from you. Please use the form below or email us directly. We typically respond within 3 business days.</p>
        <p>You can reach us directly at: <a href="mailto:deejayailabs3@gmail.com">deejayailabs3@gmail.com</a></p>
        
        <form action="#" method="post" className="mt-6 flex flex-col gap-4">
            <div>
                <label htmlFor="name" className="block text-yellow-400 font-orbitron mb-2">Name:</label>
                <Input type="text" id="name" name="name" required />
            </div>
            <div>
                <label htmlFor="email" className="block text-yellow-400 font-orbitron mb-2">Email:</label>
                <Input type="email" id="email" name="email" required />
            </div>
            <div>
                <label htmlFor="message" className="block text-yellow-400 font-orbitron mb-2">Message:</label>
                <textarea id="message" name="message" required rows={5} className="w-full bg-black/50 border-2 border-yellow-500/50 focus:border-yellow-500 focus:ring-0 focus:shadow-[0_0_15px_rgba(255,215,0,0.5)] text-gray-200 placeholder-gray-500 p-3 transition-all duration-300"></textarea>
            </div>
            <div className="self-start">
                <Button type="submit">Send Message</Button>
            </div>
        </form>
    </PageContainer>
);
