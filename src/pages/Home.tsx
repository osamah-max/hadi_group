// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { useMemo } from "react";
import useDir from "../hooks/useDir";

/* الشعارات */
import logoAlzab from "../assets/img/logo/alzab.png";
import logoGayath from "../assets/img/logo/gayath.png";
import logoHadiCap from "../assets/img/logo/hadi_cap.png";
import logoHima from "../assets/img/logo/hima1.png";
import logoSina from "../assets/img/logo/sina.png";
import logoGroup from "../assets/img/logo/hadi_group.png";
import logoHamdi from "../assets/img/logo/hamdi_factory.png";

/* الأقسام */
import Hero from "../components/home/Hero";
import About_Us from "../components/home/About_Us";
import Our_Products from "../components/home/Our_Products";
import Latest_News from "../components/home/Latest_News";
import Why_Choose_Us from "../components/home/Why_Choose_Us";
import Industries_We_Serve from "../components/home/Industries_We_Serve";
import Distributor_Network from "../components/home/Distributor_Network";
import FQA from "../components/home/FQA";
import Contact_Us from "../components/home/Contact_Us";

/* أنواع مساعدة */
type Company = { name: string; to: string; logo?: string };

export default function Home() {
  const { isRTL, isAR } = useDir();

  const t = useMemo(
    () =>
      isAR
        ? {
            heroTitleL1: "اكتشف عالمًا من البلاستيك المتجدّد،",
            heroTitleL2: "وأثرنا فيه.",
            heroDesc: "مجموعة متخصصة في تقديم حلول صناعية وتجارية بمعايير جودة عالية وتصميم عصري.",
            contactUs: "تواصل معنا",
            aboutUs: "عنّا",
            aboutTitle: "عن مجموعة هادي",
            aboutP1:
              "تأسست مجموعة هادي عام 1975، ونمت لتصبح أحد أبرز مزودي المنتجات البلاستيكية عالية الجودة عبر مصانعها المتخصصة التي تخدم القطاعات الزراعية والصناعية والتجارية.",
            aboutL1: "مواد خام معتمدة ومعايير جودة دقيقة.",
            aboutL2: "حلول مخصّصة وسلاسل توريد مرنة.",
            aboutL3: "خدمة ما بعد البيع ودعم فني للمشاريع.",
            statsYears: "عام من الخبرة",
            statsEmployees: "موظف وعامل",
            statsTons: "طن إنتاج سنوي",
            statsPlants: "مصنع وشركة",

            productsTitle: "منتجاتنا وخدماتنا",
            searchPh: "ابحث باسم المنتج أو وصفه...",
            all: "الكل",
            fGayath: "مصنع غياث",
            fHamdi: "مصنع حمدي",
            fSina: "مصنع سيناء",
            fAlzab: "مصنع الزاب",
            fHima: "مصنع هيما بلاستك",
            fHadiCap: "مصنع هادي كاب",

            feature: {
              by: {
                gayath: { name: "مصنع غياث", tagline: "ريادة في المنتجات الصناعية والتجهيزات الكبرى." },
                hamdi: { name: "مصنع حمدي", tagline: "مواد تغليف عالية الأمان والجودة." },
                sina: { name: "مصنع سيناء", tagline: "حلول زراعية مستدامة بأجود المواد." },
                alzab: { name: "مصنع الزاب", tagline: "شبكة توزيع واسعة داخل وخارج العراق." },
                hima: { name: "هيما بلاستك", tagline: "منتجات منزلية عملية ومتينة." },
                hadiCap: { name: "هادي كاب", tagline: "كوابل وحلول صناعية بأداء موثوق." },
                all: { name: "جميع مصانعنا", tagline: "اكتشف أفضل منتجاتنا المتوفرة من جميع المصانع والشركات التابعة." },
              },
              cta: "تصفّح الكل",
            },

            blogTitle: "آخر الأخبار",
            blogSub: "مؤشرات حياة وتطوير مستمر في المجموعة.",
            blogReadMore: "اقرأ المزيد",

            whyTitle: "لماذا نحن",
            whySub: "ركائز قيمة متينة تلائم القطاعات الصناعية.",
            why: [
              { icon: "🧪", text: "جودة معتمدة مخبريًا" },
              { icon: "⚙️", text: "توريد مرن وموثوق" },
              { icon: "🎯", text: "تصميم عملي وعصري" },
              { icon: "🤝", text: "خدمة ما بعد البيع" },
            ],

            indTitle: "القطاعات التي نخدمها",
            indSub: "تغطية متعددة الاستخدامات من الزراعة إلى التوزيع.",
            indList: [
              { icon: "🌾", ar: "زراعي", en: "Agriculture" },
              { icon: "🏭", ar: "صناعي", en: "Industrial" },
              { icon: "🏠", ar: "منزلي", en: "Household" },
              { icon: "📦", ar: "تغليف", en: "Packaging" },
              { icon: "🚚", ar: "توزيع", en: "Distribution" },
            ],

            distTitle: "شبكة الموزعين",
            distSub: "خريطة تغطية مع نقاط اتصال مباشرة.",
            distDesc: "نغطّي معظم محافظات العراق عبر شبكة توزيع قوية.",
            distCTA: "تواصل مع أقرب موزّع",

            faqTitle: "الأسئلة الشائعة",
            faqSub: "تفاصيل مباشرة تختصر وقتك وتزيد التحويل.",
            faq: [
              { q: "ما المواد الخام المستخدمة؟", a: "نستخدم خامات معتمدة عالميًا مع شهادات مطابقة." },
              { q: "ما هي مدة التسليم؟", a: "عادةً 5–14 يومًا حسب الكمية والموقع." },
              { q: "هل يوجد شحن دولي؟", a: "نعم، عبر شركائنا اللوجستيين لدول الجوار." },
              { q: "ما الضمان؟", a: "ضمان تصنيع لمدة 12 شهرًا على معظم المنتجات." },
              { q: "طرق الدفع؟", a: "تحويل بنكي، نقدي، أو شيك معتمد." },
            ],

            contactTitle: "تواصل معنا",
            contactSub: "فريق المبيعات والدعم جاهز للاحترافية والسرعة.",

            companies: [
              { name: "مصنع غياث", to: "/companies/gayath", logo: logoGayath },
              { name: "مصنع حمدي", to: "/companies/hamdi", logo: logoHamdi },
              { name: "مصنع سيناء", to: "/companies/sina", logo: logoSina },
              { name: "مصنع الزاب", to: "/companies/alzab", logo: logoAlzab },
              { name: "مصنع هادي كاب", to: "/companies/hadi_cap", logo: logoHadiCap },
              { name: "مصنع هيما بلاستك", to: "/companies/hima", logo: logoHima },
            ] as Company[],
          }
        : {
            heroTitleL1: "Discover a world of renewable plastics,",
            heroTitleL2: "and our impact in it.",
            heroDesc:
              "A specialized group delivering industrial & commercial solutions with high standards and modern design.",
            contactUs: "Contact us",
            aboutUs: "About",
            aboutTitle: "About HADI Group",
            aboutP1:
              "Founded in 1975, HADI Group has grown into a leading provider of high-quality plastic products through specialized plants serving agriculture, industry, and commerce.",
            aboutL1: "Certified raw materials and rigorous quality standards.",
            aboutL2: "Tailored solutions and flexible supply chains.",
            aboutL3: "After-sales service and technical support.",
            statsYears: "years of experience",
            statsEmployees: "employees",
            statsTons: "tons annual output",
            statsPlants: "plants & companies",

            productsTitle: "Our Products & Services",
            searchPh: "Search by product name or description...",
            all: "All",
            fGayath: "Gayath Factory",
            fHamdi: "Hamdi Factory",
            fSina: "Sina Factory",
            fAlzab: "Alzab Factory",
            fHima: "HIMA Plastic",
            fHadiCap: "HADICAP",

            feature: {
              by: {
                gayath: { name: "Gayath Factory", tagline: "Leader in industrial products & large-scale fittings." },
                hamdi: { name: "Hamdi Factory", tagline: "High-safety, high-quality packaging materials." },
                sina: { name: "Sina Factory", tagline: "Sustainable agricultural solutions with premium specs." },
                alzab: { name: "Alzab Factory", tagline: "Wide distribution network in and outside Iraq." },
                hima: { name: "HIMA Plastic", tagline: "Practical, durable home products." },
                hadiCap: { name: "HADICAP", tagline: "Reliable industrial cables & solutions." },
                all: { name: "All Factories", tagline: "Discover highlighted products from all subsidiaries." },
              },
              cta: "Browse all",
            },

            blogTitle: "Latest News",
            blogSub: "Signals of progress across the group.",
            blogReadMore: "Read more",

            whyTitle: "Why Choose Us",
            whySub: "Executive-grade value pillars.",
            why: [
              { icon: "🧪", text: "Lab-certified quality" },
              { icon: "⚙️", text: "Flexible & reliable supply" },
              { icon: "🎯", text: "Modern & functional design" },
              { icon: "🤝", text: "After-sales care" },
            ],

            indTitle: "Industries We Serve",
            indSub: "From agriculture to distribution.",
            indList: [
              { icon: "🌾", ar: "زراعي", en: "Agriculture" },
              { icon: "🏭", ar: "صناعي", en: "Industrial" },
              { icon: "🏠", ar: "منزلي", en: "Household" },
              { icon: "📦", ar: "تغليف", en: "Packaging" },
              { icon: "🚚", ar: "توزيع", en: "Distribution" },
            ],

            distTitle: "Distributor Network",
            distSub: "Coverage map with direct contacts.",
            distDesc: "We cover most Iraqi provinces with a strong distribution network.",
            distCTA: "Contact nearest distributor",

            faqTitle: "FAQ",
            faqSub: "Direct answers to reduce friction.",
            faq: [
              { q: "What raw materials are used?", a: "Globally certified raw materials with conformity certificates." },
              { q: "Delivery time?", a: "Typically 5–14 days depending on volume and destination." },
              { q: "International shipping?", a: "Yes, through our logistics partners in neighboring countries." },
              { q: "Warranty?", a: "12-month manufacturing warranty on most products." },
              { q: "Payment methods?", a: "Bank transfer, cash, or certified cheque." },
            ],

            contactTitle: "Get in Touch",
            contactSub: "Sales & support built for speed and reliability.",

            companies: [
              { name: "Gayath Factory", to: "/companies/gayath", logo: logoGayath },
              { name: "Hamdi Factory", to: "/companies/hamdi", logo: logoHamdi },
              { name: "Sina Factory", to: "/companies/sina", logo: logoSina },
              { name: "Alzab Factory", to: "/companies/alzab", logo: logoAlzab },
              { name: "HADICAP", to: "/companies/hadi_cap", logo: logoHadiCap },
              { name: "HIMA Plastic", to: "/companies/hima", logo: logoHima },
            ] as Company[],
          },
    [isAR]
  );

  const companies: Company[] = Array.isArray((t as any)?.companies) ? (t as any).companies : [];

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-gray-50 text-gray-900"
      style={{
        background:
          "radial-gradient(1000px 420px at 20% -10%, rgba(16,185,129,0.05), transparent 60%), radial-gradient(900px 420px at 80% 0%, rgba(16,185,129,0.06), transparent 60%)",
      }}
    >
      {/* 1- هيرو */}
      <Hero isRTL={isRTL} isAR={isAR} t={t} companies={companies} logoGroup={logoGroup} />

      {/* 2- عن الشركة */}
      <About_Us isRTL={isRTL} isAR={isAR} t={t} logoGroup={logoGroup} />

      {/* 3- منتجاتنا */}
      <Our_Products isRTL={isRTL} isAR={isAR} t={t} logos={{ logoGayath, logoHamdi, logoSina, logoAlzab, logoHima, logoHadiCap, logoGroup }} />

      {/* 4- آخر الأخبار */}
      <Latest_News isRTL={isRTL} isAR={isAR} t={t} />

      {/* 5- لماذا تختارنا */}
      <Why_Choose_Us isRTL={isRTL} isAR={isAR} t={t} logoGroup={logoGroup} />

      {/* 6- الصناعات التي نخدمها */}
      <Industries_We_Serve isRTL={isRTL} isAR={isAR} t={t} />

      {/* 7- شبكة الموزعين */}
      {/*يمكن اضافة شبكة الموزعين من المسار الاتي 
      scr/components/home/Distributor_Network.tsx
      */}
      {/* 8- أسئلة وأجوبة */}
      <FQA isRTL={isRTL} isAR={isAR} t={t} />

      {/* 9- تواصل معنا */}
      <Contact_Us isRTL={isRTL} isAR={isAR} t={t} />
    </div>
  );
}
