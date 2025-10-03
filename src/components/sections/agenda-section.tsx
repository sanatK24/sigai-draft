'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/types/event';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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

interface HorizontalEventCarouselProps {
  events: Event[];
}

const HorizontalEventCarousel: React.FC<HorizontalEventCarouselProps> = ({ events }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to center the active card
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const activeCard = scrollContainer.querySelector('.card-active');
    if (activeCard) {
      const containerWidth = scrollContainer.offsetWidth;
      const cardRect = activeCard.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();
      const scrollLeft = cardRect.left - containerRect.left + (scrollContainer.scrollLeft - (containerWidth / 2) + (cardRect.width / 2));
      
      scrollContainer.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeIndex]);

  // Handle scroll events to update active index
  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const containerWidth = scrollContainer.offsetWidth;
    const scrollPosition = scrollContainer.scrollLeft + (containerWidth / 2);
    const cards = Array.from(scrollContainer.querySelectorAll('.event-card'));
    
    let closestCard = cards[0];
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + (rect.width / 2);
      const distance = Math.abs(scrollPosition - cardCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

    const newIndex = cards.indexOf(closestCard);
    if (newIndex !== -1 && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="relative mt-12">
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory py-8 px-4 gap-6 scroll-smooth"
        style={{
          scrollPadding: '0 30%',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        {/* Left padding for first card centering */}
        <div className="flex-shrink-0 w-[calc(50%-200px)] md:w-[calc(50%-300px)]" />
        
        {events.map((event, index) => {
          const isActive = index === activeIndex;
          return (
            <div 
              key={event.id}
              className={`event-card flex-shrink-0 w-[280px] md:w-[400px] transition-all duration-300 ease-in-out ${
                isActive ? 'card-active scale-110 z-10' : 'scale-90 opacity-80 hover:opacity-100 hover:scale-95'
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <Link href={`/events/${event.slug || '#'}`} className="block h-full">
                <div className={`bg-card/50 backdrop-blur-sm border ${
                  isActive ? 'border-primary/50' : 'border-border/50'
                } rounded-2xl overflow-hidden shadow-lg h-full flex flex-col transition-all duration-300`}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {event.isNew && (
                      <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        New
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                        {event.title}
                      </h3>
                      <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="mt-auto pt-3 border-t border-border/20">
                      <button className="w-full py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors">
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
        
        {/* Right padding for last card centering */}
        <div className="flex-shrink-0 w-[calc(50%-200px)] md:w-[calc(50%-300px)]" />
      </div>

      {/* Navigation Dots */}
      {events.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === activeIndex ? 'bg-primary w-6' : 'bg-border/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const AgendaSection = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isShowingPastEvents, setIsShowingPastEvents] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch events from local JSON file
        const response = await fetch('/data/events_local.json');
        if (!response.ok) {
          throw new Error('Failed to load events');
        }
        
        const events = await response.json();
        
        if (events && Array.isArray(events)) {
          // Sort events by date in descending order and limit to 5
          const sortedEvents = [...events]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
          
          setUpcomingEvents(sortedEvents);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Auto-scroll carousel (disabled for now as per user feedback)
  // useEffect(() => {
  //   if (upcomingEvents.length <= 1) return;
    
  //   const interval = setInterval(() => {
  //     setActiveIndex((prev) => (prev + 1) % upcomingEvents.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [upcomingEvents.length]);

  // Handle scroll to active index (only when activeIndex changes, not on scroll)
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const activeCard = container.querySelector(`[data-index="${activeIndex}"]`) as HTMLElement;
    
    if (activeCard) {
      // Temporarily disable scroll event listener
      const handleScroll = container.onscroll;
      container.onscroll = null;
      
      // Calculate the scroll position to center the active card
      const containerRect = container.getBoundingClientRect();
      const cardRect = activeCard.getBoundingClientRect();
      const scrollLeft = cardRect.left - containerRect.left + container.scrollLeft - ((containerRect.width - cardRect.width) / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
      
      // Re-enable scroll event listener after scroll is complete
      setTimeout(() => {
        container.onscroll = handleScroll;
      }, 500);
      
      // Update past/upcoming status
      const activeEvent = upcomingEvents[activeIndex];
      if (activeEvent) {
        const eventDate = new Date(activeEvent.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setIsShowingPastEvents(eventDate < today);
      }
    }
  }, [activeIndex, upcomingEvents]);
  
  // Handle manual scroll to update active index
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;
    
    const handleScroll = () => {
      if (isScrolling) return;
      
      // Clear any pending scroll timeout
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      // Debounce the scroll event
      scrollTimeout = setTimeout(() => {
        if (!container || isScrolling) return;
        
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        // Find the card closest to the center
        const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-index]'));
        let closestCard = null;
        let minDistance = Infinity;
        let closestIndex = activeIndex;
        
        cards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(cardCenter - containerCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestCard = card;
            closestIndex = parseInt(card.getAttribute('data-index') || '0', 10);
          }
        });
        
        if (closestCard && closestIndex !== activeIndex) {
          isScrolling = true;
          setActiveIndex(closestIndex);
          
          // Re-enable scrolling after animation completes
          setTimeout(() => {
            isScrolling = false;
          }, 300);
        }
      }, 100);
    };
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [activeIndex]);

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
      <div className="container mx-auto px-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-zinc-500" />
            <h4 className="text-base font-medium text-text-secondary">Events & Media</h4>
          </div>
          <h2 className="mt-6 text-[40px] sm:text-[56px] lg:text-[64px] max-w-2xl leading-tight font-bold tracking-tighter text-text-primary">
            Discover Our <span className="text-primary">Latest </span> 
            <span className="text-primary">Flagship Events</span>
          </h2>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Magazine Card (Full Height) */}
            <div className="lg:col-span-1">
              <div className="group relative h-full flex flex-col overflow-hidden rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1">
                <div className="relative h-64 lg:h-1/2">
                  <Image
                    src="/img/SYNARA_COVER.png"
                    alt="Synara Magazine - RAIT ACM SIGAI"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                    New Issue
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Synara Magazine</h2>
                  <p className="text-muted-foreground mb-4">
                    Our Inaugural Magazine explores the cutting-edge world of Generative AI, featuring groundbreaking research and insights from leading experts in the field.
                  </p>
                  
                  <div className="mt-auto pt-4">
                    <button className="w-full py-2.5 px-5 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                      Read Latest Issue
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Events Carousel and YouTube */}
            <div className="lg:col-span-2 space-y-6">
              {/* Events Carousel */}
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-4 md:p-6 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    {isShowingPastEvents ? 'Past Events' : 'Upcoming Events'}
                  </h2>
                  <Link 
                    href="/events" 
                    className="w-13 h-13 md:w-11 md:h-11 bg-white text-black rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-45 flex-shrink-0"
                    aria-label="View all events"
                    title="View all events"
                  >
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-6 h-6 md:w-7 md:h-7"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </Link>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="text-center p-8 text-red-500">{error}</div>
                ) : (
                  <div className="relative">
                    <Carousel
                      opts={{
                        align: 'center',
                        loop: true,
                        skipSnaps: false,
                        containScroll: 'trimSnaps'
                      }}
                      className="w-full"
                      setApi={(api) => {
                        // Update active index when carousel changes
                        api?.on('select', () => {
                          setActiveIndex(api.selectedScrollSnap());
                          
                          // Update past/upcoming status
                          const activeEvent = upcomingEvents[api.selectedScrollSnap()];
                          if (activeEvent) {
                            const eventDate = new Date(activeEvent.date);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            setIsShowingPastEvents(eventDate < today);
                          }
                        });
                      }}
                    >
                      <CarouselContent className="-ml-2 md:-ml-4">
                        {upcomingEvents.map((event, index) => (
                          <CarouselItem key={event.id} className="pl-2 md:pl-4 basis-full md:basis-2/3 lg:basis-1/2 xl:basis-2/5">
                            <div 
                              className={`transition-all duration-300 h-full ${index === activeIndex ? 'scale-100 opacity-100' : 'scale-90 opacity-70'}`}
                              onClick={() => setActiveIndex(index)}
                            >
                              <div className={`bg-card border ${index === activeIndex ? 'border-primary/50' : 'border-border/50'} rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col`}>
                                <div className="relative h-40">
                                  <Image
                                    src={event.image || '/img/event-placeholder.jpg'}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                  />
                                  {event.isNew && (
                                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                      New
                                    </div>
                                  )}
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                  <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
                                    {event.title}
                                  </h3>
                                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                                      <line x1="16" y1="2" x2="16" y2="6"></line>
                                      <line x1="8" y1="2" x2="8" y2="6"></line>
                                      <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric'
                                    })}
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                    {event.description}
                                  </p>
                                  <Link 
                                    href={`/events/${event.slug || '#'}`}
                                    className="mt-auto text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center"
                                  >
                                    Learn more
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                                      <path d="m9 18 6-6-6-6"/>
                                    </svg>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex items-center justify-center gap-3 mt-6">
                        <CarouselPrevious className="static transform-none translate-y-0 translate-x-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-transparent hover:bg-white hover:text-black text-white transition-all duration-300" />
                        <CarouselNext className="static transform-none translate-y-0 translate-x-0 w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white bg-white text-black hover:scale-110 transition-all duration-300" />
                      </div>
                    </Carousel>
                  </div>
                )}
              </div>

              {/* YouTube Section */}
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-foreground mb-6">YouTube Series</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      id: 'VlgLfiI7Jig',
                      title: 'Neural Nexus',
                      description: 'Highlights from our latest'
                    },
                    // {
                    //   id: 'dQw4w9WgXcQ',
                    //   title: 'Tech Talks',
                    //   description: 'Insights from industry experts'
                    // }
                  ].map((video) => (
                    <div key={video.id} className="group">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block aspect-video w-full bg-muted rounded-xl overflow-hidden relative group-hover:shadow-lg transition-shadow"
                      >
                        <Image
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                            <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="mt-3">
                        <h3 className="font-medium text-foreground">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">{video.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-6 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View all videos
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;