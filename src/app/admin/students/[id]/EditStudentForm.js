'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function StudentProfileCard({ student, classes }) {
  const theme = {
    page: '#f8fafc',
    surface: '#ffffff',
    border: 'rgba(148,163,184,0.22)',
    text: '#0f172a',
    muted: '#64748b',
    accent: '#0284c7',
    accentSoft: 'rgba(14,165,233,0.12)',
  }

  const router = useRouter()
  const supabase = createClient()
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    name: student.name || '',
    class_id: student.class_id || '',
    bio: student.bio || '',
  })
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm((previous) => ({ ...previous, [e.target.name]: e.target.value }))
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  function handleCancel() {
    setIsEditing(false)
    setForm({
      name: student.name || '',
      class_id: student.class_id || '',
      bio: student.bio || '',
    })
    setPhotoFile(null)
    setPhotoPreview(null)
    setError(null)
  }

  async function handleSubmit() {
    setLoading(true)
    setError(null)

    let photo_url = student.photo_url

    if (photoFile) {
      const fileExt = photoFile.name.split('.').pop()
      const fileName = `${student.slug}-${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('student-photos').upload(fileName, photoFile)

      if (uploadError) {
        setError('Photo upload failed: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage.from('student-photos').getPublicUrl(fileName)
      photo_url = urlData.publicUrl
    }

    const { error: updateError } = await supabase
      .from('students')
      .update({
        name: form.name,
        class_id: form.class_id,
        bio: form.bio,
        photo_url,
      })
      .eq('id', student.id)

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    setIsEditing(false)
    setLoading(false)
    router.refresh()
  }

  const studentClassName = classes?.find((classItem) => classItem.id === student.class_id)?.name || 'Unassigned'
  const displayPhoto = photoPreview || student.photo_url

  return (
    <div className="relative rounded-3xl p-8 w-full max-w-md mx-auto transition-all duration-500 overflow-hidden" style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: '0 24px 40px -30px rgba(15,23,42,0.35)' }}>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] pointer-events-none" style={{ background: theme.accentSoft }} />

      {!isEditing ? (
        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full overflow-hidden mb-6 relative group" style={{ border: `2px solid ${theme.border}` }}>
            {displayPhoto ? (
              <img src={displayPhoto} alt={student.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-light" style={{ color: theme.muted, background: 'rgba(148,163,184,0.08)' }}>
                {student.name?.charAt(0)}
              </div>
            )}
          </div>

          <h2 className="text-2xl font-semibold tracking-wide mb-1" style={{ color: theme.text }}>
            {student.name || 'Anonymous Student'}
          </h2>

          <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wider mb-6" style={{ background: theme.accentSoft, color: theme.accent }}>
            {studentClassName}
          </span>

          <p className="text-sm leading-relaxed mb-8 max-w-[90%]" style={{ color: theme.muted }}>
            {student.bio || 'No biography provided yet.'}
          </p>

          <button
            onClick={() => setIsEditing(true)}
            className="w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
            style={{ background: theme.accent, color: '#ffffff' }}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold" style={{ color: theme.text }}>
              Edit Profile
            </h2>
            <button onClick={handleCancel} className="transition-colors" style={{ color: theme.muted }}>
              x
            </button>
          </div>

          <div className="flex items-center gap-5 p-4 rounded-2xl" style={{ background: '#f8fafc' }}>
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0" style={{ border: `1px solid ${theme.border}` }}>
              {displayPhoto ? (
                <img src={displayPhoto} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-medium" style={{ color: theme.muted }}>
                  {form.name?.charAt(0) || '?'}
                </div>
              )}
            </div>
            <label className="cursor-pointer text-sm font-medium px-4 py-2 rounded-lg transition-colors" style={{ color: theme.accent, border: `1px solid ${theme.border}` }}>
              Upload New Photo
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider block mb-1.5 ml-1" style={{ color: theme.muted }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300"
                style={{ background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text }}
              />
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wider block mb-1.5 ml-1" style={{ color: theme.muted }}>
                Class Assignment
              </label>
              <select
                name="class_id"
                value={form.class_id}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl outline-none appearance-none transition-all duration-300"
                style={{ background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text }}
              >
                <option value="" disabled style={{ background: theme.surface }}>
                  Select a class
                </option>
                {classes?.map((classItem) => (
                  <option key={classItem.id} value={classItem.id} style={{ background: theme.surface }}>
                    {classItem.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wider block mb-1.5 ml-1" style={{ color: theme.muted }}>
                Biography
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3.5 rounded-xl outline-none resize-none transition-all duration-300"
                style={{ background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text }}
              />
            </div>
          </div>

          {error && <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#b91c1c' }}>{error}</div>}

          <div className="pt-2 flex gap-3">
            <button onClick={handleCancel} disabled={loading} className="flex-1 py-3.5 rounded-xl font-medium text-sm transition-colors disabled:opacity-50" style={{ color: theme.muted, border: `1px solid ${theme.border}`, background: '#ffffff' }}>
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-[2] py-3.5 rounded-xl font-medium text-sm transition-all duration-300 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 flex justify-center items-center gap-2"
              style={{ background: theme.accent, color: '#ffffff' }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
