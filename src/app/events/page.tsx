"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin } from 'lucide-react';
import supabase from '@/lib/supabase';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  is_featured?: boolean;
  registration_link: string;
  registerLink: string;
  category: string;
  speakers?: Array<{
    name: string;
    role: string;
    image_url?: string;
  }>;
  details?: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
  created_at: string;
  updated_at: string;
  formattedDate?: string;
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
  const [events, setEvents] = useState<{ upcoming: Event[]; past: Event[] }>({ upcoming: [], past: [] });
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true }); // Initial sort for easier processing

        if (error) throw error;

        const today = new Date().toISOString().split('T')[0];
        const upcoming: Event[] = [];
        const past: Event[] = [];

        data.forEach((event: any) => {
          const formattedEvent: Event = {
            ...event,
            registerLink: event.registration_link || '#',
            formattedDate: formatEventDate(event.date),
            image: event.image || '/img/events/placeholder.jpg',
            details: [
              { icon: <Calendar size={16} />, text: formatEventDate(event.date) },
              { icon: <Clock size={16} />, text: event.time },
              { icon: <MapPin size={16} />, text: event.location }
            ]
          };

          // Categorize as upcoming or past
          if (event.date >= today) {
            upcoming.push(formattedEvent);
          } else {
            past.push(formattedEvent);
          }
        });

        // Sort upcoming events by date (ascending - soonest first)
        const sortedUpcoming = [...upcoming].sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        // Sort past events by year (descending) and then by date (descending within each year)
        const sortedPast = [...past].sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          const yearDiff = dateB.getFullYear() - dateA.getFullYear();
          
          // If same year, sort by most recent date first
          if (yearDiff === 0) {
            return dateB.getTime() - dateA.getTime();
          }
          
          return yearDiff;
        });
        
        setEvents({ upcoming: sortedUpcoming, past: sortedPast });
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Events
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-300 sm:mt-4">
            Join us for exciting events, workshops, and more.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm border border-gray-800">
            <button
              onClick={() => setShowUpcoming(true)}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                showUpcoming
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setShowUpcoming(false)}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                !showUpcoming
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : showUpcoming ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.upcoming.map((event) => (
              <Link 
                key={event.id} 
                href={`/events/${event.id}`}
                className="block bg-gray-900 overflow-hidden shadow rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover hover:opacity-90 transition-opacity duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-white" />
                    <span className="text-white">{event.formattedDate}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-white" />
                    <span className="truncate text-white">{event.location}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {(() => {
              const years = new Set<number>();
              const eventsByYear: Record<number, Event[]> = {};
              
              // Group events by year
              events.past.forEach(event => {
                const year = new Date(event.date).getFullYear();
                if (!years.has(year)) {
                  years.add(year);
                  eventsByYear[year] = [];
                }
                eventsByYear[year].push(event);
              });
              
              // Sort years in descending order
              const sortedYears = Array.from(years).sort((a, b) => b - a);
              
              return sortedYears.map((year) => (
                <div key={year} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-2 mb-4">
                    {year}
                  </h2>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {eventsByYear[year].map((event) => (
                      <Link 
                        key={event.id} 
                        href={`/events/${event.id}`}
                        className="block bg-gray-900 overflow-hidden shadow rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="relative h-48 w-full">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover hover:opacity-90 transition-opacity duration-300"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-400 mb-2">
                            <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-white" />
                            <span className="text-white">{event.formattedDate}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-2">
                            {event.title}
                          </h3>
                          <p className="text-gray-300 mb-4 line-clamp-2">
                            {event.description}
                          </p>
                          <div className="flex items-center text-sm text-gray-400">
                            <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-white" />
                            <span className="truncate text-white">{event.location}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        )}

        {!loading && (showUpcoming ? events.upcoming : events.past).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">
              {showUpcoming
                ? 'No upcoming events scheduled. Check back soon!'
                : 'No past events to show.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
