"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Megaphone, 
  Video, 
  Users, 
  Handshake, 
  FileText, 
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';

const domains = [
  {
    id: 'technical',
    title: 'Technical',
    description: "Organizes technical events and maintains digital platforms with cutting-edge solutions.",
    icon: Code2,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    hoverGlow: "group-hover:shadow-blue-500/50"
  },
  {
    id: 'design',
    title: 'Design',
    description: "Creates visually stunning banners and posters that bring our events to life.",
    icon: Palette,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    hoverGlow: "group-hover:shadow-purple-500/50"
  },
  {
    id: 'publicity',
    title: 'Publicity',
    description: "Amplifies event reach through strategic social media campaigns and engagement.",
    icon: Megaphone,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-500/10 to-red-500/10",
    hoverGlow: "group-hover:shadow-orange-500/50"
  },
  {
    id: 'media',
    title: 'Media Graphics',
    description: "Designs and produces visual content for digital and print media.",
    icon: Video,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    hoverGlow: "group-hover:shadow-green-500/50"
  },
  {
    id: 'management',
    title: 'Management',
    description: "Coordinates and oversees all activities, ensuring smooth event execution.",
    icon: Users,
    gradient: "from-indigo-500 to-blue-500",
    bgGradient: "from-indigo-500/10 to-blue-500/10",
    hoverGlow: "group-hover:shadow-indigo-500/50"
  },
  {
    id: 'sponsorship',
    title: 'Sponsorship',
    description: "Secures partnerships and resources to enhance our events and opportunities.",
    icon: Handshake,
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-500/10 to-orange-500/10",
    hoverGlow: "group-hover:shadow-yellow-500/50"
  },
  {
    id: 'content',
    title: 'Content',
    description: "Crafts compelling blog posts and research articles that engage our community.",
    icon: FileText,
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/10 to-rose-500/10",
    hoverGlow: "group-hover:shadow-pink-500/50"
  },
  {
    id: 'creative',
    title: 'Creative',
    description: "Designs event materials and transforms spaces with creative decorations.",
    icon: Sparkles,
    gradient: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-500/10 to-cyan-500/10",
    hoverGlow: "group-hover:shadow-teal-500/50"
  }
];

const TargetAudienceSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Spotlight Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-medium text-white/80">
              <Sparkles className="w-3 h-3" />
              Our Expertise
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Explore Key{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Domains
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
            at the RAIT ACM SIGAI Student Chapter
          </p>
        </div>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            const isHovered = hoveredCard === domain.id;
            
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredCard(domain.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative"
              >
                {/* Glow Effect on Hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${domain.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500`} />
                
                {/* Card */}
                <div className="relative h-full bg-black border border-white/10 rounded-2xl p-6 overflow-hidden transition-all duration-300 group-hover:border-white/20">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${domain.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    <div className={`mb-4 p-3 rounded-xl bg-gradient-to-r ${domain.gradient} w-fit transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                      {domain.title}
                    </h3>
                    
                    {/* Description */}
                    <p className={`text-sm text-white/60 mb-4 flex-grow transition-all duration-300 ${
                      isHovered ? 'opacity-100' : 'line-clamp-2'
                    }`}>
                      {domain.description}
                    </p>
                    
                    {/* Learn More Link */}
                    <div className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                    }`}>
                      <span className={`bg-clip-text text-transparent bg-gradient-to-r ${domain.gradient}`}>
                        Learn More
                      </span>
                      <ArrowUpRight className={`w-4 h-4 bg-clip-text text-transparent bg-gradient-to-r ${domain.gradient}`} style={{ 
                        filter: 'invert(1)'
                      }} />
                    </div>
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;