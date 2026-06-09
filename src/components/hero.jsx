'use client'

import { useState, useEffect } from 'react';
import { IconCalendarEvent, IconChevronLeft, IconChevronRight, IconArrowRight } from '@tabler/icons-react';

const latestEvents = [
  {
    id: 1,
    title: "LIPS Talks: The Magic of Rainbows",
    date: "May 15, 2026",
    image: "/lips_talk.png",
  },
  {
    id: 2,
    title: "Muthoot Academy Selection Trials",
    date: "June 08, 2026",
    image: "/football.png",
  },
  {
    id: 3,
    title: "Sahodaya Elocution Finals",
    date: "June 10, 2026",
    image: "/sahodaya.png",
  },
  {
    id: 4,
    title: "Hybrid Arts & Tech Exhibition",
    date: "June 12, 2026",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop",
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % latestEvents.length);
    }, 6000); // Slightly longer for reading large text
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % latestEvents.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + latestEvents.length) % latestEvents.length);
  const goToSlide = (index) => setCurrent(index);

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex flex-col justify-end overflow-hidden bg-black">
      
      {/* Cinematic Background Crossfade */}
      {latestEvents.map((event, index) => (
        <div 
          key={event.id} 
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105 pointer-events-none'
          }`}
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Heavy gradient overlay to ensure text legibility at the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none" />

      {/* ========================================= */}
      {/* EVENT HUD & CONTROLS */}
      {/* ========================================= */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 md:pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          {/* Active Event Information */}
          <div className="flex-1 max-w-3xl">
            {/* Animated Wrapper for Text Replacement */}
            <div 
              key={current} // Forces re-render animation on slide change
              className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center p-2 bg-cyan-500/20 text-cyan-400 rounded-full backdrop-blur-md border border-cyan-500/30">
                  <IconCalendarEvent size={20} />
                </span>
                <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white/90 text-xs font-bold tracking-widest uppercase">
                  {latestEvents[current].date}
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-8 drop-shadow-xl">
                {latestEvents[current].title}
              </h2>

              <button className="group inline-flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-cyan-400 transition-colors duration-300 active:scale-[0.98]">
                View Event Details
                <IconArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col items-start md:items-end gap-6 shrink-0">
            {/* Arrows */}
            <div className="flex gap-3">
              <button 
                onClick={prevSlide}
                className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/20 hover:border-white/30 transition-all active:scale-95"
                aria-label="Previous event"
              >
                <IconChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/20 hover:border-white/30 transition-all active:scale-95"
                aria-label="Next event"
              >
                <IconChevronRight size={24} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2.5">
              {latestEvents.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-500 rounded-full h-1.5 ${
                    idx === current 
                      ? 'w-10 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]' 
                      : 'w-2.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}