import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import ExploreSidebar from '@/components/explore/ExploreSidebar'
import FeedItem from '@/components/explore/FeedItem'

export default async function ExplorePage({ searchParams }) {
  const supabase = await createClient()
  const { category, class: classFilter } = await searchParams

  // Sidebar data
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, color')
    .order('name')

  const { data: classes } = await supabase
    .from('classes')
    .select('id, name')
    .order('name')

  // Main feed query
  let query = supabase
    .from('achievements')
    .select(`
      id,
      title,
      description,
      date,
      created_at,
      image_url,
      students (
        name,
        slug,
        photo_url,
        classes (name)
      ),
      categories (
        name,
        color
      )
    `)
    .order('created_at', { ascending: false })

  // Apply filters
  if (category) {
    query = query.eq('categories.name', category)
  }
  if (classFilter) {
    query = query.eq('students.classes.name', classFilter)
  }

  let { data: achievements } = await query

  // Client-side filter fallback for nested filters
  if (category) {
    achievements = achievements?.filter(a => a.categories?.name === category)
  }
  if (classFilter) {
    achievements = achievements?.filter(a => a.students?.classes?.name === classFilter)
  }

  return (
    <div className="min-h-screen bg-[#DAE0E6]">
      <Navbar />

      {/* Reddit-style layout */}
      <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6 items-start">
            {/* Sidebar */}
        <ExploreSidebar
          categories={categories || []}
          classes={classes || []}
          activeCategory={category || null}
          activeClass={classFilter || null}
        />

        {/* Main feed */}
        <main className="flex-1 min-w-0">

          {/* Feed header */}
          <div className="bg-white rounded-xl px-4 py-3 mb-3 flex items-center justify-between border border-gray-200/80">
            <h1 className="text-sm font-bold text-[#0F172A]">
              {category ? `${category}` : classFilter ? `${classFilter}` : 'All Achievements'}
            </h1>
            <span className="text-xs text-gray-400">
              {achievements?.length || 0} posts
            </span>
          </div>

          {/* Feed items */}
          <div className="space-y-2.5">
            {achievements?.length > 0 ? (
              achievements.map(achievement => (
                <FeedItem key={achievement.id} achievement={achievement} />
              ))
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200/80">
                <p className="text-gray-400 text-sm font-medium">No achievements found.</p>
                {(category || classFilter) && (
                  <p className="text-gray-300 text-xs mt-1">Try clearing the filters.</p>
                )}
              </div>
            )}
          </div>
        </main>

    

      </div>
    </div>
  )
}