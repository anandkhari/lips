'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function EditInfoSection({ student, classes }) {
  const theme = {
    surface: '#ffffff',
    border: 'rgba(148,163,184,0.22)',
    text: '#0f172a',
    muted: '#64748b',
    accent: '#0284c7',
    accentSoft: 'rgba(14,165,233,0.12)',
  }

  const router = useRouter()
  const supabase = createClient()
  const [editingInfo, setEditingInfo] = useState(false)
  const [editingBio, setEditingBio] = useState(false)
  const [form, setForm] = useState({
    name: student.name || '',
    class_id: student.class_id || '',
    bio: student.bio || '',
  })
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm((previous) => ({ ...previous, [e.target.name]: e.target.value }))
  }

  async function saveInfo() {
    setLoading(true)
    await supabase.from('students').update({
      name: form.name,
      class_id: form.class_id,
    }).eq('id', student.id)
    setLoading(false)
    setEditingInfo(false)
    router.refresh()
  }

  async function saveBio() {
    setLoading(true)
    await supabase.from('students').update({ bio: form.bio }).eq('id', student.id)
    setLoading(false)
    setEditingBio(false)
    router.refresh()
  }

  const className = classes?.find((classItem) => classItem.id === student.class_id)?.name || 'No class assigned'

  const inputStyle = {
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    color: theme.text,
  }

  return (
    <div className="w-full">
      <div className="relative group/info">
        {!editingInfo ? (
          <div className="flex items-start gap-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: theme.text }}>
                {student.name}
              </h1>
              <p className="text-sm mt-1 font-medium" style={{ color: theme.accent }}>
                {className}
              </p>
            </div>
            <button
              onClick={() => setEditingInfo(true)}
              className="opacity-0 group-hover/info:opacity-100 transition-opacity mt-1 p-1.5 rounded-lg"
              style={{ background: theme.accentSoft }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl text-xl font-bold outline-none"
              style={inputStyle}
            />
            <select
              name="class_id"
              value={form.class_id}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl outline-none text-sm"
              style={inputStyle}
            >
              {classes?.map((classItem) => (
                <option key={classItem.id} value={classItem.id} style={{ background: theme.surface }}>
                  {classItem.name}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button onClick={() => setEditingInfo(false)} className="px-4 py-2 rounded-xl text-sm" style={{ color: theme.muted }}>
                Cancel
              </button>
              <button
                onClick={saveInfo}
                disabled={loading}
                className="px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-60"
                style={{ background: theme.accent, color: '#ffffff' }}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative group/bio mt-4">
        {!editingBio ? (
          <div className="flex items-start gap-2">
            <p className="text-sm leading-relaxed flex-1" style={{ color: theme.muted }}>
              {student.bio || 'Add a bio to tell your story...'}
            </p>
            <button
              onClick={() => setEditingBio(true)}
              className="opacity-0 group-hover/bio:opacity-100 transition-opacity flex-shrink-0 p-1.5 rounded-lg"
              style={{ background: theme.accentSoft }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
              style={inputStyle}
              placeholder="Tell the student's story..."
            />
            <div className="flex gap-2">
              <button onClick={() => setEditingBio(false)} className="px-4 py-2 rounded-xl text-sm" style={{ color: theme.muted }}>
                Cancel
              </button>
              <button
                onClick={saveBio}
                disabled={loading}
                className="px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-60"
                style={{ background: theme.accent, color: '#ffffff' }}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
