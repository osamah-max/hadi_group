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
  Info,
  ChevronDown,
  ChevronUp,
  Ruler,
  Box,
  Layers,
  X,
  Download,
  Maximize2,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import useDir from "../../hooks/useDir";
import api, { getProductImageUrl } from "../../lib/api";

const FACTORY_SLUG = "hamdi";

// مسارات الصور
import hamdiLogo from "../../assets/img/logo/hamdi_factory.png";
import factoryHero from "../../assets/img/backgrounds/hamdi_hero.jpg";

// Product images
import hamdi1 from "../../assets/img/products/product/hamdi/DSC00921.JPG";
import hamdi2 from "../../assets/img/products/product/hamdi/DSC00984.JPG";
import hamdi3 from "../../assets/img/products/product/hamdi/DSC01034.JPG";
import hamdi4 from "../../assets/img/products/product/hamdi/DSC01040.JPG";

// البيانات الثابتة
const HQ = {
  lat: 33.312,
  lng: 44.445,
  address: {
    ar: "العراق - كركوك - دارمان",
    en: "Iraq - Kirkuk - Daraman"
  },
  phones: ["07700005551"],
  email: "hamidi@hadigroup.iq",
  mapUrl: "https://maps.google.com/maps?q=Daraman,+Kirkuk,+Iraq&output=embed&z=14"
};

const mapSrc = (hq: typeof HQ) => 
  hq.mapUrl || `https://maps.google.com/maps?q=${hq.lat},${hq.lng}&z=14&output=embed`;

// الترجمات
const translations = {
  ar: {
    factoryName: "معمل حمدي",
    tagline: "دقة • اتساق • موثوقية",
    heroDesc: "حلول قولبة حقن بلاستيكية متقدمة للأغطية والعبوات. معايير ISO عالمية وخدمة استثنائية",
    requestQuote: "اطلب عرض سعر",
    downloadCatalog: "تحميل الكتالوج",
    aboutUs: "من نحن",
    aboutFactory: "نبذة عن المصنع",
    aboutText: "يعد معمل حمدي ذراعًا إنتاجيًا متخصصًا ضمن مجموعة هادي، يركز على الأغطية والعبوات لقطاعات المنظفات والمشروبات. نقدم تخصيصات مرنة مع توافق كامل مع خطوط التعبئة القائمة.",
    manufacturingCapabilities: "القدرات التصنيعية",
    ourProducts: "منتجاتنا",
    productsDesc: "تشكيلة واسعة من المنتجات القياسية مع إمكانية التخصيص الكامل",
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
      { value: "240K+", label: "وحدة شهريًا" },
      { value: "98%", label: "التزام التوريد" },
      { value: "7", label: "أيام تنفيذ" },
      { value: "ISO", label: "معايير الجودة" },
    ],
    capabilities: [
      "قولبة حقن Injection Molding لمنتجات الأغطية والعبوات",
      "مواد خام HDPE/PP مع إضافات لونية وتثبيت UV",
      "تحكم دقيق في السماكات والأبعاد",
      "اختبارات تسريب وإغلاق ومعايرة عزم الدوران",
      "تخصيص كامل: لون، نقشة، فوهة، بطانة Foam/EPE",
      "توافق تام مع خطوط التعبئة الحالية",
    ],
    advantages: [
      { title: "موثوقية التوريد", desc: "تخطيط إنتاج مرن مع مخزون أمان يضمن الاستمرارية" },
      { title: "جودة منضبطة", desc: "مراقبة جودة صارمة مع سجلات تتبع كاملة" },
      { title: "تنفيذ سريع", desc: "دورات إنتاج فعالة ومسار موافقات مبسط" },
      { title: "كفاءة تكلفة", desc: "تحسينات تصميم تقلل الهدر وتضبط التكاليف" },
      { title: "استدامة", desc: "مواد قابلة لإعادة التدوير وبرامج تقليل الفاقد" },
      { title: "تخصيص كامل", desc: "تشطيبات وألوان حسب هوية علامتك التجارية" },
    ],
    industries: [
      { title: "مشروبات", desc: "أغطية معيارية للمياه والعصائر مع توافق تام" },
      { title: "منظفات منزلية", desc: "عبوات HDPE بسعات متعددة مانعة للتسرب" },
      { title: "تعبئة صناعية", desc: "عبوات متخصصة للكيماويات بسماكات مخصصة" },
    ],
    sustainability: [
      { title: "خامات قابلة للتدوير", desc: "اختيارات HDPE/PP متوافقة مع سلاسل التدوير" },
      { title: "تقليل الهدر", desc: "تحسين مستمر للقوالب لتقليل المخلفات" },
      { title: "سلامة وتشغيل", desc: "معايير سلامة عالية وأنظمة إطفاء متقدمة" },
    ],
    products: [
      {
        title: "غطاء 28mm مياه/مشروبات",
        img: hamdi1,
        desc: "غطاء قياسي محكم للمياه والعصائر مع توافق تام لخطوط التعبئة الآلية",
        specs: {
          material: "PP",
          diameter: "28mm",
          closure: "تعشيق",
          applications: "مياه، مشروبات",
          weight: "غير محدد",
          neckSize: "28mm",
        },
        additionalImages: [hamdi1, hamdi2],
        contextImage: hamdi3,
        technicalDrawing: hamdi4,
        pdfUrl: "#",
      },
      {
        title: "غطاء Push-Pull رياضي",
        img: hamdi2,
        desc: "غطاء رياضي للفتح السريع مثالي للقناني المحمولة مع ضمان عدم الانسكاب",
        specs: {
          material: "PP",
          type: "Push-Pull",
          closure: "تعشيق",
          applications: "مشروبات رياضية",
          weight: "غير محدد",
          neckSize: "غير محدد",
        },
        additionalImages: [hamdi2, hamdi1],
        contextImage: hamdi3,
        technicalDrawing: hamdi4,
        pdfUrl: "#",
      },
      {
        title: "قنينة HDPE — 1 لتر",
        img: hamdi3,
        desc: "قنينة متينة للمنظفات السائلة بسماكات متوازنة ومقاومة كيماوية ممتازة",
        specs: {
          material: "HDPE",
          capacity: "1 لتر",
          thickness: "متوازنة",
          applications: "منظفات سائلة",
          weight: "غير محدد",
          neckSize: "غير محدد",
        },
        additionalImages: [hamdi3, hamdi4],
        contextImage: hamdi1,
        technicalDrawing: hamdi2,
        pdfUrl: "#",
      },
      {
        title: "غالون HDPE — 5 لتر",
        img: hamdi4,
        desc: "غالون بيد مريحة للمنظفات الصناعية مع فوهات متعددة وقوة تحمل عالية",
        specs: {
          material: "HDPE",
          capacity: "5 لتر",
          handle: "بيد مريحة",
          applications: "منظفات صناعية",
          weight: "غير محدد",
          neckSize: "غير محدد",
        },
        additionalImages: [hamdi4, hamdi3],
        contextImage: hamdi1,
        technicalDrawing: hamdi2,
        pdfUrl: "#",
      },
      {
        title: "علبة Pail",
        img: hamdi3,
        desc: "علبة بلاستيكية متينة من مادة PP مصممة خصيصاً لتعبئة منتجات الألبان",
        specs: {
          material: "PP",
          bottomDiameter: "138.00 مم",
          topDiameter: "173.45 مم",
          height: "130.80 مم",
          pailsPerCarton: "270 علبة",
          capsPerCarton: "648 غطاء",
          closure: "تعشيق",
          applications: "لبن",
          capType: "ملائم للعلبة",
          weight: "غير محدد",
          neckSize: "173.45 مم",
        },
        // Additional data for Technical Datasheet
        additionalImages: [hamdi3, hamdi4], // صور من زوايا مختلفة
        contextImage: hamdi1, // صورة المنتج على العبوة
        technicalDrawing: hamdi2, // مخطط هندسي (يمكن استبداله لاحقاً)
        pdfUrl: "#", // رابط PDF للمواصفات التقنية
      },
    ],
  },
  en: {
    factoryName: "Hamdi Factory",
    tagline: "Precision • Consistency • Reliability",
    heroDesc: "Advanced plastic injection molding solutions for caps and containers. Global ISO standards and exceptional service",
    requestQuote: "Request Quote",
    downloadCatalog: "Download Catalog",
    aboutUs: "About Us",
    aboutFactory: "About the Factory",
    aboutText: "Hamdi Factory is a specialized production arm within Hadi Group, focusing on caps and containers for detergents and beverage sectors. We provide flexible customizations with full compatibility with existing filling lines.",
    manufacturingCapabilities: "Manufacturing Capabilities",
    ourProducts: "Our Products",
    productsDesc: "Wide range of standard products with full customization capabilities",
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
      { value: "240K+", label: "Units Monthly" },
      { value: "98%", label: "Supply Commitment" },
      { value: "7", label: "Days Execution" },
      { value: "ISO", label: "Quality Standards" },
    ],
    capabilities: [
      "Injection Molding for caps and container products",
      "HDPE/PP raw materials with color additives and UV stabilization",
      "Precise control of thickness and dimensions",
      "Leak testing, sealing, and torque calibration",
      "Full customization: color, pattern, spout, Foam/EPE liner",
      "Full compatibility with existing filling lines",
    ],
    advantages: [
      { title: "Supply Reliability", desc: "Flexible production planning with safety stock ensures continuity" },
      { title: "Controlled Quality", desc: "Strict quality control with complete tracking records" },
      { title: "Fast Execution", desc: "Efficient production cycles and simplified approval process" },
      { title: "Cost Efficiency", desc: "Design improvements reduce waste and control costs" },
      { title: "Sustainability", desc: "Recyclable materials and waste reduction programs" },
      { title: "Full Customization", desc: "Finishes and colors according to your brand identity" },
    ],
    industries: [
      { title: "Beverages", desc: "Standard caps for water and juices with full compatibility" },
      { title: "Household Cleaners", desc: "Multi-capacity leak-proof HDPE containers" },
      { title: "Industrial Packaging", desc: "Specialized containers for chemicals with custom thickness" },
    ],
    sustainability: [
      { title: "Recyclable Materials", desc: "HDPE/PP choices compatible with recycling chains" },
      { title: "Waste Reduction", desc: "Continuous mold improvement to reduce waste" },
      { title: "Safety & Operations", desc: "High safety standards and advanced fire systems" },
    ],
    products: [
      {
        title: "28mm Water/Beverage Cap",
        img: hamdi1,
        desc: "Standard sealed cap for water and juices with full compatibility for automatic filling lines",
        specs: {
          material: "PP",
          diameter: "28mm",
          closure: "Snap-on",
          applications: "Water, Beverages",
          weight: "Not specified",
          neckSize: "28mm",
        },
        additionalImages: [hamdi1, hamdi2],
        contextImage: hamdi3,
        technicalDrawing: hamdi4,
        pdfUrl: "#",
      },
      {
        title: "Sports Push-Pull Cap",
        img: hamdi2,
        desc: "Sports cap for quick opening ideal for portable bottles with spill-proof guarantee",
        specs: {
          material: "PP",
          type: "Push-Pull",
          closure: "Snap-on",
          applications: "Sports Beverages",
          weight: "Not specified",
          neckSize: "Not specified",
        },
        additionalImages: [hamdi2, hamdi1],
        contextImage: hamdi3,
        technicalDrawing: hamdi4,
        pdfUrl: "#",
      },
      {
        title: "HDPE Bottle — 1 Liter",
        img: hamdi3,
        desc: "Durable bottle for liquid detergents with balanced thickness and excellent chemical resistance",
        specs: {
          material: "HDPE",
          capacity: "1 Liter",
          thickness: "Balanced",
          applications: "Liquid Detergents",
          weight: "Not specified",
          neckSize: "Not specified",
        },
        additionalImages: [hamdi3, hamdi4],
        contextImage: hamdi1,
        technicalDrawing: hamdi2,
        pdfUrl: "#",
      },
      {
        title: "HDPE Gallon — 5 Liters",
        img: hamdi4,
        desc: "Gallon with comfortable handle for industrial cleaners with multiple spouts and high durability",
        specs: {
          material: "HDPE",
          capacity: "5 Liters",
          handle: "Comfortable Handle",
          applications: "Industrial Cleaners",
          weight: "Not specified",
          neckSize: "Not specified",
        },
        additionalImages: [hamdi4, hamdi3],
        contextImage: hamdi1,
        technicalDrawing: hamdi2,
        pdfUrl: "#",
      },
      {
        title: "Pail Container",
        img: hamdi3,
        desc: "Durable plastic pail made from PP material, specifically designed for dairy product packaging",
        specs: {
          material: "PP",
          bottomDiameter: "138.00 mm",
          topDiameter: "173.45 mm",
          height: "130.80 mm",
          pailsPerCarton: "270 pails",
          capsPerCarton: "648 caps",
          closure: "Snap-on",
          applications: "Dairy/Milk",
          capType: "Compatible with pail",
          weight: "Not specified",
          neckSize: "173.45 mm",
        },
        additionalImages: [hamdi3, hamdi4],
        contextImage: hamdi1,
        technicalDrawing: hamdi2,
        pdfUrl: "#",
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

function FeatureCard({ feature, index, icon: Icon, isRTL }: any) {
  return (
    <div
      className="group bg-white rounded-lg p-5 sm:p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-emerald-300 transition-all duration-200 h-full flex flex-col"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 transition-colors duration-200">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" strokeWidth={2} />
        </div>
        <div className="flex-1 pt-1">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight">
            {feature.title}
          </h3>
        </div>
      </div>
      
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
        {feature.desc}
      </p>
    </div>
  );
}

// Technical Datasheet Modal Component
const TechnicalDatasheetModal = memo(({ product, isOpen, onClose, isRTL }: any) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const allImages = useMemo(() => product.additionalImages || [product.img], [product]);
  const specs = useMemo(() => product.specs || {}, [product]);

  const handleImageSelect = useCallback((idx: number) => {
    setSelectedImageIndex(idx);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      setSelectedImageIndex(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 pb-4 px-4 bg-black/60 overflow-y-auto"
      onClick={onClose}
      style={{ paddingTop: '80px' }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-8"
        style={{ maxHeight: 'calc(100vh - 100px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-emerald-700 flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl font-bold truncate">{product.title}</h2>
              <p className="text-emerald-100 text-xs sm:text-sm">{isRTL ? 'ورقة البيانات التقنية' : 'Technical Datasheet'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {product.pdfUrl && (
              <a
                href={product.pdfUrl}
                download
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-semibold text-xs sm:text-sm hidden sm:inline">{isRTL ? 'تحميل PDF' : 'Download PDF'}</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Section - Images */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8 border-r border-gray-200">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                  <span>{isRTL ? 'الصور التفصيلية' : 'Product Images'}</span>
                </h3>
                
                {/* Main Image */}
                <div className="relative bg-white rounded-xl p-4 sm:p-6 mb-3 sm:mb-4 shadow-md border border-gray-200 min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
                  <img
                    src={getProductImageUrl(allImages[selectedImageIndex] || product.img)}
                    alt={product.title}
                    className="max-w-full max-h-[220px] sm:max-h-[280px] object-contain"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* Thumbnail Gallery */}
                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {allImages.map((img: any, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => handleImageSelect(idx)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                          selectedImageIndex === idx
                            ? 'border-emerald-500 ring-1 ring-emerald-200'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <img
                          src={getProductImageUrl(img)}
                          alt={`${product.title} - View ${idx + 1}`}
                          className="w-full h-16 sm:h-20 object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Context Image */}
              {product.contextImage && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <Package className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                    <span>{isRTL ? 'المنتج على العبوة' : 'Product in Context'}</span>
                  </h3>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
                    <img
                      src={getProductImageUrl(product.contextImage)}
                      alt={`${product.title} in context`}
                      className="w-full h-auto object-contain rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              )}

              {/* Technical Drawing */}
              {product.technicalDrawing && (
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <Ruler className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                    <span>{isRTL ? 'المخطط الهندسي' : 'Technical Drawing'}</span>
                  </h3>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
                    <img
                      src={getProductImageUrl(product.technicalDrawing)}
                      alt={`${product.title} technical drawing`}
                      className="w-full h-auto object-contain rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="mt-3 sm:mt-4 text-center">
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                        {isRTL ? 'جميع الأبعاد بالمليمتر (mm)' : 'All dimensions in millimeters (mm)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Section - Specifications Table */}
            <div className="bg-white p-4 sm:p-6 lg:p-8">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                <span>{isRTL ? 'المواصفات التقنية' : 'Technical Specifications'}</span>
              </h3>

              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-50 to-teal-50">
                      <th className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-right font-bold text-gray-900 text-xs sm:text-sm">
                        {isRTL ? 'الخاصية' : 'Property'}
                      </th>
                      <th className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-right font-bold text-gray-900 text-xs sm:text-sm">
                        {isRTL ? 'القيمة' : 'Value'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {specs.material && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'المادة الخام' : 'Material'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.material}
                        </td>
                      </tr>
                    )}
                    {specs.capacity && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'السعة' : 'Capacity'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.capacity}
                        </td>
                      </tr>
                    )}
                    {specs.diameter && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'القطر' : 'Diameter'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.diameter}
                        </td>
                      </tr>
                    )}
                    {specs.bottomDiameter && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'القطر السفلي (Bottom Diameter)' : 'Bottom Diameter'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.bottomDiameter}
                        </td>
                      </tr>
                    )}
                    {specs.topDiameter && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'القطر العلوي (Top Diameter)' : 'Top Diameter'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.topDiameter}
                        </td>
                      </tr>
                    )}
                    {specs.height && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'الارتفاع (Height)' : 'Height'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.height}
                        </td>
                      </tr>
                    )}
                    {specs.weight && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'الوزن (Weight)' : 'Weight'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.weight}
                        </td>
                      </tr>
                    )}
                    {specs.neckSize && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'حجم العنق (Neck Size)' : 'Neck Size'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.neckSize}
                        </td>
                      </tr>
                    )}
                    {specs.closure && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'نوع الإغلاق (Closure Type)' : 'Closure Type'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.closure}
                        </td>
                      </tr>
                    )}
                    {specs.pailsPerCarton && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'عدد العلب/الكارتون' : 'Pails per Carton'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.pailsPerCarton}
                        </td>
                      </tr>
                    )}
                    {specs.capsPerCarton && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'عدد الأغطية/الكارتون' : 'Caps per Carton'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.capsPerCarton}
                        </td>
                      </tr>
                    )}
                    {specs.applications && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'التطبيقات (Applications)' : 'Applications'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.applications}
                        </td>
                      </tr>
                    )}
                    {specs.capType && (
                      <tr className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {isRTL ? 'نوع القبغ (Cap Type)' : 'Cap Type'}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {specs.capType}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Description */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-gray-900 mb-2 text-xs sm:text-sm">{isRTL ? 'الوصف' : 'Description'}</h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{product.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TechnicalDatasheetModal.displayName = 'TechnicalDatasheetModal';

const ProductCard = memo(({ product, index, isRTL, onOpenModal }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(index < 6);
  const [imageLoaded, setImageLoaded] = useState(false);
  const shouldLoadEagerly = index < 6;

  useEffect(() => {
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

  const specs = product.specs || {};

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-lg hover:border-emerald-300 transition-shadow duration-200 h-full flex flex-col cursor-pointer"
      onClick={() => onOpenModal && onOpenModal(product)}
    >
      <div className="flex flex-col h-full relative z-10">
        {/* Product Image */}
        <div 
          ref={containerRef}
          className="w-full bg-gray-50 flex items-center justify-center p-5 sm:p-6 min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] relative"
        >
          {!imageLoaded && isInView && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
          {isInView ? (
            <img
              src={getProductImageUrl(product.img)}
              alt={product.title}
              className={`relative z-10 w-full h-full max-h-[180px] sm:max-h-[200px] lg:max-h-[220px] object-contain transition-opacity duration-200 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading={shouldLoadEagerly ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={shouldLoadEagerly ? "high" : "low"}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          ) : (
            <div className="w-full h-full max-h-[180px] sm:max-h-[200px] lg:max-h-[220px] bg-gray-100 rounded" />
          )}
        </div>

        {/* Product Content */}
        <div className="w-full p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors duration-200 leading-tight">
            {product.title}
          </h4>
            <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
            {product.desc}
          </p>
        </div>

          {/* Technical Datasheet Button */}
          {specs && Object.keys(specs).length > 0 && (
            <div className="border-t border-gray-200 pt-4 mt-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal && onOpenModal(product);
                }}
                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg px-4 py-2.5 shadow-sm hover:shadow transition-colors duration-200"
              >
                <FileText className="h-4 w-4" />
                <span>{isRTL ? 'عرض البيانات التقنية' : 'View Technical Datasheet'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

function ProductsSection({ lang, t, isRTL, products: productsOverride }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6; // 6 products per page for better layout
  const allProducts = productsOverride ?? [];

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

  const handleOpenModal = useCallback((product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  }, []);

  return (
    <section id="products-section" className="relative py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {isRTL ? 'منتجاتنا' : 'Our Products'}
          </h2>
          <div className="h-0.5 w-24 bg-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-3">
            {t.productsDesc}
          </p>
          <div className="text-xs sm:text-sm text-gray-500">
            {t.showing} <span className="text-emerald-600 font-semibold">{indexOfFirstItem + 1}</span> - <span className="text-emerald-600 font-semibold">{Math.min(indexOfLastItem, allProducts.length)}</span> {t.of} <span className="text-emerald-600 font-semibold">{allProducts.length}</span> {t.product}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {displayedProducts.map((product: any, i: number) => (
            <ProductCard 
              key={`product-${product.title}-${i}`} 
              product={product} 
              index={i} 
              isRTL={isRTL}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        {/* Technical Datasheet Modal */}
        {selectedProduct && (
          <TechnicalDatasheetModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            isRTL={isRTL}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`h-9 w-9 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600'
              }`}
            >
              <ArrowRight className={`h-4 w-4 ${lang === 'en' ? 'rotate-180' : ''}`} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`h-9 w-9 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                  currentPage === pageNum
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`h-9 w-9 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600'
              }`}
            >
              <ArrowRight className={`h-4 w-4 ${lang === 'en' ? '' : 'rotate-180'}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function HamdiCompany() {
  const { isRTL, isAR } = useDir();
  const lang = isAR ? 'ar' : 'en';
  const t = translations[lang];
  const [apiFactory, setApiFactory] = useState<any>(null);
  const [apiProducts, setApiProducts] = useState<any[]>([]);

  useEffect(() => {
    const langQ = isAR ? 'ar' : 'en';
    Promise.all([
      api.get(`/api/factories/${FACTORY_SLUG}?lang=${langQ}`).then((r) => r.data.factory),
      api.get(`/api/products?factory_slug=${FACTORY_SLUG}&lang=${langQ}`).then((r) => r.data.products || []),
    ])
      .then(([factory, products]) => {
        setApiFactory(factory ?? null);
        setApiProducts(Array.isArray(products) ? products : []);
      })
      .catch(() => {});
  }, [isAR]);

  const primaryLoc = apiFactory?.locations?.find((l: any) => l.is_primary) ?? apiFactory?.locations?.[0];
  const hq = apiFactory
    ? {
        address: {
          ar: primaryLoc?.address_ar ?? apiFactory.address_ar ?? '',
          en: primaryLoc?.address_en ?? apiFactory.address_en ?? '',
        },
        phones: primaryLoc?.phones ?? apiFactory.phones ?? [],
        email: primaryLoc?.email ?? apiFactory.email ?? '',
        mapUrl: primaryLoc?.map_url ?? apiFactory.map_url ?? '',
        lat: primaryLoc?.lat ?? apiFactory.lat ?? 0,
        lng: primaryLoc?.lng ?? apiFactory.lng ?? 0,
      }
    : HQ;

  const productsForShow = apiProducts.map((p: any) => ({
    title: lang === 'ar' ? p.title_ar : p.title_en,
    titleEn: p.title_en,
    titleAr: p.title_ar,
    img: p.img,
    desc: lang === 'ar' ? p.desc_ar : p.desc_en,
    descEn: p.desc_en,
    descAr: p.desc_ar,
    specs: p.specs || {},
    additionalImages: p.additional_images || [p.img].filter(Boolean),
    contextImage: p.context_image,
    technicalDrawing: p.technical_drawing,
    pdfUrl: p.pdf_url,
  }));

  // CSS animations are handled via classes

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className="bg-gradient-to-b from-gray-50 to-white min-h-screen font-sans text-gray-800">
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
                <img src={hamdiLogo} className="h-16 w-16 sm:h-20 sm:w-20 object-contain" alt="Hamidi Logo" loading="lazy" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
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
      <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 pb-16 sm:pb-20 lg:pb-24">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 w-full flex-1 flex flex-col relative z-10">
          <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center py-12 sm:py-16 lg:py-20">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 backdrop-blur-sm px-4 py-2 mb-4">
                <Users className="h-4 w-4 text-emerald-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">{isAR ? 'تعرف علينا' : 'Get to Know Us'}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                <span className="text-gray-800">{isAR ? 'من' : 'About'}</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600">
                  {isAR ? 'نحن' : 'Us'}
                </span>
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="h-1.5 w-12 bg-gradient-to-r from-transparent to-emerald-600 rounded-full"></div>
                <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full"></div>
                <div className="h-1.5 w-12 bg-gradient-to-r from-teal-600 to-transparent rounded-full"></div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className={`flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 items-stretch ${isRTL ? '' : 'lg:flex-row-reverse'}`}>
              {/* Cards Section - Right in RTL, Left in LTR */}
              <div className="space-y-5 sm:space-y-6 flex flex-col lg:w-1/2">
                {/* About Factory Card */}
                <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-100/50 hover:shadow-2xl hover:border-emerald-300 transition-all duration-500 hover:-translate-y-1 flex flex-col overflow-hidden">
                  {/* Decorative Gradient Overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10 flex items-center gap-4 mb-4 sm:mb-5">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Factory className="h-6 w-6 sm:h-7 sm:w-7 text-white" strokeWidth={2.5} />
                </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {t.aboutFactory}
                    </h3>
                  </div>
                  <p className="relative z-10 text-gray-700 leading-relaxed text-base sm:text-lg flex-1">
                    {t.aboutText}
                  </p>
              </div>

                {/* Manufacturing Capabilities Card */}
                <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-100/50 hover:shadow-2xl hover:border-emerald-300 transition-all duration-500 hover:-translate-y-1 flex flex-col overflow-hidden max-h-[400px] sm:max-h-[450px]">
                  {/* Decorative Gradient Overlay */}
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-400/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10 flex items-center gap-4 mb-4 sm:mb-5">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <Wrench className="h-6 w-6 sm:h-7 sm:w-7 text-white" strokeWidth={2.5} />
                </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {t.manufacturingCapabilities}
                    </h3>
                  </div>
                  <ul className="relative z-10 space-y-2.5 sm:space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                  {t.capabilities.map((cap: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <div className="mt-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-md group-hover/item:scale-110 transition-transform">
                          <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 leading-relaxed pt-0.5">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

              {/* Image Section - Left in RTL, Right in LTR */}
              <div className="flex items-center justify-center lg:w-1/2">
                <div className="group relative w-full max-h-[500px] sm:max-h-[550px] bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/50 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-emerald-100/50 hover:border-emerald-300/50 transition-all duration-500 hover:shadow-emerald-200/20 flex items-center justify-center overflow-hidden aspect-square">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400 rounded-full blur-3xl"></div>
                  </div>
                  
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-transparent to-teal-400/0 group-hover:from-emerald-400/10 group-hover:to-teal-400/10 transition-all duration-700 rounded-3xl"></div>
                  
                  <img
                    src={hamdiLogo}
                    alt={t.factoryName}
                    className="relative z-10 w-full h-full max-h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Decorative Corner Elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-emerald-300/30 rounded-tr-3xl"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-teal-300/30 rounded-bl-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <ProductsSection lang={lang} t={t} isRTL={isRTL} products={productsForShow} />

      {/* Advantages */}
      <section className="relative h-screen flex items-center justify-center bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 w-full max-w-7xl h-full flex flex-col justify-center">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {isAR ? 'لماذا نحن؟' : 'Why Us?'}
            </h2>
            <div className="h-0.5 w-24 bg-emerald-600 mx-auto mb-6"></div>
            <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {isAR 
                ? 'نقدم حلولاً متكاملة تجمع بين الجودة العالية والابتكار والالتزام بمعايير التصنيع العالمية'
                : 'We provide integrated solutions that combine high quality, innovation, and commitment to global manufacturing standards'}
            </p>
          </div>

          {/* Advantages Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto w-full">
            {t.advantages.map((adv: any, i: number) => (
              <FeatureCard key={i} feature={adv} index={i} icon={icons[i + 4]} isRTL={isRTL} />
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="relative h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 w-full max-w-7xl h-full flex flex-col justify-center">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {isAR ? 'القطاعات المخدومة' : 'Served Sectors'}
            </h2>
            <div className="h-0.5 w-24 bg-emerald-600 mx-auto mb-6"></div>
            <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {isAR 
                ? 'نخدم مجموعة واسعة من القطاعات الصناعية بتقديم منتجات عالية الجودة تلبي احتياجاتها المتنوعة'
                : 'We serve a wide range of industrial sectors by providing high-quality products that meet their diverse needs'}
            </p>
          </div>

          {/* Industries Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto w-full">
            {t.industries.map((ind: any, i: number) => (
              <FeatureCard key={i} feature={ind} index={i} icon={icons[i + 10]} isRTL={isRTL} />
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
              <FeatureCard key={i} feature={sus} index={i} icon={icons[i + 13]} isRTL={isRTL} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
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
                      <div className="text-gray-600 text-sm sm:text-base">{hq.address[lang]}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{t.phone}</div>
                      {hq.phones.map((p: string) => (
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
                      <a href={`mailto:${hq.email}`} className="text-emerald-600 hover:underline text-sm sm:text-base break-all">
                        {hq.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    title={isAR ? "خريطة معمل حمدي" : "Hamdi Factory Map"}
                    src={mapSrc(hq)}
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