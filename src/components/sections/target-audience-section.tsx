"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Laptop, FileImage, Megaphone, Camera, Clipboard, Users, Pen, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const domains = [
  {
    id: 'technical',
    title: 'Technical',
    icon: <Laptop size={40} className="text-white" />,
    description: "Organizes technical events and maintains digital platforms with cutting-edge solutions."
  },
  {
    id: 'design',
    title: 'Design',
    icon: <FileImage size={40} className="text-white" />,
    description: "Creates visually stunning banners and posters that bring our events to life."
  },
  {
    id: 'publicity',
    title: 'Publicity',
    icon: <Megaphone size={40} className="text-white" />,
    description: "Amplifies event reach through strategic social media campaigns and engagement."
  },
  {
    id: 'media',
    title: 'Media Graphics',
    icon: <Camera size={40} className="text-white" />,
  },
  {
    id: 'management',
    title: 'Management',
    icon: <Clipboard size={40} className="text-white" />,
    description: "Coordinates and oversees all activities, ensuring smooth event execution."
  },
  {
    id: 'sponsorship',
    title: 'Sponsorship',
    icon: <Users size={40} className="text-white" />,
    description: "Secures partnerships and resources to enhance our events and opportunities."
  },
  {
    id: 'content',
    title: 'Content',
    icon: <Pen size={40} className="text-white" />,
    description: "Crafts compelling blog posts and research articles that engage our community."
  },
  {
    id: 'creative',
    title: 'Creative',
    icon: <Palette size={40} className="text-white" />,
    description: "Designs event materials and transforms spaces with creative decorations."
  }
];

const TargetAudienceSection = () => {
  const [activeDomain, setActiveDomain] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const marqueeText = "Innovation . Network . Marketing . Learning . Technical . Design . Publicity . Media Graphics . Management . Sponsorship . Content . Creative";
  
  const handleDomainClick = (id: string) => {
    if (activeDomain === id) {
      setActiveDomain('');
      return;
    }
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveDomain(id);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className="bg-black text-white py-24 overflow-x-hidden">
      <div className="container mx-auto px-6 flex flex-col items-start">
        <div className="flex flex-col items-start text-left gap-4 w-full">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-6 bg-zinc-500" />
            <h4 className="text-base font-medium text-text-secondary tracking-wider">Domains</h4>
          </div>
          <h2 className="text-5xl md:text-[60px] font-bold leading-[1.1] tracking-[-1.8px] max-w-4xl">
            Explore Key <span className="text-primary">Domains</span> at the <span className="text-zinc-400">RAIT ACM SIGAI Student Chapter</span>
          </h2>
        </div>

        <div className="mt-16 w-full relative">
          {/* Domain Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center"
            animate={activeDomain ? 'hidden' : 'visible'}
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
              hidden: { opacity: 0, pointerEvents: 'none' }
            }}
            initial="visible"
          >
            {domains.map((domain) => (
              <motion.div
                key={domain.id}
                className="relative w-[240px] h-[240px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px]"
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 }
                }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="relative w-full h-full bg-card border border-border/30 rounded-[20px] p-6 flex flex-col items-center justify-center gap-2 group hover:bg-card/70 transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => handleDomainClick(domain.id)}
                  onMouseEnter={() => setHoveredCard(domain.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Corner Highlights */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className={`p-4 rounded-full bg-primary/10 transition-all duration-300 ${hoveredCard === domain.id ? 'scale-110 bg-primary/20' : ''}`}>
                    {React.cloneElement(domain.icon, { 
                      className: `text-primary transition-transform duration-300 ${hoveredCard === domain.id ? 'scale-110' : ''}` 
                    })}
                  </div>
                  
                  <h4 className={`text-xl md:text-2xl font-medium text-center transition-all duration-300 mb-1 ${hoveredCard === domain.id ? 'text-primary scale-105' : 'text-foreground'}`}>
                    {domain.title}
                  </h4>
                  
                  {/* Hover Prompt - Below Title */}
                  <div 
                    className={`h-6 flex items-center justify-center transition-all duration-300 overflow-hidden mt-1 select-none ${
                      hoveredCard === domain.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 h-0'
                    }`}
                  >
                    <span className="text-xs font-medium text-white bg-primary/80 px-3 py-1 rounded-full">
                      Click to view details
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed View */}
          <AnimatePresence>
            {activeDomain && (
              <motion.div 
                className="absolute inset-0 min-h-[600px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {domains
                  .filter(domain => domain.id === activeDomain)
                  .map(domain => (
                    <div key={domain.id} className="relative w-full h-full">
                      {/* Back Button */}
                      <button
                        onClick={() => setActiveDomain('')}
                        className="absolute top-4 left-4 z-10 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        ← Back to all domains
                      </button>
                      
                      <div className="relative w-full h-full rounded-2xl p-8 md:p-12 overflow-hidden">
                        {/* Liquid Glass Effect Background */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-xl" />
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-10" />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
                          <div className="absolute inset-0 border border-white/5 rounded-2xl" />
                        </div>
                        {/* Corner Highlights */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary" />
                        
                        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
                          <div className="p-4 rounded-2xl bg-primary/10 mb-6">
                            {React.cloneElement(domain.icon, { className: 'text-primary', size: 48 })}
                          </div>
                          <h3 className="text-3xl md:text-4xl font-bold mb-4">{domain.title} Domain</h3>
                          <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                            {domain.description}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                            <div className="bg-card/50 p-6 rounded-xl border border-border/20">
                              <h4 className="text-lg font-semibold mb-3">What You'll Do</h4>
                              <p className="text-gray-300 text-sm">
                                {domain.description} Get hands-on experience with real-world projects and collaborate with like-minded individuals.
                              </p>
                            </div>
                            <div className="bg-card/50 p-6 rounded-xl border border-border/20">
                              <h4 className="text-lg font-semibold mb-3">Skills You'll Gain</h4>
                              <p className="text-gray-300 text-sm">
                                Develop expertise in {domain.title.toLowerCase()} through workshops, projects, and mentorship from industry professionals.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="mt-32 w-full overflow-hidden space-y-4">
        {/* First Row */}
        <div className="relative group">
          <div className="flex animate-marquee whitespace-nowrap group-hover:animation-pause">
            <h2 className="text-[40px] md:text-[60px] font-bold whitespace-nowrap py-2 px-4 text-white/90">
              Innovation . Network . Marketing . Learning . Technical . Design .
            </h2>
            <h2 className="text-[40px] md:text-[60px] font-bold whitespace-nowrap py-2 px-4 text-white/90">
              Innovation . Network . Marketing . Learning . Technical . Design .
            </h2>
          </div>
        </div>
        
        {/* Second Row */}
        <div className="relative group">
          <div className="flex animate-marquee-reverse whitespace-nowrap group-hover:animation-pause">
            <h2 className="text-[40px] md:text-[60px] font-bold whitespace-nowrap py-2 px-4 text-white/90">
              Publicity . Media Graphics . Management . Sponsorship . Content . Creative .
            </h2>
            <h2 className="text-[40px] md:text-[60px] font-bold whitespace-nowrap py-2 px-4 text-white/90">
              Publicity . Media Graphics . Management . Sponsorship . Content . Creative .
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;