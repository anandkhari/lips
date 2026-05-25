"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  IconEye,
  IconHeart,
} from "@tabler/icons-react";

import Navbar from "@/components/Navbar";
import SearchBar from "@/components/explore/SearchBar";
import ExploreFilters from "@/components/explore/ExploreFilters";
import SEED_PROJECTS from "@/lib/seed-data";

function sortProjects(projects, sort) {
  if (sort === "popular") {
    return [...projects].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
  }

  return [...projects].sort((a, b) => {
    const aTime = Date.parse(a.createdAt ?? "") || 0;
    const bTime = Date.parse(b.createdAt ?? "") || 0;
    return bTime - aTime;
  });
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(SEED_PROJECTS.map((p) => p.category).filter(Boolean)));
    return ["All", ...unique];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const byCategory =
      activeCategory === "All"
        ? SEED_PROJECTS
        : SEED_PROJECTS.filter((p) => (p.category ?? "") === activeCategory);

    const byQuery = !q
      ? byCategory
      : byCategory.filter((p) => {
          const title = (p.title ?? "").toLowerCase();
          const desc = (p.description ?? "").toLowerCase();
          const tags = Array.isArray(p.tags) ? p.tags.join(" ").toLowerCase() : "";
          const author = (p.authorName ?? "").toLowerCase();
          return title.includes(q) || desc.includes(q) || tags.includes(q) || author.includes(q);
        });

    return sortProjects(byQuery, sort);
  }, [activeCategory, query, sort]);

  return (
    <div>
      <Navbar />

      <section className="bg-white py-28 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-widest">
              Explore
            </span>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#0F172A] mt-4 mb-3">
              Student Portfolio Feed
            </h1>
            <p className="text-gray-400 max-w-md mx-auto text-sm">
              Search, filter, and discover standout work across the Luminary network.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search by title, tag, or student…"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#FAFAFC] py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <ExploreFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            sort={sort}
            onSortChange={setSort}
          />
        </div>
      </section>

      <section className="bg-[#FAFAFC] pb-28 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => {
              return (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="group relative flex flex-col bg-white rounded-3xl border border-gray-100/80 hover:border-transparent hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <div className="aspect-[16/9] bg-gray-50 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    {project.category ? (
                      <div className="absolute top-4 left-4 text-[10px] font-bold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                        {project.category}
                      </div>
                    ) : null}
                  </div>

                  <div className="p-8 flex flex-col gap-4">
                    <div>
                      <h3 className="font-bold text-[#0F172A] text-[16px] tracking-tight mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed font-medium">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 font-medium">{project.authorName}</span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-400 font-medium">{project.grade}</span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                        <span className="inline-flex items-center gap-1.5">
                          <IconHeart size={14} className="text-gray-400" strokeWidth={2} />
                          {project.likes}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <IconEye size={14} className="text-gray-400" strokeWidth={2} />
                          {project.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm text-gray-400 font-medium">No projects match your search.</p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
