import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

export default async function AdminLayout({ children }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: classes } = await supabase.from('classes').select('*').order('name')

  return (
    <div className="min-h-screen flex" style={{ background: '#f8fafc' }}>
      <AdminSidebar classes={classes || []} />
      <main className="flex-1 overflow-auto bg-slate-50">{children}</main>
    </div>
  )
}
