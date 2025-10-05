"use client";
import Image from 'next/image';
import { useState } from 'react';
import { Linkedin, Github, Instagram, ArrowUpRight, Sparkles } from 'lucide-react';

export default function TeamPage() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  // Faculty Data
  const faculty = [
    {
      name: "Dr. Sandhya Arora",
      role: "Head of IT Department",
      image: "/img/faculty_img/HODIT.jpg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/sandhya-arora-4b6b1b1b/",
      },
    },
  ];

  // Core Team Data - Leadership
  const leadership = [
    {
      name: "Soham Kale",
      role: "Chairperson",
      image: "/img/core_img/Soham_chair.jpg",
      socials: {
        instagram: "https://instagram.com/soham",
        linkedin: "https://linkedin.com/in/soham",
        github: "https://github.com/soham",
      },
    },
    {
      name: "Prapti Nikumbh",
      role: "Vice Chairperson",
      image: "/img/core_img/Prapti_vicechair.jpg",
      socials: {
        instagram: "https://instagram.com/prapti",
        linkedin: "https://linkedin.com/in/prapti",
      },
    },
  ];

  // Core Team Data - Members
  const coreTeam = [
    {
      name: "Sakshi Shukla",
      role: "Treasurer",
      image: "/img/core_img/Sakshi2_treasurer.JPG",
      socials: {
        instagram: "https://instagram.com/sakshi",
        linkedin: "https://linkedin.com/in/sakshi",
      },
    },
    {
      name: "Utsab Kundu",
      role: "Web Master",
      image: "/img/core_img/Utsab_webm.JPG",
      socials: {
        instagram: "https://instagram.com/utsab",
        linkedin: "https://linkedin.com/in/utsab",
        github: "https://github.com/utsab",
      },
    },
    {
      name: "Amey G S",
      role: "Secretary",
      image: "/img/core_img/Amey_GS.JPEG",
      socials: {
        instagram: "https://instagram.com/amey",
        linkedin: "https://linkedin.com/in/amey",
        github: "https://github.com/amey",
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

      {/* Bento Grid Section (moved below hero) */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated individuals driving innovation and excellence in artificial intelligence
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-8 gap-4 h-[560px]">
            {/* Row 1 */}
            {/* Orange Card - Top Left (Tall) */}
            <div className="col-span-2 row-span-2 relative rounded-[32px] overflow-hidden bg-gradient-to-br from-orange-400 to-orange-500 group cursor-pointer shadow-lg">
              <Image
                src={leadership[0].image}
                alt={leadership[0].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="text-white/90 text-sm font-medium mb-1">{leadership[0].role}</p>
                <h3 className="text-white text-xl font-bold">{leadership[0].name}</h3>
              </div>
            </div>

            {/* Green Card - Top Center Left (Tall) */}
            <div className="col-span-2 row-span-2 relative rounded-[32px] overflow-hidden bg-gradient-to-br from-emerald-400 to-emerald-500 group cursor-pointer shadow-lg">
              <Image
                src={leadership[1].image}
                alt={leadership[1].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="text-white/90 text-sm font-medium mb-1">{leadership[1].role}</p>
                <h3 className="text-white text-xl font-bold">{leadership[1].name}</h3>
              </div>
            </div>

            {/* Yellow Card - Top Center (Medium) */}
            <div className="col-span-2 row-span-2 relative rounded-[32px] overflow-hidden bg-gradient-to-br from-yellow-300 to-yellow-400 group cursor-pointer shadow-lg">
              <Image
                src={coreTeam[1].image}
                alt={coreTeam[1].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="text-white/90 text-sm font-medium mb-1">{coreTeam[1].role}</p>
                <h3 className="text-white text-xl font-bold">{coreTeam[1].name}</h3>
              </div>
            </div>

            {/* Cyan Card - Top Right (Tall) */}
            <div className="col-span-2 row-span-2 relative rounded-[32px] overflow-hidden bg-gradient-to-br from-cyan-300 to-cyan-400 group cursor-pointer shadow-lg">
              <Image
                src={faculty[0].image}
                alt={faculty[0].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="text-white/90 text-sm font-medium mb-1">{faculty[0].role}</p>
                <h3 className="text-white text-xl font-bold">{faculty[0].name}</h3>
              </div>
            </div>

            {/* Row 2 - Bottom Row */}
            {/* Amber/Orange Small Card - Bottom Left */}
            <div className="col-span-2 relative rounded-[32px] overflow-hidden bg-gradient-to-br from-amber-300 to-orange-400 group cursor-pointer shadow-lg">
              <Image
                src={coreTeam[0].image}
                alt={coreTeam[0].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-white/90 text-xs font-medium mb-1">{coreTeam[0].role}</p>
                <h3 className="text-white text-base font-bold">{coreTeam[0].name}</h3>
              </div>
            </div>

            {/* Black Explore Button Card */}
            <div className="col-span-2 relative rounded-[32px] overflow-hidden bg-black flex flex-col justify-center items-center group cursor-pointer hover:bg-gray-900 transition-colors shadow-lg">
              <button className="flex items-center gap-2 text-white text-base font-semibold group-hover:gap-3 transition-all">
                Explore Collections
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>

            {/* Teal/Green Card - Bottom Right */}
            <div className="col-span-2 relative rounded-[32px] overflow-hidden bg-gradient-to-br from-teal-400 to-emerald-500 group cursor-pointer shadow-lg">
              <Image
                src={coreTeam[2].image}
                alt={coreTeam[2].name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-white/90 text-xs font-medium mb-1">{coreTeam[2].role}</p>
                <h3 className="text-white text-base font-bold">{coreTeam[2].name}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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
      </section>

      {/* Faculty Spotlight */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Faculty Advisor</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                Guiding Vision & Excellence
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Under the mentorship of our dedicated faculty advisor, SIGAI continues to push boundaries in AI education and innovation.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Strategic Leadership</h3>
                    <p className="text-gray-600">Providing direction and vision for all chapter initiatives</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Academic Excellence</h3>
                    <p className="text-gray-600">Ensuring quality education and professional development</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
                <Image
                  src={faculty[0].image}
                  alt={faculty[0].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-2xl max-w-xs">
                <h3 className="text-2xl font-bold mb-1">{faculty[0].name}</h3>
                <p className="text-gray-600 mb-4">{faculty[0].role}</p>
                <a 
                  href={faculty[0].socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                >
                  Connect on LinkedIn
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Team Grid - Modern Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Leadership</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Meet Our Core Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A diverse group of passionate leaders driving innovation and fostering a vibrant AI community
            </p>
          </div>

          {/* Leadership Cards - Prominent */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {leadership.map((member, index) => (
              <div key={index} className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-square md:aspect-auto">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{member.role}</span>
                      <h3 className="text-3xl font-bold mt-2 mb-4">{member.name}</h3>
                      <p className="text-gray-600 mb-6">
                        Leading the charge in building an inclusive and innovative AI community.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      {member.socials?.linkedin && (
                        <a 
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.socials?.github && (
                        <a 
                          href={member.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {member.socials?.instagram && (
                        <a 
                          href={member.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Core Team Members - Compact Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTeam.map((member, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{member.role}</span>
                  <h3 className="text-xl font-bold mt-1 mb-3">{member.name}</h3>
                  <div className="flex gap-2">
                    {member.socials?.linkedin && (
                      <a 
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials?.github && (
                      <a 
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials?.instagram && (
                      <a 
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
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
