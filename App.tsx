import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Code2, Database, Cpu, Wifi, Shield, 
  Activity, ExternalLink, Globe, Lock, Share2, 
  ChevronRight, AlertTriangle, Fingerprint, Command,
  Zap, Layers, Box, Aperture, ArrowDownRight, PenTool, Hexagon, Crosshair, MapPin, Power, Send, Brain, ScanLine, Filter,
  Sun, Moon, Cloud, Star,
  Twitter, Github, Linkedin, MessageCircle, Mail, Copy, Check, 
  FileJson, Smartphone, Server, Radio, Clock,
  FileCode, AppWindow, Braces, GitBranch, Package, Layout,
  Monitor, HardDrive, BookOpen, X, Atom, Target, Menu, FileText, Briefcase, Printer, ArrowLeft, Quote, Compass
} from 'lucide-react';

// --- Data ---
const SKILL_DATA = [
  { subject: 'Engineering', A: 98, fullMark: 100 },
  { subject: 'Design', A: 95, fullMark: 100 },
  { subject: 'Web3', A: 85, fullMark: 100 },
  { subject: 'Creativity', A: 92, fullMark: 100 },
  { subject: 'DevOps', A: 94, fullMark: 100 },
  { subject: 'Strategy', A: 90, fullMark: 100 },
];

const PROJECTS = [
  {
    id: 'PRJ-001',
    name: 'Pruf Protocol',
    category: 'BLOCKCHAIN INFRASTRUCTURE',
    status: 'LIVE',
    url: 'https://www.prufprotocol.io/',
    imageUrl: 'https://pbs.twimg.com/profile_banners/1500808234252513285/1768895263/1500x500',
    tech: ['Solidity', 'Web3', 'React', 'The Graph'],
    description: 'A secure, decentralized protocol for asset provenance and identity management.'
  },
  {
    id: 'PRJ-002',
    name: 'TradeSpy',
    category: 'FINTECH AUTOMATION',
    status: 'LIVE',
    url: 'https://t.me/TradeSpyWeb_bot',
    imageUrl: 'https://pbs.twimg.com/profile_banners/1958172544995098624/1755701276/1500x500',
    tech: ['Telegram API', 'Python', 'PostgreSQL'],
    description: 'High-frequency trading signal bot with real-time analytics.'
  },
  {
    id: 'PRJ-003',
    name: 'Gmstree Universe',
    category: 'IMMERSIVE WEB3',
    status: 'LIVE',
    url: 'https://gmstree.devnames.com/',
    imageUrl: 'https://pbs.twimg.com/profile_banners/1827335983811194884/1759507751/1500x500',
    tech: ['Three.js', 'Next.js', 'WebGL', 'Tailwind'],
    description: 'A 3D interactive universe for the Gmstree ecosystem.'
  },
  {
    id: 'PRJ-004',
    name: 'Knowledge Trade',
    category: 'Exchanging Expertise',
    status: 'COMING SOON',
    url: '#',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop', 
    tech: ['Knowledge', 'Trade', 'Learn'],
    description: 'Knowledge Trade aims to become the go-to platform for exchanging expertise and skills. By connecting creators and learners, it builds a sustainable and scalable knowledge-sharing ecosystem.'
  },
  {
    id: 'PRJ-005',
    name: 'SapliNest',
    category: 'Launchpad',
    status: 'COMING SOON',
    url: '#',
    imageUrl: 'data:image/jpeg;base64,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', 
    tech: ['PyTorch', 'LLMs', 'Vector DB'],
    description: 'By building a platform that prioritizes ownership and growth.'
  }
];

// --- Components ---

const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.disconnect(); };
  }, []);
  return (
    <div ref={ref} className={`${className} transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// --- MULTI-LANGUAGE TEXT COMPONENT ---
const MultiLanguageText = ({ word = "ENGINEER", isDark }: { word: string, isDark: boolean }) => {
    const translations = [
        "ENGINEER", "エンジニア", // Japanese
        "工程师", // Chinese
        "مهندس", // Arabic
        "INGÉNIEUR", // French
        "INGENIEUR", // German
        "INGEGNERE", // Italian
        "ENGINEER"
    ];
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState(translations[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % translations.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setDisplayText(translations[index]);
    }, [index]);

    const isArabic = displayText === "مهندس";
    const isJapanese = displayText === "エンジニア";
    const isChinese = displayText === "工程师";

    return (
        <span 
          className={`block animate-text-cycle transition-colors duration-500 text-transparent bg-clip-text bg-gradient-to-r from-tech-accent to-emerald-600 
          ${isArabic ? 'font-arabic' : isJapanese ? 'font-jp' : isChinese ? 'font-sc' : ''}`} 
          key={displayText}
          dir={isArabic ? "rtl" : "ltr"}
        >
            {displayText}
        </span>
    );
};

// --- NEW PREMIUM LOADER (Awwwards Style) ---
const PremiumLoader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    
    useEffect(() => {
        // Fast then slow loader logic
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += Math.random() * 2;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(interval);
                setTimeout(() => setIsExiting(true), 200);
                setTimeout(onComplete, 1200); 
            }
            setProgress(Math.min(currentProgress, 100));
        }, 30);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 z-[9999] bg-[#000000] text-white flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isExiting ? '-translate-y-full' : 'translate-y-0'}`}>
            <div className={`text-[12vw] font-black leading-none tracking-tighter flex items-end font-digital transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                <span>{Math.floor(progress)}</span>
                <span className="text-3xl mb-4 text-tech-accent">%</span>
            </div>
            
            {/* Progress Bar Line */}
            <div className="absolute bottom-0 left-0 h-1 bg-tech-accent transition-all duration-100 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
    );
};  

// --- STORY OVERLAY COMPONENT (Single Continuous Block) ---
const StoryOverlay = ({ isOpen, onClose, isDark }: { isOpen: boolean, onClose: () => void, isDark: boolean }) => {
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden backdrop-blur-3xl animate-fade-in flex items-start justify-center p-0 md:p-10 ${isDark ? 'bg-black/95' : 'bg-white/95'}`}>
            {/* Close Button */}
            <button 
                onClick={onClose} 
                className={`fixed top-4 right-4 z-[110] p-3 rounded-full border transition-all hover:rotate-90 hover:scale-110 ${isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-black/20 text-black hover:bg-black/5'}`}
            >
                <X size={24} />
            </button>

            {/* Content Container */}
            <div className={`relative w-full max-w-3xl mx-auto shadow-2xl overflow-hidden min-h-screen md:min-h-0 md:h-auto animate-slide-up transition-colors duration-500 rounded-none md:rounded-sm mt-0 md:mt-20 ${isDark ? 'bg-[#000000] text-gray-200' : 'bg-[#ffffff] text-gray-900 shadow-xl'}`}>
                
                <div className="px-6 py-20 md:px-16 md:py-20 relative">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 border border-tech-accent/30 text-tech-accent text-[10px] font-mono font-bold tracking-[0.3em] uppercase">
                            SMALL STORY
                        </div>
                        <h1 className={`text-4xl md:text-7xl font-black mb-6 leading-none tracking-tighter font-serif`}>
                            The Architect<br/>of Patience
                        </h1>
                        <div className={`w-24 h-1 mx-auto mb-6 bg-tech-accent`}></div>
                    </div>

                    {/* Article Content - Single Column Continuous */}
                    <div className={`prose prose-lg md:prose-xl max-w-none font-serif leading-relaxed ${isDark ? 'prose-invert' : ''}`}>
                        
                        <p className="mb-8 first-letter:text-5xl md:first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-[-6px] first-letter:leading-none">
                            It all started in the quiet months of late 2019. While the world was shifting, my journey began with a curiosity for Cybersecurity. I was fascinated by the hidden layers of the internet. But as I dove deeper, I realized I didn't just want to break systems; I wanted to create them. This realization led me to pivot into Graphic Design and WordPress Development. I was learning, exploring, and slowly finding my footing in the digital world.
                        </p>

                        <h3 className="text-xl md:text-2xl font-bold mb-4 mt-12 font-sans uppercase tracking-wider text-tech-accent">The Web3 Crucible</h3>
                        <p className="mb-8">
                           Then came Web3—a wild, chaotic, yet promising frontier. My entry wasn't smooth. Like many, I paid the "tuition fee" of experience by falling victim to scams and bad investments. But I didn't quit. Instead of retreating, I turned to research. I taught myself the intricacies of blockchain, decentralization, and the logic that governs this space. Those failures were my harshest teachers, but they shaped the builder I am today.
                        </p>

                        <div className={`p-6 md:p-8 border-l-4 border-tech-accent italic text-lg md:text-xl mb-12 bg-opacity-5 ${isDark ? 'bg-white' : 'bg-black'}`}>
                             "This journey was never a solo mission. My foundation has always been my parents, whose silent prayers kept me going."
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold mb-4 mt-12 font-sans uppercase tracking-wider text-tech-accent">The Circle of Trust</h3>
                        <p className="mb-8">
                            Along the way, I found a digital family—"Big Brothers" who mentored me when I was lost, and "Little Brothers" who worked beside me, believing in my vision even when things were tough. From writing code to brainstorming ideas late at night, this ecosystem of support turned my struggles into shared victories.
                        </p>

                        <h3 className="text-xl md:text-2xl font-bold mb-4 mt-12 font-sans uppercase tracking-wider text-tech-accent">The Builder’s Mindset</h3>
                        <p className="mb-8">
                            From the very beginning, I had one burning desire: To build something of my own. I didn't want to just be a passenger in someone else's vehicle; I wanted to drive. This drive pushed me to evolve from a learner to a Full-Stack Product Builder. It wasn’t easy. Behind every project I ship today, there are years of sleepless nights, frustration, and relentless hard work that nobody sees.
                        </p>

                        <h3 className="text-xl md:text-2xl font-bold mb-4 mt-12 font-sans uppercase tracking-wider text-tech-accent">Trusting the Timing</h3>
                        <p className="mb-8">
                            I haven't reached my final destination yet. I am not standing at the peak of the mountain—not yet. But I am a firm believer in Divine Timing. I believe that every effort, every failure, and every sleepless night is adding up to something greater. I am still learning. I am still building. And most importantly, I am still waiting. Not idly, but actively preparing myself for that one moment when preparation meets opportunity. Until then, I will keep showing up, giving my best effort, and trusting that my time is coming.
                        </p>

                    </div>
                    
                    <div className="mt-24 text-center border-t pt-12 border-dashed border-gray-500/30">
                        <div className="font-digital text-4xl md:text-5xl tracking-widest text-tech-accent">SIZAR.DEV</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- RESUME PAGE COMPONENT (Replaced Overlay) ---
const ResumeOverlay = ({ isOpen, onClose, isDark }: { isOpen: boolean, onClose: () => void, isDark: boolean }) => {
    if (!isOpen) return null;

    const [copiedEmail1, setCopiedEmail1] = useState(false);
    const [copiedEmail2, setCopiedEmail2] = useState(false);

    const handleCopy = (email: string, setFn: (val: boolean) => void) => {
        navigator.clipboard.writeText(email);
        setFn(true);
        setTimeout(() => setFn(false), 2000);
    };

    return (
        <div className={`fixed inset-0 z-[200] overflow-y-auto animate-fade-in cursor-auto ${isDark ? 'bg-[#111]' : 'bg-[#f3f4f6]'}`}>
            <style>{`
                @media print {
                    @page { margin: 0; size: auto; }
                    body { background: white; }
                    body * { visibility: hidden; }
                    #resume-content, #resume-content * { visibility: visible; }
                    #resume-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        max-width: none;
                        margin: 0;
                        padding: 0;
                        background-color: white !important;
                        color: black !important;
                        box-shadow: none;
                        border: none;
                    }
                    .no-print { display: none !important; }
                    /* Ensure icons print well */
                    svg { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            `}</style>
            
            {/* Top Bar for Controls */}
             <div className={`sticky top-0 z-[210] w-full flex justify-between items-center px-4 py-4 md:px-8 md:py-6 backdrop-blur-md border-b no-print ${isDark ? 'bg-black/80 border-white/10' : 'bg-white/80 border-black/10'}`}>
                <button 
                    onClick={onClose} 
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold transition-all hover:bg-opacity-80 ${isDark ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5'}`}
                >
                    <ArrowLeft size={18} /> RETURN
                </button>
                
                <div className={`text-sm font-mono tracking-widest hidden md:block opacity-50 ${isDark ? 'text-white' : 'text-black'}`}>
                    RESUME
                </div>

                <div className="w-8"></div> {/* Spacer for alignment since download button removed */}
            </div>

            {/* Resume Page Container - Centered */}
            <div className="min-h-screen w-full flex justify-center p-0 md:p-8 lg:p-12 pb-24">
                <div id="resume-content" className="relative w-full max-w-5xl bg-white text-black shadow-2xl flex flex-col md:rounded-sm overflow-hidden min-h-[1200px]">
                    
                    {/* Header Section */}
                    <div className="p-8 md:p-12 pb-8 border-b-2 border-black">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                            <div className="order-2 md:order-1">
                                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-2 uppercase leading-none">ABDUL MONAIM SIZAR</h1>
                                <p className="text-sm md:text-base font-mono text-gray-600 tracking-widest uppercase mb-6 mt-4">FULL-STACK PRODUCT BUILDER & AI-AUGMENTED ENGINEER</p>
                            </div>
                            <div className="order-1 md:order-2 w-full md:w-auto flex justify-center md:justify-end mb-6 md:mb-0">
                                <img 
                                    src="https://avatars.githubusercontent.com/u/183996840?v=4" 
                                    alt="Sizar Profile" 
                                    className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-lg object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Contact Grid */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            {/* Email 1 */}
                            <div className="group relative border border-gray-300 hover:border-black p-4 transition-all duration-300 bg-gray-50 hover:bg-white rounded-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-black text-white rounded-sm group-hover:bg-tech-accent group-hover:text-black transition-colors">
                                            <Mail size={16} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">Primary Contact</div>
                                            <div className="font-mono font-bold text-sm sm:text-base break-all">sizar.web@gmail.com</div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleCopy('sizar.web@gmail.com', setCopiedEmail1)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
                                    >
                                        {copiedEmail1 ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-400 group-hover:text-black" />}
                                    </button>
                                </div>
                            </div>

                             {/* Email 2 */}
                             <div className="group relative border border-gray-300 hover:border-black p-4 transition-all duration-300 bg-gray-50 hover:bg-white rounded-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-black text-white rounded-sm group-hover:bg-tech-accent group-hover:text-black transition-colors">
                                            <Briefcase size={16} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">Work Protocol</div>
                                            <div className="font-mono font-bold text-sm sm:text-base break-all">sizar@prufprotocol.io</div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleCopy('sizar@prufprotocol.io', setCopiedEmail2)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
                                    >
                                        {copiedEmail2 ? <Check size={16} className="text-green-600" /> : <Copy size={16} className="text-gray-400 group-hover:text-black" />}
                                    </button>
                                </div>
                            </div>
                         </div>
                         
                         <div className="flex flex-wrap gap-6 mt-8 text-sm font-mono text-gray-600 pt-6 border-t border-dashed border-gray-300">
                            <span className="flex items-center gap-2 hover:text-black transition-colors cursor-default"><MapPin size={14} className="text-tech-accent" /> Dhaka, Bangladesh</span>
                            <a href="https://sizar.devnames.com" target="_blank" className="flex items-center gap-2 hover:text-black transition-colors hover:underline decoration-tech-accent"><Globe size={14} className="text-tech-accent" /> sizar.devnames.com</a>
                         </div>
                    </div>

                    <div className="flex flex-col md:grid md:grid-cols-3 min-h-[800px]">
                        {/* Left Sidebar (Skills & Education) */}
                        <div className="order-2 md:order-1 bg-gray-50 p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-200">
                            {/* Skills Section */}
                            <div className="mb-12">
                                <h3 className="text-lg font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6 flex items-center gap-2">
                                    <Cpu size={18} /> TECHNICAL SKILLS
                                </h3>
                                
                                <div className="space-y-8">
                                    <div>
                                        <div className="text-xs font-bold uppercase text-gray-400 mb-3 flex items-center gap-2"><Code2 size={12}/> Core Stack</div>
                                        <div className="flex flex-wrap gap-2">
                                            {['JavaScript (ES6+)', 'React.js', 'Next.js', 'Node.js', 'Python', 'Tailwind CSS'].map(s => (
                                                <span key={s} className="px-2 py-1 bg-white border border-gray-300 text-[10px] font-bold shadow-sm hover:border-black transition-all cursor-default">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase text-gray-400 mb-3 flex items-center gap-2"><Brain size={12}/> AI Engineering</div>
                                        <div className="flex flex-wrap gap-2">
                                            {['Agentic Workflows', 'Cursor/Claude', 'Prompt Eng.', 'LLM Integration'].map(s => (
                                                <span key={s} className="px-2 py-1 bg-white border border-gray-300 text-[10px] font-bold shadow-sm hover:border-black transition-all cursor-default">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                     <div>
                                        <div className="text-xs font-bold uppercase text-gray-400 mb-3 flex items-center gap-2"><Hexagon size={12}/> Web3</div>
                                        <div className="flex flex-wrap gap-2">
                                            {['Decentralized Logic', 'Wallet-less Arch', 'Solidity (Basic)'].map(s => (
                                                <span key={s} className="px-2 py-1 bg-white border border-gray-300 text-[10px] font-bold shadow-sm hover:border-black transition-all cursor-default">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase text-gray-400 mb-3 flex items-center gap-2"><PenTool size={12}/> Design</div>
                                        <div className="flex flex-wrap gap-2">
                                            {['UI/UX (Figma)', 'Hi-Fi Prototyping', 'Motion Graphics'].map(s => (
                                                <span key={s} className="px-2 py-1 bg-white border border-gray-300 text-[10px] font-bold shadow-sm hover:border-black transition-all cursor-default">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase text-gray-400 mb-3 flex items-center gap-2"><Terminal size={12}/> Tools</div>
                                        <div className="flex flex-wrap gap-2">
                                            {['Git', 'Docker', 'Vercel', 'Linux', 'MongoDB', 'PostgreSQL'].map(s => (
                                                <span key={s} className="px-2 py-1 bg-white border border-gray-300 text-[10px] font-bold shadow-sm hover:border-black transition-all cursor-default">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Education */}
                             <div className="mb-12">
                                <h3 className="text-lg font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6 flex items-center gap-2">
                                    <BookOpen size={18} /> EDUCATION
                                </h3>
                                <div className="bg-white p-4 border border-gray-200 shadow-sm">
                                    <div className="font-bold text-sm leading-tight mb-2">B.Sc. in Computer Science & Engineering (CSE)</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Current Undergraduate Student</div>
                                    <p className="text-[11px] text-gray-600 leading-relaxed font-mono">
                                        Focus: System Architecture, AI-Driven Development, Human-Computer Interaction.
                                    </p>
                                </div>
                            </div>

                            {/* Interests */}
                             <div className="mb-12">
                                <h3 className="text-lg font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6 flex items-center gap-2">
                                    <Compass size={18} /> INTERESTS
                                </h3>
                                <div className="space-y-4">
                                     <div className="text-xs leading-relaxed text-gray-700">
                                        <strong className="block text-black mb-1">Notebook Collecting:</strong> Passionate about collecting analog notebooks for sketching architectural ideas.
                                     </div>
                                     <div className="text-xs leading-relaxed text-gray-700">
                                        <strong className="block text-black mb-1">Product Research:</strong> Constantly deconstructing successful apps to understand their growth loops.
                                     </div>
                                     <div className="text-xs leading-relaxed text-gray-700">
                                        <strong className="block text-black mb-1">Traveling:</strong> Exploring new environments to fuel creative design thinking.
                                     </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Main Content (Experience & Projects) */}
                        <div className="order-1 md:order-2 md:col-span-2 p-8 md:p-12">
                             
                             {/* MOVED SUMMARY HERE */}
                             <div className="mb-12">
                                <h3 className="text-lg sm:text-2xl font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-6 flex items-center gap-2 whitespace-nowrap">
                                    <Quote size={24} /> PROFESSIONAL SYNOPSIS
                                </h3>
                                <div className="text-sm leading-relaxed text-gray-700 font-medium space-y-4">
                                    <p><strong className="text-black">Founder of Pruf Protocol:</strong> Architected a decentralized verification layer (vcFi) validating authentic human engagement without APIs/Wallets.</p>
                                    <p><strong className="text-black">Solo-Builder & AI Expert:</strong> Leverage agentic AI workflows (Claude/Gemini) to deploy production-grade full-stack applications single-handedly, equivalent to a 5-person engineering team.</p>
                                    <p><strong className="text-black">Rapid Execution:</strong> Scaled Pruf Protocol to 227+ organic users with zero marketing budget by leveraging viral growth mechanics.</p>
                                </div>
                             </div>

                             {/* Experience */}
                             <div className="mb-12">
                                <h3 className="text-2xl font-black uppercase tracking-widest border-b-2 border-black pb-2 mb-8 flex items-center gap-2">
                                    <Activity size={24} /> EXPERIENCE
                                </h3>

                                <div className="space-y-12 relative">
                                    <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gray-200"></div>

                                    {/* Item 1 */}
                                    <div className="relative pl-8 group">
                                        <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-4 border-white bg-black shadow-sm z-10 group-hover:scale-125 transition-transform"></div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                            <h4 className="text-xl font-black uppercase group-hover:text-tech-accent transition-colors">PRUF PROTOCOL</h4>
                                            <span className="font-mono text-[10px] font-bold bg-black text-white px-2 py-1 tracking-wider mt-1 sm:mt-0 w-fit">OCT 2025 — PRESENT</span>
                                        </div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">Founder & Lead Engineer <span className="w-1 h-1 bg-gray-400 rounded-full"></span> Remote</div>
                                        <ul className="list-disc ml-4 text-sm text-gray-700 space-y-2 leading-relaxed marker:text-black">
                                            <li><strong>Invented "Proof-of-Mention" (PoM):</strong> Built a proprietary verification engine that validates social engagement using 12-step logic checks (Anti-Bot, Duplicate Entry, AI Artifacts).</li>
                                            <li><strong>Full-Stack Architecture:</strong> Designed and deployed the entire ecosystem (Next.js Frontend, Node.js Backend, Database) solo, ensuring 99.9% uptime.</li>
                                            <li><strong>Product Strategy:</strong> Identified the collapse of "InfoFi" and pivoted to "Verification Content Finance (vcFi)," positioning the protocol as a trust-layer for Web3.</li>
                                            <li><strong>User Growth:</strong> Achieved 227+ active users purely through product-led growth and community trust building.</li>
                                        </ul>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="relative pl-8 group">
                                        <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-4 border-white bg-gray-400 shadow-sm z-10 group-hover:scale-125 transition-transform group-hover:bg-black"></div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                            <h4 className="text-xl font-black uppercase group-hover:text-tech-accent transition-colors">GMSTREE</h4>
                                            <span className="font-mono text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 tracking-wider mt-1 sm:mt-0 w-fit border border-gray-200">TELEGRAM MINI-APP PLATFORM</span>
                                        </div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">Founder & Tech Lead <span className="w-1 h-1 bg-gray-400 rounded-full"></span> Remote</div>
                                        <ul className="list-disc ml-4 text-sm text-gray-700 space-y-2 leading-relaxed marker:text-gray-400 group-hover:marker:text-black">
                                            <li>Founded a Telegram-based "Play-to-Earn" gaming ecosystem.</li>
                                            <li>Developed the MVP game mechanics and integrated Telegram API for seamless user onboarding.</li>
                                            <li>Managed product roadmap and community engagement strategies before pausing due to funding constraints.</li>
                                        </ul>
                                    </div>

                                    {/* Item 3 */}
                                     <div className="relative pl-8 group">
                                        <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-4 border-white bg-gray-400 shadow-sm z-10 group-hover:scale-125 transition-transform group-hover:bg-black"></div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                                            <h4 className="text-xl font-black uppercase group-hover:text-tech-accent transition-colors">TRADESPY</h4>
                                            <span className="font-mono text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 tracking-wider mt-1 sm:mt-0 w-fit border border-gray-200">FINTECH & TRADING TOOLS</span>
                                        </div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">Lead Developer & Product Designer <span className="w-1 h-1 bg-gray-400 rounded-full"></span> Remote</div>
                                        <ul className="list-disc ml-4 text-sm text-gray-700 space-y-2 leading-relaxed marker:text-gray-400 group-hover:marker:text-black">
                                            <li>Developed automated signal distribution tools for crypto trading communities.</li>
                                            <li>Designed high-fidelity dashboards for profit/loss tracking, improving data visualization for retail traders.</li>
                                            <li>Automated reporting workflows, reducing manual effort by 90%.</li>
                                        </ul>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>

                    {/* Footer Bar */}
                    <div className="bg-gray-100 p-6 border-t border-gray-200 text-center font-mono text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2"><Fingerprint size={12}/> SIZAR_DEV </div>
                        <div className="flex gap-6">
                            <span className="flex items-center gap-2"><MapPin size={10} /> 23.81° N, 90.41° E</span>
                            <span className="flex items-center gap-2"><Lock size={10} /> VERIFIED </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Nature Elements ---

const BirdSilhouette = ({ delay, scale = 1, top, left }: { delay: number, scale?: number, top: string, left: string }) => (
    <div className="absolute animate-bird-fly opacity-70 pointer-events-none z-0" style={{ animationDelay: `${delay}s`, top, left, transform: `scale(${scale})` }}>
        <svg width="20" height="10" viewBox="0 0 20 10" fill="black" className="animate-wing-flap origin-bottom">
            <path d="M0 10 Q 5 0, 10 5 T 20 10" stroke="none" />
        </svg>
    </div>
);

const Birds = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden h-[50vh]">
      <BirdSilhouette delay={0} top="20%" left="-10%" scale={0.8} />
      <BirdSilhouette delay={2} top="25%" left="-15%" scale={0.6} />
      <BirdSilhouette delay={5} top="15%" left="-20%" scale={0.5} />
  </div>
);

const Clouds = ({ isNight }: { isNight?: boolean }) => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <div className={`absolute top-[10%] left-[5%] animate-float transition-all duration-1000 ${isNight ? 'opacity-30 text-gray-400' : 'opacity-90 text-white'}`}>
        <Cloud size={140} fill={isNight ? "#94a3b8" : "white"} className={`drop-shadow-xl ${isNight ? 'text-slate-400' : 'text-white'}`} />
    </div>
    <div className={`absolute top-[20%] right-[15%] animate-float-delayed transition-all duration-1000 ${isNight ? 'opacity-20 text-gray-500' : 'opacity-80 text-white'}`}>
        <Cloud size={200} fill={isNight ? "#64748b" : "white"} className={`drop-shadow-2xl ${isNight ? 'text-slate-500' : 'text-white'}`} />
    </div>
  </div>
);

const Fireflies = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {Array(25).fill(0).map((_, i) => (
            <div 
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-firefly shadow-[0_0_10px_rgba(253,224,71,0.9)] opacity-0"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${8 + Math.random() * 12}s`,
                    animationDelay: `${Math.random() * 5}s`
                }}
            ></div>
        ))}
    </div>
);

// --- Theme & Background Logic ---

const BackgroundEffects = ({ isDark }: { isDark: boolean }) => (
  <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-1000 ease-in-out`}>
    <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isDark ? 'opacity-0' : 'opacity-100 bg-gradient-to-b from-[#38bdf8] via-[#bae6fd] to-white'}`}></div>
    <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isDark ? 'opacity-100 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#000000]' : 'opacity-0'}`}></div>
    <div className="bg-noise mix-blend-overlay"></div>
    <div className={`absolute inset-0 animated-grid transition-opacity duration-1000 ${isDark ? 'opacity-10 opacity-[0.1] invert' : 'opacity-20'}`}></div>
    
    {/* DAY MODE: SUN */}
    <div className={`absolute top-10 right-10 transition-all duration-1000 transform ease-in-out ${isDark ? 'translate-y-[150%] opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
            <div className="absolute inset-[-100%] rounded-full sun-glow opacity-60"></div>
            <div className="absolute inset-[-50%] rounded-full bg-orange-400/20 blur-3xl"></div>
            <div className="w-full h-full rounded-full bg-white shadow-[0_0_60px_rgba(255,200,0,0.8)] relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300 to-white opacity-80"></div>
            </div>
        </div>
    </div>

    {/* NIGHT MODE: MOON */}
    <div className={`absolute top-10 right-10 transition-all duration-1000 transform ease-in-out ${isDark ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-[150%] opacity-0 -rotate-90'}`}>
        <div className="relative w-32 h-32 md:w-40 md:h-40">
             <div className="absolute inset-[-50%] bg-blue-100/10 rounded-full blur-3xl"></div>
             <div className="w-full h-full rounded-full moon-texture relative z-10 overflow-hidden border border-slate-700/30"></div>
        </div>
    </div>

    <div className={`transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-100'}`}>
        <Clouds isNight={isDark} />
    </div>

    {/* Birds only in day */}
    <div className={`transition-opacity duration-1000 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
        <Birds />
    </div>

    {/* STARS (Night Only) */}
    <div className={`absolute inset-0 transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        {Array(100).fill(0).map((_, i) => (
            <div 
                key={i}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                    top: `${Math.random() * 60}%`, 
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 2}px`,
                    height: `${Math.random() * 2}px`,
                    animationDelay: `${Math.random() * 5}s`
                }}
            ></div>
        ))}
    </div>

    {/* FIREFLIES (Night Only) - "Junaki" */}
    {isDark && <Fireflies />}
    
    <div className={`absolute top-1/4 left-10 animate-pulse font-mono text-6xl md:text-9xl font-black select-none transition-colors duration-1000 ${isDark ? 'text-white/5' : 'text-black/5'}`}>
       01
    </div>
    <div className={`absolute bottom-1/4 right-10 animate-pulse font-mono text-6xl md:text-9xl font-black select-none transition-colors duration-1000 ${isDark ? 'text-white/5' : 'text-black/5'}`}>
       00
    </div>
  </div>
);

const NavBar = ({ isDark, toggleTheme, onOpenStory, onOpenResume }: { isDark: boolean, toggleTheme: () => void, onOpenStory: () => void, onOpenResume: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = ['hero:HOME', 'about:PROFILE', 'creative:CREATIVE', 'projects:PROJECT', 'skills:CAPABILITIES', 'contact:CONNECTION'];

  return (
    <>
    <nav className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b flex justify-between items-center px-6 py-3 shadow-sm transition-all duration-1000 ${isDark ? 'bg-black/80 border-white/10 text-white' : 'bg-white/60 border-black/5 text-black'}`}>
      <div className="flex items-center gap-3 interactive cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
           <img 
             src={isDark ? "https://github.com/Gmstree/Images/blob/main/wlogo.png?raw=true" : "https://github.com/Gmstree/Images/blob/main/blogo.png?raw=true"} 
             alt="Sizar Logo" 
             className="w-12 h-12 md:w-16 md:h-16 object-contain" 
           />
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-10 text-[10px] font-mono font-bold tracking-widest relative z-50">
        {navItems.map(item => {
           const [id, label] = item.split(':');
           return (
            <a key={id} href={`#${id}`} onClick={(e) => scrollToSection(e, id)} className="hover:text-tech-accent transition-colors interactive relative group cursor-pointer">
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-tech-accent group-hover:w-full transition-all"></span>
            </a>
           );
        })}
        <button onClick={onOpenResume} className="hover:text-tech-accent transition-colors interactive relative group cursor-pointer flex items-center gap-1">
            RESUME
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-tech-accent group-hover:w-full transition-all"></span>
        </button>
        <button onClick={onOpenStory} className="hover:text-tech-accent transition-colors interactive relative group cursor-pointer">
            STORY
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-tech-accent group-hover:w-full transition-all"></span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className={`interactive p-2 rounded-full border transition-all duration-300 ${isDark ? 'border-white/20 hover:bg-white/10 text-white' : 'border-black/10 hover:bg-black/5 text-black'}`}
          title="Toggle System Theme"
        >
           {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* Mobile Menu Button */}
        <button 
           className="md:hidden interactive p-2"
           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>

    {/* Mobile Menu Overlay */}
    {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-40 pt-24 px-6 md:hidden flex flex-col gap-6 backdrop-blur-xl transition-all duration-300 ${isDark ? 'bg-black/90 text-white' : 'bg-white/95 text-black'}`}>
            {navItems.map(item => {
                const [id, label] = item.split(':');
                return (
                <a 
                    key={id} 
                    href={`#${id}`} 
                    onClick={(e) => scrollToSection(e, id)} 
                    className="text-xl font-bold font-mono tracking-widest border-b pb-4 hover:text-tech-accent transition-colors"
                >
                    {label}
                </a>
                );
            })}
            <button 
                onClick={() => { onOpenResume(); setIsMobileMenuOpen(false); }} 
                className="text-xl font-bold font-mono tracking-widest border-b pb-4 text-left hover:text-tech-accent transition-colors flex items-center gap-2"
            >
                ACCESS_RESUME
            </button>
            <button 
                onClick={() => { onOpenStory(); setIsMobileMenuOpen(false); }} 
                className="text-xl font-bold font-mono tracking-widest border-b pb-4 text-left hover:text-tech-accent transition-colors"
            >
                ACCESS_STORY
            </button>
        </div>
    )}
    </>
  );
};

const Hero = ({ isDark }: { isDark: boolean }) => {
  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen pt-20 flex flex-col relative z-10 justify-center overflow-hidden">
       <div className={`absolute top-0 right-0 w-1/2 h-full opacity-5 transform skew-x-12 border-l ${isDark ? 'border-white bg-white/5' : 'border-black bg-black/5'}`}></div>
       <div className={`absolute bottom-0 left-0 w-1/3 h-full opacity-5 transform -skew-x-12 border-r ${isDark ? 'border-white bg-white/5' : 'border-black bg-black/5'}`}></div>

       <div className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto w-full px-6 relative text-center">
          
          <div className="relative z-20 mb-8">
             <div className={`inline-flex items-center gap-2 mb-8 justify-center w-full ${isDark ? 'text-tech-accent' : 'text-tech-accent'}`}>
                <Terminal size={12} />
                <span className="text-xs font-mono font-bold tracking-widest animate-pulse"> S I Z A R </span>
             </div>
             
             {/* Center-Aligned Huge Text */}
             <h1 className={`text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-8 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>
                <span className="block animate-slide-up delay-100">FULL STACK</span>
                <div className="h-[1.1em] overflow-hidden">
                   <MultiLanguageText word="ENGINEER" isDark={isDark} />
                </div>
                <span className={`block text-3xl md:text-6xl font-light italic opacity-80 animate-slide-up delay-300 mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                   & DESIGNER
                </span>
             </h1>
             
             <p className={`text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-mono mb-12 transition-colors duration-1000 ${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
                Architecting decentralized systems & crafting high-fidelity digital experiences.
             </p>

             <div className="flex flex-wrap gap-6 justify-center">
                 <button 
                   onClick={() => scrollToId('projects')}
                   className={`interactive px-8 py-4 font-bold tracking-widest transition-all flex items-center gap-3 group clip-corner relative overflow-hidden ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
                 >
                    <span className="relative z-10 group-hover:text-white transition-colors">INITIATE_PROJECT</span>
                    <div className="absolute inset-0 bg-tech-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0"></div>
                    <ArrowDownRight size={18} className="relative z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                 </button>
                 <button 
                   onClick={() => scrollToId('skills')}
                   className={`interactive px-8 py-4 border font-bold font-mono tracking-widest clip-corner transition-all hover:scale-105 ${isDark ? 'border-white text-white hover:bg-white/10' : 'border-black text-black hover:bg-black/5'}`}
                 >
                    ACCESS_LOGS
                 </button>
             </div>
          </div>
       </div>
    </section>
  );
};

const CreativeBackground = ({ isDark }: { isDark: boolean }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ 
          x: (e.clientX / window.innerWidth) * 20 - 10, 
          y: (e.clientY / window.innerHeight) * 20 - 10 
        });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-10' : 'opacity-20'}`}>
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 border rounded-full transition-transform duration-700 ease-out ${isDark ? 'border-white/10' : 'border-black/10'}`} 
             style={{ transform: `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)` }}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-[600px] h-[600px] border rounded-full transition-transform duration-1000 ease-out ${isDark ? 'border-white/5' : 'border-black/5'}`}
             style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)` }}></div>
    </div>
  )
}

const CreativeSection = ({ isDark }: { isDark: boolean }) => (
   <section id="creative" className={`py-32 relative overflow-hidden border-t border-b transition-colors duration-1000 ${isDark ? 'bg-[#0a0a0a] border-white/5' : 'bg-white/80 border-gray-100 backdrop-blur-sm'}`}>
      <CreativeBackground isDark={isDark} />
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tech-accent to-transparent opacity-10`}></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <Reveal>
             <div className="mb-4 text-tech-accent font-bold tracking-widest text-xs flex items-center gap-2">
                <PenTool size={14} /> DESIGN_ENGINEERING
             </div>
             <h2 className={`text-5xl md:text-7xl font-black mb-8 leading-none transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>
                CREATIVE<br/>
                <span className={`text-outline-tech ${isDark ? 'stroke-white text-white' : 'stroke-black text-black'}`}>INTELLIGENCE</span>
             </h2>
             <p className={`text-lg md:text-xl font-mono mb-10 border-l-4 pl-6 py-2 leading-relaxed transition-colors duration-1000 ${isDark ? 'text-gray-400 border-white' : 'text-gray-800 border-black'}`}>
                Merging technical architecture with high-fidelity aesthetics. I don't just build code; I engineer digital experiences.
             </p>
             <div className="grid grid-cols-2 gap-6">
                 {[
                    'UI/UX Architecture', 'Visual Systems', 'Motion Design', 'Brand Strategy', 'AI Engineering'
                 ].map(skill => (
                    <div key={skill} className={`flex items-center gap-3 font-bold text-sm border-b pb-2 transition-colors duration-1000 ${isDark ? 'text-gray-300 border-white/10' : 'text-black border-black/20'}`}>
                       {skill === 'AI Engineering' ? <Brain size={14} className="text-tech-accent" /> : <Hexagon size={14} className="text-tech-accent" />}
                       {skill}
                    </div>
                 ))}
             </div>
          </Reveal>

          {/* 3D CUBE ANIMATION */}
          <div className="h-[300px] md:h-[400px] flex items-center justify-center relative perspective-1000">
             <div className={`relative w-[100px] md:w-[120px] h-[100px] md:h-[120px] preserve-3d animate-rotate-3d text-tech-accent ${isDark ? 'text-white' : 'text-black'}`}>
                <div className={`cube-face ${isDark ? 'border-white/20' : 'border-black/30'}`}><Box size={40} strokeWidth={1} /></div>
                <div className={`cube-face ${isDark ? 'border-white/20' : 'border-black/30'}`}><Layers size={40} strokeWidth={1} /></div>
                <div className={`cube-face ${isDark ? 'border-white/20' : 'border-black/30'}`}><Cpu size={40} strokeWidth={1} /></div>
                <div className={`cube-face ${isDark ? 'border-white/20' : 'border-black/30'}`}><Database size={40} strokeWidth={1} /></div>
                <div className={`cube-face ${isDark ? 'border-white/20' : 'border-black/30'}`}><Code2 size={40} strokeWidth={1} /></div>
                <div className={`cube-face ${isDark ? 'border-white/20' : 'border-black/30'}`}><Command size={40} strokeWidth={1} /></div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] md:w-[60px] h-[50px] md:h-[60px] preserve-3d animate-rotate-3d-reverse">
                    <div className="cube-face-inner text-tech-accent"></div>
                    <div className="cube-face-inner text-tech-accent"></div>
                    <div className="cube-face-inner text-tech-accent"></div>
                    <div className="cube-face-inner text-tech-accent"></div>
                    <div className="cube-face-inner text-tech-accent"></div>
                    <div className="cube-face-inner text-tech-accent"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-tech-accent rounded-full shadow-[0_0_20px_#00cc00] animate-pulse"></div>
                </div>
             </div>
             
             <div className={`absolute w-56 md:w-64 h-56 md:h-64 border rounded-full animate-spin-slow opacity-30 ${isDark ? 'border-white' : 'border-black'}`} style={{ animationDuration: '30s' }}></div>
             <div className="absolute w-72 md:w-80 h-72 md:h-80 border border-dashed rounded-full animate-spin-reverse-slow opacity-20 border-tech-accent"></div>
             
             {Array(5).fill(0).map((_, i) => (
                <div key={i} className="absolute w-1 h-1 bg-tech-accent rounded-full animate-float" 
                     style={{ 
                         top: `${50 + (Math.random() * 40 - 20)}%`, 
                         left: `${50 + (Math.random() * 40 - 20)}%`, 
                         animationDelay: `${i * 1.2}s` 
                     }}></div>
             ))}
          </div>
      </div>
   </section>
);

const AboutSection = ({ isDark, onOpenResume }: { isDark: boolean, onOpenResume: () => void }) => {
   const [time, setTime] = useState('');

   useEffect(() => {
     const updateTime = () => {
       const now = new Date();
       setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour12: false }));
     };
     updateTime();
     const interval = setInterval(updateTime, 1000);
     return () => clearInterval(interval);
   }, []);

   return (
      <section id="about" className={`py-32 relative overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`}>
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
               <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 border rounded-full text-[10px] font-mono font-bold tracking-widest text-tech-accent border-tech-accent/30">
                  <Fingerprint size={12} /> SYSTEM_IDENTITY_VERIFIED
               </div>
               
               <h2 className={`text-4xl md:text-5xl font-black mb-8 leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
                  ABOUT<br/>
                  <span className="text-tech-accent">MONAIM SIZAR</span>
               </h2>
               
               <div className="mb-10 flex items-center gap-6">
                   <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                       <div className="absolute inset-0 rounded-full border-2 border-tech-accent animate-pulse"></div>
                       <div className={`absolute -inset-2 rounded-full border border-dashed animate-spin-slow ${isDark ? 'border-white/30' : 'border-black/30'}`}></div>
                       <img 
                          src="https://avatars.githubusercontent.com/u/183996840?v=4" 
                          alt="Sizar" 
                          className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-xl"
                       />
                       <div className="absolute bottom-0 right-0 w-6 h-6 bg-tech-accent rounded-full border-4 border-white dark:border-black flex items-center justify-center">
                           <Check size={10} className="text-black" />
                       </div>
                   </div>
                   
                   <div className="space-y-2">
                       <div className={`text-xs font-mono tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Overview</div>
                       <div className={`text-xl font-bold font-mono ${isDark ? 'text-white' : 'text-black'}`}>SIZAR_DEV</div>
                       <div className="h-1 w-20 bg-tech-accent"></div>
                   </div>
               </div>

               <div className={`font-mono text-sm leading-relaxed space-y-6 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                  <p className="border-l-2 border-tech-accent pl-4">
                     I am a <strong className={isDark ? 'text-white' : 'text-black'}>Full-Stack Product Builder</strong> with a B.Sc in Computer Science & Engineering. My journey began in <strong className={isDark ? 'text-white' : 'text-black'}>Cybersecurity</strong>, but I quickly realized my passion lay in creating tangible products.
                  </p>
                  <p>
                     Today, I blend my technical background with <strong className={isDark ? 'text-white' : 'text-black'}>UI/UX design</strong> and <strong className={isDark ? 'text-white' : 'text-black'}>AI-driven development</strong> to build and ship complex applications single-handedly.
                  </p>
                  <p>
                     I have successfully built and deployed multiple projects, led by my most successful venture <strong className="text-tech-accent">'Pruf Protocol'</strong>, alongside <strong className="text-tech-accent">'gmstree'</strong> (a Telegram mini-game), <strong className="text-tech-accent">'TradeSpy'</strong>, and many more. I don't just write code; I engineer complete solutions—transforming raw ideas into production-ready reality.
                  </p>
               </div>
               
               <button 
                    onClick={onOpenResume}
                    className={`mt-8 inline-flex items-center gap-2 px-6 py-3 font-bold tracking-widest transition-all group border text-xs font-mono ${isDark ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}`}
               >
                    ACCESS_RESUME_DATA <ArrowDownRight size={16} />
               </button>

               <div className="mt-10 flex gap-6">
                   <div className={`flex items-center gap-3 px-4 py-2 border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                       <MapPin size={16} className="text-tech-accent" />
                       <div className="text-xs font-mono">
                          <div className="text-gray-500">LOC:</div>
                          <div className="font-bold uppercase">23.81° N, 90.41° E</div>
                       </div>
                   </div>
                   <div className={`flex items-center gap-3 px-4 py-2 border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                       <Clock size={16} className="text-tech-accent animate-pulse" />
                       <div className="text-xs font-mono">
                          <div className="text-gray-500">TIME</div>
                          <div className="font-bold font-mono">{time}</div>
                       </div>
                   </div>
               </div>
            </Reveal>

            {/* RESTORED ROTATING ICONS ANIMATION */}
            <div className="relative h-[400px] md:h-[500px] flex items-center justify-center perspective-1000 hidden md:flex">
                <div className={`relative w-64 h-64 rounded-full animate-spin-slow group`}>
                   <div className={`absolute inset-0 rounded-full border-2 border-dotted transform rotate-y-0 ${isDark ? 'border-white/20' : 'border-gray-800/40'}`}></div>
                   <div className={`absolute inset-0 rounded-full border-2 border-dotted transform rotate-y-45 ${isDark ? 'border-white/20' : 'border-gray-800/40'}`}></div>
                   <div className={`absolute inset-0 rounded-full border-2 border-dotted transform rotate-y-90 ${isDark ? 'border-white/20' : 'border-gray-800/40'}`}></div>
                   <div className={`absolute inset-0 rounded-full border-2 border-dotted transform rotate-y-135 ${isDark ? 'border-white/20' : 'border-gray-800/40'}`}></div>
                   <div className={`absolute top-1/4 left-2 right-2 bottom-1/4 rounded-full border-2 border-dotted transform rotate-x-60 ${isDark ? 'border-white/20' : 'border-gray-800/40'}`}></div>
                   <div className={`absolute top-0 left-8 right-8 bottom-0 rounded-full border-2 border-dotted transform rotate-x-0 ${isDark ? 'border-white/20' : 'border-gray-800/40'}`}></div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-tech-accent/10 rounded-full blur-2xl animate-pulse"></div>
                   {Array(6).fill(0).map((_, i) => (
                      <div key={i} className="absolute w-1.5 h-1.5 bg-white rounded-full animate-twinkle shadow-[0_0_10px_white]" 
                           style={{ 
                               top: `${Math.random() * 80 + 10}%`, 
                               left: `${Math.random() * 80 + 10}%`, 
                               animationDelay: `${i * 0.5}s` 
                           }}></div>
                   ))}
                </div>

                <div className={`absolute w-96 h-96 border rounded-full animate-spin-slow opacity-40 border-t-transparent border-b-transparent ${isDark ? 'border-white' : 'border-gray-900'}`} style={{ animationDuration: '25s' }}></div>
                <div className={`absolute w-[450px] h-[450px] border border-dotted rounded-full animate-spin-reverse-slow opacity-30 ${isDark ? 'border-tech-accent' : 'border-gray-600'}`}></div>

                {/* ORBITING ICONS */}
                <div className="absolute w-[400px] h-[400px] animate-spin-slow" style={{ animationDuration: '40s' }}>
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 p-3 rounded-full border shadow-lg ${isDark ? 'bg-black border-orange-500 text-orange-500' : 'bg-white border-orange-500 text-orange-600'}`}><Layout size={24} /></div>
                    <div className={`absolute top-1/2 -right-4 -translate-y-1/2 p-3 rounded-full border shadow-lg ${isDark ? 'bg-black border-green-500 text-green-500' : 'bg-white border-green-500 text-green-600'}`}><Database size={24} /></div>
                    <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 p-3 rounded-full border shadow-lg ${isDark ? 'bg-black border-purple-500 text-purple-500' : 'bg-white border-purple-500 text-purple-600'}`}><Server size={24} /></div>
                    <div className={`absolute top-1/2 -left-4 -translate-y-1/2 p-3 rounded-full border shadow-lg ${isDark ? 'bg-black border-blue-500 text-blue-500' : 'bg-white border-blue-500 text-blue-600'}`}><Code2 size={24} /></div>
                </div>

                 <div className="absolute w-[300px] h-[300px] animate-spin-reverse-slow" style={{ animationDuration: '30s' }}>
                    <div className={`absolute top-1/4 right-0 p-2 rounded-full border shadow-md ${isDark ? 'bg-black border-yellow-500 text-yellow-500' : 'bg-white border-yellow-500 text-yellow-600'}`}><FileJson size={18} /></div>
                    <div className={`absolute bottom-1/4 left-0 p-2 rounded-full border shadow-md ${isDark ? 'bg-black border-red-500 text-red-500' : 'bg-white border-red-500 text-red-600'}`}><GitBranch size={18} /></div>
                </div>
            </div>
         </div>
      </section>
   );
};

const BlueprintProjectCard = ({ project, index, isDark }: { project: any, index: number, isDark: boolean }) => {
   const isEven = index % 2 === 0;
   const isComingSoon = project.status === 'COMING SOON';
   const [isHovered, setIsHovered] = useState(false);

   return (
      <div 
         className={`relative flex flex-col md:flex-row ${!isEven ? 'md:flex-row-reverse' : ''} gap-12 items-stretch group mb-16 md:mb-32`}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 z-20 hidden md:block rounded-full group-hover:scale-150 group-hover:bg-tech-accent transition-all duration-300 ${isDark ? 'bg-white border-black' : 'bg-black border-white'}`}></div>
         <div className={`absolute top-1/2 ${isEven ? 'right-1/2 pr-12' : 'left-1/2 pl-12'} w-1/2 h-[1px] hidden md:flex items-center ${isEven ? 'justify-end' : 'justify-start'} pointer-events-none`}>
             <div className={`w-full h-full group-hover:bg-tech-accent/50 transition-colors duration-500 ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
         </div>

         <div className="w-full md:w-1/2 relative interactive perspective-1000">
             <div className={`relative h-[220px] md:h-full md:min-h-[300px] border p-2 transition-all duration-500 ease-out group-hover:border-tech-accent/50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] group-hover:scale-[1.02] group-hover:-translate-y-2 ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white shadow-sm'}`}>
                <div className={`absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 group-hover:border-tech-accent transition-colors ${isDark ? 'border-white' : 'border-black'}`}></div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 group-hover:border-tech-accent transition-colors ${isDark ? 'border-white' : 'border-black'}`}></div>
                <div className={`absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 group-hover:border-tech-accent transition-colors ${isDark ? 'border-white' : 'border-black'}`}></div>
                <div className={`absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 group-hover:border-tech-accent transition-colors ${isDark ? 'border-white' : 'border-black'}`}></div>

                <div className="relative w-full h-full overflow-hidden bg-black">
                   <img 
                      src={project.imageUrl} 
                      alt={project.name}
                      className={`w-full h-full object-cover transition-all duration-700 
                         ${isComingSoon ? 'blur-md opacity-40 scale-110' : 'grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 opacity-80 group-hover:opacity-100'}`}
                   />
                   <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0gMjAgMCBMIDAgMCBMIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] opacity-20 pointer-events-none"></div>
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tech-accent/10 to-transparent h-[20%] animate-scan pointer-events-none"></div>

                   {!isComingSoon && (
                      <div className={`absolute inset-0 backdrop-blur-sm p-8 flex flex-col justify-center transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${isDark ? 'bg-black/90' : 'bg-black/80'}`}>
                          <div className="font-mono text-tech-accent text-xs mb-2 flex items-center gap-2"><Activity size={12} className="animate-pulse" /> SYSTEM DIAGNOSTIC</div>
                          <div className="space-y-4">
                             <div>
                                <div className="text-[10px] text-gray-500 mb-1">STATUS</div>
                                <div className="text-white font-bold flex items-center gap-2"><div className="w-2 h-2 bg-tech-accent rounded-full shadow-[0_0_5px_#00cc00]"></div> ONLINE</div>
                             </div>
                             <div>
                                <div className="text-[10px] text-gray-500 mb-1">MODULES</div>
                                <div className="flex flex-wrap gap-2">
                                   {project.tech.map((t: string) => (
                                      <span key={t} className="text-xs text-white border border-white/20 px-2 py-1">{t}</span>
                                   ))}
                                </div>
                             </div>
                             <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-tech-accent text-black px-4 py-2 font-bold text-xs mt-2 hover:bg-white transition-colors w-fit">
                                ACCESS TERMINAL <ExternalLink size={12} />
                             </a>
                          </div>
                      </div>
                   )}

                   {isComingSoon && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                          <div className="relative w-24 h-24 mb-6">
                             <div className="absolute inset-0 border-t-2 border-b-2 border-tech-accent rounded-full animate-spin-slow"></div>
                             <div className="absolute inset-2 border-l-2 border-r-2 border-white/50 rounded-full animate-spin-reverse-slow"></div>
                             <div className="absolute inset-6 border border-dashed border-tech-accent rounded-full animate-pulse"></div>
                             <div className="absolute inset-0 flex items-center justify-center text-tech-accent font-bold text-xs animate-pulse">LOCK</div>
                          </div>
                          <div className="bg-black/80 px-4 py-2 border border-tech-accent/30 text-tech-accent font-mono text-xs tracking-widest animate-glitch">&gt;&gt; ENCRYPTED_DATA</div>
                      </div>
                   )}
                </div>
             </div>
         </div>

         <div className="w-full md:w-1/2 flex flex-col justify-center relative">
            <div className={`flex flex-col ${isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} items-center text-center`}>
                <div className="font-mono text-tech-accent text-xs tracking-[0.2em] mb-2 flex items-center gap-2">
                   {isEven && <span className="w-8 h-[1px] bg-tech-accent"></span>}
                   ID: {project.id}
                   {!isEven && <span className="w-8 h-[1px] bg-tech-accent"></span>}
                </div>
                
                <h3 className={`text-4xl md:text-5xl font-black uppercase mb-4 tracking-tighter relative inline-block transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>
                   {project.name}
                   <span className="absolute -top-2 -right-2 text-[10px] text-gray-400 font-normal tracking-normal border border-gray-200 px-1 rounded-full"></span>
                </h3>

                <div className={`text-xs font-bold px-3 py-1 mb-6 tracking-widest inline-block ${isComingSoon ? 'bg-gray-800 text-white' : (isDark ? 'bg-white text-black' : 'bg-black text-white')}`}>
                   {project.category}
                </div>
                
                <p className={`font-mono text-xs leading-relaxed max-w-md mb-6 transition-colors duration-1000 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                   {project.description}
                </p>

                <div className={`hidden md:block absolute top-0 bottom-0 w-[1px] -z-10 left-1/2 -translate-x-1/2 transition-colors duration-1000 ${isDark ? 'bg-white/5' : 'bg-black/5'}`}></div>
                
                {!isComingSoon && (
                  <div className={`flex gap-4 ${isEven ? 'md:justify-start' : 'md:justify-end'} justify-center w-full`}>
                      <div className="flex flex-col gap-1 text-[9px] font-mono text-gray-400 text-left">
                         <div>LOC: {Math.floor(Math.random()*100)}.{Math.floor(Math.random()*100)}</div>
                         <div>LAT: {Math.floor(Math.random()*100)}ms</div>
                      </div>
                      <ScanLine className="text-gray-300 animate-pulse" />
                  </div>
                )}
            </div>
         </div>
      </div>
   );
};

const ProjectsSection = ({ isDark }: { isDark: boolean }) => {
  const [filter, setFilter] = useState('ALL');
  const categories = ['ALL', 'BLOCKCHAIN INFRASTRUCTURE', 'FINTECH AUTOMATION', 'IMMERSIVE WEB3', 'Exchanging Expertise', 'Launchpad'];
  
  const filteredProjects = PROJECTS.filter(p => filter === 'ALL' || p.category === filter);

  return (
      <section id="projects" className={`py-32 relative z-10 overflow-hidden min-h-screen transition-colors duration-1000 ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
         <div className="absolute inset-0 pointer-events-none opacity-20">
             <div className={`absolute left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed hidden md:block ${isDark ? 'border-white/20 bg-white' : 'border-black/50 bg-black'}`}></div>
         </div>

         <div className="px-6 mb-20 max-w-7xl mx-auto text-center relative z-10">
            <Reveal>
               <h2 className={`text-5xl md:text-6xl font-black mb-6 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>DEPLOYED UNITS</h2>
               <div className={`w-1 h-24 mx-auto mb-6 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
               <p className="font-mono text-gray-400 text-sm tracking-[0.3em] uppercase"><span className="text-tech-accent">&gt;&gt;</span> System Architecture & <br className="md:hidden"/>Visual Deployments</p>
            </Reveal>

            <Reveal delay={200}>
               <div className="flex flex-wrap justify-center gap-3 mt-12 max-w-4xl mx-auto">
                  {categories.map((cat, idx) => (
                     <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 text-[10px] font-mono font-bold tracking-widest border transition-all duration-300 relative overflow-hidden group ${
                           filter === cat 
                           ? (isDark ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-black text-white border-black shadow-lg') + ' scale-105'
                           : (isDark ? 'bg-transparent text-gray-400 border-white/20 hover:border-white hover:text-white' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black')
                        }`}
                     >
                        <span className="relative z-10">{cat === 'ALL' ? 'ALL_SYSTEMS' : cat}</span>
                        {filter !== cat && <div className={`absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0 ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}></div>}
                     </button>
                  ))}
               </div>
            </Reveal>
         </div>
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            {filteredProjects.map((project, index) => (
               <Reveal key={project.id} delay={100}> 
                  <BlueprintProjectCard project={project} index={index} isDark={isDark} />
               </Reveal>
            ))}
            {filteredProjects.length === 0 && (
               <div className="text-center py-32 font-mono text-gray-400 animate-pulse">&gt;&gt; NO ACTIVE MODULES FOUND IN SECTOR: {filter}</div>
            )}
         </div>
      </section>
  );
}

const SkillCard = ({ item, isDark, index }: { item: any, isDark: boolean, index: number }) => {
    return (
        <div className={`relative p-6 border transition-all duration-300 group hover:-translate-y-2 ${isDark ? 'border-white/10 bg-white/5 hover:border-tech-accent/50 hover:shadow-[0_0_30px_rgba(0,204,0,0.1)]' : 'border-black/10 bg-white hover:border-tech-accent/50 hover:shadow-lg'}`}>
            <div className={`absolute top-0 right-0 p-2 font-mono text-[10px] opacity-50 ${isDark ? 'text-white' : 'text-black'}`}>MOD_0{index + 1}</div>
            
            <div className="flex justify-between items-end mb-4">
                <h3 className={`text-xl font-bold tracking-wider ${isDark ? 'text-white' : 'text-black'}`}>{item.subject.toUpperCase()}</h3>
                <div className={`font-mono font-bold text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
                    {item.A}<span className="text-tech-accent text-sm">%</span>
                </div>
            </div>

            <div className="w-full h-2 bg-gray-700/30 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-tech-accent relative" 
                    style={{ width: `${item.A}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-progress-indeterminate"></div>
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/30' : 'bg-black/30'}`}></div>
                <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/30' : 'bg-black/30'}`}></div>
                <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/30' : 'bg-black/30'}`}></div>
                <div className="ml-auto text-[10px] font-mono text-tech-accent animate-pulse">OPTIMIZED</div>
            </div>
        </div>
    )
}

const StatsSection = ({ isDark }: { isDark: boolean }) => (
   <section id="skills" className={`py-32 px-6 border-t relative z-10 transition-colors duration-1000 ${isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-black/10'}`}>
      <div className="max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row items-end gap-10 mb-20 border-b pb-8 border-dashed border-gray-700">
            <div className="flex items-end gap-6">
                <HardDrive size={64} className={`stroke-1 transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`} />
                <div>
                <h2 className={`text-4xl md:text-5xl font-black tracking-tight transition-colors duration-1000 ${isDark ? 'text-white' : 'text-black'}`}>CORE CAPABILITIES</h2>
                <p className="font-mono text-gray-500 tracking-widest text-sm mt-2">TECHNICAL ARSENAL & PROFICIENCY</p>
                </div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {SKILL_DATA.map((item, i) => (
                 <Reveal key={i} delay={i * 50}>
                     <SkillCard item={item} isDark={isDark} index={i} />
                 </Reveal>
             ))}
         </div>
      </div>
   </section>
);

const Footer = ({ isDark }: { isDark: boolean }) => {
   const [copied, setCopied] = useState(false);
   const socialLinks = [
      { name: 'TWITTER', icon: Twitter, url: 'https://x.com/gmstree' },
      { name: 'GITHUB', icon: Github, url: 'https://github.com/Gmstree' },
      { name: 'LINKEDIN', icon: Linkedin, url: 'https://www.linkedin.com/in/sizar-in' },
      { name: 'TELEGRAM', icon: MessageCircle, url: 'https://t.me/Sizar0_o' },
   ];

   const handleCopy = () => {
     navigator.clipboard.writeText('sizar@prufprotocol.io');
     setCopied(true);
     setTimeout(() => setCopied(false), 2000);
   };

   return (
      <footer id="contact" className={`py-24 relative z-10 overflow-hidden font-mono transition-colors duration-1000 ${isDark ? 'bg-black text-white' : 'bg-white text-black border-t border-black/10'}`}>
         <div className="max-w-7xl mx-auto px-6 relative z-20">
            
            <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-start justify-between">
                
                {/* Left Side: Text & Email */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter">
                        LET'S<br/>
                        <span className={`${isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-tech-accent to-white' : 'text-tech-accent'}`}>BUILD.</span>
                    </h2>
                    <p className="text-gray-400 mb-10 max-w-md text-lg leading-relaxed">
                        Ready to engineer something extraordinary? Let’s connect directly.
                    </p>
                    
                    {/* Clean Email Display - Strictly Single Line on Mobile/PC */}
                    <div className="mb-12">
                        <div className={`inline-flex flex-row items-center gap-2 sm:gap-6 px-4 py-3 sm:px-6 sm:py-4 border rounded-xl transition-all duration-300 group w-auto text-left ${isDark ? 'border-white/10 bg-white/5 hover:border-tech-accent/50 hover:shadow-[0_0_20px_rgba(0,204,0,0.1)]' : 'border-black/10 bg-gray-50 hover:border-tech-accent/50 hover:shadow-lg'}`}>
                            <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${isDark ? 'bg-white/10 text-tech-accent' : 'bg-black/5 text-black'}`}>
                                <Mail className="w-4 h-4 sm:w-6 sm:h-6" />
                            </div>
                            
                            <a href="mailto:sizar@prufprotocol.io" className="text-xs sm:text-xl font-bold tracking-tight hover:text-tech-accent transition-colors break-all">
                                sizar@prufprotocol.io
                            </a>
                            
                            <div className={`w-[1px] h-6 sm:h-8 mx-1 sm:mx-2 ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>

                            <button 
                                onClick={handleCopy}
                                className={`flex items-center gap-2 p-1 sm:p-2 rounded-lg transition-all active:scale-95 justify-center ${isDark ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-black/5 text-gray-500 hover:text-black'}`}
                                title="Copy Email"
                            >
                                {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-tech-accent" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Side: Social Circles */}
                <div className="w-full md:w-auto flex flex-col items-start md:items-end">
                    <div className="text-sm font-mono text-gray-500 mb-6 tracking-widest uppercase">Connections</div>
                    <div className="flex gap-4">
                        {socialLinks.map((item, idx) => (
                           <a 
                              key={item.name} 
                              href={item.url} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border transition-all duration-300 group ${isDark ? 'border-white/20 bg-white/5 hover:bg-white hover:border-white hover:text-black' : 'border-black/10 bg-white hover:bg-black hover:border-black hover:text-white'}`}
                              title={item.name}
                           >
                              <item.icon size={20} className={`transition-colors duration-300 ${isDark ? 'text-gray-400 group-hover:text-black' : 'text-gray-600 group-hover:text-white'}`} />
                           </a>
                        ))}
                    </div>
                </div>

            </div>

            <div className={`border-t mt-12 sm:mt-20 pt-8 sm:pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs text-gray-500 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
               <div className="flex items-center gap-2 mb-2 md:mb-0">
                  <Power size={12} className="text-tech-accent" />
                  Always Open
               </div>
               <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 text-center sm:text-left items-center">
                  <span className="whitespace-nowrap">© 2026 SIZAR. DEVNAMES RIGHTS RESERVED.</span>
                  <span className="flex items-center gap-2 whitespace-nowrap"><MapPin size={10} /> LOC: 23.81° N, 90.41° E</span>
               </div>
            </div>
         </div>
      </footer>
   );
};

export function App() {
  const [isDark, setIsDark] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showStory, setShowStory] = useState(false);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const checkTime = () => {
      if (manualOverride) return;
      const hour = new Date().getHours();
      const isNightTime = hour >= 18 || hour < 6;
      setIsDark(isNightTime);
    };
    checkTime(); 
    const interval = setInterval(checkTime, 60000); 
    return () => clearInterval(interval);
  }, [manualOverride]);

  const toggleTheme = () => {
    setManualOverride(true);
    setIsDark(!isDark);
  };

  return (
    <>
      {isLoading && <PremiumLoader onComplete={() => setIsLoading(false)} />}
      <StoryOverlay isOpen={showStory} onClose={() => setShowStory(false)} isDark={isDark} />
      <ResumeOverlay isOpen={showResume} onClose={() => setShowResume(false)} isDark={isDark} />
      
      <div className={`min-h-screen relative transition-colors duration-1000 ${isDark ? 'bg-[#050505]' : 'bg-[#fafafa]'}`}>
        <BackgroundEffects isDark={isDark} />
        <NavBar isDark={isDark} toggleTheme={toggleTheme} onOpenStory={() => setShowStory(true)} onOpenResume={() => setShowResume(true)} />
        <Hero isDark={isDark} />
        <AboutSection isDark={isDark} onOpenResume={() => setShowResume(true)} />
        <CreativeSection isDark={isDark} />
        <ProjectsSection isDark={isDark} />
        <StatsSection isDark={isDark} />
        <Footer isDark={isDark} />
      </div>
    </>
  );
}
export default App;
