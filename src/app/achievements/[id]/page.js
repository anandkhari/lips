import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export async function generateMetadata({ params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('achievements')
    .select('title, description')
    .eq('id', id)
    .single()

  if (!data) return { title: 'Achievement Not Found' }

  return {
    title: `${data.title} — LIPS Luminary`,
    description: data.description || `An achievement on LIPS Luminary`,
  }
}

export default async function AchievementDetail({ params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: achievement } = await supabase
    .from('achievements')
    .select(`
      *,
      categories (name, color),
      students (
        name,
        slug,
        photo_url,
        bio,
        classes (name)
      )
    `)
    .eq('id', id)
    .single()

  if (!achievement) notFound()

  const student = achievement.students
  const category = achievement.categories
  const color = category?.color || '#4FC3C7'

  const date = new Date(achievement.date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-[#DAE0E6]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Back link */}
        <Link href="/explore" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors">
          ← Back to feed
        </Link>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden">

          {/* Achievement image */}
          {achievement.image_url && (
            <div className="w-full">
              <img
                src={achievement.image_url}
                alt={achievement.title}
                className="w-full max-h-80 object-cover"
              />
            </div>
          )}

          <div className="p-6">

            {/* Category badge */}
            <span
              className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
              style={{ background: color + '20', color }}
            >
              {category?.name}
            </span>

            {/* Title */}
            <h1 className="text-2xl font-bold text-[#0F172A] mt-3 mb-2 leading-snug">
              {achievement.title}
            </h1>

            {/* Date */}
            <p className="text-sm text-gray-400 mb-4">🗓 {date}</p>

            {/* Description */}
            {achievement.description && (
              <p className="text-gray-600 leading-relaxed text-sm mb-6">
                {achievement.description}
              </p>
            )}

            {/* Divider */}
            <div className="border-t border-gray-100 mb-6" />

            {/* Student card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-lg font-bold text-white"
                  style={{ background: color }}
                >
                  {student?.photo_url ? (
                    <img src={student.photo_url} alt={student.name} className="w-full h-full object-cover" />
                  ) : (
                    student?.name?.charAt(0)
                  )}
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A] text-sm">{student?.name}</p>
                  <p className="text-xs text-gray-400">{student?.classes?.name || 'LIPS School'}</p>
                </div>
              </div>

              <Link
                href={`/students/${student?.slug}`}
                className="text-sm font-semibold px-4 py-2 rounded-xl transition-colors text-white"
                style={{ background: '#2E328F' }}
              >
                View Profile →
              </Link>
            </div>

          </div>
        </div>

        {/* LIPS Luminary branding */}
        <div className="text-center mt-6">
          <span className="text-xs text-gray-400">Powered by </span>
          <span className="text-xs font-semibold text-cyan-600">LIPS Luminary</span>
        </div>

      </div>
    </div>
  )
}