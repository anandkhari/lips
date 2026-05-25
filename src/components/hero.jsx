import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';

export default function Hero() {
  return (
    <section className="relative bg-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden border-b border-gray-100">
      {/* Soft Modern Lighting Wash */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-50/50 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Location / Institutional Pill */}
        <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-gray-500 tracking-wider uppercase">
            Little India Public School · 30 Years of Excellence
          </span>
        </div>

        {/* Main Title utilizing an Editorial Serif Accent */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.08] tracking-tight text-[#0F172A] mb-8">
          Where Student <span className="font-serif italic font-normal text-cyan-600">Brilliance</span> <br />
          Finds a Digital Canvas.
        </h1>

        {/* Refined Subheadline */}
        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
          Welcome to Luminary. A futuristic showcase custom-built for LIPS minds to exhibit groundbreaking projects—spanning robotics, hybrid technology, elite sports milestones, and creative arts.
        </p>

        {/* Pill Actions with Kinetic Micro-interactions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F172A] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-cyan-600 transition-all duration-300 shadow-xl shadow-slate-900/10 active:scale-[0.98]">
            Browse Student Portfolios
            <IconArrowRight size={16} />
          </Link>
          <Link href="/project/new"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-200 text-[#0F172A] bg-white px-8 py-4 rounded-full font-semibold text-sm hover:border-[#0F172A] hover:bg-gray-50 transition-all active:scale-[0.98]">
            Submit Your Project
          </Link>
        </div>

        <p className="text-xs text-gray-400 font-medium">Verified platform for all active LIPS school and hybrid students.</p>
      </div>
    </section>
  );
}