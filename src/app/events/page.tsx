"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { FocusCards } from '@/components/ui/focus-cards';

interface Event {
  idx: number;
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  is_featured?: boolean;
  registration_link: string | null;
  category: string;
  end_date: string;
  registration_fee: number;
  created_at: string;
  updated_at: string;
  speakers?: Array<{
    name: string;
    role: string;
    image_url?: string;
  }>;
}

// Helper function to format date
const formatEventDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export default function EventsPage() {
  const [events, setEvents] = useState<{ upcoming: Event[]; past: Event[] }>({ 
    upcoming: [], 
    past: [] 
  });
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/data/events_local.json');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const allEvents = await response.json();
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcoming: Event[] = [];
        const past: Event[] = [];
        
        allEvents.forEach((event: Event) => {
          const eventDate = new Date(event.date);
          if (eventDate >= today) {
            upcoming.push(event);
          } else {
            past.push(event);
          }
        });
        
        // Sort upcoming events by date (ascending)
        upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        // Sort past events by date (descending)
        past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setEvents({ upcoming, past });
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const displayEvents = showUpcoming ? events.upcoming : events.past;

  // Group events by year
  const groupEventsByYear = (events: Event[], isUpcoming: boolean) => {
    const grouped = events.reduce((acc, event) => {
      const year = new Date(event.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(event);
      return acc;
    }, {} as Record<number, Event[]>);

    // Sort events within each year
    Object.keys(grouped).forEach(year => {
      const yearNum = parseInt(year);
      grouped[yearNum].sort((a, b) => {
        return isUpcoming 
          ? new Date(a.date).getTime() - new Date(b.date).getTime() // Ascending for upcoming
          : new Date(b.date).getTime() - new Date(a.date).getTime(); // Descending for past
      });
    });

    return grouped;
  };

  const eventsByYear = groupEventsByYear(displayEvents, showUpcoming);
  const sortedYears = Object.keys(eventsByYear)
    .map(Number)
    .sort((a, b) => showUpcoming ? a - b : b - a); // Sort years based on view

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] pointer-events-none" />
      
      {/* Subtle Spotlight Effect */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="mb-12 pt-8">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-medium text-white/80 select-none">
              Events & Workshops
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 select-none">
            Discover Events
          </h1>
          <p className="text-xl text-white/60 max-w-2xl select-none">
            Join us for exciting workshops, talks, and networking opportunities.
          </p>
        </div>
        
        {/* Toggle Buttons */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => setShowUpcoming(true)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              showUpcoming 
                ? 'bg-white text-black shadow-lg shadow-white/20' 
                : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setShowUpcoming(false)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              !showUpcoming 
                ? 'bg-white text-black shadow-lg shadow-white/20' 
                : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
            }`}
          >
            Past Events
          </button>
        </div>

        <div className="space-y-16">
          {sortedYears.map((year) => (
            <div key={year} className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                  {year}
                </h2>
                <span className="text-sm text-white/40 uppercase tracking-wider">
                  {eventsByYear[year].length} {eventsByYear[year].length === 1 ? 'Event' : 'Events'}
                </span>
              </div>
              <FocusCards 
                cards={eventsByYear[year].map(event => ({
                  title: event.title,
                  src: event.image,
                  link: `/events/${event.idx}`,
                  description: event.description,
                  date: formatEventDate(event.date),
                  location: event.location
                }))}
              />
            </div>
          ))}
        </div>

        {displayEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              {showUpcoming ? 'No upcoming events.' : 'No past events.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
