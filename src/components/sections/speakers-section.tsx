"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { GlassIcon } from '../ui/glass-icon';

interface Speaker {
  name: string;
  title: string;
  image: string;
  color?: string;
  testimony?: string;
}

const speakers: Speaker[] = [
  {
    name: 'Hiresh Nandodkar',
    title: 'Chairperson',
    image: '/img/faculty_img/Unknown_person.jpg',
    color: '#d4ff00',
    testimony: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
  },
  {
    name: 'Aastha Shetty',
    title: 'Vice Chairperson',
    image: '/img/faculty_img/Unknown_person.jpg',
    color: '#ff6b9d',
    testimony: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'
  },
  {
    name: 'Rian Pardal',
    title: 'General Secretary',
    image: '/img/faculty_img/Unknown_person.jpg',
    color: '#a18cd1',
    testimony: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.'
  },
  {
    name: 'Riddhi Patil',
    title: 'Treasurer',
    image: '/img/faculty_img/Unknown_person.jpg',
    color: '#4fc3f7',
    testimony: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.'
  },
  {
    name: 'Sanat Karkhanis',
    title: 'Webmaster',
    image: '/img/faculty_img/Unknown_person.jpg',
    color: '#f093fb',
    testimony: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.'
  }
];

interface SocialLink {
  icon: string;
  url: string;
}

interface SocialLinks {
  linkedin: SocialLink;
  instagram?: SocialLink;
  github?: SocialLink;
}

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
  const [isHovered, setIsHovered] = React.useState(false);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = React.useState(false);
  
  const socialLinks: SocialLinks = {
    linkedin: {
      icon: '/img/linkedin (1).png',
      url: 'https://www.linkedin.com/company/rait-sigai/'
    }
  };

  const getBio = (name: string, title: string) => {
    if (name.includes('Sangita')) {
      return `Placeholder text.`;
    } else if (name.includes('Pallavi')) {
      return `Placeholder text.`;
    }
    return `Placeholder text.`;
  };

  const toggleMobileInfo = () => {
    if (window.innerWidth < 768) {
      setIsMobileInfoOpen(!isMobileInfoOpen);
    } else {
      setIsHovered(!isHovered);
    }
  };

  return (
    <div 
      className={`flex flex-col w-full shrink-0 relative max-w-[294px] mx-auto ${className}`}
    >
      <div 
        className="relative group overflow-visible h-full"
        onMouseEnter={() => window.innerWidth >= 768 && setIsHovered(true)}
        onMouseLeave={() => window.innerWidth >= 768 && setIsHovered(false)}
      >
        <div className="overflow-hidden rounded-3xl w-full h-[360px] bg-gray-800">
          <div className="relative w-full h-full">
            <div className="absolute inset-0">
              <Image
                src={speaker.image}
                alt={`Headshot of ${speaker.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 373px"
                className={`object-cover w-full h-full transition-all duration-300 ${active ? 'grayscale-0' : 'grayscale'} group-hover:grayscale-0`}
                style={{
                  objectPosition: 'center top'
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,17,67,0.4)] to-transparent" />
          </div>
          <div className="absolute bottom-6 right-6 flex gap-3">
            <GlassIcon 
              href={socialLinks.linkedin.url} 
              iconSrc={socialLinks.linkedin.icon} 
              alt="LinkedIn" 
              className="hover:scale-110 transition-transform duration-200"
            />
          </div>
        </div>

        {/* Info Panel - Desktop */}
        {isHovered && (
          <div 
            className={`hidden md:block absolute ${
              speaker.name.includes('Sangita') 
                ? 'left-full ml-4 top-0' 
                : 'right-full mr-4 top-0'
            } w-80 bg-gradient-to-br from-card to-card/90 backdrop-blur-lg rounded-xl p-6 shadow-2xl z-50`}
          >
            <h4 className="text-xl font-bold text-white mb-2">{speaker.name}</h4>
            <p className="text-sm text-purple-300 mb-4">
              {speaker.title.includes('\n') ? speaker.title.split('\n').join(' • ') : speaker.title}
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-4" />
            <div className="mt-2 text-sm text-gray-300 leading-relaxed font-mono max-h-48 overflow-y-auto pr-2">
              <TypewriterText text={getBio(speaker.name, speaker.title)} />
            </div>
            <div className={`absolute top-1/2 -translate-y-1/2 ${
              speaker.name.includes('Sangita') 
                ? '-left-2 -translate-x-1/2 border-r-8 border-r-card border-y-8 border-y-transparent'
                : '-right-2 translate-x-1/2 border-l-8 border-l-card border-y-8 border-y-transparent'
            }`}></div>
          </div>
        )}
      </div>
      
      {/* Name and title */}
      <div className="mt-4 px-2 w-full">
        <h4 className="text-xl font-semibold text-white text-center">{speaker.name}</h4>
        <div className="mt-1 text-sm text-center">
          {speaker.title.includes('\n') ? (
            <>
              <p className="text-base text-muted-foreground">{speaker.title.split('\n')[0]}</p>
              <p className="text-base font-medium text-purple-400 mt-1">{speaker.title.split('\n')[1]}</p>
            </>
          ) : (
            <p className="text-base text-muted-foreground">{speaker.title}</p>
          )}
        </div>
      </div>
      
      {/* Mobile info panel */}
      <div 
        className={`w-full bg-gradient-to-br from-card to-card/90 rounded-xl p-6 shadow-xl mt-4 transition-all duration-300 overflow-hidden ${
          isMobileInfoOpen ? 'max-h-96' : 'max-h-0 p-0 opacity-0'
        } md:max-h-0 md:p-0 md:opacity-0`}
      >
        <div className="text-sm text-gray-300 leading-relaxed font-mono">
          <TypewriterText text={getBio(speaker.name, speaker.title)} />
        </div>
      </div>
      
      {/* Toggle button for mobile */}
      <button 
        onClick={toggleMobileInfo}
        className="md:hidden mt-4 mx-auto px-4 py-2 text-sm text-purple-400 hover:text-white transition-colors"
        aria-expanded={isMobileInfoOpen}
      >
        {isMobileInfoOpen ? 'Show Less' : 'Read Bio'}
      </button>
    </div>
  );
};

interface CoreTeamCardProps {
  speaker: Speaker;
}

const CoreTeamCard = ({ speaker }: CoreTeamCardProps) => {
  const socialLinks: SocialLinks = {
    instagram: {
      icon: '/img/instagram.png',
      url: 'https://www.instagram.com/rait_sigai/'
    },
    linkedin: {
      icon: '/img/linkedin (1).png',
      url: 'https://www.linkedin.com/company/rait-sigai/'
    },
    github: {
      icon: '/img/github.png',
      url: 'https://github.com/RAIT-SIGAI'
    }
  };

  const cardColor = speaker.color || '#d4ff00';

  return (
    <div className="relative min-w-[320px] h-[560px] flex-shrink-0 group">
      {/* Base colored card */}
      <div 
        className="absolute inset-0 rounded-[32px] p-7 flex flex-col transition-transform duration-300 group-hover:-translate-y-2"
        style={{ 
          backgroundColor: cardColor,
          height: '360px'
        }}
      >
        {/* Top badges and arrow */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-2">
            <div className="bg-white text-black text-[13px] font-semibold px-4 py-2.5 rounded-full whitespace-nowrap">
              Core Team
            </div>
            <div className="bg-white text-black text-[13px] font-semibold px-4 py-2.5 rounded-full">
              2024-25
            </div>
          </div>
          <button className="w-11 h-11 bg-black rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-45 flex-shrink-0">
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5"
              stroke="white"
              strokeWidth="2"
              fill="none"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </button>
        </div>

        {/* Position (small) */}
        <p className="text-[14px] text-black/70 font-medium mb-2">
          {speaker.title}
        </p>

        {/* Name (large, 2 lines) */}
        <h2 className="text-[38px] font-bold leading-[1.1] text-black mb-3 break-words">
          {speaker.name}
        </h2>
        
        {/* Testimony */}
        <p className="text-[13px] text-black/75 leading-relaxed line-clamp-3">
          {speaker.testimony || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
        </p>
      </div>

      {/* Overlaid image card - NOW WITH NO GAP */}
      <div 
        className="absolute bottom-0 left-4 right-4 h-[300px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover:-translate-y-3"
        style={{
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
          top: '280px'
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 320px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Social icons */}
          <div className="absolute bottom-5 right-5 flex gap-3">
            <GlassIcon 
              href={socialLinks.instagram!.url} 
              iconSrc={socialLinks.instagram!.icon} 
              alt="Instagram" 
              className="hover:scale-110 transition-transform duration-200"
            />
            <GlassIcon 
              href={socialLinks.linkedin.url} 
              iconSrc={socialLinks.linkedin.icon} 
              alt="LinkedIn" 
              className="hover:scale-110 transition-transform duration-200"
            />
            <GlassIcon 
              href={socialLinks.github!.url} 
              iconSrc={socialLinks.github!.icon} 
              alt="GitHub" 
              className="hover:scale-110 transition-transform duration-200"
            />
          </div>

          {/* Read More button */}
          <button className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm text-black px-7 py-3.5 rounded-full text-[15px] font-semibold flex items-center gap-2.5 transition-all duration-300 hover:bg-white hover:translate-x-1">
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
          </button>
        </div>
      </div>
    </div>
  );
};

const SpeakersSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: 'start',
    skipSnaps: false,
    dragFree: true
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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
    emblaApi?.scrollTo(index * 2);
  }, [emblaApi]);

  const facultySponsors = [
    {
      name: 'Dr. Sangita Chaudhari',
      title: 'HOD of Computer Science & Engineering\nFaculty Sponsor',
      image: '/img/faculty_img/HODIT.jpg',
    },
    {
      name: 'Dr. Pallavi Chavan',
      title: 'HOD of Information Technology\nMentor',
      image: '/img/faculty_img/pallavimam.jpg',
    }
  ];

  return (
    <div className="space-y-24 md:space-y-32 py-12 md:py-24">
      {/* Faculty Section - UNCHANGED */}
      <section id="faculty" className="relative bg-gradient-to-b from-zinc-900/50 to-transparent py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-start text-left mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-text-secondary" />
              <h4 className="text-sm font-medium uppercase tracking-[0.1em] text-text-secondary">Faculty</h4>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-white mb-8">
              Our <span className="text-purple-400 font-editorial">Distinguished</span> <span className="text-white">Faculty</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mb-8">
              Meet the esteemed faculty members who guide and support us.
            </p>
          </div>
          
          {/* Faculty Grid - UNCHANGED */}
          <div className="relative max-w-5xl mx-auto">
            <div className="relative w-full">
              <div className="hidden md:block absolute inset-0 flex items-center justify-center">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
              </div>
              <div className="hidden md:block absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4 py-8 md:py-0">
                <div className="flex justify-center md:justify-end md:pr-8">
                  <FacultySpeakerCard 
                    speaker={facultySponsors[0]} 
                    active={true}
                    className="w-full max-w-sm"
                    style={{ '--delay': '0ms' } as React.CSSProperties}
                  />
                </div>
                
                <div className="flex justify-center md:justify-start md:pl-8">
                  <FacultySpeakerCard 
                    speaker={facultySponsors[1]} 
                    active={true}
                    className="w-full max-w-sm"
                    style={{ '--delay': '0ms' } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Team Section - NEW CAROUSEL DESIGN */}
      <section id="core-team" className="relative py-12 md:py-20 overflow-hidden">
        <div className="container px-4 mx-auto max-w-[1600px]">
          {/* Header */}
          <div className="flex flex-col items-start text-left mb-12 px-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-gray-600" />
              <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                ELEVATE YOUR GAME
              </h4>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-4">
              Meet the <span className="text-purple-400">Core</span> Team
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl">
              The passionate students driving the RAIT ACM SIGAI Student Chapter forward with innovation and dedication.
            </p>
          </div>

          {/* Navigation - Dots and Arrows */}
          <div className="flex justify-between items-center mb-10 px-5">
            {/* Arrow buttons */}
            <div className="flex gap-3">
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  canScrollPrev
                    ? 'bg-white border-white text-black hover:scale-110'
                    : 'bg-transparent border-gray-700 text-gray-600 cursor-not-allowed opacity-50'
                }`}
                aria-label="Previous slide"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  canScrollNext
                    ? 'bg-white border-white text-black hover:scale-110'
                    : 'bg-transparent border-gray-700 text-gray-600 cursor-not-allowed opacity-50'
                }`}
                aria-label="Next slide"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="flex gap-3">
              {[0, 1].map((index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`w-10 h-10 rounded-full border transition-all duration-300 ${
                    Math.floor(selectedIndex / 2) === index
                      ? 'bg-white border-white'
                      : 'bg-transparent border-gray-700 hover:bg-gray-800'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Core Team Carousel */}
          <div className="relative px-5">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {speakers.map((speaker) => (
                  <CoreTeamCard 
                    key={speaker.name}
                    speaker={speaker}
                  />
                ))}
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-gray-600 text-xs flex items-center gap-2 mt-8">
              Scroll for more
              <svg 
                viewBox="0 0 24 24" 
                className="w-5 h-5 animate-pulse"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeakersSection;