"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GlassIcon } from '../ui/glass-icon';

interface Speaker {
  name: string;
  title: string;
  image: string;
}

const speakers: Speaker[] = [
  {
    name: 'Hiresh Nandodkar',
    title: 'Chairperson',
    image: '/img/faculty_img/Unknown_person.jpg',
  },
  {
    name: 'Aastha Shetty',
    title: 'Vice Chairperson',
    image: '/img/faculty_img/Unknown_person.jpg',
  },
  {
    name: 'Rian Pardal',
    title: 'General Secretary',
    image: '/img/faculty_img/Unknown_person.jpg',
  },
  {
    name: 'Riddhi Patil',
    title: 'Treasurer',
    image: '/img/faculty_img/Unknown_person.jpg',
  },
  {
    name: 'Sanat Karkhanis',
    title: 'Webmaster',
    image: '/img/faculty_img/Unknown_person.jpg',
  }
].slice(0, 5); // Ensure only 5 speakers


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
      }, 20); // Adjust typing speed here (lower = faster)
      
      return () => clearTimeout(timeout);
    } else {
      // Blinking cursor effect
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      
      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, text]);

  // Reset animation when text changes
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

interface SpeakerCardProps {
  speaker: Speaker;
  active: boolean;
  isFaculty?: boolean;
  isSecondCard?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const SpeakerCard = ({ 
  speaker, 
  active, 
  isFaculty = false, 
  isSecondCard = false,
  className = '',
  style
}: SpeakerCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const socialLinks: SocialLinks = isFaculty 
    ? {
        linkedin: {
          icon: '/img/linkedin (1).png',
          url: 'https://www.linkedin.com/company/rait-sigai/'
        }
      }
    : {
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

  // Generate a short bio based on the person's role
  const getBio = (name: string, title: string) => {
    if (name.includes('Sangita')) {
      return `Placeholder text.`;
    } else if (name.includes('Pallavi')) {
      return `Placeholder text.`;
    }
    return `Placeholder text.`;
  };

  return (
    <div 
      className={`flex flex-col w-full shrink-0 relative max-w-[294px] mx-auto h-[480px] ${className}`}
    >
      <div 
        className="relative group overflow-visible h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="overflow-hidden rounded-3xl w-full h-full bg-gray-800">
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
            {!isFaculty ? (
              <>
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
              </>
            ) : (
              <GlassIcon 
                href={socialLinks.linkedin.url} 
                iconSrc={socialLinks.linkedin.icon} 
                alt="LinkedIn" 
                className="hover:scale-110 transition-transform duration-200"
              />
            )}
          </div>
        </div>

        {/* Info Panel - Only for faculty */}
        {isFaculty && isHovered && (
          <div 
            className={`absolute ${
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
            {/* Arrow pointer */}
            <div className={`absolute top-1/2 -translate-y-1/2 ${
              speaker.name.includes('Sangita') 
                ? '-left-2 -translate-x-1/2 border-r-8 border-r-card border-y-8 border-y-transparent'
                : '-right-2 translate-x-1/2 border-l-8 border-l-card border-y-8 border-y-transparent'
            }`}></div>
          </div>
        )}
      </div>
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
    </div>
  );
};

const SpeakersSection = () => {
  // No carousel state needed for static layout

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
      {/* Faculty Section */}
      <section id="faculty" className="relative bg-gradient-to-b from-zinc-900/50 to-transparent py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-start text-left mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-purple-500" />
              <h4 className="text-base font-medium text-purple-400">Faculty</h4>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-white mb-8">
              Our <span className="text-purple-400">Distinguished Faculty</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mb-8">
              Meet the esteemed faculty members who guide and support us.
            </p>
          </div>
          
          {/* Faculty Grid with Matrix Alignment */}
          <div className="relative max-w-5xl mx-auto min-h-[600px] md:min-h-[700px] flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Matrix Grid Lines (for visual reference) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
              </div>
              
              {/* Faculty Cards */}
              <div className="relative grid grid-cols-2 gap-8 h-full w-full px-4">
                {/* Position 1,1 (Top-Left) */}
                <div className="flex items-start justify-end pr-8">
                  <SpeakerCard 
                    speaker={facultySponsors[0]} 
                    active={true}
                    isFaculty={true}
                    className="w-full max-w-sm"
                    style={{ '--delay': '0ms' } as React.CSSProperties}
                  />
                </div>
                
                {/* Empty Space */}
                <div className="opacity-0">
                  <div className="w-full max-w-sm"></div>
                </div>
                
                {/* Empty Space */}
                <div className="opacity-0">
                  <div className="w-full max-w-sm"></div>
                </div>
                
                {/* Position 2,2 (Bottom-Right) */}
                <div className="flex items-end justify-start pl-8">
                  <SpeakerCard 
                    speaker={facultySponsors[1]} 
                    active={true}
                    isFaculty={true}
                    className="w-full max-w-sm"
                    style={{ '--delay': '0ms' } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Team Section - Optimized */}
      <section id="core-team" className="relative bg-gradient-to-b from-zinc-900/50 to-transparent py-12 md:py-20 overflow-hidden">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-6 bg-purple-500" />
              <h4 className="text-base font-medium text-purple-400">Our Team</h4>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-white mb-3">
              Meet the <span className="text-purple-400">Core Team</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl px-4">
              The passionate students driving the RAIT ACM SIGAI Student Chapter forward.
            </p>
          </div>

          {/* Core Team Grid - Optimized */}
          <div className="space-y-6 md:space-y-8">
            {/* Top row - 3 speakers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2">
              {speakers.slice(0, 3).map((speaker, index) => (
                <div key={speaker.name} className="flex justify-center">
                  <SpeakerCard 
                    speaker={speaker} 
                    active={true} 
                    className="w-full max-w-sm"
                    style={{ '--delay': '0ms' } as React.CSSProperties}
                  />
                </div>
              ))}
            </div>
            
            {/* Bottom row - 2 centered speakers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 px-2 max-w-4xl mx-auto">
              {speakers.slice(3, 5).map((speaker) => (
                <div key={speaker.name} className="flex justify-center">
                  <SpeakerCard 
                    speaker={speaker} 
                    active={true} 
                    className="w-full max-w-sm"
                    style={{ '--delay': '0ms' } as React.CSSProperties}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeakersSection;