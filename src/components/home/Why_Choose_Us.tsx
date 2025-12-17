import { useMemo, useEffect, useRef } from "react";

/* ================== Icons ================== */

const CheckCircle = (props: any) => (
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

const Heart = (props: any) => (
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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const Monitor = (props: any) => (
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
    <rect width="20" height="15" x="2" y="3" rx="2" />
    <path d="M12 19v4" />
    <path d="M8 23h8" />
  </svg>
);

const Shield = (props: any) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Award = (props: any) => (
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
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const Users = (props: any) => (
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
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/* ================== Component ================== */

export default function WhyChooseUs({
  isRTL = true,
  isAR = true,
  t = {},
  logoGroup = "https://placehold.co/200x80/059669/ffffff?text=HADI"
}: {
  isRTL?: boolean;
  isAR?: boolean;
  t?: any;
  logoGroup?: string;
}) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);

  // Features data
  const items = useMemo(() => [
    {
      id: 1,
      icon: <Heart className="w-8 h-8" />,
      title: isAR ? "الثقة المتبادلة" : "Trust & Reliability",
      desc: isAR 
        ? "بأكثر من 50 عاماً من الخبرة، نقدم حلولاً موثوقة تلبي توقعاتكم وتتجاوزها في كل مرة"
        : "With over 50 years of experience, we deliver reliable solutions that meet and exceed your expectations every time",
      iconBgColor: "bg-gradient-to-br from-rose-500 to-rose-600",
      glowColor: "shadow-rose-500/30",
      number: "01"
    },
    {
      id: 2,
      icon: <Monitor className="w-8 h-8" />,
      title: isAR ? "حلول مصممة خصيصاً" : "Tailored Solutions",
      desc: isAR 
        ? "نؤمن بقوة التخصيص. كل منتج يتم تصميمه ليعكس متطلباتكم الفريدة ويحقق أهدافكم"
        : "We believe in customization. Every product is designed to reflect your unique requirements and achieve your goals",
      iconBgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      glowColor: "shadow-blue-500/30",
      number: "02"
    },
    {
      id: 3,
      icon: <CheckCircle className="w-8 h-8" />,
      title: isAR ? "الجودة والسلامة" : "Quality & Safety",
      desc: isAR 
        ? "سلامتكم ورفاهيتكم أولويتنا القصوى. نلتزم بأعلى معايير الجودة المعتمدة عالمياً"
        : "Your safety and well-being are our top priority. We adhere to the highest globally recognized quality standards",
      iconBgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      glowColor: "shadow-emerald-500/30",
      number: "03"
    },
    {
      id: 4,
      icon: <Shield className="w-8 h-8" />,
      title: isAR ? "الاستدامة البيئية" : "Environmental Sustainability",
      desc: isAR 
        ? "نلتزم بالممارسات المستدامة والصديقة للبيئة في جميع عملياتنا الإنتاجية والتشغيلية"
        : "We are committed to sustainable and eco-friendly practices in all our production and operational processes",
      iconBgColor: "bg-gradient-to-br from-teal-500 to-teal-600",
      glowColor: "shadow-teal-500/30",
      number: "04"
    },
    {
      id: 5,
      icon: <Award className="w-8 h-8" />,
      title: isAR ? "التميز والابتكار" : "Excellence & Innovation",
      desc: isAR 
        ? "نسعى دائماً للتطوير والابتكار من خلال أحدث التقنيات والأساليب الإنتاجية المتقدمة"
        : "We constantly strive for development and innovation through the latest technologies and advanced production methods",
      iconBgColor: "bg-gradient-to-br from-amber-500 to-amber-600",
      glowColor: "shadow-amber-500/30",
      number: "05"
    },
    {
      id: 6,
      icon: <Users className="w-8 h-8" />,
      title: isAR ? "دعم العملاء المتميز" : "Exceptional Customer Support",
      desc: isAR 
        ? "فريق متخصص متاح دائماً لخدمتكم وتقديم الدعم الفني والاستشارات اللازمة على مدار الساعة"
        : "Dedicated team always available to serve you and provide technical support and necessary consultations around the clock",
      iconBgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      glowColor: "shadow-purple-500/30",
      number: "06"
    },
  ], [isAR]);

  // CSS Animations (بدلاً من GSAP)

  const align = isRTL ? "text-right" : "text-left";

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white py-24 md:py-32"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          {/* Label */}
          <div ref={headerRef} className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 text-emerald-700 animate-fadeInDown">
            <span className="text-xs font-bold uppercase tracking-widest">
              {isAR ? "لماذا تختارنا" : "Why Choose Us"}
            </span>
          </div>

          {/* Main Title */}
          <h2 ref={headerRef} className="mx-auto mb-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 md:text-5xl lg:text-6xl animate-fadeInDown">
            {t.whyTitle || (isAR ? "نقاط قوتنا التي تميزنا" : "Our Distinguishing Strengths")}
          </h2>

          {/* Subtitle */}
          <p ref={subtitleRef} className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {t.whySub || (isAR 
              ? "نحن نجمع بين الخبرة الطويلة والحلول المبتكرة لتقديم قيمة حقيقية لعملائنا"
              : "We combine long experience with innovative solutions to deliver real value to our customers")}
          </p>

          {/* Decorative Line */}
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
        </div>

        {/* Features Grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`why-card group relative flex flex-col items-center rounded-3xl border-2 border-gray-100 bg-white p-8 text-center shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl ${align} animate-fadeInUp`}
                style={{ animationDelay: `${0.4 + index * 0.15}s` }}
              >
                {/* Number Badge */}
                <div className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-2xl font-black text-gray-300 transition-colors duration-300 group-hover:bg-emerald-50 group-hover:text-emerald-400">
                  {item.number}
                </div>

                {/* Icon Container */}
                <div className={`relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl ${item.iconBgColor} text-white shadow-2xl ${item.glowColor} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  {item.icon}
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl ${item.iconBgColor} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50`} />
                </div>

                {/* Title */}
                <h3 className="mb-4 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-emerald-600">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-base leading-relaxed text-gray-600">
                  {item.desc}
                </p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA (Optional) */}
        <div className="mt-16 text-center">
          <button
            onClick={() => window.location.href = '/about'}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/40"
          >
            <span>{isAR ? "تعرف على المزيد عنا" : "Learn More About Us"}</span>
            <svg className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}