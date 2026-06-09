import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import StudentProfile from '@/components/profile/StudentProfile'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: student } = await supabase
    .from('students')
    .select('name, bio, photo_url')
    .eq('slug', slug)
    .single()

  if (!student) return { title: 'Student Not Found' }

  return {
    title: `${student.name} — LIPS Luminary`,
    description: student.bio || `View ${student.name}'s achievements on LIPS Luminary`,
    openGraph: {
      title: `${student.name} — LIPS Luminary`,
      description: student.bio || `View ${student.name}'s achievements`,
      images: student.photo_url ? [student.photo_url] : [],
    }
  }
}

export default async function PublicStudentProfile({ params }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: student } = await supabase
    .from('students')
    .select('*, classes(name)')
    .eq('slug', slug)
    .single()

  if (!student) notFound()

  const { data: achievements } = await supabase
    .from('achievements')
    .select('*, categories(name, color)')
    .eq('student_id', student.id)
    .order('date', { ascending: false })

  return (
    <StudentProfile
      student={student}
      achievements={achievements || []}
      classes={null}
      categories={null}
      isAdmin={false}
    />
  )
}