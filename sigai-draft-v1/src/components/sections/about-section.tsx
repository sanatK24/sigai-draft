"use client";

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
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
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Images */}
          <div className="flex items-center justify-center gap-2 md:gap-6">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/images/mHIHt1IfNwNdWZEzuLWbbAsYAQ-3.png?"
              alt="Holographic pyramid shape"
              width={200}
              height={200}
              className="h-auto w-1/3 max-w-[200px] object-contain"
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/images/3YKs2hgpQG9dzUtGh08BToe4fvk-4.png?"
              alt="Holographic cube shape"
              width={200}
              height={200}
              className="h-auto w-1/3 max-w-[200px] object-contain"
            />
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/3a38a397-005e-4ec0-ae61-a21e39703477-eventis-framer-website/assets/images/pdzJAfqq5Mx9EcBL3K4o0wOVLJA-5.png?"
              alt="Holographic layered squares shape"
              width={200}
              height={200}
              className="h-auto w-1/3 max-w-[200px] object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-text-secondary">
                <span className="text-blue-400 font-medium">RAIT ACM SIGAI</span> (Special Interest Group in <span className="text-blue-400 font-medium">Artificial Intelligence</span>) is a dynamic committee established in <span className="text-blue-400 font-medium">2024</span>, dedicated to exploring the vast potential of AI. In today's rapidly evolving technological landscape, AI is <span className="text-blue-400 font-medium">revolutionizing industries</span> and <span className="text-blue-400 font-medium">reshaping career opportunities</span> across the globe.
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                Mastering <span className="text-blue-400 font-medium">AI</span> has become <span className="text-blue-400 font-medium">essential</span> for maintaining a <span className="text-blue-400 font-medium">competitive edge</span> in the modern workforce. It not only enhances <span className="text-blue-400 font-medium">problem-solving</span> capabilities and <span className="text-blue-400 font-medium">technical expertise</span> but also equips individuals with the tools to drive <span className="text-blue-400 font-medium">meaningful innovation</span> in their respective fields.
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                At <span className="text-blue-400 font-medium">RAIT ACM SIGAI</span>, we are committed to <span className="text-blue-400 font-medium">empowering students</span> through comprehensive learning opportunities. Our initiatives include <span className="text-blue-400 font-medium">interactive seminars</span>, <span className="text-blue-400 font-medium">expert-led webinars</span>, <span className="text-blue-400 font-medium">hands-on workshops</span>, and <span className="text-blue-400 font-medium">engaging events</span>—all designed to keep participants at the <span className="text-blue-400 font-medium">forefront of AI advancements</span> and <span className="text-blue-400 font-medium">practical applications</span>.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '12', label: 'Months of Experience' },
              { number: '15', label: 'Events Conducted' },
              { number: '3', label: 'Flagship Events' },
              { number: '52', label: 'Active Members' }
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
                <div className="relative
                  text-4xl md:text-5xl font-bold mb-2 
                  bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600
                  group-hover:from-blue-300 group-hover:to-blue-500 transition-all duration-300">
                  {stat.number}
                </div>
                
                {/* Label */}
                <div className="text-sm md:text-base text-zinc-400 font-medium">
                  {stat.label}
                </div>
                
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;