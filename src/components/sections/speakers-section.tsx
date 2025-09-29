"use client";

import React, { useCallback, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface Speaker {
  name: string;
  title: string;
  image: string;
}

const speakers: Speaker[] = [
  {
    name: 'Aastha Shetty',
    title: 'Vice Chairperson',
    image: '/img/faculty_img/Unknown_person.jpg',
  },
  {
    name: 'Hiresh Nandodkar',
    title: 'Chairperson',
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

const SocialIcon = ({ href, iconSrc, alt }: { href: string; iconSrc: string; alt: string; }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="group">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
      <div className="relative w-6 h-6">
        <Image 
          src={iconSrc} 
          alt={alt} 
          width={24} 
          height={24} 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  </a>
);

interface SocialLink {
  icon: string;
  url: string;
}

interface SocialLinks {
  linkedin: SocialLink;
  instagram?: SocialLink;
  github?: SocialLink;
}

const SpeakerCard = ({ speaker, active, isFaculty = false }: { speaker: Speaker; active: boolean; isFaculty?: boolean }) => {
  const socialLinks: SocialLinks = isFaculty 
    ? {
        linkedin: {
          icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
          url: 'https://www.linkedin.com/company/rait-sigai/'
        }
      }
    : {
        instagram: {
          icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
          url: 'https://www.instagram.com/rait_sigai/'
        },
        linkedin: {
          icon: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
          url: 'https://www.linkedin.com/company/rait-sigai/'
        },
        github: {
          icon: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
          url: 'https://github.com/RAIT-SIGAI'
        }
      };

  return (
    <div className="flex flex-col w-full sm:w-[360px] md:w-[360px] shrink-0">
      <div className="relative group overflow-visible">
        <div className="overflow-hidden rounded-3xl w-full h-auto aspect-[373/480]">
          <Image
            src={speaker.image}
            alt={`Headshot of ${speaker.name}`}
            width={373}
            height={480}
            className={`w-full h-full object-cover transition-all duration-300 ${active ? 'grayscale-0' : 'grayscale'} group-hover:grayscale-0`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,17,67,0.4)] to-transparent" />
          <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {!isFaculty ? (
              <>
                <SocialIcon href={socialLinks.instagram!.url} iconSrc={socialLinks.instagram!.icon} alt="Instagram" />
                <SocialIcon href={socialLinks.linkedin.url} iconSrc={socialLinks.linkedin.icon} alt="LinkedIn" />
                <SocialIcon href={socialLinks.github!.url} iconSrc={socialLinks.github!.icon} alt="GitHub" />
              </>
            ) : (
              <SocialIcon href={socialLinks.linkedin.url} iconSrc={socialLinks.linkedin.icon} alt="LinkedIn" />
            )}
          </div>
        </div>
      </div>
      <h4 className="mt-6 text-2xl font-semibold text-white">{speaker.name}</h4>
      <div className="mt-1">
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
    <section
      id="speakers"
      className="py-24 px-6 bg-[radial-gradient(100%_100%_at_50%_100%,_#1e1143_0%,_#000000_100%)] relative"
    >
      <div className="absolute left-6 top-32 z-10">
        <div className="flex items-center gap-2 rotate-90 origin-left">
          <span className="h-px w-6 bg-zinc-500"></span>
          <h4 className="text-base font-medium text-muted-foreground whitespace-nowrap">RAIT ACM SIGAI</h4>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        {/* Faculty Sponsors Section */}
        <div className="flex flex-col items-start text-left mb-24">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px w-6 bg-zinc-500" />
            <h4 className="text-base font-medium text-muted-foreground">Mentors</h4>
          </div>
          <h2 className="text-4xl md:text-[48px] font-bold tracking-tight leading-tight max-w-3xl text-white mb-12">
            Meet <span className="text-zinc-400">Faculty</span> Coordinators
          </h2>
          
          {/* Faculty Grid */}
          <div className="flex flex-wrap justify-center gap-6 w-full">
            {facultySponsors.map((faculty, i) => (
              <div key={faculty.name} className="flex justify-center">
                <SpeakerCard speaker={faculty} active={true} isFaculty={true} />
              </div>
            ))}
          </div>
        </div>

        {/* Core Team Section */}
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px w-6 bg-zinc-500" />
            <h4 className="text-base font-medium text-muted-foreground">Team</h4>
          </div>
          <h2 className="text-4xl md:text-[48px] font-bold tracking-tight leading-tight max-w-3xl text-white">
            Meet <span className="text-zinc-400">RAIT ACM SIGAI</span> Core
          </h2>
        </div>

        {/* Speakers Grid */}
        <div className="relative pt-12">
          {/* Top row - 3 speakers */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 w-full">
            {speakers.slice(0, 3).map((speaker, i) => (
              <div key={speaker.name} className="flex justify-center">
                <SpeakerCard speaker={speaker} active={true} />
              </div>
            ))}
          </div>
          
          {/* Bottom row - 2 centered speakers */}
          <div className="flex flex-wrap justify-center gap-6 w-full">
            {speakers.slice(3, 5).map((speaker, i) => (
              <div key={speaker.name} className="flex justify-center">
                <SpeakerCard speaker={speaker} active={true} />
              </div>
            ))}
          </div>
        </div>

        {/* <div className="flex items-center gap-4 md:gap-8 mt-16 pt-10 border-t border-white/10">
          <h4 className="text-xl font-medium text-white">5 Speakers</h4>
          <div className="flex-grow h-px bg-white/20"></div>
          <a href="./speakers" className="group flex items-center gap-3 text-white text-xl font-medium flex-shrink-0">
            <span>See All</span>
            <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default SpeakersSection;