"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import EventModal from '@/components/EventModal';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  isNew?: boolean;
  speakers?: Array<{
    name: string;
    role: string;
    imageUrl?: string;
  }>;
}

const events: Event[] = [
  {
    id: 1,
    title: 'KLEOS 3.0: National Level Hackathon',
    date: 'Jul 18-19, 2025',
    time: '9:00 AM - 6:00 PM',
    location: 'RAIT, Nerul',
    description: 'A 36-hour hackathon bringing together talented developers and innovators to build AI-powered solutions. Join us for a weekend of coding, learning, and networking with industry experts.',
    image: '/img/Sigai Events/Kleos_Banner.svg',
    isNew: true,
    speakers: [
      {
        name: 'Dr. Rajesh Ingle',
        role: 'Hackathon Mentor',
        imageUrl: '/img/team/placeholder.jpg'
      },
      {
        name: 'Prof. Meera Sharma',
        role: 'AI Researcher',
        imageUrl: '/img/team/placeholder.jpg'
      }
    ]
  },
  {
    id: 2,
    title: 'STTP on Generative to Agentic AI',
    date: 'Jun 12, 2025',
    time: '10:00 AM - 4:00 PM',
    location: 'SIGAI Lab, RAIT',
    description: 'Hands-on workshop exploring the latest advancements in generative AI and autonomous agents. Learn from industry experts and get hands-on experience with cutting-edge AI technologies.',
    image: '/img/Sigai Events/STTP.webp',
    speakers: [
      {
        name: 'Prof. Meera Sharma',
        role: 'AI Researcher',
        imageUrl: '/img/team/placeholder.jpg'
      }
    ]
  },
  {
    id: 3,
    title: 'AI in Healthcare Symposium',
    date: 'May 25, 2025',
    time: '11:00 AM - 5:00 PM',
    location: 'Main Auditorium, RAIT',
    description: 'Exploring AI applications in healthcare and medical research with industry experts. Discover how AI is transforming diagnostics, treatment planning, and patient care.',
    image: '/img/Sigai Events/GenAI-WIP.webp',
    speakers: [
      {
        name: 'Dr. Anjali Deshpande',
        role: 'Healthcare AI Specialist',
        imageUrl: '/img/team/placeholder.jpg'
      }
    ]
  }
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Events</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover upcoming and past events organized by RAIT ACM SIGAI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
              onClick={() => openModal(event)}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {event.isNew && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    New
                  </div>
                )}
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <MapPin size={16} className="flex-shrink-0" />
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
