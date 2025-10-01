import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import supabase from '@/lib/supabase';
import Link from 'next/link';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  registration_link: string;
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
}

export const revalidate = 60; // Revalidate this page every 60 seconds

export async function generateStaticParams() {
  const { data: events } = await supabase
    .from('events')
    .select('id');
  
  return events?.map(({ id }) => ({ id })) || [];
}

interface EventParams {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventParams) {
  const { data: event } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPastEvent = eventDate < today;
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/events" 
          className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors"
        >
          ← Back to Events
        </Link>
        
        <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        {event.image && (
          <div className="relative h-64 md:h-80 w-full">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-900 text-blue-100 text-xs font-medium rounded-full">
              {event.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {event.title}
          </h1>
          
          <div className="flex flex-col space-y-4 mb-8">
            <div className="flex items-center text-gray-300">
              <Calendar className="mr-2 h-5 w-5 text-white" />
              <span className="text-white">{formattedDate}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Clock className="mr-2 h-5 w-5 text-white" />
              <span className="text-white">{event.time}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <MapPin className="mr-2 h-5 w-5 text-white" />
              <span className="text-white">{event.location}</span>
            </div>
          </div>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-300 leading-relaxed">
              {event.description}
            </p>
          </div>
          
          {event.speakers && event.speakers.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Speakers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.speakers?.map((speaker: { name: string; role: string; image_url?: string }, index: number) => (
                  <div key={index} className="flex items-center space-x-4">
                    {speaker.image_url ? (
                      <Image
                        src={speaker.image_url}
                        alt={speaker.name}
                        width={48}
                        height={48}
                        className="rounded-full h-12 w-12 object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center text-gray-300">
                        {speaker.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-white">{speaker.name}</p>
                      <p className="text-sm text-gray-300">{speaker.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!isPastEvent && event.registration_link && (
            <div className="mt-8">
              <a
                href={event.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register Now
                <ArrowRight className="ml-2 -mr-1 h-4 w-4" />
              </a>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
