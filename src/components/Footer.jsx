import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#090D16] text-slate-400 pt-20 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-white text-[#090D16] flex items-center justify-center rounded-lg font-black text-xs tracking-wider">
                LIPS
              </div>
              <span className="font-serif font-bold text-lg text-white">Luminary</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Where student brilliance is cataloged, amplified, and accelerated toward international
              standards.
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Little India Public School
              <br />
              Mongam, Malappuram, Kerala, IN
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-6">
              Application
            </p>
            <ul className="space-y-3.5">
              {[
                ["Explore Portfolios", "/explore"],
                ["Submit Artifact", "/project/new"],
                ["System Categories", "/categories"],
                ["How Platform Works", "#how"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-6">
              Institutional
            </p>
            <ul className="space-y-3.5">
              {[
                "About LIPS Foundation",
                "Hybrid Schooling Model",
                "Elite Sports Hub",
                "Admissions Portal",
              ].map((label) => (
                <li key={label}>
                  <a
                    href="https://lips.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-6">
              Support & Contact
            </p>
            <p className="text-sm text-slate-300 font-semibold mb-2">+91 9207 773 835</p>
            <p className="text-xs text-slate-500 mb-6">Mongam, Malappuram HQ</p>
            <a
              href="https://wa.me/+919207773835"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-xs font-semibold text-cyan-400 hover:text-white hover:bg-cyan-600 hover:border-transparent transition-all"
            >
              Connect via WhatsApp ↗
            </a>
          </div>
        </div>

        <div className="border-t border-slate-900/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-slate-600">© 2026 LIPS Luminary Framework. All rights reserved.</p>
          <p className="text-[11px] text-slate-600 tracking-wider uppercase font-semibold">
            Engineered by DOTS Digital
          </p>
        </div>
      </div>
    </footer>
  );
}

