import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function StudentsPage({ searchParams }) {
  const supabase = await createClient()
  const { class: classId } = await searchParams

  let query = supabase
    .from('students')
    .select('id, name, slug, class_id, photo_url, classes(name), achievements(count)')
    .order('created_at', { ascending: false })

  if (classId) {
    query = query.eq('class_id', classId)
  }

  const { data: students } = await query

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Students</h1>
          <p className="text-sm mt-1 text-slate-500">
            {students?.length || 0} {classId ? 'in this class' : 'total'}
          </p>
        </div>
        <Link href="/admin/students/new">
          <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: '#0284c7' }}>
            + Add Student
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {students?.map((student) => (
          <Link href={`/admin/students/${student.id}`} key={student.id}>
            <div
              className="flex items-center justify-between p-4 rounded-2xl transition-colors cursor-pointer"
              style={{ background: '#ffffff', border: '1px solid rgba(148,163,184,0.2)', boxShadow: '0 10px 30px -24px rgba(15,23,42,0.35)' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ background: 'rgba(14,165,233,0.12)' }}>
                  {student.photo_url ? (
                    <img src={student.photo_url} alt={student.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-sky-700">{student.name?.charAt(0)}</div>
                  )}
                </div>

                <div>
                  <p className="text-slate-900 font-medium text-sm">{student.name}</p>
                  <p className="text-xs mt-0.5 text-slate-500">{student.classes?.name || '-'}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-semibold text-sky-600">{student.achievements?.[0]?.count || 0}</p>
                  <p className="text-xs text-slate-400">achievements</p>
                </div>
                <span className="text-slate-300 text-sm">{'>'}</span>
              </div>
            </div>
          </Link>
        ))}

        {(!students || students.length === 0) && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-sm">No students found.</p>
            {classId && <p className="text-slate-400 text-xs mt-1">Try selecting a different class.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
