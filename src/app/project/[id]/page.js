import Link from "next/link";
import {
  IconArrowLeft,
  IconCode,
  IconEye,
  IconHeart,
  IconLink,
  IconMessageCircle,
  IconShare,
} from "@tabler/icons-react";

import Navbar from "@/components/Navbar";
import SEED_PROJECTS from "@/lib/seed-data";

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function getProjectById(id) {
  const first = SEED_PROJECTS[0] ?? null;
  if (!id) return first;
  return SEED_PROJECTS.find((p) => String(p.id) === String(id)) ?? first;
}

export default async function Page({ params }) {
  const unwrappedParams = await Promise.resolve(params);
  const project = getProjectById(unwrappedParams?.id);

  if (!project) {
    return (
      <div>
        <Navbar />
        <section className="bg-white py-28 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#0F172A] mb-3">
              Project not found
            </h1>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              There are no projects available in seed data yet.
            </p>
            <div className="mt-10 flex justify-center">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 bg-[#0F172A] text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-cyan-600 transition-all duration-300 shadow-xl shadow-slate-900/10 active:scale-[0.98]"
              >
                Back to Explore
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const moreProjects = SEED_PROJECTS.filter((p) => String(p.id) !== String(project.id)).slice(0, 3);
  const dateLabel = formatDate(project.createdAt);
  const tags = Array.isArray(project.tags) ? project.tags : [];

  return (
    <div>
      <Navbar />

      {/* 1) Cover image */}
      <section className="bg-white border-t border-gray-100">
        <div className="w-full">
          <div className="aspect-[16/9] bg-gray-50 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 2) Header */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {project.category ? (
                <span className="text-[11px] font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-widest">
                  {project.category}
                </span>
              ) : null}
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#0F172A] transition-colors"
              >
                <IconArrowLeft size={16} strokeWidth={2} />
                Back to Explore
              </Link>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#0F172A] leading-tight tracking-tight mb-6">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
              <span className="text-[#0F172A] font-semibold">{project.authorName}</span>
              <span className="text-gray-300">•</span>
              <span>{project.grade}</span>
              <span className="text-gray-300">•</span>
              <span>{project.school}</span>
              {dateLabel ? (
                <>
                  <span className="text-gray-300">•</span>
                  <span>{dateLabel}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 3) Sticky action bar */}
      <section className="bg-white border-t border-gray-100">
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-[#0F172A] text-sm font-semibold">
                  <IconHeart size={16} className="text-gray-500" strokeWidth={2} />
                  {project.likes}
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-[#0F172A] text-sm font-semibold">
                  <IconMessageCircle size={16} className="text-gray-500" strokeWidth={2} />
                  0
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-[#0F172A] text-sm font-semibold">
                  <IconEye size={16} className="text-gray-500" strokeWidth={2} />
                  {project.views}
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-[#0F172A] text-sm font-semibold hover:border-[#0F172A] hover:bg-gray-50 transition-all active:scale-[0.98]"
                >
                  <IconShare size={16} className="text-gray-500" strokeWidth={2} />
                  Share
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-200 text-[#0F172A] bg-white px-6 py-2.5 rounded-full font-semibold text-sm hover:border-[#0F172A] hover:bg-gray-50 transition-all active:scale-[0.98]"
                >
                  <IconCode size={16} strokeWidth={2} />
                  Code
                </a>
                <a
                  href="#"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F172A] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-cyan-600 transition-all duration-300 shadow-sm shadow-[#0F172A]/10 active:scale-[0.98]"
                >
                  <IconLink size={16} strokeWidth={2} />
                  Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) Description + tags */}
      <section className="bg-[#FAFAFC] py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-serif text-[#0F172A] mb-6">About this project</h2>
            <p className="text-base text-gray-500 leading-relaxed">{project.description}</p>

            {tags.length ? (
              <div className="mt-10 flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-gray-200 bg-white text-[#0F172A] text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* 5) Media gallery */}
      {Array.isArray(project.images) && project.images.length ? (
        <section className="bg-[#FAFAFC] pb-20 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-[11px] font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-widest">
                Media
              </span>
              <h2 className="text-3xl font-bold font-serif text-[#0F172A] mt-4">Project Gallery</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.images.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="group relative flex flex-col bg-white rounded-3xl border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-[16/9] bg-gray-50 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${project.title} media ${idx + 1}`}
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 6) Comments */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-10">
              <h2 className="text-3xl font-bold font-serif text-[#0F172A]">Comments</h2>
              <span className="text-xs text-gray-400 font-medium">0 total</span>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100/80 p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  disabled
                  placeholder="Write a comment… (coming soon)"
                  className="w-full rounded-full border border-gray-200 bg-white py-3.5 px-5 text-sm font-medium text-[#0F172A] placeholder:text-gray-400 shadow-sm shadow-slate-900/5 outline-none"
                />
                <button
                  type="button"
                  disabled
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F172A]/40 text-white px-7 py-3.5 rounded-full font-semibold text-sm"
                >
                  Post
                </button>
              </div>
            </div>

            <div className="mt-10 space-y-5">
              <div className="bg-white rounded-3xl border border-gray-100/80 p-6">
                <p className="text-sm text-gray-400 font-medium">No comments yet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7) More projects */}
      <section className="bg-[#FAFAFC] py-28 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-widest">
              More
            </span>
            <h2 className="text-3xl font-bold font-serif text-[#0F172A] mt-4">More Projects</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {moreProjects.map((p) => (
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
                      <span className="text-xs text-gray-300">•</span>
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
        </div>
      </section>
    </div>
  );
}
