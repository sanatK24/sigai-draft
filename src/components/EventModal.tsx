"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    title: string;
    date: string;
    description: string;
    image?: string;
    speakers?: Array<{
      name: string;
      role: string;
      imageUrl?: string;
    }>;
  };
}

export default function EventModal({ isOpen, onClose, event }: EventModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl transform transition-all">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 md:h-auto">
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/30">
                    {event.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{event.date}</p>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">{event.description}</p>
              </div>

              {event.speakers && event.speakers.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Speakers
                  </h4>
                  <div className="space-y-4">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0 overflow-hidden">
                          {speaker.imageUrl ? (
                            <Image
                              src={speaker.imageUrl}
                              alt={speaker.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-indigo-900/50 text-white">
                              {speaker.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">{speaker.name}</p>
                          <p className="text-sm text-gray-400">{speaker.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
