"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Calendar, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderBeam } from '../lightswind/border-beam';
import { useState } from 'react';
import EventModal from '../EventModal';
import Header from '../header';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventDetails = {
    title: "IGNASIA WORKSHOP 2025",
    date: "October 15, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "RAIT Campus, Navi Mumbai",
    description: "Join us for an immersive workshop on the latest advancements in AI and Machine Learning. Learn from industry experts and get hands-on experience with cutting-edge technologies.",
    image: "/img/events/ignasia-workshop.jpg",
    registerLink: "https://example.com/register/ignasia-2025"
  };
  return (
    <section className="relative isolate flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        aria-hidden
        className="absolute -z-20 w-[120vmax] h-[120vmax] rounded-full blur-3xl opacity-30"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, rgba(59,79,222,0.5), rgba(139,92,246,0.4), rgba(59,79,222,0.5))',
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
      />

      {/* Subtle radial overlays */}
      <div
        className="absolute inset-0 -z-20 w-full h-full"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgba(59, 79, 222, 0.2), transparent 50%), radial-gradient(circle at 80% 90%, rgba(139, 92, 246, 0.15), transparent 50%)',
        }}
      />
      
      {/* Top-right Logos with Label */}
      <div className="absolute top-6 right-6 z-30 flex flex-col items-end gap-2">
        <div className="bg-white/5 backdrop-blur-xl text-white/90 text-xs font-medium px-4 py-1.5 rounded-full border border-white/20 shadow-lg shadow-black/20 hover:bg-white/10 transition-all duration-300">
          Our Sister Chapters
        </div>
        <div className="flex items-center gap-3">
          <a 
            href="https://rait.acm.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-12 h-12 hover:opacity-80 transition-opacity"
            aria-label="RAIT ACM Student Chapter"
          >
            <Image
              src="/img/ACMSCWhite.png"
              alt="RAIT ACM Student Chapter"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </a>
          <a 
            href="https://rait-w.acm.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-12 h-12 hover:opacity-80 transition-opacity"
            aria-label="RAIT ACM-W Student Chapter"
          >
            <Image
              src="/img/ACM-W-SCWhite.png"
              alt="RAIT ACM-W Student Chapter"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </a>
        </div>
      </div>

      {/* Floating shapes */}
      <motion.div
        className="absolute top-[10%] left-[-5%] md:left-[5%] -z-10"
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="https://framerusercontent.com/images/wX62SMRMN1v1X6SFoJaoNdwo.webp"
          alt="3D Cube"
          width={512}
          height={512}
          className="w-[200px] h-[200px] md:w-[350px] md:h-[350px] object-contain opacity-30"
        />
      </motion.div>

      <motion.div
        className="absolute top-[40%] right-[5%] md:right-[15%] -z-10"
        animate={{ y: [0, 12, 0], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="https://framerusercontent.com/images/93NVWJJQujdEcPewVpg3Xp7ip4.webp"
          alt="3D Triangle"
          width={512}
          height={512}
          className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-contain opacity-20"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[20%] right-[-5%] md:right-[5%] -z-10"
        animate={{ y: [0, -10, 0], rotate: [0, 1, -1, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="https://framerusercontent.com/images/wX62SMRMN1v1X6SFoJaoNdwo.webp"
          alt="3D Cube"
          width={512}
          height={512}
          className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] object-contain opacity-30"
        />
      </motion.div>

<Header />

      {/* Hero content */}
      <div className="container relative z-10 flex flex-col items-center text-center pt-24 pb-32 px-6">
        {/* Eyebrow with event title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="relative group inline-block mb-3">
            <button 
              className="relative z-10 inline-flex items-center bg-white/10 backdrop-blur-sm text-white/80 hover:text-white text-sm font-medium px-4 py-1.5 rounded-full border border-white/10 group-hover:border-transparent transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="inline-block group-hover:transform group-hover:-translate-y-full group-hover:opacity-0 transition-all duration-300">
                Upcoming Event
              </span>
              <span className="absolute inset-0 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                Register Now →
              </span>
            </button>
            <div className="absolute inset-0 rounded-full overflow-visible">
              <BorderBeam
                size={400}
                duration={2.5}
                delay={0}
                colorTo="#7c3aed"
                opacity={1}
                glowIntensity={1.5}
                beamBorderRadius={9999}
                borderThickness={3}
                speedMultiplier={1.2}
                className="transition-all duration-300"
                style={{
                  width: 'calc(100% + 8px)',
                  height: 'calc(100% + 8px)',
                  margin: '-4px',
                  '--glow-intensity': '1.5',
                }}
              />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            IGNASIA WORKSHOP 2025
          </h2>
          
          {/* Event Details Modal */}
          <AnimatePresence>
            {isModalOpen && (
              <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={{
                  title: eventDetails.title,
                  date: eventDetails.date,
                  description: eventDetails.description,
                  image: eventDetails.image,
                  registerLink: eventDetails.registerLink,
                  details: [
                    { icon: <Calendar size={16} />, text: eventDetails.date },
                    { icon: <Clock size={16} />, text: eventDetails.time },
                    { icon: <MapPin size={16} />, text: eventDetails.location },
                  ]
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="w-full max-w-[1000px] mb-6 flex justify-center">
          <h1 
            className="text-center font-hanson text-white"
            style={{
              fontFamily: 'Hanson, sans-serif',
              fontSize: 'min(12vw, 6rem)',
              lineHeight: '1',
              height: '319px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
            }}
          >
            <span>RAIT ACM SIGAI</span> <span style={{ fontSize: '0.6em', color: 'white' }}>STUDENT CHAPTER</span>
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <h3
            className="text-2xl md:text-[32px] font-normal text-zinc-400"
            style={{ letterSpacing: '-0.01em', lineHeight: '1.4' }}
          >
            Building the Future
          </h3>
        </div>
      </div>

      {/* Bottom bar - Commented out as requested
      <div className="absolute bottom-12 hidden md:flex justify-center items-center gap-6 text-zinc-300 w-full max-w-4xl z-20">
        <h4 className="text-xl font-normal">14th October 2025</h4>
        <div className="h-5 w-px bg-white/30"></div>
        <h4 className="text-xl font-normal">Marina Bay, Singapore</h4>
        <div className="h-5 w-px bg-white/30"></div>
        <a
          href="#about"
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <ArrowUpRight size={24} />
        </a>
      </div>
      */}
    </section>
  );
};

export default HeroSection;