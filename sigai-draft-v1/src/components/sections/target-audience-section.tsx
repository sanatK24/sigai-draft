"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Laptop, FileImage, Megaphone, Camera, Clipboard, Users, Pen, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

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
    description: "Produces and manages high-quality event recordings and visual content."
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
  const marqueeText = "Innovation . Network . Marketing . Learning . Technical . Design . Publicity . Media Graphics . Management . Sponsorship . Content . Creative";
  const bgImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/images/wX62SMRMN1v1X6SFoJaoNdwo-1.webp?";

  return (
    <section className="bg-black text-white py-24 overflow-x-hidden">
      <div className="container mx-auto px-6 flex flex-col items-start">
        <div className="flex flex-col items-start text-left gap-4 w-full">
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-6 bg-zinc-500" />
            <h4 className="text-base font-medium text-text-secondary tracking-wider">Domains</h4>
          </div>
          <h2 className="text-5xl md:text-[60px] font-bold leading-[1.1] tracking-[-1.8px] max-w-4xl">
            Explore Key <span className="text-primary">Domains</span> at the <span className="text-zinc-400">RAIT ACM SIGAI</span>
          </h2>
        </div>

        <div className="mt-16 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {domains.map((domain) => {
              const isActive = activeDomain === domain.id;
              return (
                <div 
                  key={domain.id}
                  className="group perspective w-[240px] h-[240px] sm:w-[260px] sm:h-[260px] md:w-[280px] md:h-[280px] cursor-pointer"
                >
                  <div 
                    className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
                      isActive ? 'rotate-y-180' : ''
                    }`}
                    onClick={() => setActiveDomain(domain.id === activeDomain ? '' : domain.id)}
                  >
                    {/* Front of Card */}
                    <div className="absolute w-full h-full backface-hidden bg-card border border-border rounded-[20px] p-6 flex flex-col items-center justify-center gap-4">
                      <div className="p-4 rounded-full bg-primary/10">
                        {React.cloneElement(domain.icon, { className: 'text-primary' })}
                      </div>
                      <h4 className="text-xl md:text-2xl font-medium text-center">{domain.title}</h4>
                    </div>
                    
                    {/* Back of Card */}
                    <div className="absolute w-full h-full backface-hidden bg-card border-2 border-primary rounded-[20px] p-6 rotate-y-180 overflow-y-auto">
                      <div className="h-full flex flex-col items-center">
                        <div className="p-2 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                          {React.cloneElement(domain.icon, { className: 'text-primary', size: 24 })}
                        </div>
                        <h4 className="text-xl font-medium text-center mb-3">{domain.title}</h4>
                        <p className="text-white text-sm flex-1 overflow-y-auto text-center">
                          {domain.description}
                        </p>
                        <div className="text-xs text-text-secondary text-center mt-4">
                          Click to flip back
                        </div>
                      </div>
                    </div>
                    
                    {/* Rotating Background (only for active card) */}
                    {isActive && (
                      <motion.div
                        aria-hidden
                        className="absolute inset-0 opacity-15"
                        style={{ borderRadius: 'inherit' }}
                        initial={false}
                        animate={{ 
                          rotate: 360,
                          transition: { 
                            duration: 20, 
                            repeat: Infinity,
                            ease: 'linear'
                          }
                        }}
                      >
                        <Image
                          src={bgImage}
                          alt=""
                          fill
                          sizes="280px"
                          className="object-cover rounded-[inherit]"
                          priority
                        />
                        <div className="absolute inset-0 bg-black/5 rounded-[inherit]" />
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="mt-32 w-full overflow-hidden">
        <div className="flex animate-marquee flex-nowrap">
          <h2 className="text-[80px] font-bold whitespace-nowrap py-4 px-8 text-white">{marqueeText}</h2>
          <h2 className="text-[80px] font-bold whitespace-nowrap py-4 px-8 text-white">{marqueeText}</h2>
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;