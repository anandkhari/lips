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
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    category_id: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

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
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: theme.border }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium"
        style={{ background: theme.accentSoft, color: theme.accent }}
      >
        <span>+ Add Achievement</span>
        <span>{open ? '^' : 'v'}</span>
      </button>

      {open && (
        <div className="p-5 space-y-4" style={{ background: '#f8fafc' }}>
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
              placeholder="Brief description of the achievement..."
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

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl font-semibold text-white text-sm disabled:opacity-60"
            style={{ background: theme.accent }}
          >
            {loading ? 'Adding...' : 'Add Achievement'}
          </button>
        </div>
      )}
    </div>
  )
}
