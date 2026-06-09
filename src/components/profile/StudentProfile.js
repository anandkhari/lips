import AchievementCard from './AchievementCard'
import EditPhotoSection from './EditPhotoSection'
import EditInfoSection from './EditInfoSection'
import AddAchievementForm from './AddAchievementForm'
import Navbar from '@/components/Navbar'

export default function StudentProfile({ student, achievements, classes, categories, isAdmin }) {
  const theme = {
    page: '#f8fafc',
    heroTop: '#eff6ff',
    heroMiddle: '#e0f2fe',
    heroBottom: '#f8fafc',
    border: 'rgba(148,163,184,0.2)',
    text: '#0f172a',
    muted: '#475569',
    subtle: '#64748b',
    accent: '#0284c7',
  }

  const categoryCounts = {}
  achievements?.forEach((achievement) => {
    const name = achievement.categories?.name
    if (name) categoryCounts[name] = (categoryCounts[name] || 0) + 1
  })

  // Strategy 2: derive ambient color from the student's most-used category
  const dominantColor = achievements?.[0]?.categories?.color || theme.accent

  // ── ADMIN VIEW (unchanged) ───────────────────────────────────────────────
  if (isAdmin) {
    return (
      <div className="min-h-screen" style={{ background: theme.page }}>
        <div
          className="w-full h-48 relative z-0 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${theme.heroTop} 0%, ${theme.heroMiddle} 52%, ${theme.heroBottom} 100%)`,
          }}
        >
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(14,165,233,0.14) 1px, transparent 1px), radial-gradient(circle at 80% 20%, rgba(37,99,235,0.12) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-end gap-6 -mt-20 mb-6 relative z-20">
            <EditPhotoSection student={student} />
            <div className="flex-1 pt-16">
              <EditInfoSection student={student} classes={classes} />
            </div>
          </div>

          {Object.keys(categoryCounts).length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.entries(categoryCounts).map(([name, count]) => {
                const category = achievements.find((a) => a.categories?.name === name)?.categories
                return (
                  <span
                    key={name}
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      background: `${category?.color || theme.accent}15`,
                      color: category?.color || theme.accent,
                      border: `1px solid ${theme.border}`,
                    }}
                  >
                    {name} - {count}
                  </span>
                )
              })}
            </div>
          )}

          <div className="mb-8" style={{ borderTop: `1px solid ${theme.border}` }} />

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold text-lg" style={{ color: theme.text }}>
                Achievements
              </h2>
              <p className="text-xs mt-0.5" style={{ color: theme.subtle }}>
                {achievements?.length || 0} total
              </p>
            </div>
            <AddAchievementForm studentId={student.id} categories={categories} />
          </div>

          <div className="pb-16">
            {achievements?.length > 0 ? (
              achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} isAdmin={isAdmin} categories={categories} />
              ))
            ) : (
              <div className="text-center py-16">
                <p className="text-sm" style={{ color: theme.subtle }}>
                  No achievements yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── PUBLIC VIEW (immersive exhibition layout) ────────────────────────────
  const earnedSince =
    achievements?.length > 0
      ? new Date(achievements[achievements.length - 1]?.date).getFullYear()
      : '—'

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: theme.page }}>

      {/* Strategy 2: Category-tinted ambient blobs filling the gutters */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: dominantColor }}
        />
        <div
          className="absolute top-1/2 -right-48 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: dominantColor }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
          style={{ background: dominantColor }}
        />
      </div>

      {/* Strategy 1: Sticky branded navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Strategy 3: Two-column grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">

          {/* LEFT — sticky identity card */}
          <aside className="lg:sticky lg:top-24">
            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                background: 'rgba(255,255,255,0.85)',
                borderColor: theme.border,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 20px 60px -20px rgba(15,23,42,0.15)',
              }}
            >
              {/* Gradient strip tinted with the dominant category color */}
              <div
                className="h-24 w-full"
                style={{
                  background: `linear-gradient(135deg, ${dominantColor}40 0%, ${dominantColor}15 100%)`,
                }}
              >
                <div
                  className="w-full h-full opacity-50"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>

              {/* Avatar overlapping the strip */}
              <div className="px-6 pb-6 -mt-12">
                <div
                  className="w-24 h-24 rounded-full overflow-hidden"
                  style={{
                    border: '4px solid white',
                    boxShadow: `0 0 0 1px ${theme.border}, 0 12px 30px -10px rgba(15,23,42,0.3)`,
                  }}
                >
                  {student.photo_url ? (
                    <img
                      src={student.photo_url}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-3xl font-bold"
                      style={{ background: `${dominantColor}20`, color: dominantColor }}
                    >
                      {student.name?.charAt(0)}
                    </div>
                  )}
                </div>

                <h1
                  className="mt-3 text-xl font-bold tracking-tight leading-tight"
                  style={{ color: theme.text }}
                >
                  {student.name}
                </h1>
                <p className="text-sm font-medium mt-0.5" style={{ color: dominantColor }}>
                  {student.classes?.name || 'LIPS School'}
                </p>

                {student.bio && (
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: theme.muted }}>
                    {student.bio}
                  </p>
                )}

                {/* Stats strip */}
                <div
                  className="grid grid-cols-3 mt-5 rounded-xl overflow-hidden"
                  style={{ border: `1px solid ${theme.border}`, gap: '1px', background: theme.border }}
                >
                  {[
                    { label: 'Total', value: achievements?.length || 0 },
                    { label: 'Areas', value: Object.keys(categoryCounts).length },
                    { label: 'Since', value: earnedSince },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white px-2 py-3 text-center">
                      <p className="text-lg font-bold" style={{ color: theme.text }}>
                        {value}
                      </p>
                      <p
                        className="text-[9px] uppercase tracking-widest mt-0.5"
                        style={{ color: theme.subtle }}
                      >
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Category expertise chips */}
                {Object.keys(categoryCounts).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {Object.entries(categoryCounts).map(([name, count]) => {
                      const cat = achievements.find((a) => a.categories?.name === name)?.categories
                      const c = cat?.color || theme.accent
                      return (
                        <span
                          key={name}
                          className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                          style={{
                            background: `${c}15`,
                            color: c,
                            border: `1px solid ${c}30`,
                          }}
                        >
                          {name} · {count}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* RIGHT — scrollable achievement feed */}
          <main>
            {/* Feed header */}
            <div
              className="rounded-xl px-4 py-3 mb-3 flex items-center justify-between border"
              style={{
                background: 'rgba(255,255,255,0.85)',
                borderColor: theme.border,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              <h2 className="text-sm font-bold" style={{ color: theme.text }}>
                Achievements
              </h2>
              <span className="text-xs" style={{ color: theme.subtle }}>
                {achievements?.length || 0} posts
              </span>
            </div>

            {/* Achievement cards */}
            {achievements?.length > 0 ? (
              achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))
            ) : (
              <div
                className="rounded-xl p-12 text-center border"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  borderColor: theme.border,
                }}
              >
                <p className="text-sm" style={{ color: theme.subtle }}>
                  No achievements yet.
                </p>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Strategy 1: Minimal footer */}
      <footer
        className="relative z-10 border-t py-6 text-center mt-4"
        style={{ borderColor: theme.border }}
      >
        <span className="text-xs" style={{ color: theme.subtle }}>Powered by </span>
        <span className="text-xs font-semibold" style={{ color: theme.accent }}>LIPS Luminary</span>
      </footer>

    </div>
  )
}
