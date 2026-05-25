"use client";

export default function ExploreFilters({
  categories,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
}) {
  const pillBase =
    "inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-[0.98]";

  const pillActive = `${pillBase} bg-[#0F172A] text-white shadow-sm shadow-[#0F172A]/10`;
  const pillInactive = `${pillBase} border border-gray-200 text-[#0F172A] bg-white hover:border-[#0F172A] hover:bg-gray-50`;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={isActive ? pillActive : pillInactive}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="text-xs text-gray-400 font-medium">
          Tip: use filters to narrow down the feed.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onSortChange("newest")}
            className={sort === "newest" ? pillActive : pillInactive}
          >
            Newest
          </button>
          <button
            type="button"
            onClick={() => onSortChange("popular")}
            className={sort === "popular" ? pillActive : pillInactive}
          >
            Most Liked
          </button>
        </div>
      </div>
    </div>
  );
}

