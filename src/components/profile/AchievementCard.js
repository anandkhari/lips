'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import EditAchievementForm from './EditAchievementForm'

export default function AchievementCard({ achievement, isAdmin, categories }) {
  const [editOpen, setEditOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const category = achievement.categories
  const color = category?.color || '#0284c7'

  const date = achievement.date
    ? new Date(achievement.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null

  async function handleDelete() {
    setDeleting(true)
    const supabase = createClient()
    await supabase.from('achievements').delete().eq('id', achievement.id)
    router.refresh()
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200/80 hover:border-gray-300 transition-colors overflow-hidden mb-3">
        <div className="flex">

          {/* Left category color bar */}
          <div
            className="w-10 shrink-0 flex flex-col items-center pt-3 rounded-l-xl"
            style={{ background: color + '15' }}
          >
            <div
              className="w-1.5 h-8 rounded-full mt-1"
              style={{ background: color }}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 p-3">

            {/* Category badge */}
            {category?.name && (
              <div className="mb-2">
                <span
                  className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                  style={{ background: color + '20', color }}
                >
                  {category.name}
                </span>
              </div>
            )}

            {/* Title */}
            <Link href={`/achievements/${achievement.id}`}>
              <h2 className="text-base font-bold text-[#0F172A] leading-snug hover:text-cyan-700 transition-colors mb-1.5">
                {achievement.title}
              </h2>
            </Link>

            {/* Description */}
            {achievement.description && (
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                {achievement.description}
              </p>
            )}

            {/* Image */}
            {achievement.image_url && (
              <div className="mb-3 rounded-xl overflow-hidden border border-gray-100">
                <img
                  src={achievement.image_url}
                  alt={achievement.title}
                  className="w-full max-h-72 object-cover"
                />
              </div>
            )}

            {/* Bottom row */}
            <div className="flex items-center gap-4 pt-1 flex-wrap">
              {date && (
                <span className="text-xs text-gray-400">🗓 {date}</span>
              )}
              <Link
                href={`/achievements/${achievement.id}`}
                className="text-xs text-gray-400 hover:text-cyan-600 font-medium transition-colors"
              >
                View Details →
              </Link>

              {/* Admin actions */}
              {isAdmin && (
                <div className="ml-auto flex items-center gap-3">
                  {confirmDelete ? (
                    <>
                      <span className="text-xs text-gray-400">Delete this achievement?</span>
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-50 transition-colors"
                      >
                        {deleting ? 'Deleting…' : 'Yes, delete'}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(false)}
                        className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditOpen(true)}
                        className="text-xs font-semibold text-[#0284c7] hover:text-cyan-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setConfirmDelete(true)}
                        className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {editOpen && (
        <EditAchievementForm
          achievement={achievement}
          categories={categories}
          onClose={() => setEditOpen(false)}
        />
      )}
    </>
  )
}
