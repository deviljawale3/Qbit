
import React, { useState, useCallback, memo } from 'react';
import { ShortenedLink } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Card, Button, Input } from '../components/UI';
import { QRCodeCanvas } from 'qrcode.react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
// Fix: Replace react-router-dom's Link with Next.js's Link component for proper navigation in a Next.js app.
import Link from 'next/link';
import { ClipboardCopy, Trash2, Edit, XCircle, Share2, BarChart2 } from 'lucide-react';

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-orange-900/30 p-4 flex items-center">
        <div className="text-orange-400 mr-4">{icon}</div>
        <div>
            <div className="text-gray-400 text-sm">{label}</div>
            <div className="text-xl font-orbitron text-white">{value}</div>
        </div>
    </div>
);

const LinkCard: React.FC<{ link: ShortenedLink; onUpdate: (id: string, newLongUrl: string) => void; onDelete: (id: string) => void; }> = memo(({ link, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newLongUrl, setNewLongUrl] = useState(link.longUrl);
    const [showAnalytics, setShowAnalytics] = useState(false);

    const handleUpdate = () => {
        onUpdate(link.id, newLongUrl);
        setIsEditing(false);
    };

    return (
        <Card className="mb-4 overflow-hidden transition-all duration-300 hover:border-orange-400/40 hover:shadow-orange-500/20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
                <div className="flex-grow w-full md:w-auto">
                    <a href={link.longUrl} target="_blank" rel="noopener noreferrer" className="text-lg text-orange-300 hover:text-orange-100 break-all" title={`Redirects to: ${link.longUrl}`}>{link.shortUrl.replace('https://qbit.link', 'Qbit')}</a>
                    {isEditing ? (
                        <div className="flex items-center mt-2">
                           <Input value={newLongUrl} onChange={(e) => setNewLongUrl(e.target.value)} className="text-sm" aria-label="Edit long URL"/>
                           <Button onClick={handleUpdate} className="ml-2">Save</Button>
                           <Button onClick={() => setIsEditing(false)} variant="secondary" className="ml-2">Cancel</Button>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm break-all truncate" title={link.longUrl}>{link.longUrl}</p>
                    )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => setShowAnalytics(!showAnalytics)} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label={showAnalytics ? 'Hide analytics' : 'Show analytics'}>
                        <BarChart2 className="w-5 h-5 text-gray-300" />
                    </button>
                    <button onClick={() => setIsEditing(!isEditing)} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label={isEditing ? 'Cancel edit' : 'Edit link'}>
                        <Edit className="w-5 h-5 text-gray-300" />
                    </button>
                    <button onClick={() => onDelete(link.id)} className="p-2 hover:bg-red-500/20 rounded-full transition-colors" aria-label="Delete link">
                        <Trash2 className="w-5 h-5 text-red-400" />
                    </button>
                </div>
            </div>
             <AnimatePresence>
                {showAnalytics && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-black/20 p-4 border-t border-orange-400/20">
                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <StatCard label="Total Clicks" value={link.clicks} icon={<BarChart2 size={24}/>}/>
                                <StatCard label="QR Scans" value={Math.floor(link.clicks * 0.3)} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5h3v3H5z"/><path d="M5 16h3v3H5z"/><path d="M16 5h3v3h-3z"/><path d="M16 16h3v3h-3z"/><path d="M3 10h18"/><path d="M10 3v18"/></svg>}/>
                               <StatCard label="Top Country" value={link.geoData[0]?.country || 'N/A'} icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>}/>
                           </div>
                           <h3 className="font-orbitron text-yellow-400 mb-2">Clicks by Country</h3>
                            <div style={{ width: '100%', height: 200 }}>
                               <ResponsiveContainer>
                                    <BarChart data={link.geoData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 140, 0, 0.1)" />
                                        <XAxis dataKey="country" stroke="#888" fontSize={12} />
                                        <YAxis stroke="#888" fontSize={12} />
                                        <Tooltip contentStyle={{backgroundColor: '#1a1a1a', border: '1px solid #ff8c00'}}/>
                                        <Bar dataKey="clicks" fill="rgba(255, 140, 0, 0.6)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
});


const DashboardPage: React.FC = () => {
    const [links, setLinks] = useLocalStorage<ShortenedLink[]>('qbit-links', []);

    const updateLink = useCallback((id: string, newLongUrl: string) => {
        setLinks(prevLinks => prevLinks.map(l => l.id === id ? { ...l, longUrl: newLongUrl } : l));
    }, [setLinks]);

    const deleteLink = useCallback((id: string) => {
        setLinks(prevLinks => prevLinks.filter(l => l.id !== id));
    }, [setLinks]);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-orbitron font-bold text-orange-400 theme-glow-primary mb-8">Dashboard</h1>
            {links.length === 0 ? (
                <Card>
                    {/* Fix: Use href prop for Next.js Link component. */}
                    <p className="text-center text-gray-400">You haven't shortened any links yet. Go back to the <Link href="/" className="text-orange-300 underline">homepage</Link> to start.</p>
                </Card>
            ) : (
                 <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    {links.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(link => (
                        <motion.div layout key={link.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <LinkCard link={link} onUpdate={updateLink} onDelete={deleteLink} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default DashboardPage;