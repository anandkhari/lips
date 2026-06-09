'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function EditAchievementForm({ achievement, categories, onClose }) {
  const theme = {
    surface: '#ffffff',
    border: 'rgba(148,163,184,0.22)',
    text: '#0f172a',
    muted: '#64748b',
    accent: '#0284c7',
  }

  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    title: achievement.title || '',
    description: achievement.description || '',
    date: achievement.date || '',
    category_id: achievement.category_id || '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    if (!form.title || !form.date || !form.category_id) {
      setError('Title, date and category are required.')
      setLoading(false)
      return
    }

    let image_url = achievement.image_url

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${achievement.student_id}-${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('achievement-images')
        .upload(fileName, imageFile)

      if (uploadError) {
        setError('Image upload failed: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('achievement-images')
        .getPublicUrl(fileName)
      image_url = urlData.publicUrl
    }

    const { error: updateError } = await supabase
      .from('achievements')
      .update({
        title: form.title,
        description: form.description,
        date: form.date,
        category_id: form.category_id,
        image_url,
      })
      .eq('id', achievement.id)

    if (updateError) {
      setError(updateError.message)
    } else {
      onClose()
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.32)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-full max-w-lg rounded-2xl p-6 space-y-4"
        style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold" style={{ color: theme.text }}>
            Edit Achievement
          </h3>
          <button
            onClick={onClose}
            className="text-lg leading-none hover:opacity-60 transition-opacity"
            style={{ color: theme.muted }}
          >
            ✕
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
            rows={3}
            className="w-full px-4 py-3 rounded-xl outline-none resize-none"
            style={inputStyle}
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
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id} style={{ background: theme.surface }}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm block mb-1" style={{ color: theme.muted }}>
            Replace image (optional)
          </label>
          {achievement.image_url && (
            <div className="mb-2 h-20 w-32 rounded-lg overflow-hidden border border-gray-100">
              <img
                src={achievement.image_url}
                alt="current"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="text-sm"
            style={{ color: theme.muted }}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm"
            style={{ color: theme.muted }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-[2] py-3 rounded-xl text-sm font-semibold disabled:opacity-60"
            style={{ background: theme.accent, color: '#ffffff' }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
