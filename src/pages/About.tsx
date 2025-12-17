// src/pages/About.tsx
import React, { useMemo, useEffect, useRef } from "react";
import {
  Users,
  Factory,
  Target,
  Zap,
  Puzzle,
  CheckCircle,
  Package,
  RefreshCw,
  Layers,
  Tractor,
  Coffee,
  Droplet,
} from "lucide-react";

// ✅ استيراد الشعارات من المسار الصحيح (مستوى واحد للأعلى)
import alzabLogo from "../assets/img/logo/alzab.png";
import gayathLogo from "../assets/img/logo/gayath.png";
import hadiCapLogo from "../assets/img/logo/hadi_cap.png";
import hamdiLogo from "../assets/img/logo/hamdi_factory.png";
import himaLogo from "../assets/img/logo/hima1.png";
import sinaLogo from "../assets/img/logo/sina.png";
import groupLogo from "../assets/img/logo/hadi_group.png";

// --- INTERFACES ---
interface Translation {
  title: string;
  intro: string;
  introParagraph1: string;
  introParagraph2: string;
  metric1_value: string;
  metric1_label: string;
  metric2_value: string;
  metric2_label: string;
  metric3_value: string;
  metric3_label: string;
  metric4_value: string;
  metric4_label: string;
  visualCardLabel: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  valuesTitle: string;
  valuesText: string;
  factoriesTitle: string;
  factoriesIntro: string;
  historyTitle: string;
  whyUsTitle: string;
  whyUsSubtitle: string;
  aboutTag: string;
  philosophyTag: string;
  factoriesTag: string;
  journeyTag: string;
  whyUsTag: string;
  establishedSince: string;
  specialty: string;
  mainProducts: string;
}

interface AboutUsProps {
  isRTL: boolean;
  isAR: boolean;
  t: Partial<Translation>;
}

// --- TRANSLATIONS ---
const translations = {
  ar: {
    title: "عن مجموعة هادي",
    aboutTag: "عن المجموعة",
    introParagraph1:
      '<strong class="font-bold text-emerald-700">مجموعة هادي</strong> عام 1975 كشركة رائدة في مجال الصناعات البلاستيكية في العراق. على مدى أكثر من <strong class="font-bold">50 عامًا</strong>، نمت المجموعة لتصبح واحدة من أكبر المجموعات الصناعية في المنطقة، متخصصة في إنتاج مجموعة واسعة من المنتجات البلاستيكية عالية الجودة.',
    introParagraph2:
      "نلتزم بأعلى معايير الجودة والابتكار، ونلبي احتياجات عملائنا بمنتجات متطورة وخدمات متقنة. رؤيتنا: أن نكون الخيار الأول للمنتجات البلاستيكية في المنطقة.",
    metric1_value: "50+",
    metric1_label: "عام من الخبرة",
    metric2_value: "700+",
    metric2_label: "موظف وعامل",
    metric3_value: "50,000+",
    metric3_label: "طن إنتاج سنوي",
    metric4_value: "6",
    metric4_label: "مصنع وكيان صناعي",
    visualCardLabel: "هيكل مجموعة هادي",
    whyUsTitle: "لماذا نحن",
    whyUsSubtitle: "ركائز قيمة متينة تدعم القطاعات الصناعية",
    whyUsTag: "لماذا تختارنا",
    missionTitle: "رسالتنا",
    missionText:
      "توفير حلول بلاستيكية مبتكرة ومستدامة تفوق توقعات الأسواق الإقليمية، مع الالتزام الصارم بمعايير الجودة العالمية.",
    visionTitle: "رؤيتنا",
    visionText:
      "أن نكون المجموعة الصناعية الرائدة والأكثر تأثيراً في الشرق الأوسط، والمثال الأعلى في الابتكار الصناعي والاستدامة.",
    valuesTitle: "قيمنا",
    valuesText:
      "الجودة أولاً، الابتكار المستمر، النزاهة والشفافية، والمسؤولية تجاه المجتمع والبيئة.",
    philosophyTag: "فلسفتنا",
    factoriesTitle: "مصانع المجموعة ووحدات الإنتاج الستة",
    factoriesIntro:
      "تمتلك مجموعة هادي شبكة من ستة مصانع متطورة، كل منها متخصص في قطاع حيوي لضمان تنوع وجودة المنتجات البلاستيكية المقدمة للأسواق الصناعية والزراعية والبنية التحتية.",
    factoriesTag: "شبكة المصانع",
    historyTitle: "قصتنا عبر الزمن",
    journeyTag: "مسيرتنا",
    establishedSince: "منذ",
    specialty: "التخصص",
    mainProducts: "المنتجات",
  },
  en: {
    title: "About Hadi Group",
    aboutTag: "About Us",
    introParagraph1:
      '<strong class="font-bold text-emerald-700">Hadi Group</strong> was established in 1975 as a leading company in the plastic industry in Iraq. Over more than <strong class="font-bold">50 years</strong>, the group has grown to become one of the largest industrial groups in the region, specializing in producing a wide range of high-quality plastic products.',
    introParagraph2:
      "We are committed to the highest standards of quality and innovation, meeting our customers' needs with advanced products and excellent services. Our vision: to be the first choice for plastic products in the region.",
    metric1_value: "50+",
    metric1_label: "Years of Experience",
    metric2_value: "700+",
    metric2_label: "Employees",
    metric3_value: "50,000+",
    metric3_label: "Tons Annual Production",
    metric4_value: "6",
    metric4_label: "Factories & Entities",
    visualCardLabel: "Hadi Group Structure",
    whyUsTitle: "Why Choose Us",
    whyUsSubtitle: "Strong value pillars supporting industrial sectors",
    whyUsTag: "Why Us",
    missionTitle: "Our Mission",
    missionText:
      "Providing innovative and sustainable plastic solutions that exceed regional market expectations, with strict commitment to global quality standards.",
    visionTitle: "Our Vision",
    visionText:
      "To be the leading and most influential industrial group in the Middle East, and the ideal example in industrial innovation and sustainability.",
    valuesTitle: "Our Values",
    valuesText:
      "Quality first, continuous innovation, integrity and transparency, and responsibility towards society and the environment.",
    philosophyTag: "Our Philosophy",
    factoriesTitle: "Our Six Manufacturing Facilities",
    factoriesIntro:
      "Hadi Group owns a network of six advanced factories, each specialized in a vital sector to ensure diversity and quality of plastic products provided to industrial, agricultural, and infrastructure markets.",
    factoriesTag: "Our Factories",
    historyTitle: "Our Journey Through Time",
    journeyTag: "Our Journey",
    establishedSince: "Since",
    specialty: "Specialty",
    mainProducts: "Products",
  },
};

// --- SUB-COMPONENTS ---
interface StatCardProps {
  value: string;
  label: string;
  index: number;
}
const StatCard = ({ value, label, index }: StatCardProps) => (
  <div
    className="stat-card rounded-2xl bg-white shadow-lg border border-gray-100 px-6 py-8 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 animate-scaleIn"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="text-emerald-600 text-4xl font-extrabold mb-2">{value}</div>
    <div className="text-gray-600 text-sm font-medium">{label}</div>
  </div>
);

interface MvvCardProps {
  Icon: React.ElementType;
  title: string;
  text: string;
  color: string;
  number: string;
}
const MVVCard = ({ Icon, title, text, color, number }: MvvCardProps) => (
  <div className="mvv-card group relative flex flex-col items-center p-8 rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-scaleIn">
    <div className="absolute top-6 left-6 text-7xl font-bold text-gray-100 select-none">
      {number}
    </div>
    <div
      className={`relative z-10 grid place-items-center h-20 w-20 rounded-2xl ${color} text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
    >
      <Icon className="h-10 w-10" strokeWidth={2} />
    </div>
    <h3 className="mt-6 text-2xl font-bold text-gray-900 text-center">{title}</h3>
    <p className="mt-4 text-center text-gray-600 text-base leading-relaxed">{text}</p>
  </div>
);

interface TimelineItemProps {
  year: string;
  description: string;
  isLast: boolean;
  index: number;
}
const TimelineItem = ({ year, description, isLast, index }: TimelineItemProps) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className="timeline-item group relative pb-16 md:pb-20 animate-fadeInUp" style={{ animationDelay: `${index * 0.15}s` }}>
      <div className="relative flex items-center">
        {/* Left Card (Even Index) */}
        {isEven && (
          <div className="w-full md:w-5/12 me-auto">
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {year}
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        )}

        {/* Central Timeline Line & Node */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
          {/* Timeline Node */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-base md:text-lg">{year}</span>
          </div>
          {/* Timeline Line (if not last) */}
          {!isLast && (
            <div className="w-1 h-full min-h-16 bg-emerald-500 mt-2"></div>
          )}
        </div>

        {/* Right Card (Odd Index) */}
        {!isEven && (
          <div className="w-full md:w-5/12 ms-auto">
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {year}
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface FactoryCardProps {
  name: string;
  nameEn: string;
  date: string;
  description: string;
  descriptionEn: string;
  products: string;
  productsEn: string;
  icon: React.ElementType;
  color: string;
  isRTL: boolean;
  isAR: boolean;
  logo?: string;
  establishedSince: string;
  specialty: string;
  mainProducts: string;
}
const FactoryCard = ({
  name,
  nameEn,
  date,
  description,
  descriptionEn,
  products,
  productsEn,
  icon: Icon,
  color,
  isRTL,
  isAR,
  logo,
  establishedSince,
  specialty,
  mainProducts,
}: FactoryCardProps) => {
  const displayName = isAR ? name : nameEn;
  const displayDesc = isAR ? description : descriptionEn;
  const displayProducts = isAR ? products : productsEn;

  return (
    <div className="mvv-card group bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-md transition-all duration-300 hover:border-emerald-400 hover:shadow-xl hover:-translate-y-1">
      <div className={`flex items-start ${isRTL ? "flex-row-reverse" : "flex-row"} gap-4 mb-4`}>
        <div className="h-14 w-14 rounded-xl bg-white border-2 border-gray-200 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-300 p-2">
          {logo ? (
            <img src={logo} alt={displayName} className="h-full w-full object-contain" />
          ) : (
            <div className={`h-full w-full rounded-lg ${color} flex items-center justify-center`}>
              <Icon className="h-7 w-7 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors leading-snug">
            {displayName}
          </h4>
          <p className="text-xs text-emerald-600 mt-1 font-semibold">
            {establishedSince} {date}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed border-t-2 border-gray-100 pt-4 mt-2">
        <span className="font-bold text-emerald-700">{specialty}: </span>
        {displayDesc}
      </p>
      <p className="text-xs text-gray-600 leading-relaxed mt-3">
        <span className="font-bold text-gray-800">{mainProducts}: </span>
        {displayProducts}
      </p>
    </div>
  );
};

interface WhyUsCardProps {
  icon: React.ElementType; // ✅ تم توحيد الاسم
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  color: string;
  number: string;
  isRTL: boolean;
}
const WhyUsCard = ({
  icon: Icon,
  title,
  titleEn,
  description,
  descriptionEn,
  color,
  number,
  isRTL,
}: WhyUsCardProps) => {
  const displayTitle = isRTL ? title : titleEn;
  const displayDesc = isRTL ? description : descriptionEn;

  return (
    <div className="why-card group relative bg-white p-8 rounded-2xl border border-gray-200 shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-fadeInUp">
      <div className={`absolute top-4 ${isRTL ? "start-4" : "end-4"} text-6xl font-bold text-gray-50 select-none`}>
        {number}
      </div>
      <div
        className={`relative z-10 h-16 w-16 rounded-xl ${color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
      >
        <Icon className="h-8 w-8" strokeWidth={2} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{displayTitle}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{displayDesc}</p>
    </div>
  );
};

// --- MAIN COMPONENT (AboutUs) ---
function AboutUs({ isRTL, isAR, t: customT = {} }: AboutUsProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);

  const lang = isAR ? "ar" : "en";
  const t: Translation = useMemo(
    () => ({
      ...translations[lang],
      ...customT,
    }),
    [lang, customT]
  );

  const factories = [
    {
      name: "معمل غياث الدين مادي",
      nameEn: "Ghiyath Al-Din Madi Factory",
      date: "1975",
      description:
        "المعمل المؤسس للمجموعة، متخصص في الصناعات البلاستيكية الأولية التي تخدم القطاعين الصناعي والزراعي في العراق.",
      descriptionEn:
        "The founding factory of the group, specialized in primary plastic industries serving industrial and agricultural sectors in Iraq.",
      products: "منتجات بلاستيكية أولية، مواد خام، إنتاج سنوي يتجاوز 10,800 طن.",
      productsEn: "Primary plastic products, raw materials, annual production exceeding 10,800 tons.",
      icon: Factory,
      color: "bg-gradient-to-br from-red-500 to-red-700",
      logo: gayathLogo,
    },
    {
      name: "معمل هادي كاب",
      nameEn: "Hadi Cap Factory",
      date: "1998",
      description:
        "متخصص في إنتاج أغطية القناني والعبوات، معتمدًا على أحدث تقنيات القولبة لضمان الإغلاق الآمن.",
      descriptionEn:
        "Specialized in producing bottle caps and container lids, using latest molding technologies to ensure safe closure.",
      products:
        "أغطية بلاستيكية للمياه والعصائر والمنظفات، بذور زراعية، إنتاج شهري يصل إلى 518 مليون كاب.",
      productsEn:
        "Plastic caps for water, juices and detergents, agricultural seeds, monthly production up to 518 million caps.",
      icon: Package,
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      logo: hadiCapLogo,
    },
    {
      name: "هيما بلاستيك",
      nameEn: "Hima Plastic",
      date: "N/A",
      description:
        "وحدة متخصصة في تصنيع أنابيب البولي إيثيلين (PE) عالية الجودة وفقًا للمواصفات الأوروبية.",
      descriptionEn:
        "Unit specialized in manufacturing high-quality Polyethylene (PE) pipes according to European specifications.",
      products:
        "أنابيب PE للري الزراعي وشبكات المياه والبنية التحتية ووصلات مطابقة للمعايير.",
      productsEn:
        "PE pipes for agricultural irrigation, water networks, infrastructure and standard-compliant fittings.",
      icon: Layers,
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
      logo: himaLogo,
    },
    {
      name: "معمل الزاب",
      nameEn: "Al-Zab Factory",
      date: "2018",
      description:
        "يركز على حلول التغليف الزراعي المتقدمة والري، وتصنيع أغشية الأسمدة لنباتات PET.",
      descriptionEn:
        "Focuses on advanced agricultural packaging and irrigation solutions, manufacturing fertilizer films for PET plants.",
      products: "أغشية بلاستيكية للري، عبوات PET، وإنتاج سنوي يتجاوز 18,000 طن.",
      productsEn: "Plastic irrigation films, PET containers, annual production exceeding 18,000 tons.",
      icon: Droplet,
      color: "bg-gradient-to-br from-cyan-500 to-cyan-700",
      logo: alzabLogo,
    },
    {
      name: "معمل حميدي نظام الدين",
      nameEn: "Hamidi Nizam Al-Din Factory",
      date: "2017",
      description:
        "معمل متخصص في إنتاج أغطية وعبوات المواد الكبريتية والمشروبات والمنظفات المنزلية.",
      descriptionEn:
        "Factory specialized in producing caps and containers for sulfuric materials, beverages and household detergents.",
      products:
        "أغطية وعبوات للمنظفات السائلة والمشروبات، بإنتاج شهري يتجاوز 240,000 علبة.",
      productsEn:
        "Caps and containers for liquid detergents and beverages, monthly production exceeding 240,000 units.",
      icon: Coffee,
      color: "bg-gradient-to-br from-orange-500 to-orange-700",
      logo: hamdiLogo,
    },
    {
      name: "معمل سيناء",
      nameEn: "Sinai Factory",
      date: "2018",
      description:
        "متخصص في دعم القطاع الزراعي بإنتاج القصبات والبذور للبيوت الزجاجية والمزارع الحديثة.",
      descriptionEn:
        "Specialized in supporting agricultural sector by producing straws and seeds for greenhouses and modern farms.",
      products:
        "قصبات بلاستيكية زراعية، بذور معالجة، إنتاج شهري يتجاوز 241 مليون وحدة.",
      productsEn:
        "Agricultural plastic straws, treated seeds, monthly production exceeding 241 million units.",
      icon: Tractor,
      color: "bg-gradient-to-br from-green-500 to-green-700",
      logo: sinaLogo,
    },
  ];

  const timelineEvents = isAR
    ? [
        {
          year: "1975",
          description:
            "تأسيس معمل غياث الدين مادي، نقطة البداية للمجموعة والتركيز على الصناعات البلاستيكية الأولية في العراق.",
        },
        {
          year: "1998",
          description:
            "تأسيس معمل هادي كاب، إيذاناً ببدء التوسع في قطاع الأغطية والعبوات الغذائية.",
        },
        {
          year: "2017-2018",
          description:
            "قفزة نوعية بتأسيس معامل سيناء والزاب وحميدي لتعزيز الابتكار في القطاع الزراعي والتغليف المتقدم وزيادة الطاقة الإنتاجية.",
        },
        {
          year: "Today",
          description:
            "مجموعة هادي تتحول إلى واحدة من أكبر المجموعات الصناعية في الشرق الأوسط بستة مصانع متكاملة.",
        },
      ]
    : [
        {
          year: "1975",
          description:
            "Establishment of Ghiyath Al-Din Madi Factory, the starting point for the group focusing on primary plastic industries in Iraq.",
        },
        {
          year: "1998",
          description:
            "Establishment of Hadi Cap Factory, marking the beginning of expansion in the caps and food packaging sector.",
        },
        {
          year: "2017-2018",
          description:
            "A qualitative leap with the establishment of Sinai, Al-Zab and Hamidi factories to enhance innovation in agricultural sector and advanced packaging, increasing production capacity.",
        },
        {
          year: "Today",
          description:
            "Hadi Group transforms into one of the largest industrial groups in the Middle East with six integrated factories.",
        },
      ];

  const whyUsReasons: Array<Omit<WhyUsCardProps, "isRTL">> = [
    {
      icon: Target,
      title: "الثقة المتبادلة",
      titleEn: "Mutual Trust",
      description:
        "بأكثر من 50 عامًا من الخبرة، نقدم حلولاً موثوقة تلبي توقعاتكم وتتجاوزها في كل مرة.",
      descriptionEn:
        "With over 50 years of experience, we provide reliable solutions that meet and exceed your expectations every time.",
      color: "bg-gradient-to-br from-pink-500 to-rose-600",
      number: "01",
    },
    {
      icon: Package,
      title: "حلول مصممة خصيصاً",
      titleEn: "Customized Solutions",
      description:
        "نؤمن بقوة التخصيص، كل منتج يتم تصميمه ليعكس متطلباتكم الفريدة ويحقق أهدافكم.",
      descriptionEn:
        "We believe in the power of customization, each product is designed to reflect your unique requirements and achieve your goals.",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      number: "02",
    },
    {
      icon: CheckCircle,
      title: "الجودة والسلامة",
      titleEn: "Quality & Safety",
      description:
        "سلامتكم ورضاكم أولويتنا القصوى، نلتزم بأعلى معايير الجودة المعتمدة عالمياً.",
      descriptionEn:
        "Your safety and satisfaction are our top priority, we adhere to the highest globally recognized quality standards.",
      color: "bg-gradient-to-br from-emerald-500 to-teal-600",
      number: "03",
    },
    {
      icon: Zap,
      title: "الابتكار المستمر",
      titleEn: "Continuous Innovation",
      description:
        "نستثمر في البحث والتطوير لنقدم لكم أحدث الحلول التقنية في صناعة البلاستيك.",
      descriptionEn:
        "We invest in research and development to provide you with the latest technical solutions in plastic industry.",
      color: "bg-gradient-to-br from-violet-500 to-purple-600",
      number: "04",
    },
    {
      icon: Users,
      title: "التميز في الخدمة",
      titleEn: "Service Excellence",
      description:
        "فريقنا المتخصص جاهز لتقديم الدعم والمشورة في كل خطوة من رحلتكم معنا.",
      descriptionEn:
        "Our specialized team is ready to provide support and advice at every step of your journey with us.",
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
      number: "05",
    },
    {
      icon: Layers,
      title: "الاستدامة البيئية",
      titleEn: "Environmental Sustainability",
      description:
        "نلتزم بحماية البيئة من خلال ممارسات إنتاج مستدامة ومواد صديقة للبيئة.",
      descriptionEn:
        "We are committed to protecting the environment through sustainable production practices and eco-friendly materials.",
      color: "bg-gradient-to-br from-lime-500 to-green-600",
      number: "06",
    },
  ];

  // CSS animations are handled via classes

  const renderHtml = (html: string) => ({ __html: html });

  return (
    <div dir={isAR ? "rtl" : "ltr"} className="bg-gradient-to-b from-gray-50 to-white font-sans min-h-screen">
      <div ref={sectionRef} className="container mx-auto px-4 py-16 md:py-24">
        {/* HERO HEADER */}
        <header ref={headerRef} className="mb-16 md:mb-20 text-center animate-fadeInDown">
          <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-3 text-emerald-700 shadow-md mb-6">
            <Users className="h-5 w-5" />
            <span className="text-sm font-bold uppercase tracking-wider">{t.aboutTag}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            {t.title}
          </h1>

          <div className="flex justify-center">
            <span className="block h-1.5 w-24 md:w-32 rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600" />
          </div>
        </header>

        {/* VISUAL CARD & INTRO */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div
            ref={cardRef}
            className="rounded-3xl p-10 shadow-2xl text-white bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 relative overflow-hidden animate-fadeIn"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>
            <div className="relative z-10 grid place-items-center h-64">
              <img
                src={groupLogo}
                alt="Hadi Group Logo"
                className="h-32 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <Factory className="h-32 w-32 text-white opacity-90 hidden" strokeWidth={1.5} />
            </div>
            <p className="relative z-10 text-center text-xl font-bold text-white border-t border-white/30 pt-6">
              {t.visualCardLabel}
            </p>
          </div>

          <div ref={introRef} className="text-gray-700 leading-relaxed space-y-6 animate-fadeIn">
            <p className="text-lg" dangerouslySetInnerHTML={renderHtml(t.introParagraph1)} />
            <p
              className="text-lg border-s-4 border-emerald-500 ps-4 bg-emerald-50 py-4 rounded"
              dangerouslySetInnerHTML={renderHtml(t.introParagraph2)}
            />
          </div>
        </div>

        {/* STATISTICS */}
        <div className="mt-16 md:mt-20 mb-24 md:mb-32 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          <StatCard value={t.metric1_value} label={t.metric1_label} index={0} />
          <StatCard value={t.metric2_value} label={t.metric2_label} index={1} />
          <StatCard value={t.metric3_value} label={t.metric3_label} index={2} />
          <StatCard value={t.metric4_value} label={t.metric4_label} index={3} />
        </div>

        {/* WHY US SECTION */}
        <section className="why-us-section mb-24 md:mb-32">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-100 to-emerald-100 px-5 py-2 text-teal-700 mb-4">
              <span className="text-sm font-bold uppercase tracking-wider">{t.whyUsTag}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              {t.whyUsTitle}
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-12 md:mb-16">
              {t.whyUsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {whyUsReasons.map((reason, index) => (
              <WhyUsCard key={index} {...reason} isRTL={isAR} />
            ))}
          </div>
        </section>

        {/* MISSION, VISION, VALUES */}
        <section className="mvv-section mb-24 md:mb-32">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-5 py-2 text-blue-700 mb-4">
              <Target className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wider">{t.philosophyTag}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12 md:mb-16">
              {isAR ? "الأسس التي نبني عليها" : "The Foundations We Build Upon"}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-10 max-w-7xl mx-auto">
            <MVVCard
              Icon={Target}
              title={t.missionTitle}
              text={t.missionText}
              color="bg-gradient-to-br from-emerald-500 to-teal-600"
              number="01"
            />
            <MVVCard
              Icon={Zap}
              title={t.visionTitle}
              text={t.visionText}
              color="bg-gradient-to-br from-blue-500 to-indigo-600"
              number="02"
            />
            <MVVCard
              Icon={Puzzle}
              title={t.valuesTitle}
              text={t.valuesText}
              color="bg-gradient-to-br from-purple-500 to-pink-600"
              number="03"
            />
          </div>
        </section>

        {/* FACTORIES SECTION */}
        <section className="mb-24 md:mb-32">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-5 py-2 text-orange-700 mb-4">
              <Factory className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wider">{t.factoriesTag}</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
              {t.factoriesTitle}
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto mb-12 md:mb-16">
              {t.factoriesIntro}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {factories.map((factory, index) => (
              <FactoryCard
                key={index}
                {...factory}
                isRTL={isAR}
                isAR={isAR}
                establishedSince={t.establishedSince}
                specialty={t.specialty}
                mainProducts={t.mainProducts}
              />
            ))}
          </div>
        </section>

        {/* HISTORY/TIMELINE */}
        <section className="timeline-section mb-12 md:mb-16 relative">
          <div className="relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 px-5 py-2 text-cyan-700 mb-6">
                <RefreshCw className="h-5 w-5" />
                <span className="text-sm font-bold uppercase tracking-wider">{t.journeyTag}</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                {t.historyTitle}
              </h2>
              <div className="flex justify-center mt-6">
                <span className="block h-1 w-24 md:w-32 rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600"></span>
              </div>
            </div>

            <div className="max-w-6xl mx-auto relative px-4">
              {/* Central Timeline Line (Background) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-emerald-500 hidden md:block"></div>
              
              {/* Main Timeline Container */}
              <div className="relative">
                {timelineEvents.map((item, index) => (
                  <TimelineItem
                    key={index}
                    year={item.year}
                    description={item.description}
                    isLast={index === timelineEvents.length - 1}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// --- صفحة About (تحدد اللغة والاتجاه ثم تعرض AboutUs) ---
export default function About() {
  // من باب البساطة: Arabic افتراضيًا
  const isAR = true;
  return <AboutUs isRTL={isAR} isAR={isAR} t={{}} />;
}
