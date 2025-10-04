"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="h-px flex-grow bg-white/10"></div>
            <div className="px-6">
              <span className="text-sm font-medium text-gray-400 tracking-wider uppercase">About SIGAI</span>
            </div>
            <div className="h-px flex-grow bg-white/10"></div>
          </div>

          <div className="text-center mb-20 max-w-5xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
              Empowering The Next Generation{' '}
              <span className="italic font-light">Of AI Innovators</span>
            </h1>
          </div>

          {/* Main Image Banner with Text Overlay */}
          <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden mb-24">
            <Image
              src="/img/About-us.webp"
              alt="SIGAI Community"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-12 md:p-16">
              <div className="max-w-2xl">
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                  Building a vibrant community of AI enthusiasts, researchers, and practitioners through knowledge sharing, hands-on experience, and collaborative innovation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - Logo Centered */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-12">
              <div className="relative w-48 h-48">
                <Image
                  src="/img/sigai-logo-transparent.png"
                  alt="SIGAI Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">
              Our Story
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                SIGAI (Special Interest Group on Artificial Intelligence) was founded with a vision to create a vibrant community of AI enthusiasts, researchers, and practitioners at RAIT—where artificial intelligence isn't just about algorithms, but about solving real-world problems and building a future where technology serves humanity.
              </p>
            </div>
          </div>

          {/* Mission, Vision, Values Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {/* Mission Card */}
            <div className="relative group">
              {/* Animated gradient spot */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-8 left-8 w-16 h-16 bg-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
              
              <div className="relative p-8 bg-gradient-to-br from-blue-950/40 to-black/40 border border-blue-500/20 rounded-2xl hover:border-blue-500/40 transition-all duration-300 backdrop-blur-sm h-full">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                  <div className="w-6 h-6 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To democratize AI education and create a thriving ecosystem of learners and innovators.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="relative group">
              {/* Animated gradient spot */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-8 left-8 w-16 h-16 bg-purple-500/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="relative p-8 bg-gradient-to-br from-purple-950/40 to-black/40 border border-purple-500/20 rounded-2xl hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm h-full">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                  <div className="w-6 h-6 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  To be the leading student-driven AI community shaping the future of technology.
                </p>
              </div>
            </div>

            {/* Values Card */}
            <div className="relative group">
              {/* Animated gradient spot */}
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-8 left-8 w-16 h-16 bg-pink-500/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative p-8 bg-gradient-to-br from-pink-950/40 to-black/40 border border-pink-500/20 rounded-2xl hover:border-pink-500/40 transition-all duration-300 backdrop-blur-sm h-full">
                <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-6 border border-pink-500/30">
                  <div className="w-6 h-6 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Our Values</h3>
                <p className="text-gray-300 leading-relaxed">
                  Innovation, Collaboration, Excellence, and Inclusivity in everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Bento Grid */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              What We Do
            </h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">
              Empowering students through diverse initiatives and hands-on experiences
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Large Card - Workshops */}
            <div className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 hover:border-white/20 transition-all">
              <div className="absolute inset-0">
                <Image
                  src="/img/kainos_event_img.png"
                  alt="Workshops"
                  fill
                  className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
              </div>
              <div className="relative p-8 h-full flex flex-col justify-end">
                <span className="text-sm text-gray-500 mb-2">01</span>
                <h3 className="text-4xl font-bold mb-4">Workshops & Training</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Hands-on workshops covering everything from machine learning basics to advanced deep learning techniques with real-world applications.
                </p>
              </div>
            </div>

            {/* Hackathons */}
            <div className="relative group overflow-hidden rounded-3xl border border-white/10 hover:border-white/20 transition-all">
              <div className="absolute inset-0">
                <Image
                  src="/img/SYNARA_COVER.png"
                  alt="Hackathons"
                  fill
                  className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </div>
              <div className="relative p-6 h-full flex flex-col justify-end min-h-[280px]">
                <span className="text-sm text-gray-500 mb-2">02</span>
                <h3 className="text-2xl font-bold mb-3">Hackathons</h3>
                <p className="text-gray-400 leading-relaxed">
                  Annual hackathons like SYNARA with prizes and industry mentorship.
                </p>
              </div>
            </div>

            {/* Guest Lectures */}
            <div className="relative group overflow-hidden rounded-3xl border border-white/10 hover:border-white/20 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
              <div className="relative p-6 h-full flex flex-col justify-end min-h-[280px]">
                <span className="text-sm text-gray-500 mb-2">03</span>
                <h3 className="text-2xl font-bold mb-3">Guest Lectures</h3>
                <p className="text-gray-400 leading-relaxed">
                  Industry experts share insights on cutting-edge AI research and applications.
                </p>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Research */}
            <div className="relative group overflow-hidden rounded-3xl border border-white/10 hover:border-white/20 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
              <div className="relative p-6 h-full flex flex-col justify-end min-h-[220px]">
                <span className="text-sm text-gray-500 mb-2">04</span>
                <h3 className="text-2xl font-bold mb-3">Research Projects</h3>
                <p className="text-gray-400 leading-relaxed">
                  Collaborative AI research with faculty mentorship.
                </p>
              </div>
            </div>

            {/* Competitions */}
            <div className="relative group overflow-hidden rounded-3xl border border-white/10 hover:border-white/20 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10"></div>
              <div className="relative p-6 h-full flex flex-col justify-end min-h-[220px]">
                <span className="text-sm text-gray-500 mb-2">05</span>
                <h3 className="text-2xl font-bold mb-3">Competitions</h3>
                <p className="text-gray-400 leading-relaxed">
                  Regular AI challenges and coding competitions.
                </p>
              </div>
            </div>

            {/* Community */}
            <div className="relative group overflow-hidden rounded-3xl border border-white/10 hover:border-white/20 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10"></div>
              <div className="relative p-6 h-full flex flex-col justify-end min-h-[220px]">
                <span className="text-sm text-gray-500 mb-2">06</span>
                <h3 className="text-2xl font-bold mb-3">Community</h3>
                <p className="text-gray-400 leading-relaxed">
                  A supportive network through meetups and social events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Countdown */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            <StatCounter end={500} label="Active Members" color="from-blue-400 to-cyan-400" />
            <StatCounter end={50} label="Events Hosted" color="from-purple-400 to-pink-400" />
            <StatCounter end={20} label="Workshops" color="from-green-400 to-teal-400" />
            <StatCounter end={100} label="Projects" color="from-orange-400 to-yellow-400" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Join Our Community
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light max-w-3xl mx-auto">
            Be part of something extraordinary. Connect with like-minded individuals and shape the future of AI.
          </p>
          <div className="flex items-center justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              <span className="text-lg">Get In Touch</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Animated Counter Component
function StatCounter({ end, label, color }: { end: number; label: string; color: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500; // 1.5 seconds for fast countdown
    const steps = 60;
    const increment = end / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div ref={counterRef} className="text-center">
      <div className={`text-6xl md:text-7xl font-bold mb-3 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {count}+
      </div>
      <div className="text-gray-500 text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
}
