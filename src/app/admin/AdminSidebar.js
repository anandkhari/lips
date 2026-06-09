'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminSidebar({ classes }) {
  const theme = {
    surface: 'rgba(255,255,255,0.9)',
    border: 'rgba(148,163,184,0.22)',
    text: '#0f172a',
    muted: '#64748b',
    accent: '#0284c7',
    accentSoft: 'rgba(14,165,233,0.12)',
  }

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [classesOpen, setClassesOpen] = useState(true)

  const selectedClass = searchParams.get('class')

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  function handleClassFilter(classId) {
    if (selectedClass === classId) {
      router.push('/admin/students')
    } else {
      router.push(`/admin/students?class=${classId}`)
    }
  }

  const isActive = (path) => pathname === path

  return (
    <aside
      className="w-64 flex-shrink-0 flex flex-col min-h-screen"
      style={{ background: theme.surface, borderRight: `1px solid ${theme.border}` }}
    >
      <div className="px-6 py-6" style={{ borderBottom: `1px solid ${theme.border}` }}>
        <h1 className="text-lg font-bold tracking-tight" style={{ color: theme.text }}>
          LIPS Luminary
        </h1>
        <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: theme.accentSoft, color: theme.accent }}>
          Admin
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        <Link href="/admin">
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
            style={{
              background: isActive('/admin') ? theme.accentSoft : 'transparent',
              color: isActive('/admin') ? theme.accent : theme.muted,
            }}
          >
            <span className="text-xs font-bold">DB</span>
            <span>Dashboard</span>
          </div>
        </Link>

        <Link href="/admin/students">
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
            style={{
              background: pathname.startsWith('/admin/students') ? theme.accentSoft : 'transparent',
              color: pathname.startsWith('/admin/students') ? theme.accent : theme.muted,
            }}
          >
            <span className="text-xs font-bold">ST</span>
            <span>Students</span>
          </div>
        </Link>

        {pathname.startsWith('/admin/students') && (
          <div className="ml-3 mt-1">
            <button
              onClick={() => setClassesOpen(!classesOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-xs rounded-lg"
              style={{ color: theme.muted }}
            >
              <span className="uppercase tracking-wider">Filter by Class</span>
              <span>{classesOpen ? '^' : 'v'}</span>
            </button>

            {classesOpen && (
              <div className="mt-1 space-y-0.5">
                <button
                  onClick={() => router.push('/admin/students')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors"
                  style={{
                    background: !selectedClass ? theme.accentSoft : 'transparent',
                    color: !selectedClass ? theme.accent : theme.muted,
                  }}
                >
                  All Classes
                </button>

                {classes.map((classItem) => (
                  <button
                    key={classItem.id}
                    onClick={() => handleClassFilter(classItem.id)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors"
                    style={{
                      background: selectedClass === classItem.id ? theme.accentSoft : 'transparent',
                      color: selectedClass === classItem.id ? theme.accent : theme.muted,
                    }}
                  >
                    {classItem.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <Link href="/admin/categories">
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
            style={{
              background: isActive('/admin/categories') ? theme.accentSoft : 'transparent',
              color: isActive('/admin/categories') ? theme.accent : theme.muted,
            }}
          >
            <span className="text-xs font-bold">CT</span>
            <span>Categories</span>
          </div>
        </Link>
      </nav>

      <div className="px-4 py-4" style={{ borderTop: `1px solid ${theme.border}` }}>
        <button
          onClick={handleSignOut}
          className="w-full px-4 py-2.5 rounded-xl text-sm transition-colors"
          style={{ color: theme.muted, border: `1px solid ${theme.border}`, background: '#ffffff' }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
