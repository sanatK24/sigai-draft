"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import EventModal from '@/components/EventModal';
import { supabase } from '@/lib/supabase';

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
  registerLink: string; // Add this line to match the expected interface
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
  formattedDate?: string; // Add this line for the formatted date
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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date', { ascending: true });

        if (error) throw error;

        const today = new Date().toISOString().split('T')[0];
        const upcoming: Event[] = [];
        const past: Event[] = [];

        data.forEach(event => {
          // Format the date for display
          event.formattedDate = formatEventDate(event.date);
          
          // Add default image if not provided
          if (!event.image) {
            event.image = '/img/events/placeholder.jpg';
          }

          // Categorize as upcoming or past
          if (event.date >= today) {
            upcoming.push(event);
          } else {
            past.push(event);
          }
        });

        setEvents({ upcoming, past });
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const openModal = (event: Event) => {
    setSelectedEvent({
      ...event,
      details: [
        { icon: <Calendar size={16} />, text: formatEventDate(event.date) },
        { icon: <Clock size={16} />, text: event.time },
        { icon: <MapPin size={16} />, text: event.location }
      ]
    });
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const currentEvents = showUpcoming ? events.upcoming : events.past;

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-800 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2 mx-auto"></div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-900 rounded-xl p-6 h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Events</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Discover {showUpcoming ? 'upcoming' : 'past'} events organized by RAIT ACM SIGAI.
          </p>
          
          <div className="inline-flex bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setShowUpcoming(true)}
              className={`px-6 py-2 rounded-full transition-colors ${
                showUpcoming 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setShowUpcoming(false)}
              className={`px-6 py-2 rounded-full transition-colors ${
                !showUpcoming 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {currentEvents.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-400">
              {showUpcoming 
                ? 'No upcoming events scheduled. Check back soon!'
                : 'No past events to display.'}
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentEvents.map((event) => (
              <div 
                key={event.id} 
                className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer border border-white/10"
                onClick={() => openModal(event)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {event.is_featured && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs">
                      {event.category || 'Event'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{formatEventDate(event.date)}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                    View details
                    <ArrowRight size={16} className="ml-1.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          onClose={closeModal}
          event={selectedEvent}
        />
      )}
    </div>
  );
}
