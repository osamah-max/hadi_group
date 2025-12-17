import { useMemo, useEffect, useRef } from "react";

// ---------------- Icons ----------------
const BriefcaseIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);

const UserPlusIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="16" x2="22" y1="11" y2="11" />
  </svg>
);

const FactoryIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5L2 8v12z" />
    <path d="M2 20h20" />
    <path d="M7 10v4" />
    <path d="M12 10v4" />
    <path d="M17 10v4" />
  </svg>
);

const ScaleIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m16 16 3-8-9 12-4-7.5L2 20" />
    <path d="m17 7 3-5-3 5" />
    <path d="M13 10V3" />
  </svg>
);

// ---------------- Component ----------------
export default function AboutUs({ 
  isRTL = true, 
  isAR = true, 
  t = {}, 
  logoGroup = "https://placehold.co/300x100/059669/ffffff?text=HADI+GROUP"
}) {
  const align = isRTL ? "text-right" : "text-left";
  const listPadding = isRTL ? "pr-6" : "pl-6";

  // Refs for animations
  const sectionRef = useRef(null);
  const logoCardRef = useRef(null);
  const statsWrapRef = useRef(null);
  const headingRef = useRef(null);
  const leadRef = useRef(null);
  const commitmentRef = useRef(null);

  // Stats data
  const stats = useMemo(
    () => [
      { 
        value: isAR ? "٤٥+" : "45+", 
        label: t.statsYears || (isAR ? "سنة خبرة" : "Years Experience"), 
        icon: BriefcaseIcon, 
        color: "bg-emerald-500/10 text-emerald-700 border-emerald-200" 
      },
      { 
        value: isAR ? "٧٠٠+" : "700+", 
        label: t.statsEmployees || (isAR ? "موظف" : "Employees"), 
        icon: UserPlusIcon, 
        color: "bg-yellow-500/10 text-yellow-700 border-yellow-200" 
      },
      { 
        value: isAR ? "٥٠,٠٠٠+" : "50,000+", 
        label: t.statsTons || (isAR ? "طن إنتاج سنوي" : "Tons Annual Production"), 
        icon: ScaleIcon, 
        color: "bg-blue-500/10 text-blue-700 border-blue-200" 
      },
      { 
        value: isAR ? "٦" : "6", 
        label: t.statsPlants || (isAR ? "معامل إنتاج" : "Production Plants"), 
        icon: FactoryIcon, 
        color: "bg-rose-500/10 text-rose-700 border-rose-200" 
      }
    ],
    [isAR, t]
  );

  // Single Stat item
  const Stat = ({ value, label, icon: Icon, color, index }: { value: string; label: string; icon: React.ElementType; color: string; index: number }) => (
    <div 
      className={`stat-card flex flex-col items-center gap-2 md:gap-3 p-4 md:p-5 rounded-xl md:rounded-2xl border ${color} shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white animate-scaleIn`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`h-12 w-12 md:h-14 md:w-14 grid place-items-center rounded-lg md:rounded-xl flex-shrink-0 ${color.replace("500/10", "500/20")}`}>
        <Icon className="w-6 h-6 md:w-7 md:h-7" />
      </div>
      <div className="text-center">
        <div className="text-2xl md:text-3xl font-black">{value}</div>
        <div className="mt-1 text-xs text-gray-600 font-semibold leading-tight">{label}</div>
      </div>
    </div>
  );

  // CSS animations are handled via classes

  return (
    <section
      ref={sectionRef}
      id="about-brief"
      className={`relative overflow-hidden ${align} flex items-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30`}
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-16 lg:py-24 w-full">
        {/* Grid: logo/stats + content */}
        <div className="grid items-center gap-8 md:gap-12 lg:gap-16 lg:grid-cols-[minmax(340px,440px)_1fr]">
          
          {/* Column 1: Logo + Stats */}
          <div className={`${isRTL ? "lg:order-2" : "lg:order-1"}`}>
            {/* Logo Card */}
            <div ref={logoCardRef} className="rounded-2xl md:rounded-3xl bg-white p-6 md:p-8 mb-6 md:mb-8 border border-gray-200/60 shadow-2xl flex flex-col items-center backdrop-blur-sm animate-fadeIn">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">
                {isAR ? "مجموعة هادي" : "HADI GROUP"}
              </h3>
              <div className="relative w-full max-w-[280px] md:max-w-[300px] mx-auto mb-4 md:mb-6">
                <div className="aspect-[3/1] w-full grid place-items-center bg-gradient-to-br from-emerald-50 to-white rounded-xl md:rounded-2xl p-3 md:p-4">
                  <img
                    src={logoGroup}
                    alt={isAR ? "شعار مجموعة هادي" : "HADI GROUP Logo"}
                    className="w-full h-auto max-h-20 md:max-h-24 object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/300x100/059669/ffffff?text=HADI+GROUP";
                    }}
                  />
                </div>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-3 md:mb-4" />
              <p className="text-xs md:text-sm font-semibold text-gray-600 text-center">
                {isAR ? "ريادة صناعية منذ عام 1975" : "Industrial leadership since 1975"}
              </p>
            </div>

            {/* Stats Grid - Responsive */}
            <div ref={statsWrapRef} className="grid grid-cols-2 gap-3 md:gap-4">
              {stats.map((s, i) => (
                <Stat key={i} {...s} index={i} />
              ))}
            </div>
          </div>

          {/* Column 2: Content */}
          <div className={`${isRTL ? "lg:order-1" : "lg:order-2"} space-y-6 md:space-y-8`}>
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-emerald-100 text-emerald-700 animate-fadeIn">
              <span className="text-xs font-bold uppercase tracking-widest">
                {isAR ? "نظرة عامة" : "Overview"}
              </span>
            </div>

            {/* Main Heading - Responsive */}
            <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-gray-900 leading-[1.1] animate-fadeInDown">
              {t.aboutTitle || (isAR ? "تاريخ من الريادة والجودة الموثوقة" : "A History of Leadership and Trusted Quality")}
            </h2>

            {/* Lead Paragraph - Responsive */}
            <p ref={leadRef} className={`text-base md:text-xl lg:text-2xl font-light text-gray-700 leading-relaxed ${isRTL ? 'border-r-4 pr-4 md:pr-6' : 'border-l-4 pl-4 md:pl-6'} border-emerald-600 animate-fadeInUp`}>
              {t.aboutP1 || (isAR 
                ? "منذ تأسيسها عام 1975، أصبحت مجموعة هادي رائدة في صناعة البلاستيك والكيماويات، ملتزمة بتقديم منتجات عالية الجودة تلبي احتياجات القطاعات الزراعية والصناعية والتجارية." 
                : "Since its establishment in 1975, HADI Group has become a leader in the plastics and chemicals industry, committed to delivering high-quality products that meet the needs of agricultural, industrial, and commercial sectors.")}
            </p>

            {/* Commitment Card - Responsive */}
            <div ref={commitmentRef} className="rounded-2xl md:rounded-3xl border-2 border-emerald-200 p-6 md:p-8 lg:p-10 shadow-xl bg-gradient-to-br from-white to-emerald-50/50 backdrop-blur-sm animate-fadeIn">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="h-1 w-8 md:w-12 bg-emerald-600 rounded-full" />
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-emerald-900">
                  {isAR ? "التزامنا بالجودة" : "Our Commitment to Quality"}
                </h3>
              </div>
              
              <ul className={`space-y-3 md:space-y-4 ${listPadding}`}>
                <li className="flex items-start gap-3 md:gap-4 text-gray-800">
                  <span className="mt-1 flex-shrink-0 text-xl md:text-2xl text-emerald-600">★</span>
                  <span className="text-base md:text-lg font-medium leading-relaxed">
                    {t.aboutL1 || (isAR 
                      ? "التطوير المستمر لخطوط الإنتاج والتكنولوجيا" 
                      : "Continuous development of production lines and technology")}
                  </span>
                </li>
                <li className="flex items-start gap-3 md:gap-4 text-gray-800">
                  <span className="mt-1 flex-shrink-0 text-xl md:text-2xl text-emerald-600">★</span>
                  <span className="text-base md:text-lg font-medium leading-relaxed">
                    {t.aboutL2 || (isAR 
                      ? "التوسعة الإقليمية لتلبية احتياجات الأسواق المختلفة" 
                      : "Regional expansion to meet diverse market needs")}
                  </span>
                </li>
                <li className="flex items-start gap-3 md:gap-4 text-gray-800">
                  <span className="mt-1 flex-shrink-0 text-xl md:text-2xl text-emerald-600">★</span>
                  <span className="text-base md:text-lg font-medium leading-relaxed">
                    {t.aboutL3 || (isAR 
                      ? "التركيز على الاستدامة البيئية في جميع عملياتنا" 
                      : "Focus on environmental sustainability in all our operations")}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}