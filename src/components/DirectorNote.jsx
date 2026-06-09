'use client'

export default function ChairmanNote() {
  return (
    <section className="relative w-full bg-slate-50 py-24 md:py-32 overflow-hidden border-t border-slate-200">
      
      {/* Subtle light background ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ========================================= */}
          {/* LEFT COLUMN: Minimal Portrait */}
          {/* ========================================= */}
          <div className="lg:col-span-4 flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-3 text-cyan-700 mb-2">
              <span className="w-8 h-[1px] bg-cyan-700/40"></span>
              <span className="text-xs font-bold tracking-widest uppercase">Chairman's Note</span>
            </div>

            {/* Clean, un-cluttered portrait */}
            <div className="w-full max-w-sm aspect-[4/5] rounded-[2rem] overflow-hidden border border-white shadow-xl relative group">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                alt="The Chairman"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="pl-2">
              <p className="text-slate-900 font-bold text-xl tracking-tight">The Chairman</p>
              <p className="text-cyan-700 text-sm font-medium mt-1">Little India Public School</p>
            </div>
          </div>

          {/* ========================================= */}
          {/* RIGHT COLUMN: The Letter Content (Light Glass Card) */}
          {/* ========================================= */}
          <div className="lg:col-span-8 bg-white/70 backdrop-blur-2xl border border-white rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            
            <div className="relative z-10 text-slate-600 space-y-6 leading-relaxed text-base sm:text-lg">
              
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-10">
                A New Era of <span className="font-serif italic font-normal text-cyan-600">Excellence.</span>
              </h2>

              <p className="text-slate-900 font-semibold text-xl">
                Dear Students,
              </p>
              
              <p>
                For three decades, Little India Public School has been a space dedicated to cultivating curiosity, excellence, and leadership. Today, we are proud to introduce <strong className="text-slate-900">Luminary</strong>—a futuristic digital canvas custom-built exclusively for your achievements to shine.
              </p>

              <h4 className="text-xl font-semibold text-cyan-700 pt-6">What is Luminary?</h4>
              <p>
                Luminary is your verified digital portfolio and showcase platform. It is designed to host, celebrate, and track the incredible milestones you achieve across all disciplines—whether you are engineering robotics, pioneering hybrid technologies, winning inter-school elocution championships, or reaching national podiums in elite athletics.
              </p>

         


            </div>
          </div>

        </div>
      </div>
    </section>
  )
}