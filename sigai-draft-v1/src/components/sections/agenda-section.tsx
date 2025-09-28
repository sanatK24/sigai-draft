import React from 'react';
import Image from 'next/image';

// Add JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface Speaker {
  name: string;
  role: string;
  imageUrl?: string;
}

interface Event {
  date: string;
  title: string;
  description: string;
  image?: string;
  speakers?: Speaker[];
  isNew?: boolean;
}

const recentFeatures: Event[] = [
  {
    date: "Jul 18-19, 2025",
    title: "KLEOS 3.0: National Level Hackathon",
    description: "A 36-hour hackathon bringing together talented developers and innovators to build AI-powered solutions.",
    isNew: true,
    image: "/img/Sigai Events/Kleos_Banner.svg",
    speakers: [
      {
        name: "Dr. Rajesh Ingle",
        role: "Hackathon Mentor",
        imageUrl: "/img/team/placeholder.jpg"
      }
    ]
  },
  {
    date: "Jun 12, 2025",
    title: "STTP on Generative to Agentic AI",
    description: "Hands-on workshop exploring the latest advancements in generative AI and autonomous agents.",
    image: "/img/Sigai Events/STTP.webp",
    speakers: [
      {
        name: "Prof. Meera Sharma",
        role: "AI Researcher",
        imageUrl: "/img/team/placeholder.jpg"
      }
    ]
  },
  {
    date: "May 25, 2025",
    title: "AI in Healthcare Symposium",
    description: "Exploring AI applications in healthcare and medical research with industry experts.",
    image: "/img/Sigai Events/GenAI-WIP.webp",
    speakers: [
      {
        name: "Dr. Anjali Deshpande",
        role: "Healthcare AI Specialist",
        imageUrl: "/img/team/placeholder.jpg"
      }
    ]
  },
  {
    date: "Apr 15, 2025",
    title: "Computer Vision Workshop",
    description: "Hands-on session on computer vision algorithms and real-world applications.",
    isNew: true,
    image: "/img/Sigai Events/GeoAI.webp",
    speakers: [
      {
        name: "Prof. Vikram Joshi",
        role: "Computer Vision Expert",
        imageUrl: "/img/team/placeholder.jpg"
      }
    ]
  },
  {
    date: "Mar 22, 2025",
    title: "Natural Language Processing Bootcamp",
    description: "Intensive training on NLP techniques and building language models.",
    image: "/img/Sigai Events/Harnessing_GenAI.webp",
    speakers: [
      {
        name: "Dr. Sameer Khan",
        role: "NLP Researcher",
        imageUrl: "/img/team/placeholder.jpg"
      }
    ]
  },
  {
    date: "Feb 10, 2025",
    title: "AI Ethics Panel Discussion",
    description: "Exploring the ethical implications and responsible development of AI technologies.",
    image: "/img/Sigai Events/Quantum.webp",
    speakers: [
      {
        name: "Dr. Neha Kapoor",
        role: "AI Ethics Researcher",
        imageUrl: "/img/team/placeholder.jpg"
      },
      {
        name: "Prof. Amit Patel",
        role: "Technology Policy Expert",
        imageUrl: "/img/team/placeholder.jpg"
      }
    ]
  }
];

const AgendaSection = () => {
  return (
    <section id="agenda" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-zinc-500" />
            <h4 className="text-base font-medium text-text-secondary">Events</h4>
          </div>
          <h2 className="mt-6 text-[40px] sm:text-[56px] lg:text-[64px] leading-tight font-bold tracking-tighter text-text-primary">
            Discover the <span className="text-zinc-400">RAIT ACM SIGAI</span> 
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full mt-8">
          {/* Left Panel - Synara Magazine Feature */}
          <div className="group relative flex flex-col h-auto overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
            {/* Magazine Cover Image - Full height */}
            <div className="relative h-full w-full overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="/img/SYNARA_COVER.png"
                  alt="Synara Magazine - RAIT ACM SIGAI"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* New Badge */}
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                  New Issue
                </div>
              </div>
            </div>
            
            {/* Magazine Content */}
            <div className="flex-1 p-6 flex flex-col">
              <h2 className="text-2xl font-bold text-foreground mb-2">Synara Magazine</h2>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                SYNARA 2025: Where AI meets imagination, unveiling our inaugural Generative-AI edition.
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M4 22h16a2 2 0 0 0 2-2V7.5L17.5 2H6a2 2 0 0 0-2 2v4"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <path d="M10 12l-3-3-3 3"></path>
                      <path d="M13 11v8"></path>
                      <path d="M7 15.1c.8 1 2 1.9 3 1.9s2.3-.9 3-2c.7-1.1 2-1.9 3-1.9s2.3.8 3 1.9"></path>
                    </svg>
                  </div>
                  <span className="text-xs text-foreground">Quarterly Issues</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <line x1="19" y1="8" x2="19" y2="14"></line>
                      <line x1="22" y1="11" x2="16" y2="11"></line>
                    </svg>
                  </div>
                  <span className="text-xs text-foreground">Research & Interviews</span>
                </div>
              </div>
              
              <button className="mt-2 w-full py-2 px-4 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                Read Latest Issue
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Panel - Top and Bottom */}
          <div className="space-y-4">
            {/* Top Half - Featured Events */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-4 shadow-xl">
              <h2 className="text-xl font-bold text-foreground mb-3">Past Events</h2>
              <div className="space-y-3">
                {recentFeatures.slice(0, 3).map((event) => (
                  <div key={event.title} className="group relative overflow-hidden rounded-xl border border-border/50 p-3 hover:bg-card/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-16 h-12 rounded-md overflow-hidden bg-muted">
                        {event.image && (
                          <Image
                            src={event.image}
                            alt={event.title}
                            width={64}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground truncate">{event.title}</h3>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                      <div className="text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 16 16 12 12 8"></polyline>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Half - YouTube Video */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-4 shadow-xl">
              <h2 className="text-xl font-bold text-foreground mb-3">Latest Video</h2>
              <a 
                href="https://www.youtube.com/watch?v=VlgLfiI7Jig" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block aspect-video w-full bg-muted rounded-lg overflow-hidden relative group"
              >
                <img 
                  src={`https://img.youtube.com/vi/VlgLfiI7Jig/maxresdefault.jpg`} 
                  alt="Watch Event Video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
              <h3 className="mt-3 text-sm font-medium text-foreground">RAIT ACM SIGAI - Event Highlights</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Watch highlights from our latest event</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;