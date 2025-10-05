"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <Link 
      href={card.link || '#'}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-2xl relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer group",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full"
      />
      
      {/* Always visible gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
      
      {/* Always visible title */}
      <div className="absolute bottom-0 left-0 right-0 py-6 px-6 z-10">
        <div className="text-xl md:text-2xl font-bold text-white drop-shadow-lg mb-2">
          {card.title}
        </div>
      </div>
      
      {/* Hover overlay with additional details */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end py-8 px-6 transition-opacity duration-300 z-20",
          hovered === index ? "opacity-100" : "md:opacity-0 opacity-100"
        )}
      >
        <div className="text-xl md:text-2xl font-bold text-white mb-2">
          {card.title}
        </div>
        {card.description && (
          <p className="text-sm text-neutral-300 line-clamp-2 mb-3">
            {card.description}
          </p>
        )}
        {(card.date || card.location) && (
          <div className="text-xs text-neutral-400 space-y-1 mb-4">
            {card.date && <div>{card.date}</div>}
            {card.location && <div>{card.location}</div>}
          </div>
        )}
        
        {/* Read More Button */}
        <div className={cn(
          "transition-all duration-300",
          hovered === index ? "opacity-100 translate-y-0" : "md:opacity-0 md:translate-y-2 opacity-100 translate-y-0"
        )}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl font-medium text-sm hover:bg-white/90 transition-all duration-200 group/btn shadow-lg">
            Read More
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
      {/* Subtle border on hover */}
      <div className={cn(
        "absolute inset-0 border-2 border-white/20 rounded-2xl transition-opacity duration-300 pointer-events-none z-30",
        hovered === index ? "opacity-100" : "opacity-0"
      )} />
    </Link>
  )
);

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
  link?: string;
  description?: string;
  date?: string;
  location?: string;
};

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
