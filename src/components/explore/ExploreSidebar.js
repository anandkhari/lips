'use client'

import { useRouter } from 'next/navigation'

export default function ExploreSidebar({ categories, classes, activeCategory, activeClass }) {
  const router = useRouter()

  function setFilter(type, value) {
    const params = new URLSearchParams()
    if (type === 'category' && value !== activeCategory) params.set('category', value)
    if (type === 'class' && value !== activeClass) params.set('class', value)

    // Keep the other filter if set
    if (type === 'category' && activeClass) params.set('class', activeClass)
    if (type === 'class' && activeCategory) params.set('category', activeCategory)

    router.push(`/explore?${params.toString()}`)
  }

  function clearFilters() {
    router.push('/explore')
  }

  const hasFilter = activeCategory || activeClass

  return (
    <aside className="w-72 flex-shrink-0 space-y-3 sticky top-24">

      {/* About card */}
      <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden">
        <div className="h-12" style={{ background: 'linear-gradient(135deg, #2E328F, #4FC3C7)' }} />
        <div className="p-4">
          <h2 className="font-bold text-[#0F172A] text-sm mb-1">LIPS Luminary Feed</h2>
          <p className="text-xs text-gray-400 leading-relaxed">
            Every student achievement at Little India Public School, Mongam. Filter by category or class to explore.
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-4">
        <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
          Filter by Category
        </h3>
        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter('category', cat.name)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors"
              style={{
                background: activeCategory === cat.name ? cat.color + '15' : 'transparent',
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: cat.color }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: activeCategory === cat.name ? cat.color : '#64748b' }}
              >
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Class filter */}
      <div className="bg-white rounded-xl border border-gray-200/80 p-4">
        <h3 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-3">
          Filter by Class
        </h3>
        <div className="space-y-1">
          {classes.map(cls => (
            <button
              key={cls.id}
              onClick={() => setFilter('class', cls.name)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors hover:bg-gray-50"
              style={{
                background: activeClass === cls.name ? '#2E328F15' : 'transparent',
              }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: activeClass === cls.name ? '#2E328F' : '#64748b' }}
              >
                {cls.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasFilter && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 bg-white border border-gray-200 transition-colors"
        >
          Clear all filters
        </button>
      )}

    </aside>
  )
}