"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { GlassIcon } from '../ui/glass-icon';
import { motion, useInView } from 'framer-motion';

interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  github?: string;
}

interface Speaker {
  name: string;
  title: string;
  image: string;
  color?: string;
  testimony?: string;
  spotifyUrl?: string;
  socials?: SocialLinks;
}

const speakers: Speaker[] = [
  {
    name: 'Hiresh Nandodkar',
    title: 'Chairperson',
    image: '/img/faculty_img/Unknown_person.jpg',
    color: '#d4ff00', // Keep the punchy green/lime
    testimony: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    spotifyUrl: 'https://open.spotify.com/playlist/YOUR_PLAYLIST_ID_1',
    socials: {
      instagram: 'https://www.instagram.com/hiresh_username/',
      linkedin: 'https://www.linkedin.com/in/hiresh-username/',
      github: 'https://github.com/hiresh-username'
    }
  },
  {
    name: 'Aastha Shetty',
    title: 'Vice Chairperson',
    image: '/img/faculty_img/Unknown_person.jpg',
    color: '#ff4d94', // Vibrant hot pink
    testimony: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
    spotifyUrl: 'https://open.spotify.com/playlist/YOUR_PLAYLIST_ID_2',
    socials: {
      instagram: 'https://www.instagram.com/aastha_username/',
      linkedin: 'https://www.linkedin.com/in/aastha-username/',
      github: 'https://github.com/aastha-username'
    }
  },
  {
    name: 'Rian Pardal',
    title: 'General Secretary',
    image: '/img/faculty_img/Unknown_person.jpg',
    color: '#a78bfa', // Vibrant purple
    testimony: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.',
    spotifyUrl: 'https://open.spotify.com/playlist/YOUR_PLAYLIST_ID_3',
    socials: {
      instagram: 'https://www.instagram.com/rian_username/',
      linkedin: 'https://www.linkedin.com/in/rian-username/',
      github: 'https://github.com/rian-username'
    }
  },
  {
    name: 'Riddhi Patil',
    title: 'Treasurer',
    image: '/img/faculty_img/Unknown_person.jpg',
    color: '#22d3ee', // Vibrant cyan/turquoise
    testimony: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
    spotifyUrl: 'https://open.spotify.com/playlist/YOUR_PLAYLIST_ID_4',
    socials: {
      instagram: 'https://www.instagram.com/riddhi_username/',
      linkedin: 'https://www.linkedin.com/in/riddhi-username/',
      github: 'https://github.com/riddhi-username'
    }
  },
  {
    name: 'Sanat Karkhanis',
    title: 'Webmaster',
    image: '/img/faculty_img/Unknown_person.jpg',
    color: '#fb7185', // Vibrant coral/rose
    testimony: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    spotifyUrl: 'https://open.spotify.com/playlist/YOUR_PLAYLIST_ID_5',
    socials: {
      instagram: 'https://www.instagram.com/sanat_username/',
      linkedin: 'https://www.linkedin.com/in/sanat-username/',
      github: 'https://github.com/sanat-username'
    }
  }
];

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20);
      
      return () => clearTimeout(timeout);
    } else {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      
      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, text]);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <span className="inline-block">
      {displayedText}
      <span 
        className={`inline-block w-2 h-6 bg-purple-400 ml-1 transition-opacity duration-300 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          verticalAlign: 'text-top',
          marginLeft: '2px'
        }}
      />
    </span>
  );
};

interface FacultySpeakerCardProps {
  speaker: Speaker;
  active: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const FacultySpeakerCard = ({ 
  speaker, 
  active, 
  className = '',
  style
}: FacultySpeakerCardProps) => {
  const socialLinks = {
    linkedin: 'https://www.linkedin.com/company/rait-sigai/'
  };

  return (
    <div 
      className={`relative w-full max-w-[450px] ${className}`}
      style={style}
    >
      {/* Main Card Container */}
      <div className="relative bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
        {/* Image Container with Clip Path - Fixed height to ensure equal card sizes */}
        <div className="relative w-full h-[380px] overflow-hidden bg-black" 
          style={{
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
          }}
        >
          <Image
            src={speaker.image}
            alt={`Headshot of ${speaker.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 450px"
            className="object-contain"
            style={{
              objectPosition: 'center center'
            }}
            priority={true}
          />
        </div>
      </div>

      {/* Text Content Below Image */}
      <div className="mt-6 text-right pr-6">
        <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-2 whitespace-nowrap">
          <span className="text-primary block" style={{ fontFamily: 'Arial, sans-serif' }}>
            {speaker.name.split(' ')[0]}
          </span>
          <span className="text-primary block" style={{ fontFamily: 'Arial, sans-serif' }}>
            {speaker.name.split(' ').slice(1).join(' ')}
          </span>
        </h3>
        <p className="text-white text-xs uppercase tracking-wider mt-2 whitespace-nowrap">
          {speaker.title}
        </p>
        
        {/* View Bio Link */}
        <button className="text-white text-sm mt-4 hover:text-primary transition-colors flex items-center gap-1 ml-auto whitespace-nowrap">
          View Bio
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

interface CoreTeamCardProps {
  speaker: Speaker;
  index?: number;
  isCarouselInView?: boolean;
  isActive?: boolean;
}

const CoreTeamCard = ({ speaker, index = 0, isCarouselInView = true, isActive = false }: CoreTeamCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardColor = speaker.color || '#d4ff00';
  const beigeColor = '#d4c5b9'; // Beige/muted color for inactive cards

  return (
    <motion.div 
      className="relative min-w-[350px] flex-shrink-0 group mt-10"
      style={{ height: '700px' }}
      initial={{ opacity: 0, y: 50 }}
      animate={isCarouselInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base colored card */}
      <div 
        className="absolute inset-0 rounded-[32px] p-7 flex flex-col transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl"
        style={{ 
          backgroundColor: isActive || isHovered ? cardColor : beigeColor,
          height: '650px',
          paddingBottom: '320px' // Make room for the image
        }}
      >
        {/* Top badges and arrow */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-2">
            <div className="bg-white text-black text-[13px] font-semibold px-4 py-2.5 rounded-full whitespace-nowrap">
              Core Team
            </div>
            <div className="bg-white text-black text-[13px] font-semibold px-4 py-2.5 rounded-full">
              2025-26
            </div>
          </div>

          <a 
            href={speaker.spotifyUrl || '#'} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 bg-black rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-45 flex-shrink-0"
            aria-label={`Listen to ${speaker.name}'s Spotify playlist`}
            title={`Listen to ${speaker.name}'s Spotify playlist`}
          >
            <svg 
              viewBox="0 0 24 24" 
              className="w-7 h-7"
              stroke="white"
              strokeWidth="2"
              fill="none"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
        </div>

        {/* Name (large, 2 lines) */}
        <h2 className="text-[38px] font-bold leading-[1.1] text-black mb-3 break-words">
          {speaker.name}
        </h2>
        
        {/* Position */}
        <p className="text-[16px] text-black/75 font-medium mb-4">
          {speaker.title}
        </p>
        
        {/* Testimony */}
        <p className="text-[15px] text-black/75 leading-relaxed line-clamp-3">
          {speaker.testimony || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
        </p>
      </div>

      {/* Image container */}
      <div 
        className="absolute bottom-0 w-full max-w-[350px] h-[370px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover:-translate-y-3 mx-auto left-0 right-0"
        style={{
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 320px"
            priority={index < 3} // Only load first 3 images eagerly
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          
          {/* Social icons - Vertical on right side, appear on hover */}
          <div className="absolute top-1/2 -translate-y-1/2 right-5 flex flex-col gap-4 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
            {speaker.socials?.instagram && (
              <div className="mb-4">
                <GlassIcon 
                  href={speaker.socials.instagram}
                  iconSrc="/img/instagram.png"
                  alt="Instagram"
                  className="hover:scale-110 transition-transform duration-200 w-10 h-10"
                  iconClass="w-5 h-5"
                />
              </div>
            )}
            {speaker.socials?.linkedin && (
              <div className="mb-4">
                <GlassIcon 
                  href={speaker.socials.linkedin}
                  iconSrc="/img/linkedin (1).png"
                  alt="LinkedIn"
                  className="hover:scale-110 transition-transform duration-200 w-10 h-10"
                  iconClass="w-5 h-5"
                />
              </div>
            )}
            {speaker.socials?.github && (
              <div className="mb-4">
                <GlassIcon 
                  href={speaker.socials.github}
                  iconSrc="/img/github.png"
                  alt="GitHub"
                  className="hover:scale-110 transition-transform duration-200 w-10 h-10"
                  iconClass="w-5 h-5"
                />
              </div>
            )}
          </div>

          {/* Read More button with clean glassmorphism */}
          <a 
            href="/team" 
            className="absolute bottom-5 left-5 bg-white/25 backdrop-blur-md text-white px-7 py-3.5 rounded-full text-[15px] font-semibold flex items-center gap-2.5 transition-all duration-300 hover:bg-white/35 hover:backdrop-blur-lg hover:translate-x-1 shadow-lg border border-white/40"
            style={{
              backdropFilter: 'blur(10px) saturate(150%)',
              WebkitBackdropFilter: 'blur(10px) saturate(150%)'
            }}
          >
            Read More
            <svg 
              viewBox="0 0 24 24" 
              className="w-[18px] h-[18px]"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const SpeakersSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, // Disable loop for ping-pong effect
    align: 'start',
    skipSnaps: false,
    dragFree: false, // Changed to false for snappier transitions
    containScroll: false,
    duration: 20 // Faster transitions for smoother reverse
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'forward' | 'backward'>('forward');
  const isCarouselInView = useInView(carouselRef, { once: true, amount: 0.2 });
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect when section is fully visible
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Section is visible when at least 30% is in viewport
        const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
        console.log('Core Team Section Visibility:', {
          isIntersecting: entry.isIntersecting,
          ratio: entry.intersectionRatio,
          isVisible
        });
        setIsSectionInView(isVisible);
      },
      {
        threshold: [0, 0.3, 0.5, 0.8, 1.0], // Multiple thresholds for smooth detection
        rootMargin: '0px' // No margin to make it easier to trigger
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Auto-scroll functionality - only when section is in view AND hovering
  useEffect(() => {
    if (!emblaApi || !isSectionInView || !isHovering) {
      console.log('Auto-scroll NOT active:', { emblaApi: !!emblaApi, isSectionInView, isHovering });
      return;
    }

    console.log('Auto-scroll ACTIVE - starting interval');

    const autoScroll = () => {
      const currentScrollIndex = emblaApi.selectedScrollSnap();
      console.log('Current scroll index:', currentScrollIndex, 'Selected index:', selectedIndex, 'Direction:', scrollDirection);

      if (scrollDirection === 'forward') {
        // For forward: scroll until index 2, then just change visual selection for 3 and 4
        if (currentScrollIndex < 2 && emblaApi.canScrollNext()) {
          console.log('Auto-scrolling forward (with scroll)...');
          emblaApi.scrollNext();
        } else if (selectedIndex < speakers.length - 1) {
          console.log('Moving to next card (selection only, no scroll)...');
          setSelectedIndex(selectedIndex + 1);
        } else {
          console.log('Reached end, reversing direction');
          setScrollDirection('backward');
        }
      } else {
        // For backward: just change visual selection from 4 to 3, then scroll from 2 to 0
        if (selectedIndex > 2) {
          console.log('Moving to previous card (selection only, no scroll)...');
          setSelectedIndex(selectedIndex - 1);
        } else if (currentScrollIndex > 0 && emblaApi.canScrollPrev()) {
          console.log('Auto-scrolling backward (with scroll)...');
          emblaApi.scrollPrev();
        } else {
          console.log('Reached start, reversing direction');
          setScrollDirection('forward');
        }
      }
    };

    // Start auto-scrolling
    const intervalId = setInterval(autoScroll, 3000); // Move every 3 seconds

    return () => {
      console.log('Auto-scroll cleanup');
      clearInterval(intervalId);
    };
  }, [emblaApi, isSectionInView, isHovering, scrollDirection, selectedIndex]);

  // Scroll-triggered navigation - disabled during auto-scroll to avoid conflicts
  useEffect(() => {
    if (!carouselRef.current || !emblaApi || !isSectionInView) return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    let lastInteractionTime = 0;

    const handleScroll = () => {
      const now = Date.now();
      // Only allow manual scroll control if no recent auto-scroll (within 500ms)
      if (now - lastInteractionTime < 500) {
        ticking = false;
        return;
      }

      const scrollY = window.scrollY;
      const carouselTop = carouselRef.current?.offsetTop || 0;
      const carouselHeight = carouselRef.current?.offsetHeight || 0;
      const viewportHeight = window.innerHeight;

      // Check if carousel is in viewport
      const isInView = scrollY + viewportHeight > carouselTop && 
                       scrollY < carouselTop + carouselHeight;

      if (isInView) {
        const scrollDelta = scrollY - lastScrollY;
        
        if (Math.abs(scrollDelta) > 50) { // Threshold to trigger card change
          if (scrollDelta > 0 && emblaApi.canScrollNext()) {
            // Scrolling down - next card
            emblaApi.scrollNext();
            lastInteractionTime = now;
          } else if (scrollDelta < 0 && emblaApi.canScrollPrev()) {
            // Scrolling up - previous card
            emblaApi.scrollPrev();
            lastInteractionTime = now;
          }
          lastScrollY = scrollY;
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [emblaApi, isSectionInView]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const snap = emblaApi.selectedScrollSnap();
    const actualIndex = snap % speakers.length;
    // Only update selectedIndex if it's different and we're at scroll positions 0, 1, or 2
    if (actualIndex <= 2) {
      setSelectedIndex(actualIndex);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const facultySponsors = [
    {
      name: 'Dr. Sangita Chaudhari',
      title: 'HOD of Computer Science & Engineering',
      image: '/img/faculty_img/HODIT.jpg',
    },
    {
      name: 'Dr. Pallavi Chavan',
      title: 'HOD of Information Technology',
      image: '/img/faculty_img/pallavimam.jpg',
    }
  ];

  return (
    <div className="space-y-24 md:space-y-32 py-12 md:py-24">
      {/* Faculty Section */}
      <section id="faculty" className="relative py-16 md:py-24">
        <div className="container px-4 mx-auto max-w-[1600px]">
          <div className="flex flex-col items-start text-left mb-16 px-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-gray-600" />
              <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                FACULTY MENTORS
              </h4>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-4">
              Meet Our <span className="text-primary">Faculty</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl">
              The esteemed faculty members who guide and support RAIT ACM SIGAI.
            </p>
          </div>
          
          {/* Faculty Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto px-5">
            {facultySponsors.map((faculty, index) => (
              <div key={faculty.name} className="flex justify-center">
                <FacultySpeakerCard 
                  speaker={faculty} 
                  active={true}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section 
        id="core-team" 
        ref={sectionRef} 
        className="relative py-12 md:py-20 overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="container px-4 mx-auto max-w-[1600px]">
          {/* Header */}
          <div className="flex flex-col items-start text-left mb-12 px-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-gray-600" />
              <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                BRAINS BEHIND SIGAI
              </h4>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-4">
              Meet the <span className="text-primary">Core</span> Team
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl">
              The passionate students driving the RAIT ACM SIGAI Student Chapter forward with innovation and dedication.
            </p>
          </div>

          {/* Navigation - Dots and Arrows on RIGHT side only */}
          <div className="flex justify-end items-center mb-10 px-5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={scrollPrev}
                  className="w-12 h-12 rounded-full border bg-white border-white text-black hover:scale-110 transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-5 h-5 mx-auto"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button
                  onClick={scrollNext}
                  className="w-12 h-12 rounded-full border bg-white border-white text-black hover:scale-110 transition-all duration-300"
                  aria-label="Next slide"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-5 h-5 mx-auto"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Core Team Carousel */}
          <div className="relative px-5" ref={carouselRef}>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {speakers.map((speaker, idx) => (
                  <CoreTeamCard 
                    key={speaker.name}
                    speaker={speaker}
                    index={idx}
                    isCarouselInView={isCarouselInView}
                    isActive={idx === selectedIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeakersSection;