"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { createClient } from '../../lib/supabase/client';
import { useRouter } from 'next/navigation';
import Header from '../header';

interface Event {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  slug: string;
}

const HeroSection = () => {
  const router = useRouter();
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      try {
        const supabase = createClient();
        const today = new Date().toISOString().split('T')[0];
        
        const { data: events, error } = await supabase
          .from('events')
          .select('*')
          .gte('end_date', today)
          .order('start_date', { ascending: true })
          .limit(1);

        if (error) throw error;
        
        if (events && events.length > 0) {
          setUpcomingEvent(events[0]);
        }
      } catch (error) {
        console.error('Error fetching upcoming event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingEvent();
  }, []);

  const handleEventClick = () => {
    if (upcomingEvent) {
      router.push(`/events/${upcomingEvent.slug}`);
    } else {
      router.push('/events');
    }
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
      
      {/* Top-left Content */}
      <div className="absolute top-6 left-6 z-30 flex flex-col items-start gap-2">
        <button 
          onClick={handleEventClick}
          className="bg-white/5 backdrop-blur-xl text-white/90 text-xs font-medium px-4 py-1.5 rounded-full border border-white/20 shadow-lg shadow-black/20 hover:bg-white/10 transition-all duration-300 flex items-center gap-1.5"
          disabled={isLoading}
        >
          <span>{isLoading ? 'Loading...' : 'Upcoming Event'}</span>
          <ArrowUpRight size={14} />
        </button>
        {!isLoading && upcomingEvent && (
          <h2 
            className="text-white/90 text-sm font-medium px-1 max-w-[180px] leading-tight cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleEventClick}
          >
            {upcomingEvent.title}
          </h2>
        )}
      </div>
      
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
        {/* Main content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          
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