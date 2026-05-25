'use client';

import React from 'react';
import {
  IconFlask,
  IconPalette,
  IconTrophy,
} from '@tabler/icons-react';

const CATEGORIES = [
  { 
    name: 'Tech & Science', 
    icon: IconFlask, 
    className: 'text-cyan-600 bg-cyan-50 border-cyan-100/70', 
    featured: true 
  },
  { 
    name: 'Arts & Music', 
    icon: IconPalette, 
    className: 'text-rose-600 bg-rose-50 border-rose-100/70' 
  },
  { 
    name: 'Sports & Games', 
    icon: IconTrophy, 
    className: 'text-amber-600 bg-amber-50 border-amber-100/70' 
  },
];

export default function CategorySection() {
  return (
    <section className="bg-[#FAFAFC] py-28 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-widest">
            Classifications
          </span>
          <h2 className="text-3xl font-bold font-serif text-[#0F172A] mt-4">
            Multi-Disciplinary Innovation
          </h2>
        </div>

        {/* Categories Grid - Adjusted column structure for 3 items */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {CATEGORIES.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.name}
                className="group relative bg-white rounded-2xl border border-gray-100/80 p-8 flex flex-col items-center text-center cursor-pointer hover:border-transparent hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300"
              >
                {category.featured && (
                  <div className="absolute top-3 right-3 bg-cyan-600 text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm shadow-cyan-600/10">
                    Featured
                  </div>
                )}
                
                {/* Icon Wrapper */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border ${category.className} transform group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={28} stroke={1.75} />
                </div>
                
                <p className="text-sm font-bold text-[#0F172A] tracking-tight group-hover:text-cyan-600 transition-colors duration-200">
                  {category.name}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}