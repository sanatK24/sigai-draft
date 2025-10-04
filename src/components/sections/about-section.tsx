"use client";

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from '../ui/count-up';

const AboutSection = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    const onIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (!node) return;
        if (entry.isIntersecting) {
          node.play().catch(() => {});
        } else {
          node.pause();
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.3,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="bg-black text-foreground py-24 sm:py-32">
      <div className="container mx-auto flex flex-col items-start gap-16 px-6 lg:gap-20 lg:px-6">
        {/* Title Section */}
        <div className="flex flex-col items-start gap-6 text-left w-full">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-zinc-500" />
            <h4 className="text-sm font-medium uppercase tracking-[0.1em] text-text-secondary">
              About RAIT ACM SIGAI
            </h4>
          </div>
          <h2 className="max-w-3xl text-4xl font-bold md:text-5xl">
            Empowering the Next Generation of <span className="text-zinc-400">AI Innovators</span> and <span className="text-zinc-400">Leaders</span>
          </h2>
        </div>

        {/* Content Section */}
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
            {/* Text Content */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-lg text-text-secondary h-full">
                <p className="mb-4">
                  The RAIT ACM SIGAI Student Chapter, established in 2024, focuses on preparing students for the future of Artificial Intelligence. We provide access to workshops, seminars, and events on cutting-edge AI technologies to enhance technical skills, support project development, and drive innovation.
                </p>
              </div>
            </div>
            
            {/* Group Image */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full max-w-[600px] rounded-xl overflow-hidden border border-zinc-800">
                <Image
                  src="/img/About-us.webp"
                  alt="RAIT ACM SIGAI Group"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: 12, label: 'Months of Experience' },
              { number: 15, label: 'Events Conducted' },
              { number: 3, label: 'Flagship Events' },
              { number: 52, label: 'Active Members' }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 bg-gradient-to-br from-black to-zinc-900 rounded-xl border border-zinc-800 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
              >
                {/* Animated background effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Number with gradient text */}
                <div className="relative">
                  <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:from-blue-300 group-hover:to-blue-500 transition-all duration-300">
                    <CountUp 
                      to={stat.number} 
                      duration={2} 
                      separator=","
                      className="count-up text-white"
                    />
                  </div>
                  <p className="text-sm text-zinc-400 mt-2">{stat.label}</p>
                  
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;