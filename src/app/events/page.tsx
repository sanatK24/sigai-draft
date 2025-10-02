"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface Event {
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
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Events</h1>
        
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setShowUpcoming(true)}
            className={`px-4 py-2 rounded-lg ${
              showUpcoming ? 'bg-white text-black' : 'bg-gray-800 text-white'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setShowUpcoming(false)}
            className={`px-4 py-2 rounded-lg ${
              !showUpcoming ? 'bg-white text-black' : 'bg-gray-800 text-white'
            }`}
          >
            Past Events
          </button>
        </div>

        <div className="space-y-8">
          {sortedYears.map((year) => (
            <div key={year} className="space-y-6">
              <h2 className={`text-2xl font-bold border-b border-gray-700 pb-2 ${showUpcoming ? 'mt-8' : ''}`}>
                {year}
                <span className="text-gray-400 text-base font-normal ml-2">
                  {showUpcoming ? 'Upcoming Events' : 'Past Events'}
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventsByYear[year].map((event) => (
                  <div key={event.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                    <div className="relative h-48">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                      <p className="text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2 text-sm text-gray-400 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{formatEventDate(event.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <Link
                        href={`/events/${event.id}`}
                        className="inline-block bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
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
