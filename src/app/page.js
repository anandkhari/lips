"use client";

import CategorySection from "@/components/CategorySection";
import DirectorNote from "@/components/DirectorNote";
import LatestAchievements from "@/components/LatestAchievements";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import Link from "next/link";
import { IconArrowRight, IconEdit, IconStar, IconUsers } from "@tabler/icons-react";

const steps = [
  {
    step: "01",
    icon: <IconEdit size={22} className="text-cyan-600" strokeWidth={2} />,
    bg: "bg-cyan-50",
    title: "Curate & Document",
    desc: "Log into your student hub, outline your architectural framework, drop in image assets or drive embeds, and summarize your breakthrough details.",
  },
  {
    step: "02",
    icon: <IconUsers size={22} className="text-blue-600" strokeWidth={2} />,
    bg: "bg-blue-50",
    title: "Deploy to the Network",
    desc: "Your presentation syncs immediately onto the Luminary network, enabling global visibility across classmates, academic directors, and mentors.",
  },
  {
    step: "03",
    icon: <IconStar size={22} className="text-amber-500" strokeWidth={2} />,
    bg: "bg-amber-50",
    title: "Evolve into a Portfolio",
    desc: "Transform individual projects into an active digital resume over your school timeline—perfectly tailored for university admissions and talent scouts.",
  },
];

export default function Page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <DirectorNote />
      {/* <LatestAchievements /> */}

      <section className="bg-white py-28 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[11px] font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-widest">
              The Workflow
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#0F172A] mt-4 mb-3">
              Three Steps to Global Visibility
            </h2>
            <p className="text-gray-400 max-w-md mx-auto text-sm">
              Designed explicitly to help digital-era students structure their work into clean professional assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ step, icon, bg, title, desc }) => (
              <div
                key={step}
                className="group relative flex flex-col p-8 bg-white rounded-3xl border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {icon}
                </div>
                <span className="absolute top-8 right-8 text-4xl font-serif font-black text-gray-100 group-hover:text-cyan-100/50 transition-colors">
                  {step}
                </span>
                <h3 className="font-bold text-[#0F172A] mb-3 text-[16px] tracking-tight">
                  {title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CategorySection />
      <section className="bg-[#0F172A] py-28 relative overflow-hidden">
        {/* Futuristic Grid / Ambient Effects */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold font-serif text-white mb-6 leading-tight">
            Ready to show the world what you built?
          </h2>
          <p className="text-slate-400 text-base max-w-md mx-auto mb-12 leading-relaxed">
            Your ideas deserve more than a local classroom presentation. Bring them to the grid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/project/new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 active:scale-[0.98]">
              Publish New Project
              <IconArrowRight size={16} />
            </Link>
            <Link href="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-slate-700 hover:border-slate-500 text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-white/5 transition-all">
              Explore Active Feed
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
