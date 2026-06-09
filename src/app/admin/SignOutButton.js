'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 rounded-xl text-sm transition-colors"
      style={{ color: '#475569', border: '1px solid rgba(148,163,184,0.22)', background: '#ffffff' }}
    >
      Sign Out
    </button>
  )
}
