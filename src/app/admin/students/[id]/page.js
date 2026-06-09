import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import StudentProfile from '@/components/profile/StudentProfile'

export default async function AdminStudentProfile({ params }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { id } = await params

  const { data: student } = await supabase
    .from('students')
    .select('*, classes(name)')
    .eq('id', id)
    .single()

  if (!student) redirect('/admin')

  const { data: classes } = await supabase
    .from('classes')
    .select('*')
    .order('name')

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  const { data: achievements } = await supabase
    .from('achievements')
    .select('*, categories(name, color)')
    .eq('student_id', id)
    .order('date', { ascending: false })

  return (
    <StudentProfile
      student={student}
      achievements={achievements || []}
      classes={classes || []}
      categories={categories || []}
      isAdmin={true}
    />
  )
}