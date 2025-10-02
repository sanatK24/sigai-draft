"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const domains = [
  {
    id: 'technical',
    title: 'Technical',
    description: "Organizes technical events and maintains digital platforms with cutting-edge solutions."
  },
  {
    id: 'design',
    title: 'Design',
    description: "Creates visually stunning banners and posters that bring our events to life."
  },
  {
    id: 'publicity',
    title: 'Publicity',
    description: "Amplifies event reach through strategic social media campaigns and engagement."
  },
  {
    id: 'media',
    title: 'Media Graphics',
    description: "Designs and produces visual content for digital and print media."
  },
  {
    id: 'management',
    title: 'Management',
    description: "Coordinates and oversees all activities, ensuring smooth event execution."
  },
  {
    id: 'sponsorship',
    title: 'Sponsorship',
    description: "Secures partnerships and resources to enhance our events and opportunities."
  },
  {
    id: 'content',
    title: 'Content',
    description: "Crafts compelling blog posts and research articles that engage our community."
  },
  {
    id: 'creative',
    title: 'Creative',
    description: "Designs event materials and transforms spaces with creative decorations."
  }
];

const TargetAudienceSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const marqueeTexts = [
    "Innovation . Network . Marketing . Learning . Technical . Design",
    "Publicity . Media Graphics . Management . Sponsorship . Content . Creative",
    "Workshops . Hackathons . Research . Community . Development . Growth"
  ];
  const animationDirections = ["animate-marquee", "animate-marquee-reverse", "animate-marquee"];
  

  return (
    <section className="bg-black text-white py-24 overflow-x-hidden">
      <div className="container mx-auto px-6 flex flex-col items-start">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="h-px w-6 bg-text-secondary" />
          <h4 className="text-sm font-medium uppercase tracking-[0.1em] text-text-secondary">DOMAINS</h4>
        </div>
        
        <div className="flex flex-col items-start text-left gap-4 w-full">
          <h2 className="text-5xl md:text-[60px] font-bold leading-[1.1] tracking-[-1.8px] max-w-4xl">
            Explore Key <span className="text-primary">Domains</span> at the <span className="text-zinc-400">RAIT ACM SIGAI Student Chapter</span>
          </h2>
        </div>

        <div className="mt-16 w-full relative">
          
          {/* Domain Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center w-full">
            {domains.map((domain) => (
              <div
                key={domain.id}
                className="relative w-full aspect-square max-w-[280px] group"
              >
                <div 
                  className="relative w-full h-full bg-card border-2 border-transparent rounded-[20px] p-6 flex flex-col items-center justify-center overflow-hidden transition-all duration-300"
                  onMouseEnter={() => setHoveredCard(domain.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* White overlay with black text */}
                  <div className={`absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300 ${hoveredCard === domain.id ? 'opacity-100' : 'opacity-0'}`}>
                    <h4 className="text-2xl font-bold text-black mb-4">{domain.title}</h4>
                    <p className="text-base text-gray-700 line-clamp-2">{domain.description}</p>
                  </div>
                  
                  {/* Default state - centered title */}
                  <h4 className={`text-xl font-bold text-white transition-all duration-300 ${hoveredCard === domain.id ? 'opacity-0' : 'opacity-100'}`}>
                    {domain.title}
                  </h4>

                  {/* Blue border on hover */}
                  <div className={`absolute inset-0 rounded-[20px] border-2 border-primary transition-opacity duration-300 ${hoveredCard === domain.id ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Marquee section - Full width outside container */}
      <div className="mt-32 w-screen overflow-hidden space-y-4 left-0 right-0">
        {marqueeTexts.map((text, index) => (
          <div key={index} className="relative group bg-white py-2 w-full">
            <div className={`flex ${animationDirections[index]} whitespace-nowrap`}>
              {/* Duplicate the text multiple times to ensure it fills the screen */}
              <h2 className="text-[40px] md:text-[60px] font-bold whitespace-nowrap px-4 text-black">
                {text}
              </h2>
              <h2 className="text-[40px] md:text-[60px] font-bold whitespace-nowrap px-4 text-black">
                {text}
              </h2>
              <h2 className="text-[40px] md:text-[60px] font-bold whitespace-nowrap px-4 text-black">
                {text}
              </h2>
              <h2 className="text-[40px] md:text-[60px] font-bold whitespace-nowrap px-4 text-black">
                {text}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TargetAudienceSection;