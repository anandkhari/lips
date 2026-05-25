"use client";

import Link from "next/link";
import { IconEye, IconHeart } from "@tabler/icons-react";

import SEED_PROJECTS from "@/lib/seed-data";

export default function LatestAchievements() {
  const latest = [...SEED_PROJECTS]
    .sort((a, b) => {
      const aTime = Date.parse(a.createdAt ?? "") || 0;
      const bTime = Date.parse(b.createdAt ?? "") || 0;
      return bTime - aTime;
    })
    .slice(0, 3);

  return (
    <section className="bg-[#FAFAFC] py-28 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-widest">
            Latest
          </span>
          <h2 className="text-3xl font-bold font-serif text-[#0F172A] mt-4 mb-3">Latest Achievements</h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm">
            Fresh showcases from the Luminary networkâ€”newest first.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latest.map((p) => (
            <Link
              key={p.id}
              href={`/project/${p.id}`}
              className="group relative flex flex-col bg-white rounded-3xl border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <div className="aspect-[16/9] bg-gray-50 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                {p.category ? (
                  <div className="absolute top-4 left-4 text-[10px] font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                    {p.category}
                  </div>
                ) : null}
              </div>

              <div className="p-8 flex flex-col gap-4">
                <div>
                  <h3 className="font-bold text-[#0F172A] text-[16px] tracking-tight mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-medium">{p.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 font-medium">{p.authorName}</span>
                    <span className="text-xs text-gray-300">â€¢</span>
                    <span className="text-xs text-gray-400 font-medium">{p.grade}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <IconHeart size={14} className="text-gray-400" strokeWidth={2} />
                      {p.likes}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <IconEye size={14} className="text-gray-400" strokeWidth={2} />
                      {p.views}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/explore"
            className="inline-flex items-center justify-center gap-2 bg-[#0F172A] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-cyan-600 transition-all duration-300 shadow-xl shadow-slate-900/10 active:scale-[0.98]"
          >
            Explore All Showcases
          </Link>
        </div>
      </div>
    </section>
  );
}

