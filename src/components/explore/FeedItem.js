import Link from 'next/link'

export default function FeedItem({ achievement }) {
  const student = achievement.students
  const category = achievement.categories
  const color = category?.color || '#4FC3C7'

  const date = new Date(achievement.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  const postedAt = new Date(achievement.created_at).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 hover:border-gray-300 transition-colors overflow-hidden">
      <div className="flex">

        {/* Left vote column — Reddit style, repurposed as category indicator */}
        <div
          className="w-10 flex-shrink-0 flex flex-col items-center pt-3 rounded-l-xl"
          style={{ background: color + '15' }}
        >
          <div
            className="w-1.5 h-8 rounded-full mt-1"
            style={{ background: color }}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 p-3">

          {/* Top meta row */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">

            {/* Student avatar + name */}
            <Link href={`/students/${student?.slug}`} className="flex items-center gap-1.5 hover:underline">
              <div
                className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                style={{ background: color }}
              >
                {student?.photo_url ? (
                  <img src={student.photo_url} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  student?.name?.charAt(0)
                )}
              </div>
              <span className="text-xs font-semibold text-[#0F172A] hover:text-cyan-600">
                {student?.name}
              </span>
            </Link>

            <span className="text-gray-300 text-xs">·</span>

            {/* Class */}
            <span className="text-xs text-gray-400">
              {student?.classes?.name || 'LIPS School'}
            </span>

            <span className="text-gray-300 text-xs">·</span>

            {/* Posted at */}
            <span className="text-xs text-gray-400">Posted {postedAt}</span>

            {/* Category badge */}
            <span
              className="ml-auto text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
              style={{ background: color + '20', color }}
            >
              {category?.name}
            </span>

          </div>

          {/* Achievement title */}
          <Link href={`/achievements/${achievement.id}`}>
            <h2 className="text-base font-bold text-[#0F172A] leading-snug hover:text-cyan-700 transition-colors mb-1.5">
              {achievement.title}
            </h2>
          </Link>

          {/* Description */}
          {achievement.description && (
            <p className="text-sm text-gray-500 leading-relaxed mb-3">
              {achievement.description}
            </p>
          )}

          {/* Achievement image */}
          {achievement.image_url && (
            <div className="mb-3 rounded-xl overflow-hidden border border-gray-100">
              <img
                src={achievement.image_url}
                alt={achievement.title}
                className="w-full max-h-72 object-cover"
              />
            </div>
          )}

          {/* Bottom row */}
          <div className="flex items-center gap-4 pt-1">
            <span className="text-xs text-gray-400">
              🗓 {date}
            </span>
            <Link
              href={`/achievements/${achievement.id}`}
              className="text-xs text-gray-400 hover:text-cyan-600 font-medium transition-colors"
            >
              View Details →
            </Link>
            <Link
              href={`/students/${student?.slug}`}
              className="text-xs text-gray-400 hover:text-cyan-600 font-medium transition-colors"
            >
              View Profile →
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}