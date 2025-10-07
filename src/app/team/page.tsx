"use client";
import Image from 'next/image';
import { useState } from 'react';
import { Linkedin, Github, Instagram, ArrowUpRight, Sparkles } from 'lucide-react';

// TEDx-style Speaker Card Component
interface SpeakerCardProps {
  name: string;
  role: string;
  image: string;
  isSelected?: boolean;
  socials?: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  aspectRatio?: string; // e.g., "1/1" or "805/852"
  showHoverPanel?: boolean; // Control hover panel visibility
}

const SpeakerCard = ({ name, role, image, isSelected = false, socials, aspectRatio = "1/1", showHoverPanel = true }: SpeakerCardProps) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="relative group">
      {/* Parallelogram Card Container */}
      <div 
        className="relative w-full overflow-hidden bg-black min-h-[400px] cursor-pointer"
        style={{
          clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
          aspectRatio: aspectRatio,
        }}
        onClick={() => setIsPanelOpen(true)}
      >
        {/* Image with object-contain to preserve aspect ratios */}
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain transition-all duration-500"
          style={{ objectPosition: 'center center' }}
        />
        
        {/* Gradient Overlay - visible by default if selected */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`} />
        
        {/* Top Red Border - visible only on hover */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%)',
          }}
        />
        
        {/* Bottom Red Border - visible only on hover */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            clipPath: 'polygon(0% 0%, 90% 0%, 90% 100%, 0% 100%)',
          }}
        />
      </div>

      {/* Fullscreen Right Panel - Desktop & Tablet Only */}
      {showHoverPanel && (
        <div 
          className={`hidden md:block fixed top-0 right-0 h-screen w-[500px] transition-all duration-500 ease-in-out z-50 ${
            isPanelOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(0, 30, 60, 0.95), rgba(0, 15, 40, 0.98))',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="h-full overflow-y-auto p-12 flex flex-col relative">
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPanelOpen(false);
              }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/20"
              style={{ zIndex: 100 }}
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Header */}
            <div className="mb-8">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Founding Core</span>
            </div>

            {/* Name & Role */}
            <h3 className="text-3xl font-bold text-white mb-2">
              {name}
            </h3>
            <p className="text-sm text-gray-400 uppercase tracking-wider mb-6">
              {role}
            </p>

            {/* Social Links */}
            {socials && (
              <div className="flex gap-4 mb-8">
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/20"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                )}
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/20"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                )}
                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all border border-white/20"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                )}
              </div>
            )}

            {/* Bio Paragraph */}
            <div className="flex-1">
              <p className="text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Text Content Below */}
      <div className="mt-6 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {name}
        </h3>
        <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">
          {role}
        </p>
        
        {/* Social Links */}
        {socials && (
          <div className="flex justify-center gap-3 mb-4">
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>
            )}
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <Github className="w-4 h-4 text-white" />
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
            )}
          </div>
        )}
        
        {/* View Bio Button */}
        <button className="text-white text-sm hover:text-blue-400 transition-colors inline-flex items-center gap-1">
          View Bio
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function TeamPage() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  // Faculty Data
  const faculty = [
    {
      name: "Dr. Sangita Chaudhari",
      role: "HOD of Computer Science & Engineering • Faculty Sponsor",
      image: "/img/faculty_img/HODIT.jpg",
      aspectRatio: "1/1", // 1600x1600
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/sandhya-arora-4b6b1b1b/",
      },
    },
    {
      name: "Dr. Pallavi Chavan",
      role: "HOD of Information Technology • Core Team Mentor",
      image: "/img/faculty_img/pallavimam.jpg",
      aspectRatio: "805/852", // 805x852
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/pallavi-chavan/",
      },
    },
  ];

  // Current Core Team Data - Leadership
  const currentLeadership = [
    {
      name: "Hiresh Nandodkar",
      role: "Chairperson",
      image: "/img/faculty_img/Unknown_person.jpg",
      socials: {
        instagram: "https://instagram.com/hiresh",
        linkedin: "https://linkedin.com/in/hiresh",
        github: "https://github.com/hiresh",
      },
    },
    {
      name: "Aastha Shetty",
      role: "Vice Chairperson",
      image: "/img/faculty_img/Unknown_person.jpg",
      socials: {
        instagram: "https://instagram.com/aastha",
        linkedin: "https://linkedin.com/in/aastha",
      },
    },
    {
      name: "Rian Pardal",
      role: "General Secretary",
      image: "/img/faculty_img/Unknown_person.jpg",
      socials: {
        instagram: "https://instagram.com/rian",
        linkedin: "https://linkedin.com/in/rian",
        github: "https://github.com/rian",
      },
    },
  ];

  // Current Core Team Data - Members
  const currentCoreTeam = [
    {
      name: "Riddhi Patil",
      role: "Treasurer",
      image: "/img/faculty_img/Unknown_person.jpg",
      socials: {
        instagram: "https://instagram.com/riddhi",
        linkedin: "https://linkedin.com/in/riddhi",
      },
    },
    {
      name: "Sanat Karkhanis",
      role: "Webmaster",
      image: "/img/faculty_img/Unknown_person.jpg",
      socials: {
        instagram: "https://instagram.com/sanat",
        linkedin: "https://linkedin.com/in/sanat",
        github: "https://github.com/sanat",
      },
    },
  ];

  // Core Team Data - Founding Leadership
  const leadership = [
    {
      name: "Soham Wankhede",
      role: "Chairperson",
      image: "/img/core_img/Soham_chair.jpg",
      aspectRatio: "1/1", // 4000x4000
      socials: {
        instagram: "https://instagram.com/soham",
        linkedin: "https://linkedin.com/in/soham",
        github: "https://github.com/soham",
      },
    },
    {
      name: "Prapti Sinha",
      role: "Vice Chairperson",
      image: "/img/core_img/Prapti_vicechair.jpg",
      aspectRatio: "1/1", // 2347x2347
      socials: {
        instagram: "https://instagram.com/prapti",
        linkedin: "https://linkedin.com/in/prapti",
      },
    },
    {
      name: "Amey Shete",
      role: "General Secretary",
      image: "/img/core_img/Amey_GS.JPEG",
      aspectRatio: "1/1", // 3093x3093
      socials: {
        instagram: "https://instagram.com/amey",
        linkedin: "https://linkedin.com/in/amey",
        github: "https://github.com/amey",
      },
    },
  ];

  // Core Team Data - Founding Members
  const coreTeam = [
    {
      name: "Sakshi Dhamane",
      role: "Treasurer",
      image: "/img/core_img/Sakshi2_treasurer.JPG",
      aspectRatio: "3684/3854", // 3684x3854
      socials: {
        instagram: "https://instagram.com/sakshi",
        linkedin: "https://linkedin.com/in/sakshi",
      },
    },
    {
      name: "Utsab Nandi",
      role: "Webmaster",
      image: "/img/core_img/Utsab_webm.JPG",
      aspectRatio: "3477/3591", // 3477x3591
      socials: {
        instagram: "https://instagram.com/utsab",
        linkedin: "https://linkedin.com/in/utsab",
        github: "https://github.com/utsab",
      },
    },
  ];

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Video Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Static Background Image (fallback for video modal) */}
        <img
          src="/img/Launch.jpg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Content - bottom left overlay */}
        <div className="absolute left-0 bottom-0 z-10 flex flex-col items-start px-8 pb-8 w-full max-w-full">
          {/* <h1 className="text-white font-black uppercase tracking-tighter text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] mb-4 leading-none">
          </h1> */}
          <p className="text-white text-2xl md:text-4xl font-medium mb-6 max-w-xl">
            Building the Future with AI at forefront
          </p>
          <button
            className="flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-full font-semibold backdrop-blur hover:bg-white/30 transition"
            onClick={() => setShowVideoModal(true)}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.2" />
              <polygon points="10,8 16,12 10,16" fill="white" />
            </svg>
            RAIT ACM SIGAI LAUNCH
          </button>
        </div>
        {/* Video Modal */}
        {showVideoModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setShowVideoModal(false);
            }}
          >
            <div
              className="relative w-full max-w-3xl mx-auto bg-black rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-50 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition"
                style={{ zIndex: 100 }}
                onClick={e => {
                  e.stopPropagation();
                  setShowVideoModal(false);
                }}
                aria-label="Close"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <video
                id="modal-video"
                src="/Untitled video - Made with Clipchamp.mp4"
                controls
                autoPlay
                className="w-full h-[60vh] object-cover bg-black"
              />
            </div>
          </div>
        )}
      </section>

      {/* Stats Section
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl md:text-6xl font-bold mb-2">50+</div>
            <p className="text-gray-400">Active Members</p>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-bold mb-2">100+</div>
            <p className="text-gray-400">Events Hosted</p>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-bold mb-2">5+</div>
            <p className="text-gray-400">Years Active</p>
          </div>
          <div>
            <div className="text-5xl md:text-6xl font-bold mb-2">1000+</div>
            <p className="text-gray-400">Students Reached</p>
          </div>
        </div>
      </section> */}

      {/* Faculty Spotlight */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">Faculty Advisors</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
              Guiding Vision & Excellence
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Under the mentorship of our dedicated faculty advisors, SIGAI continues to push boundaries in AI education and innovation.
            </p>
          </div>

          {/* Faculty Cards - TEDx Style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {faculty.map((member, index) => (
              <SpeakerCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                aspectRatio={member.aspectRatio}
                isSelected={index === 0}
                showHoverPanel={false}
                socials={{
                  linkedin: member.socialLinks.linkedin
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Current Core Team Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">CORE</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
              Leadership & Core Team
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Leading SIGAI into the future with passion, dedication, and innovation
            </p>
          </div>

          {/* Current Leadership Cards - TEDx Style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {currentLeadership.map((member, index) => (
              <SpeakerCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                isSelected={index === 0}
                socials={member.socials}
              />
            ))}
          </div>

          {/* Current Core Team Members - TEDx Style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {currentCoreTeam.map((member, index) => (
              <SpeakerCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                socials={member.socials}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Founding Core Team Grid - Modern Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">FOUNDING CORE</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-white">
              Our Founding Core Team
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The visionary leaders who laid the foundation for SIGAI's success
            </p>
          </div>

          {/* Leadership Cards - TEDx Style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            {leadership.map((member, index) => (
              <SpeakerCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                aspectRatio={member.aspectRatio}
                isSelected={index === 0}
                socials={member.socials}
              />
            ))}
          </div>

          {/* Core Team Members - TEDx Style Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {coreTeam.map((member, index) => (
              <SpeakerCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                aspectRatio={member.aspectRatio}
                socials={member.socials}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Make<br />an Impact?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join our team during recruitment season and be part of something extraordinary. Shape the future of AI education with us.
          </p>
          <button className="inline-flex items-center gap-3 px-10 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-200 hover:gap-4">
            Get Notified
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </main>
  );
}
