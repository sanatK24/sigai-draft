'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  span?: 'normal' | 'wide' | 'tall' | 'large';
}

// Mock gallery images - replace with your actual event photos
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    alt: 'Tech Workshop 2024',
    category: 'Workshops',
    span: 'large'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
    alt: 'AI Conference',
    category: 'Events',
    span: 'normal'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
    alt: 'Team Meeting',
    category: 'Team',
    span: 'tall'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    alt: 'Coding Marathon',
    category: 'Hackathons',
    span: 'wide'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80',
    alt: 'Guest Lecture',
    category: 'Events',
    span: 'normal'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&q=80',
    alt: 'Workshop Session',
    category: 'Workshops',
    span: 'normal'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    alt: 'Team Building',
    category: 'Team',
    span: 'wide'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    alt: 'Project Presentation',
    category: 'Events',
    span: 'tall'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
    alt: 'Innovation Day',
    category: 'Events',
    span: 'normal'
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    alt: 'Networking Event',
    category: 'Events',
    span: 'large'
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1558403194-611308249627?w=800&q=80',
    alt: 'Code Review',
    category: 'Workshops',
    span: 'normal'
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    alt: 'Team Collaboration',
    category: 'Team',
    span: 'normal'
  }
];

const categories = ['All', 'Events', 'Workshops', 'Hackathons', 'Team'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const getGridSpanClass = (span?: string) => {
    switch (span) {
      case 'wide':
        return 'md:col-span-2';
      case 'tall':
        return 'md:row-span-2';
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px w-6 bg-zinc-500" />
            <h4 className="text-base font-medium text-zinc-400">Gallery</h4>
          </div>
          <h1 className="text-[40px] sm:text-[56px] lg:text-[64px] max-w-3xl leading-tight font-bold tracking-tighter text-white">
            Capturing <span className="text-primary">Moments</span> of{' '}
            <span className="text-primary">Innovation</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl">
            A visual journey through our events, workshops, hackathons, and memorable moments that define the RAIT ACM SIGAI community.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Gallery */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className={`group relative overflow-hidden rounded-2xl cursor-pointer ${getGridSpanClass(image.span)}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-semibold rounded-full mb-2">
                        {image.category}
                      </span>
                      <h3 className="text-white font-semibold text-lg">
                        {image.alt}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors z-10"
              aria-label="Close"
            >
              <X size={24} className="text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] md:h-[80vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 bg-primary/90 text-white text-sm font-semibold rounded-full mb-3">
                  {selectedImage.category}
                </span>
                <h2 className="text-white text-2xl font-bold">
                  {selectedImage.alt}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
