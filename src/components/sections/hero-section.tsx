"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '../header';

interface Event {
  id: string;
  idx?: number;
  title: string;
  date: string;
  time: string;
  end_date?: string | null;
  location: string;
  image?: string | null;
  registration_link?: string | null;
  slug?: string;
}

const HeroSection = () => {
  const router = useRouter();
  const [upcomingEvent, setUpcomingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      try {
        const response = await fetch('/data/events_local.json');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const events = await response.json();
        
        if (events && events.length > 0) {
          const now = new Date();
          // Find upcoming events (including today's events)
          const upcoming = events
            .filter((event: Event) => new Date(event.date) >= new Date(now.setHours(0, 0, 0, 0)))
            .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime());
          
          if (upcoming.length > 0) {
            // Get the nearest upcoming event
            setUpcomingEvent(upcoming[0]);
          } else {
            // If no upcoming events, show the most recent past event
            const past = [...events]
              .sort((a: Event, b: Event) => new Date(b.date).getTime() - new Date(a.date).getTime());
            if (past.length > 0) {
              setUpcomingEvent(past[0]);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching upcoming event:', err);
        setError('Failed to load event information. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUpcomingEvent();
  }, []);

  const handleEventClick = () => {
    if (upcomingEvent) {
      router.push(`/events/${upcomingEvent.idx}`);
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
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 20%, rgba(59, 79, 222, 0.2), transparent 50%), radial-gradient(circle at 80% 90%, rgba(139, 92, 246, 0.15), transparent 50%)',
        }}
      />
            {/* Commented out as per request
          <div className="absolute top-6 left-6 z-30 flex flex-col items-start gap-2">
            {error ? (
              <div className="text-red-400 text-xs max-w-[180px] bg-red-900/30 px-3 py-1.5 rounded-lg">
                {error}
              </div>
            ) : (
              <button 
                onClick={handleEventClick}
                className="bg-white/5 backdrop-blur-xl text-white/90 text-xs font-medium px-4 py-1.5 rounded-full border border-white/20 shadow-lg shadow-black/20 hover:bg-white/10 transition-all duration-300 flex items-center gap-1.5"
                disabled={isLoading}
              >
                <span>{isLoading ? 'Loading...' : 'Upcoming Event'}</span>
                <ArrowUpRight size={14} />
              </button>
            )}
            {!isLoading && upcomingEvent && (
              <h2 
                className="text-white/90 text-sm font-medium px-1 max-w-[180px] leading-tight cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleEventClick}
              >
                {upcomingEvent.title}
              </h2>
            )}
          </div>
          
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
                  src="/img/ACMSCWhite.webp"
                  alt="RAIT ACM Student Chapter"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
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
                  src="/img/ACM-W-SCWhite.webp"
                  alt="RAIT ACM-W Student Chapter"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </a>
            </div>
          </div>
          */}

      {/* Floating shapes */}
      <motion.div
        className="absolute top-[10%] left-[-5%] md:left-[5%] -z-10"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        <Image
          src="https://framerusercontent.com/images/wX62SMRMN1v1X6SFoJaoNdwo.webp"
          alt="3D Cube"
          width={512}
          height={512}
          className="w-[200px] h-[200px] md:w-[350px] md:h-[350px] object-contain opacity-30"
        />
      </motion.div>

      {/* Right Triangle - Commented out
      <motion.div
        className="absolute top-[40%] right-[5%] md:right-[15%] -z-10"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, -10, 10, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
      >
        <Image
          src="https://framerusercontent.com/images/93NVWJJQujdEcPewVpg3Xp7ip4.webp"
          alt="3D Triangle"
          width={512}
          height={512}
          className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-contain opacity-20"
        />
      </motion.div>
      */}

      <motion.div
        className="absolute bottom-[20%] right-[-5%] md:right-[5%] -z-10"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 180, 360],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
          scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
        }}
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
              fontSize: 'min(9vw, 4.5rem)',
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
            <div className="flex flex-col items-center space-y-4">
              <div className="inline-flex">
                {'RAIT \t\t\t\t ACM'.split('').map((letter, i) => (
                  letter === ' ' ? (
                    <span key={`first-${i}`} className="w-2" />
                  ) : (
                    <motion.span 
                      key={`first-${i}`}
                      className="inline-block cursor-default"
                      whileHover={{
                        y: -5,
                        scale: 1.2,
                        color: '#ffffff',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 10
                      }}
                    >
                      {letter}
                    </motion.span>
                  )
                ))}
              </div>
              <div className="inline-flex">
                {'SIGAI'.split('').map((letter, i) => (
                  <motion.span 
                    key={`second-${i}`}
                    className="inline-block cursor-default"
                    whileHover={{
                      y: -5,
                      scale: 1.2,
                      color: '#ffffff',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 10
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <div className="pt-4">
                <span className="text-white opacity-70 text-[0.5em] tracking-wider">STUDENT CHAPTER</span>
              </div>
            </div>
          </h1>
        </div>
        <div className="flex flex-col items-center">
          <h3
            className="text-2xl md:text-[32px] font-normal text-zinc-400"
            style={{ letterSpacing: '-0.01em', lineHeight: '1.4' }}
          >
            Building the Future with AI at Forefront
            <div className="mt-4">
              <Image
                src="/img/sigai-logo-transparent.webp"
                alt="SIGAI Logo"
                width={200}
                height={100}
                className="mx-auto"
                priority
              />
            </div>
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