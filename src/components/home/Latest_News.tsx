import { useRef, useMemo, useEffect } from "react";

/* ================== Icons ================== */

const ArrowRight = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const ArrowLeft = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m19 12-7-7-7 7" />
  </svg>
);

const CalendarIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

/* ================== Component ================== */

export default function LatestNews({ 
  isRTL = true, 
  isAR = true, 
  t = {} 
}: {
  isRTL?: boolean;
  isAR?: boolean;
  t?: any;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);

  // News items
  const items = useMemo(() => [
    {
      id: 1,
      title: isAR ? "إطلاق خط إنتاج جديد" : "New Production Line Launched",
      excerpt: isAR 
        ? "أضفنا خط إنتاج متطور لزيادة القدرة الإنتاجية وتقليل الهدر، مما يعزز التزامنا بالجودة والاستدامة"
        : "Advanced production line to boost capacity and reduce waste, enhancing our commitment to quality and sustainability",
      link: "/news/launch",
      tag: isAR ? "إنتاج" : "Production",
      date: "2025-01-02",
      color: "emerald"
    },
    {
      id: 2,
      title: isAR ? "توسعة مرافق المصنع" : "Factory Expansion & Upgrade",
      excerpt: isAR 
        ? "توسعة كبيرة لمرافقنا لدعم الطلب المتزايد وتقديم خدمات أسرع وأكثر كفاءة لعملائنا الكرام"
        : "Major facility expansion to meet rising demand and deliver faster, more efficient services to our valued clients",
      link: "/news/expansion",
      tag: isAR ? "توسعة" : "Expansion",
      date: "2024-12-21",
      color: "blue"
    },
    {
      id: 3,
      title: isAR ? "شراكة استراتيجية دولية" : "Strategic International Partnership",
      excerpt: isAR 
        ? "عقد شراكة مع مزودين دوليين رائدين لتوسيع شبكة التوزيع ووصول منتجاتنا إلى الأسواق العالمية"
        : "Partnership with leading global vendors to extend distribution network and reach international markets",
      link: "/news/partnership",
      tag: isAR ? "شراكة" : "Partnership",
      date: "2024-11-10",
      color: "purple"
    },
    {
      id: 4,
      title: isAR ? "شهادات الجودة الجديدة" : "New Quality Certifications",
      excerpt: isAR 
        ? "حصلنا على شهادات جودة عالمية جديدة تؤكد التزامنا بأعلى المعايير الصناعية والبيئية"
        : "Achieved new global quality certifications affirming our commitment to highest industrial and environmental standards",
      link: "/news/certifications",
      tag: isAR ? "جودة" : "Quality",
      date: "2024-10-05",
      color: "yellow"
    },
    {
      id: 5,
      title: isAR ? "مبادرة المسؤولية الاجتماعية" : "Corporate Social Responsibility",
      excerpt: isAR 
        ? "إطلاق مبادرة شاملة لدعم المجتمع المحلي والبيئة في إطار برنامج المسؤولية الاجتماعية للشركات"
        : "Launching comprehensive initiative to support local community and environment as part of our CSR program",
      link: "/news/csr",
      tag: isAR ? "مجتمع" : "Community",
      date: "2024-09-15",
      color: "rose"
    },
  ], [isAR]);

  // Color mappings
  const colorMap: Record<string, { bg: string; text: string; border: string; hover: string }> = {
    emerald: { 
      bg: "bg-emerald-50", 
      text: "text-emerald-700", 
      border: "border-emerald-200",
      hover: "hover:border-emerald-400"
    },
    blue: { 
      bg: "bg-blue-50", 
      text: "text-blue-700", 
      border: "border-blue-200",
      hover: "hover:border-blue-400"
    },
    purple: { 
      bg: "bg-purple-50", 
      text: "text-purple-700", 
      border: "border-purple-200",
      hover: "hover:border-purple-400"
    },
    yellow: { 
      bg: "bg-yellow-50", 
      text: "text-yellow-700", 
      border: "border-yellow-200",
      hover: "hover:border-yellow-400"
    },
    rose: { 
      bg: "bg-rose-50", 
      text: "text-rose-700", 
      border: "border-rose-200",
      hover: "hover:border-rose-400"
    },
  };

  // Scroll function
  const scroll = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = dir === "next" ? 380 : -380;
    el.scrollBy({ left: isRTL ? -delta : delta, behavior: "smooth" });
  };

  // CSS Animations (بدلاً من GSAP)

  const align = isRTL ? "text-right" : "text-left";

  return (
    <section
      ref={sectionRef}
      id="news"
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 py-24"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-0 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className={`mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${align}`}>
          {/* Title Block */}
          <div ref={headerRef} className="animate-fadeInDown">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-emerald-700">
              <span className="text-xs font-bold uppercase tracking-widest">
                {isAR ? "مدونتنا" : "Our Blog"}
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
              {t.blogTitle || (isAR ? "آخر الأخبار والتحديثات" : "Latest News & Updates")}
            </h2>
            <div className={`mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 ${isRTL ? 'mr-0' : ''}`} />
          </div>

          {/* Navigation Buttons */}
          <div ref={navRef} className="flex gap-3 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => scroll("prev")}
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-gray-200 bg-white text-gray-700 shadow-lg transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white hover:-translate-y-1 hover:shadow-xl"
              aria-label={isAR ? "السابق" : "Previous"}
            >
              {isRTL ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
            </button>
            <button
              onClick={() => scroll("next")}
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-gray-200 bg-white text-gray-700 shadow-lg transition-all duration-300 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white hover:-translate-y-1 hover:shadow-xl"
              aria-label={isAR ? "التالي" : "Next"}
            >
              {isRTL ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div className="relative -mx-4 px-4">
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollBehavior: "smooth" }}
          >
            {items.map((item, index) => {
              const colors = colorMap[item.color] || colorMap.emerald;
              return (
                <article
                  key={item.id}
                  className={`news-card group relative flex min-w-[320px] max-w-[360px] flex-col snap-start overflow-hidden rounded-3xl border-2 ${colors.border} bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${colors.hover} animate-fadeInUp`}
                  style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                >
                  {/* Decorative gradient bar */}
                  <div className={`h-2 ${colors.bg}`} />

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Tag & Date */}
                    <div className={`mb-4 flex flex-wrap items-center gap-3 ${isRTL ? 'justify-between flex-row-reverse' : 'justify-between'}`}>
                      <span className={`inline-flex items-center gap-1.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border} px-3 py-1 text-xs font-bold`}>
                        {item.tag}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
                        <CalendarIcon className="h-4 w-4" />
                        {item.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`mb-3 text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:${colors.text} ${align}`}>
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    <p className={`mb-6 flex-1 text-base leading-relaxed text-gray-600 ${align}`}>
                      {item.excerpt}
                    </p>

                    {/* Read More Link */}
                    <button
                      onClick={() => window.location.href = item.link}
                      className={`inline-flex items-center gap-2 font-bold ${colors.text} transition-all duration-300 group-hover:gap-3 ${isRTL ? 'flex-row-reverse self-end' : 'self-start'}`}
                    >
                      <span>{t.blogReadMore || (isAR ? "اكتشف المزيد" : "Read More")}</span>
                      <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => window.location.href = '/news'}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/40"
          >
            <span>{isAR ? "عرض جميع الأخبار" : "View All News"}</span>
            <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}