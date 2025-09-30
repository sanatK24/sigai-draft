'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Event } from '@/types/event';

// Add JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className="relative flex flex-col h-full bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300">
    <div className="relative h-48 w-full overflow-hidden">
      <Image
        src={event.image}
        alt={event.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {event.isNew && (
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
          New
        </div>
      )}
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-text-primary line-clamp-2">
          {event.title}
        </h3>
        <span className="text-sm text-text-secondary whitespace-nowrap ml-4">
          {new Date(event.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
      </div>
      <p className="text-sm text-text-secondary mb-4 line-clamp-3">
        {event.description}
      </p>
      
      {event.speakers && event.speakers.length > 0 && (
        <div className="mt-auto pt-4 border-t border-border/20">
          <div className="flex items-center -space-x-2">
            {event.speakers.slice(0, 3).map((speaker, index) => (
              <div key={index} className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-card">
                <Image
                  src={speaker.image || '/img/team/placeholder.jpg'}
                  alt={speaker.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {event.speakers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                +{event.speakers.length - 3}
              </div>
            )}
          </div>
          <p className="text-xs text-text-tertiary mt-2">
            {event.speakers[0].name}
            {event.speakers.length > 1 && ` + ${event.speakers.length - 1} more`}
          </p>
        </div>
      )}
    </div>
  </div>
);

const AgendaSection = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/data/events.json');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        
        // Sort events by date (newest first) and take first 4
        const sortedEvents = data.events.sort((a: Event, b: Event) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setUpcomingEvents(sortedEvents.slice(0, 4));
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section id="agenda" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 w-48 bg-gray-200 rounded"></div>
            <div className="mt-4 h-12 w-3/4 bg-gray-200 rounded"></div>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-[500px] bg-gray-100 rounded-2xl"></div>
              <div className="space-y-6">
                <div className="h-8 w-64 bg-gray-200 rounded"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-48 bg-gray-100 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="agenda" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 bg-red-50 rounded-xl">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="agenda" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-zinc-500" />
            <h4 className="text-base font-medium text-text-secondary">Events</h4>
          </div>
          <h2 className="mt-6 text-[40px] sm:text-[56px] lg:text-[64px] leading-tight font-bold tracking-tighter text-text-primary">
            Discover the <span className="text-zinc-400">RAIT ACM SIGAI Student Chapter</span> 
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
                Our Inaugural Magazine explores the cutting-edge world of Generative AI, featuring groundbreaking research and insights from leading experts in the field.
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
                  <span className="text-xs text-foreground">Inaugural Issue</span>
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
                  <span className="text-xs text-foreground">Generative AI Special</span>
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
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-foreground">Upcoming Events</h2>
                <a 
                  href="/events" 
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                >
                  View all
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </a>
              </div>
              <div className="space-y-3">
                {upcomingEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="group relative overflow-hidden rounded-xl border border-border/50 p-3 hover:bg-card/30 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-16 h-12 rounded-md overflow-hidden bg-muted">
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={64}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">{event.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          {event.isNew && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-muted-foreground group-hover:text-primary transition-colors">
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