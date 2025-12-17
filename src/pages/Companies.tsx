// src/pages/Companies.tsx
import React, { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Factory, ArrowRight, Building2, Package, Layers, Droplet, Coffee, Tractor } from "lucide-react";

// Logos
import logoAlzab from "../assets/img/logo/alzab.png";
import logoGayath from "../assets/img/logo/gayath.png";
import logoHadiCap from "../assets/img/logo/hadi_cap.png";
import logoHima from "../assets/img/logo/hima1.png";
import logoSina from "../assets/img/logo/sina.png";
import logoHamdi from "../assets/img/logo/hamdi_factory.png";

// Helper function
function useHtmlLocale() {
  const dirAttr = (document.documentElement.getAttribute("dir") || "rtl").toLowerCase() as "rtl" | "ltr";
  const langAttr = (document.documentElement.lang || (dirAttr === "rtl" ? "ar" : "en")).toLowerCase();
  return { dir: dirAttr, lang: langAttr, isRTL: dirAttr === "rtl", isAR: langAttr.startsWith("ar") };
}

interface Company {
  name: string;
  nameEn: string;
  to: string;
  logo: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  description: string;
  descriptionEn: string;
  tag: string;
  tagEn: string;
  established?: string;
}

export default function Companies() {
  const { isRTL, isAR } = useHtmlLocale();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const companies: Company[] = useMemo(
    () => [
      {
        name: "معمل غياث الدين مادي",
        nameEn: "Ghiyath Al-Din Madi Factory",
        to: "/companies/gayath",
        logo: logoGayath,
        icon: Factory,
        color: "from-red-500 to-red-700",
        gradient: "bg-gradient-to-br from-red-500 to-red-700",
        description: "المعمل المؤسس للمجموعة، متخصص في الصناعات البلاستيكية الأولية",
        descriptionEn: "The founding factory of the group, specialized in primary plastic industries",
        tag: "صناعي",
        tagEn: "Industrial",
        established: "1975",
      },
      {
        name: "معمل هادي كاب",
        nameEn: "Hadi Cap Factory",
        to: "/companies/hadi_cap",
        logo: logoHadiCap,
        icon: Package,
        color: "from-blue-500 to-blue-700",
        gradient: "bg-gradient-to-br from-blue-500 to-blue-700",
        description: "متخصص في إنتاج أغطية القناني والعبوات بأحدث تقنيات القولبة",
        descriptionEn: "Specialized in producing bottle caps and container lids with latest molding technologies",
        tag: "تغليف",
        tagEn: "Packaging",
        established: "1998",
      },
      {
        name: "هيما بلاستيك",
        nameEn: "Hima Plastic",
        to: "/companies/hima",
        logo: logoHima,
        icon: Layers,
        color: "from-purple-500 to-purple-700",
        gradient: "bg-gradient-to-br from-purple-500 to-purple-700",
        description: "وحدة متخصصة في تصنيع أنابيب البولي إيثيلين (PE) عالية الجودة",
        descriptionEn: "Unit specialized in manufacturing high-quality Polyethylene (PE) pipes",
        tag: "صناعي",
        tagEn: "Industrial",
      },
      {
        name: "معمل الزاب",
        nameEn: "Al-Zab Factory",
        to: "/companies/alzab",
        logo: logoAlzab,
        icon: Droplet,
        color: "from-cyan-500 to-cyan-700",
        gradient: "bg-gradient-to-br from-cyan-500 to-cyan-700",
        description: "يركز على حلول التغليف الزراعي المتقدمة والري",
        descriptionEn: "Focuses on advanced agricultural packaging and irrigation solutions",
        tag: "توزيع",
        tagEn: "Distribution",
        established: "2018",
      },
      {
        name: "معمل حميدي نظام الدين",
        nameEn: "Hamidi Nizam Al-Din Factory",
        to: "/companies/hamdi",
        logo: logoHamdi,
        icon: Coffee,
        color: "from-orange-500 to-orange-700",
        gradient: "bg-gradient-to-br from-orange-500 to-orange-700",
        description: "متخصص في إنتاج أغطية وعبوات المواد الكبريتية والمشروبات",
        descriptionEn: "Specialized in producing caps and containers for sulfuric materials and beverages",
        tag: "منزلي",
        tagEn: "Home",
        established: "2017",
      },
      {
        name: "معمل سيناء",
        nameEn: "Sinai Factory",
        to: "/companies/sina",
        logo: logoSina,
        icon: Tractor,
        color: "from-green-500 to-green-700",
        gradient: "bg-gradient-to-br from-green-500 to-green-700",
        description: "متخصص في دعم القطاع الزراعي بإنتاج القصبات والبذور",
        descriptionEn: "Specialized in supporting agricultural sector by producing straws and seeds",
        tag: "زراعي",
        tagEn: "Agriculture",
        established: "2018",
      },
    ],
    []
  );

  const t = useMemo(
    () =>
      isAR
        ? {
            title: "شركات مجموعة هادي",
            subtitle: "شبكة من المصانع المتطورة تخدم مختلف القطاعات",
            tagLabel: "التخصص",
            viewDetails: "عرض التفاصيل",
            established: "تأسس عام",
            companiesCount: "6 شركات تابعة",
            production: "+50K طن إنتاج سنوي",
          }
        : {
            title: "HADI Group Companies",
            subtitle: "A network of advanced factories serving various sectors",
            tagLabel: "Specialty",
            viewDetails: "View Details",
            established: "Established",
            companiesCount: "6 Subsidiaries",
            production: "50K+ Tons Annual Production",
          },
    [isAR]
  );

  return (
    <div
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white py-20 md:py-28">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2 mb-6">
              <Factory className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wider">{t.companiesCount}</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              {t.title}
            </h1>

            <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              {t.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Building2 className="h-4 w-4" />
                <span>{t.companiesCount}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Package className="h-4 w-4" />
                <span>{t.production}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {companies.map((company, index) => {
              const Icon = company.icon;
              const displayName = isAR ? company.name : company.nameEn;
              const displayDesc = isAR ? company.description : company.descriptionEn;
              const displayTag = isAR ? company.tag : company.tagEn;

              return (
                <Link
                  key={company.to}
                  to={company.to}
                  className="group relative overflow-hidden rounded-2xl bg-white border-2 border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient Overlay on Hover */}
                  <div
                    className={`absolute inset-0 ${company.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Card Content */}
                  <div className="relative p-6 md:p-8">
                    {/* Icon & Logo */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl ${company.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {company.logo ? (
                          <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center">
                            <img
                              src={company.logo}
                              alt={displayName}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <Icon className="h-8 w-8" />
                        )}
                      </div>

                      {/* Tag */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white ${company.gradient} shadow-md`}
                      >
                        {displayTag}
                      </span>
                    </div>

                    {/* Company Name */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                      {displayName}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                      {displayDesc}
                    </p>

                    {/* Established Year */}
                    {company.established && (
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>
                          {t.established} {company.established}
                        </span>
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors">
                      <span className="text-sm md:text-base">{t.viewDetails}</span>
                      <ArrowRight
                        className={`h-4 w-4 transition-transform duration-300 ${isRTL ? "rotate-180" : ""} group-hover:translate-x-1`}
                      />
                    </div>

                    {/* Decorative Element */}
                    <div
                      className={`absolute bottom-0 ${isRTL ? "right-0" : "left-0"} w-24 h-24 ${company.gradient} opacity-5 rounded-tl-full ${isRTL ? "rounded-tl-none rounded-tr-full" : ""}`}
                    ></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center p-6 bg-white rounded-2xl shadow-md">
                <div className="text-4xl md:text-5xl font-extrabold text-emerald-600 mb-2">6</div>
                <div className="text-gray-700 font-semibold">{t.companiesCount}</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-md">
                <div className="text-4xl md:text-5xl font-extrabold text-emerald-600 mb-2">50+</div>
                <div className="text-gray-700 font-semibold">{isAR ? "عام من الخبرة" : "Years of Experience"}</div>
              </div>
              <div className="text-center p-6 bg-white rounded-2xl shadow-md">
                <div className="text-4xl md:text-5xl font-extrabold text-emerald-600 mb-2">50K+</div>
                <div className="text-gray-700 font-semibold">{t.production}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
