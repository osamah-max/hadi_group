import { useEffect, useRef, useMemo } from "react";

/* ================== Icons ================== */

const Factory = (props: any) => (
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
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M17 18h1" />
    <path d="M12 18h1" />
    <path d="M7 18h1" />
  </svg>
);

const Sprout = (props: any) => (
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
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </svg>
);

const Building2 = (props: any) => (
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
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);

const Package = (props: any) => (
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
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const Truck = (props: any) => (
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
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </svg>
);

const Droplets = (props: any) => (
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
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
  </svg>
);

const Warehouse = (props: any) => (
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
    <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
    <path d="M6 18h12" />
    <path d="M6 14h12" />
    <rect width="12" height="12" x="6" y="10" />
  </svg>
);

const ShoppingCart = (props: any) => (
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
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

/* ================== Component ================== */

export default function SectorsWeServe({
  isRTL = true,
  isAR = true,
  t = {},
}: {
  isRTL?: boolean;
  isAR?: boolean;
  t?: any;
}) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);

  // Sectors data with enhanced descriptions
  const sectors = useMemo(() => [
    {
      id: 1,
      icon: <Factory className="w-9 h-9" />,
      title: isAR ? "القطاع الصناعي" : "Industrial Sector",
      desc: isAR 
        ? "نوفر حلولاً متكاملة للمصانع والمنشآت الصناعية بأحدث التقنيات والمعايير العالمية"
        : "We provide integrated solutions for factories and industrial facilities with the latest technologies and international standards",
      iconBgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      glowColor: "shadow-blue-500/30",
      borderColor: "border-blue-200",
      hoverBorderColor: "hover:border-blue-400",
      number: "01",
      featured: false,
    },
    {
      id: 2,
      icon: <Sprout className="w-9 h-9" />,
      title: isAR ? "القطاع الزراعي" : "Agricultural Sector",
      desc: isAR 
        ? "منتجات وحلول مبتكرة لتحسين الإنتاجية الزراعية والمحافظة على البيئة والموارد الطبيعية"
        : "Innovative products and solutions to improve agricultural productivity while preserving the environment and natural resources",
      iconBgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      glowColor: "shadow-emerald-500/30",
      borderColor: "border-emerald-200",
      hoverBorderColor: "hover:border-emerald-400",
      number: "02",
      featured: true, // Featured card
    },
    {
      id: 3,
      icon: <Building2 className="w-9 h-9" />,
      title: isAR ? "قطاع البناء والإنشاءات" : "Construction Sector",
      desc: isAR 
        ? "مواد بناء عالية الجودة ومستدامة لجميع أنواع المشاريع الإنشائية والمعمارية"
        : "High-quality and sustainable building materials for all types of construction and architectural projects",
      iconBgColor: "bg-gradient-to-br from-amber-500 to-amber-600",
      glowColor: "shadow-amber-500/30",
      borderColor: "border-amber-200",
      hoverBorderColor: "hover:border-amber-400",
      number: "03",
      featured: false,
    },
    {
      id: 4,
      icon: <Package className="w-9 h-9" />,
      title: isAR ? "قطاع التعبئة والتغليف" : "Packaging Sector",
      desc: isAR 
        ? "حلول تغليف متطورة وصديقة للبيئة تحافظ على جودة المنتجات وتعزز العلامة التجارية"
        : "Advanced eco-friendly packaging solutions that preserve product quality and enhance brand identity",
      iconBgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      glowColor: "shadow-purple-500/30",
      borderColor: "border-purple-200",
      hoverBorderColor: "hover:border-purple-400",
      number: "04",
      featured: false,
    },
    {
      id: 5,
      icon: <Truck className="w-9 h-9" />,
      title: isAR ? "قطاع النقل والخدمات اللوجستية" : "Logistics & Transport",
      desc: isAR 
        ? "خدمات لوجستية شاملة وحلول نقل متكاملة لضمان وصول المنتجات بكفاءة وأمان"
        : "Comprehensive logistics services and integrated transport solutions ensuring efficient and safe product delivery",
      iconBgColor: "bg-gradient-to-br from-rose-500 to-rose-600",
      glowColor: "shadow-rose-500/30",
      borderColor: "border-rose-200",
      hoverBorderColor: "hover:border-rose-400",
      number: "05",
      featured: false,
    },
    {
      id: 6,
      icon: <Droplets className="w-9 h-9" />,
      title: isAR ? "قطاع المياه والري" : "Water & Irrigation",
      desc: isAR 
        ? "أنظمة ري حديثة ومعدات إدارة المياه لتحقيق الاستخدام الأمثل للموارد المائية"
        : "Modern irrigation systems and water management equipment for optimal utilization of water resources",
      iconBgColor: "bg-gradient-to-br from-cyan-500 to-cyan-600",
      glowColor: "shadow-cyan-500/30",
      borderColor: "border-cyan-200",
      hoverBorderColor: "hover:border-cyan-400",
      number: "06",
      featured: false,
    },
    {
      id: 7,
      icon: <Warehouse className="w-9 h-9" />,
      title: isAR ? "قطاع التخزين" : "Storage Sector",
      desc: isAR 
        ? "حلول تخزين متقدمة ومرافق آمنة للحفاظ على المنتجات في ظروف مثالية"
        : "Advanced storage solutions and secure facilities to maintain products in optimal conditions",
      iconBgColor: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      glowColor: "shadow-indigo-500/30",
      borderColor: "border-indigo-200",
      hoverBorderColor: "hover:border-indigo-400",
      number: "07",
      featured: false,
    },
    {
      id: 8,
      icon: <ShoppingCart className="w-9 h-9" />,
      title: isAR ? "قطاع التجزئة والتوزيع" : "Retail & Distribution",
      desc: isAR 
        ? "شبكة توزيع واسعة وخدمات تجزئة متطورة لضمان توفر المنتجات في جميع الأسواق"
        : "Extensive distribution network and advanced retail services ensuring product availability in all markets",
      iconBgColor: "bg-gradient-to-br from-teal-500 to-teal-600",
      glowColor: "shadow-teal-500/30",
      borderColor: "border-teal-200",
      hoverBorderColor: "hover:border-teal-400",
      number: "08",
      featured: false,
    },
  ], [isAR]);

  // CSS Animations (بدلاً من GSAP)

  const align = isRTL ? "text-right" : "text-left";

  return (
    <section
      ref={sectionRef}
      id="sectors"
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-24 md:py-32"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          {/* Label */}
          <div ref={headerRef} className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 text-emerald-700 animate-fadeInDown">
            <span className="text-xs font-bold uppercase tracking-widest">
              {isAR ? "القطاعات التي نخدمها" : "Sectors We Serve"}
            </span>
          </div>

          {/* Main Title */}
          <h2 ref={headerRef} className="mx-auto mb-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 md:text-5xl lg:text-6xl animate-fadeInDown">
            {t.sectorsTitle || (isAR ? "خدماتنا تشمل جميع القطاعات" : "Our Services Cover All Sectors")}
          </h2>

          {/* Subtitle */}
          <p ref={subtitleRef} className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {t.sectorsSub || (isAR 
              ? "نقدم حلولاً متخصصة ومبتكرة تلبي احتياجات مختلف القطاعات الصناعية والتجارية والزراعية"
              : "We provide specialized and innovative solutions meeting the needs of various industrial, commercial and agricultural sectors")}
          </p>

          {/* Decorative Line */}
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
        </div>

        {/* Sectors Grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector, index) => (
              <div
                key={sector.id}
                className={`sector-card group relative flex flex-col rounded-3xl border-2 p-6 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${align} animate-fadeInUp ${
                  sector.featured 
                    ? 'bg-gradient-to-br from-emerald-600 to-emerald-500 text-white border-emerald-400 shadow-emerald-600/30 hover:shadow-emerald-600/50' 
                    : `bg-white ${sector.borderColor} ${sector.hoverBorderColor}`
                }`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                {/* Number Badge */}
                <div className={`absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full text-xl font-black transition-colors duration-300 ${
                  sector.featured 
                    ? 'bg-white/20 text-white/50 group-hover:bg-white/30 group-hover:text-white/70' 
                    : 'bg-gray-50 text-gray-300 group-hover:bg-emerald-50 group-hover:text-emerald-400'
                }`}>
                  {sector.number}
                </div>

                {/* Icon Container */}
                <div className={`relative mb-5 flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                  sector.featured 
                    ? 'bg-white/20 text-white shadow-lg shadow-white/20' 
                    : `${sector.iconBgColor} text-white shadow-xl ${sector.glowColor}`
                }`}>
                  {sector.icon}
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50 ${
                    sector.featured ? 'bg-white' : sector.iconBgColor
                  }`} />
                </div>

                {/* Title */}
                <h3 className={`mb-3 text-xl font-bold transition-colors duration-300 ${
                  sector.featured 
                    ? 'text-white' 
                    : 'text-gray-900 group-hover:text-emerald-600'
                }`}>
                  {sector.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${
                  sector.featured 
                    ? 'text-white/90' 
                    : 'text-gray-600'
                }`}>
                  {sector.desc}
                </p>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 h-1 w-0 rounded-full transition-all duration-500 group-hover:w-full ${
                  sector.featured 
                    ? 'bg-white' 
                    : 'bg-gradient-to-r from-emerald-600 to-emerald-400'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-4xl rounded-3xl border-2 border-emerald-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
            <p className="text-lg leading-relaxed text-gray-700">
              {isAR 
                ? "نحن ملتزمون بتقديم أفضل الحلول والخدمات لجميع القطاعات، مع التركيز على الجودة والابتكار والاستدامة. تواصل معنا اليوم لمعرفة كيف يمكننا مساعدتك في تحقيق أهدافك."
                : "We are committed to providing the best solutions and services for all sectors, focusing on quality, innovation and sustainability. Contact us today to learn how we can help you achieve your goals."}
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/40"
            >
              <span>{isAR ? "تحدث إلى خبرائنا" : "Talk to Our Experts"}</span>
              <svg className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}