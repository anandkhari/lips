'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AddAchievementForm({ studentId, categories }) {
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
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', date: '', category_id: '' })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm((previous) => ({ ...previous, [e.target.name]: e.target.value }))
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    if (!form.title || !form.date || !form.category_id) {
      setError('Title, date and category are required.')
      setLoading(false)
      return
    }

    let image_url = null

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${studentId}-${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('achievement-images').upload(fileName, imageFile)

      if (uploadError) {
        setError('Image upload failed: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage.from('achievement-images').getPublicUrl(fileName)
      image_url = urlData.publicUrl
    }

    const { error: insertError } = await supabase.from('achievements').insert({
      student_id: studentId,
      title: form.title,
      description: form.description,
      date: form.date,
      category_id: form.category_id,
      image_url,
    })

    if (insertError) {
      setError(insertError.message)
    } else {
      setForm({ title: '', description: '', date: '', category_id: '' })
      setImageFile(null)
      setOpen(false)
      router.refresh()
    }

    setLoading(false)
  }

  const inputStyle = {
    background: theme.surface,
    border: `1px solid ${theme.border}`,
    color: theme.text,
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        style={{ background: theme.accentSoft, color: theme.accent, border: `1px solid ${theme.border}` }}
      >
        <span>+</span>
        <span>Add Achievement</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.24)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-lg rounded-2xl p-6 space-y-4" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold" style={{ color: theme.text }}>
                Add Achievement
              </h3>
              <button onClick={() => setOpen(false)} className="text-sm" style={{ color: theme.muted }}>
                x
              </button>
            </div>

            <div>
              <label className="text-sm block mb-1" style={{ color: theme.muted }}>
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={inputStyle}
                placeholder="Won 2nd place in Long Jump"
              />
            </div>

            <div>
              <label className="text-sm block mb-1" style={{ color: theme.muted }}>
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 rounded-xl outline-none resize-none"
                style={inputStyle}
                placeholder="Brief description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm block mb-1" style={{ color: theme.muted }}>
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="text-sm block mb-1" style={{ color: theme.muted }}>
                  Category *
                </label>
                <select
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl outline-none"
                  style={inputStyle}
                >
                  <option value="" style={{ background: theme.surface }}>
                    Select
                  </option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id} style={{ background: theme.surface }}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm block mb-1" style={{ color: theme.muted }}>
                Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setImageFile(event.target.files[0])}
                className="text-sm"
                style={{ color: theme.muted }}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button onClick={() => setOpen(false)} className="flex-1 py-3 rounded-xl text-sm" style={{ color: theme.muted }}>
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-[2] py-3 rounded-xl text-sm font-semibold disabled:opacity-60"
                style={{ background: theme.accent, color: '#ffffff' }}
              >
                {loading ? 'Adding...' : 'Add Achievement'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
