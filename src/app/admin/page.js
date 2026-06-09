import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SignOutButton from './SignOutButton'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { count: studentCount } = await supabase.from('students').select('*', { count: 'exact', head: true })
  const { count: achievementCount } = await supabase.from('achievements').select('*', { count: 'exact', head: true })
  const { count: categoryCount } = await supabase.from('categories').select('*', { count: 'exact', head: true })

  const { data: students } = await supabase.from('students').select('id, name, department, slug, class_id, achievements(count)').order('created_at', { ascending: false })

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <div className="flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">LIPS Luminary</h1>
          <p className="text-xs font-medium text-sky-600">Admin Dashboard</p>
        </div>
        <SignOutButton />
      </div>

      <div className="px-8 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Students', value: studentCount || 0 },
            { label: 'Total Achievements', value: achievementCount || 0 },
            { label: 'Categories', value: categoryCount || 0 },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.35)]">
              <p className="text-4xl font-bold text-sky-600">{stat.value}</p>
              <p className="text-slate-600 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-[0_14px_40px_-28px_rgba(15,23,42,0.35)]">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
            <h2 className="text-slate-900 font-semibold">Students</h2>
            <Link href="/admin/students/new">
              <button className="px-5 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: '#0284c7' }}>
                + Add Student
              </button>
            </Link>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                {['Name', 'Department', 'Achievements', 'Action'].map((header) => (
                  <th key={header} className="text-left px-6 py-3 text-xs text-slate-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students?.map((student) => (
                <tr key={student.id} className="border-b border-slate-100">
                  <td className="px-6 py-4 text-slate-900 text-sm">{student.name}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{student.department || '-'}</td>
                  <td className="px-6 py-4 text-sm text-sky-600">{student.achievements?.[0]?.count || 0}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/students/${student.id}`}>
                      <button className="px-4 py-1.5 rounded-lg text-xs text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 bg-white">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
              {(!students || students.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500 text-sm">
                    No students yet. Add your first student.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
