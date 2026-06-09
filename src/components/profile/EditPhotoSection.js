'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function EditPhotoSection({ student }) {
  const theme = {
    page: '#f8fafc',
    border: 'rgba(148,163,184,0.22)',
    accent: '#0284c7',
    accentSoft: 'rgba(14,165,233,0.12)',
  }

  const router = useRouter()
  const supabase = createClient()
  const [editing, setEditing] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleFile(e) {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return
    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setEditing(true)
  }

  async function handleSave() {
    if (!file) return
    setLoading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${student.slug}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('student-photos').upload(fileName, file)

    if (uploadError) {
      setLoading(false)
      return
    }

    const { data: urlData } = supabase.storage.from('student-photos').getPublicUrl(fileName)

    await supabase.from('students').update({ photo_url: urlData.publicUrl }).eq('id', student.id)
    setLoading(false)
    setEditing(false)
    router.refresh()
  }

  return (
    <div className="relative group">
      <div
        className="w-32 h-32 rounded-full overflow-hidden"
        style={{ border: `4px solid ${theme.page}`, boxShadow: `0 0 0 1px ${theme.border}, 0 12px 30px -18px rgba(15,23,42,0.35)` }}
      >
        {(preview || student.photo_url) ? (
          <img src={preview || student.photo_url} alt={student.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold" style={{ background: theme.accentSoft, color: theme.accent }}>
            {student.name?.charAt(0)}
          </div>
        )}
      </div>

      <label
        className="absolute inset-0 rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(4px)' }}
      >
        <span className="text-xs font-medium" style={{ color: '#0f172a' }}>
          Edit
        </span>
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </label>

      {editing && (
        <button
          onClick={handleSave}
          disabled={loading}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap disabled:opacity-60"
          style={{ background: theme.accent, color: '#ffffff' }}
        >
          {loading ? 'Saving...' : 'Save Photo'}
        </button>
      )}
    </div>
  )
}
