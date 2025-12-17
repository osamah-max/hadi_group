import React, { useState, useMemo, useCallback, memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Factory,
  Gauge,
  Wrench,
  ShieldCheck,
  Recycle,
  Truck,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  Building2,
  Package,
  Droplet,
  Leaf,
  FlameKindling,
  FileDown,
  Users,
  Send,
  ArrowRight,
  Award,
  Zap,
  Tractor,
} from "lucide-react";
import useDir from "../../hooks/useDir";
import logoSina from "../../assets/img/logo/sina.png";
import factoryHero from "../../assets/img/backgrounds/sina_hero.jpg";

// Product images
import kamish1 from "../../assets/img/products/product/sina/kamish1@3x.png";
import kamish2 from "../../assets/img/products/product/sina/kamish2@3x@3x.png";
import kamish3 from "../../assets/img/products/product/sina/kamish3@3x@3x@3x.png";
import kamish4 from "../../assets/img/products/product/sina/kamish4@3xx@3x.png";
import kamish5 from "../../assets/img/products/product/sina/kamish5@3xx@3x.png";
import kamish6 from "../../assets/img/products/product/sina/kamish6@3x@3x.png";
import kamish7 from "../../assets/img/products/product/sina/kamish7@3x@3x.png";
import kamish8 from "../../assets/img/products/product/sina/kamish8@3x.png";
import kamish9 from "../../assets/img/products/product/sina/kamish9@3x.png";
import kamish10 from "../../assets/img/products/product/sina/kamish10@3x.png";
import kamish11 from "../../assets/img/products/product/sina/kamish11@3x.png";

// البيانات الثابتة
const HQ = {
  lat: 33.312,
  lng: 44.445,
  address: {
    ar: "العراق - كركوك - دارمان",
    en: "Iraq - Kirkuk - Daraman"
  },
  phones: ["+964 770 000 6661"],
  email: "sinai@hadigroup.iq",
};

const mapSrc = (lat: number, lng: number) =>
  `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`;

// الترجمات
const translations = {
  ar: {
    factoryName: "مصنع سيناء",
    tagline: "استدامة • جودة • ابتكار",
    heroDesc: "حلول متكاملة للقطاع الزراعي: أغطية، أفلام، وملحقات ري—جودة ثابتة وأداء موثوق.",
    requestQuote: "اطلب عرض سعر",
    downloadCatalog: "تحميل الكتالوج",
    aboutUs: "من نحن",
    aboutFactory: "نبذة عن المصنع",
    aboutText: "متخصص في دعم القطاع الزراعي بإنتاج القصبات والبذور للبيوت الزجاجية والمزارع الحديثة. تأسس عام 2018 ويساهم في إنتاج شهري يتجاوز 241 مليون وحدة من المنتجات الزراعية عالية الجودة.",
    manufacturingCapabilities: "القدرات التصنيعية",
    ourProducts: "منتجاتنا",
    productsDesc: "تشكيلة واسعة من المنتجات الزراعية مع إمكانية التخصيص الكامل",
    showing: "عرض",
    of: "من",
    product: "منتج",
    whyUs: "لماذا نحن؟",
    servedSectors: "القطاعات المخدومة",
    sustainabilityTitle: "الاستدامة",
    safety: "والسلامة",
    contactUs: "تواصل معنا",
    address: "العنوان",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    sustainablePartnership: "شراكة مستدامة",
    partnershipDesc: "نسعى لتقديم شراكة توريد طويلة الأمد قائمة على الالتزام ودقة التنفيذ",
    startProject: "ابدأ مشروعك معنا",
    needSample: "هل تحتاج عينة تجريبية؟",
    sampleDesc: "فريقنا يدعم النمذجة السريعة وتقارير الجودة التفصيلية لقرار شراء واثق",
    contactForSample: "تواصل لطلب عينة تجريبية",
    kpis: [
      { value: "241M+", label: "وحدة شهريًا" },
      { value: "95%", label: "التزام التوريد" },
      { value: "10", label: "أيام تنفيذ" },
      { value: "ISO", label: "معايير الجودة" },
    ],
    capabilities: [
      "إنتاج أفلام زراعية متعددة الطبقات",
      "أكياس تعبئة للأسمدة والحبوب بمقاسات مخصصة",
      "ملحقات ري بلاستيكية عالية التحمل",
      "قصبات زراعية للبيوت الزجاجية والمزارع",
      "تخصيص كامل حسب احتياجات المشروع",
      "ضمان الجودة وفق المعايير العالمية",
    ],
    advantages: [
      { title: "اختبارات UV", desc: "تطبيق اختبارات UV ومتانة الشد على جميع المنتجات" },
      { title: "تتبع دفعات الإنتاج", desc: "تتبع كامل لدفعات الإنتاج مع سجلات مفصلة" },
      { title: "دعم فني", desc: "دعم فني متخصص للمزارع والموزعين" },
      { title: "موثوقية التوريد", desc: "تخطيط إنتاج مرن مع مخزون أمان يضمن الاستمرارية" },
      { title: "جودة منضبطة", desc: "مراقبة جودة صارمة مع سجلات تتبع كاملة" },
      { title: "استدامة", desc: "مواد قابلة لإعادة التدوير وبرامج تقليل الفاقد" },
    ],
    industries: [
      { title: "الزراعة", desc: "حلول متكاملة للقطاع الزراعي والبيوت الزجاجية" },
      { title: "الري", desc: "ملحقات ري بلاستيكية عالية الجودة والتحمل" },
      { title: "التعبئة", desc: "أكياس تعبئة للأسمدة والحبوب بمقاسات مخصصة" },
    ],
    sustainability: [
      { title: "خامات قابلة للتدوير", desc: "اختيارات مواد متوافقة مع سلاسل التدوير" },
      { title: "تقليل الهدر", desc: "تحسين مستمر للعمليات لتقليل المخلفات" },
      { title: "سلامة وتشغيل", desc: "معايير سلامة عالية وأنظمة إطفاء متقدمة" },
    ],
    products: [
      {
        title: "أفلام زراعية متعددة الطبقات",
        img: kamish1,
        desc: "أفلام متعددة الطبقات لتغطية التربة والأنفاق الزراعية",
      },
      {
        title: "أكياس تعبئة للأسمدة",
        img: kamish2,
        desc: "أكياس تعبئة للأسمدة والحبوب بمقاسات مخصصة",
      },
      {
        title: "ملحقات ري بلاستيكية",
        img: kamish3,
        desc: "ملحقات ري بلاستيكية عالية التحمل للمزارع",
      },
      {
        title: "قصبات زراعية",
        img: kamish4,
        desc: "قصبات زراعية للبيوت الزجاجية والمزارع الحديثة",
      },
      {
        title: "أغطية زراعية",
        img: kamish5,
        desc: "أغطية زراعية عالية الجودة للبيوت الزجاجية",
      },
      {
        title: "أنظمة ري متكاملة",
        img: kamish6,
        desc: "أنظمة ري متكاملة للمزارع والبيوت الزجاجية",
      },
      {
        title: "مستلزمات زراعية",
        img: kamish7,
        desc: "مستلزمات زراعية متنوعة عالية الجودة",
      },
      {
        title: "أدوات زراعية",
        img: kamish8,
        desc: "أدوات زراعية بلاستيكية متينة وموثوقة",
      },
      {
        title: "منتجات زراعية متخصصة",
        img: kamish9,
        desc: "منتجات زراعية متخصصة للمزارع الحديثة",
      },
      {
        title: "حلول زراعية شاملة",
        img: kamish10,
        desc: "حلول زراعية شاملة للقطاع الزراعي",
      },
      {
        title: "منتجات زراعية مبتكرة",
        img: kamish11,
        desc: "منتجات زراعية مبتكرة عالية الجودة",
      },
    ],
  },
  en: {
    factoryName: "Sina Factory",
    tagline: "Sustainability • Quality • Innovation",
    heroDesc: "Complete solutions for the agricultural sector: covers, films, and irrigation accessories—consistent quality and reliable performance.",
    requestQuote: "Request Quote",
    downloadCatalog: "Download Catalog",
    aboutUs: "About Us",
    aboutFactory: "About the Factory",
    aboutText: "Specialized in supporting the agricultural sector by producing straws and seeds for greenhouses and modern farms. Established in 2018, it contributes to monthly production exceeding 241 million units of high-quality agricultural products.",
    manufacturingCapabilities: "Manufacturing Capabilities",
    ourProducts: "Our Products",
    productsDesc: "Wide range of agricultural products with full customization capabilities",
    showing: "Showing",
    of: "of",
    product: "products",
    whyUs: "Why Us?",
    servedSectors: "Served Sectors",
    sustainabilityTitle: "Sustainability",
    safety: "& Safety",
    contactUs: "Contact Us",
    address: "Address",
    phone: "Phone",
    email: "Email",
    sustainablePartnership: "Sustainable Partnership",
    partnershipDesc: "We strive to provide long-term supply partnership based on commitment and execution accuracy",
    startProject: "Start Your Project With Us",
    needSample: "Need a Trial Sample?",
    sampleDesc: "Our team supports rapid prototyping and detailed quality reports for confident purchasing decisions",
    contactForSample: "Contact for Trial Sample",
    kpis: [
      { value: "241M+", label: "Units Monthly" },
      { value: "95%", label: "Supply Commitment" },
      { value: "10", label: "Days Execution" },
      { value: "ISO", label: "Quality Standards" },
    ],
    capabilities: [
      "Production of multi-layer agricultural films",
      "Packaging bags for fertilizers and grains with custom sizes",
      "High-durability plastic irrigation accessories",
      "Agricultural straws for greenhouses and farms",
      "Full customization according to project needs",
      "Quality assurance according to international standards",
    ],
    advantages: [
      { title: "UV Testing", desc: "Application of UV tests and tensile strength on all products" },
      { title: "Production Batch Tracking", desc: "Complete tracking of production batches with detailed records" },
      { title: "Technical Support", desc: "Specialized technical support for farms and distributors" },
      { title: "Supply Reliability", desc: "Flexible production planning with safety stock ensures continuity" },
      { title: "Controlled Quality", desc: "Strict quality control with complete tracking records" },
      { title: "Sustainability", desc: "Recyclable materials and waste reduction programs" },
    ],
    industries: [
      { title: "Agriculture", desc: "Complete solutions for agricultural sector and greenhouses" },
      { title: "Irrigation", desc: "High-quality and durable plastic irrigation accessories" },
      { title: "Packaging", desc: "Packaging bags for fertilizers and grains with custom sizes" },
    ],
    sustainability: [
      { title: "Recyclable Materials", desc: "Material choices compatible with recycling chains" },
      { title: "Waste Reduction", desc: "Continuous process improvement to reduce waste" },
      { title: "Safety & Operations", desc: "High safety standards and advanced fire systems" },
    ],
    products: [
      {
        title: "Multi-layer Agricultural Films",
        img: kamish1,
        desc: "Multi-layer films for soil covering and agricultural tunnels",
      },
      {
        title: "Fertilizer Packaging Bags",
        img: kamish2,
        desc: "Packaging bags for fertilizers and grains with custom sizes",
      },
      {
        title: "Plastic Irrigation Accessories",
        img: kamish3,
        desc: "High-durability plastic irrigation accessories for farms",
      },
      {
        title: "Agricultural Straws",
        img: kamish4,
        desc: "Agricultural straws for greenhouses and modern farms",
      },
      {
        title: "Agricultural Covers",
        img: kamish5,
        desc: "High-quality agricultural covers for greenhouses",
      },
      {
        title: "Integrated Irrigation Systems",
        img: kamish6,
        desc: "Integrated irrigation systems for farms and greenhouses",
      },
      {
        title: "Agricultural Supplies",
        img: kamish7,
        desc: "Various high-quality agricultural supplies",
      },
      {
        title: "Agricultural Tools",
        img: kamish8,
        desc: "Durable and reliable plastic agricultural tools",
      },
      {
        title: "Specialized Agricultural Products",
        img: kamish9,
        desc: "Specialized agricultural products for modern farms",
      },
      {
        title: "Comprehensive Agricultural Solutions",
        img: kamish10,
        desc: "Comprehensive agricultural solutions for the agricultural sector",
      },
      {
        title: "Innovative Agricultural Products",
        img: kamish11,
        desc: "Innovative high-quality agricultural products",
      },
    ],
  }
};

const icons = [Package, Award, Zap, ShieldCheck, Truck, ShieldCheck, Clock, Gauge, Recycle, Sparkles, Droplet, Package, Building2, Leaf, Recycle, FlameKindling];

// المكونات الفرعية
function StatCard({ stat, index, icon: Icon }: any) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-2xl hover:border-emerald-400 transition-all duration-500 animate-scaleIn"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
      <div className="relative">
        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mb-2 sm:mb-3" />
        <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-1">{stat.value}</div>
        <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
      </div>
    </div>
  );
}

function FeatureCard({ feature, index, icon: Icon }: any) {
  return (
    <div
      className="group bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-emerald-400 transition-all duration-300 animate-fadeInUp h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">{feature.title}</h3>
          <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">{feature.desc}</p>
        </div>
      </div>
    </div>
  );
}

const ProductCard = memo(({ product, index }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(index < 4); // Load first 4 images immediately
  const [imageLoaded, setImageLoaded] = useState(false);
  const shouldLoadEagerly = index < 4;

  useEffect(() => {
    // Skip observer for first 8 images
    if (shouldLoadEagerly) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0.01 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [shouldLoadEagerly]);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).style.display = "none";
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-emerald-100 hover:shadow-xl hover:border-emerald-400 transition-shadow duration-200 h-full flex flex-col"
    >
      <div className="flex flex-col h-full">
        <div 
          ref={containerRef}
          className="w-full bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-4 sm:p-6 min-h-[180px] sm:min-h-[200px] lg:min-h-[220px] relative"
        >
          {!imageLoaded && isInView && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
          {isInView ? (
            <img
              src={product.img}
              alt={product.title}
              className={`w-full h-full max-h-[180px] sm:max-h-[200px] lg:max-h-[220px] object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading={shouldLoadEagerly ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={shouldLoadEagerly ? "high" : "low"}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          ) : (
            <div className="w-full h-full max-h-[180px] sm:max-h-[200px] lg:max-h-[220px] bg-gray-100" />
          )}
        </div>
        <div className="w-full p-4 sm:p-5 flex flex-col justify-center flex-1">
          <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors leading-snug">
            {product.title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-3">
            {product.desc}
          </p>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

function ProductsSection({ lang, t }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Reduced to 4 for better performance
  const allProducts = t.products || [];

  const { displayedProducts, totalPages, indexOfFirstItem, indexOfLastItem } = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const displayedProducts = allProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    return { displayedProducts, totalPages, indexOfFirstItem, indexOfLastItem };
  }, [currentPage, allProducts, itemsPerPage]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    requestAnimationFrame(() => {
      document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  return (
    <section id="products-section" className="min-h-screen py-12 sm:py-16 bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-7xl">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
            <span className="text-emerald-600">{t.ourProducts}</span>
          </h2>
          <div className="h-1 w-20 bg-emerald-600 mx-auto rounded-full mb-3 sm:mb-4" />
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            {t.productsDesc}
          </p>
          <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">
            {t.showing} {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, allProducts.length)} {t.of} {allProducts.length} {t.product}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {displayedProducts.map((product: any, i: number) => (
            <ProductCard key={`product-${product.title}-${i}`} product={product} index={i} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
            <button
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600 shadow-md'
              }`}
            >
              <ArrowRight className={`h-3 w-3 sm:h-4 sm:w-4 ${lang === 'en' ? 'rotate-180' : ''}`} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300 ${
                  currentPage === pageNum
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-600 text-white shadow-lg scale-110'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`h-8 w-8 sm:h-9 sm:w-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600 shadow-md'
              }`}
            >
              <ArrowRight className={`h-3 w-3 sm:h-4 sm:w-4 ${lang === 'en' ? '' : 'rotate-180'}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function SinaCompany() {
  const { isRTL, isAR } = useDir();
  const lang = isAR ? 'ar' : 'en';
  const t = translations[lang];

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="bg-white min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="absolute inset-0">
          <img 
            src={factoryHero}
            alt="Factory Background" 
            className="w-full h-full object-cover opacity-50"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={(e) => {
              console.warn('Image failed:', (e.target as HTMLImageElement).src)
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-30">
          <div className="max-w-5xl mx-auto text-center">
            <div className="hero-logo inline-block mb-6 sm:mb-8 animate-fadeIn">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-emerald-400 mx-auto">
                <img 
                  src={logoSina} 
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain" 
                  alt="Sina Logo" 
                  loading="lazy"
                  onError={(e) => console.warn('Image failed:', (e.target as HTMLImageElement).src)} 
                />
              </div>
            </div>

            <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight animate-fadeInDown px-4">
              {t.factoryName}
              <span className="block text-emerald-600 mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {t.tagline}
              </span>
            </h1>

            <p className="hero-desc text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed animate-fadeInUp px-4">
              {t.heroDesc}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto px-4 pb-4">
              {t.kpis.map((stat: any, i: number) => (
                <StatCard key={i} stat={stat} index={i} icon={icons[i]} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About & Capabilities */}
      <section className="min-h-screen py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 sm:mb-4">
                {isAR ? 'من' : 'About'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600">{isAR ? 'نحن' : 'Us'}</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-emerald-600 to-emerald-600 mx-auto rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 animate-fadeIn">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Factory className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 flex-shrink-0" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{t.aboutFactory}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{t.aboutText}</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 animate-fadeIn">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 flex-shrink-0" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{t.manufacturingCapabilities}</h3>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {t.capabilities.map((cap: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <ProductsSection lang={lang} t={t} />

      {/* Advantages */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 w-full">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 sm:mb-4">
              {isAR ? 'لماذا' : 'Why'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600">{isAR ? 'نحن؟' : 'Us?'}</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-600 to-emerald-600 mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {t.advantages.map((adv: any, i: number) => (
              <FeatureCard key={i} feature={adv} index={i} icon={icons[i + 4]} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 w-full">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 sm:mb-4">
              {isAR ? 'القطاعات' : 'Served'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600">{isAR ? 'المخدومة' : 'Sectors'}</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-600 to-emerald-600 mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {t.industries.map((ind: any, i: number) => (
              <FeatureCard key={i} feature={ind} index={i} icon={icons[i + 10]} />
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 w-full">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3 sm:mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-600">{t.sustainabilityTitle}</span> {t.safety}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-600 to-emerald-600 mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {(t.sustainability as any[]).map((sus: any, i: number) => (
              <FeatureCard key={i} feature={sus} index={i} icon={icons[i + 13]} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 flex items-center gap-3">
                  <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 flex-shrink-0" />
                  {t.contactUs}
                </h3>

                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{t.address}</div>
                      <div className="text-gray-600 text-sm sm:text-base">{HQ.address[lang]}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{t.phone}</div>
                      {HQ.phones.map((p) => (
                        <a key={p} href={`tel:${p.replace(/\s+/g, "")}`} className="text-emerald-600 hover:underline block text-sm sm:text-base">
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{t.email}</div>
                      <a href={`mailto:${HQ.email}`} className="text-emerald-600 hover:underline text-sm sm:text-base break-all">
                        {HQ.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    title={isAR ? "خريطة مصنع سيناء" : "Sina Factory Map"}
                    src={mapSrc(HQ.lat, HQ.lng)}
                    className="w-full h-64 sm:h-80 lg:h-96"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="lg:col-span-1 bg-gradient-to-br from-emerald-600 to-emerald-600 rounded-2xl p-6 sm:p-8 shadow-2xl text-white flex flex-col justify-center">
                <Users className="h-10 w-10 sm:h-12 sm:w-12 mb-3 sm:mb-4" />
                <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">{t.sustainablePartnership}</h3>
                <p className="text-white/90 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                  {t.partnershipDesc}
                </p>
                <Link
                  to="/contact"
                  className="rounded-full bg-white text-emerald-600 px-5 sm:px-6 py-3 sm:py-4 font-bold text-center hover:bg-gray-100 transition duration-300 shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {t.startProject}
                  <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? '' : 'rotate-180'}`} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-50 to-emerald-50 rounded-2xl p-8 sm:p-12 text-center border-2 border-emerald-200 shadow-xl">
            <Award className="h-12 w-12 sm:h-16 sm:w-16 text-emerald-600 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 sm:mb-4">
              {t.needSample}
            </h3>
            <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed px-4">
              {t.sampleDesc}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-600 px-6 sm:px-8 py-3 sm:py-4 text-white font-bold text-base sm:text-lg shadow-xl shadow-emerald-500/50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {t.contactForSample}
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Wave */}
      <div className="h-2 bg-gradient-to-r from-emerald-600 via-emerald-600 to-emerald-600" />
    </div>
  );
}
