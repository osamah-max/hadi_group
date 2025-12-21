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
  X,
  Download,
  Maximize2,
  Image as ImageIcon,
  FileText,
  Ruler,
  Box,
  Layers,
} from "lucide-react";
import useDir from "../../hooks/useDir";
import logoGayath from "../../assets/img/logo/gayath.png";
import factoryHero from "../../assets/img/backgrounds/gayath_hero.jpg";

// Product images - سيتم استبدالها بالصور الجديدة لاحقاً
import gyath1 from "../../assets/img/products/product/gyath/gyath@3x.png";
import gyath2 from "../../assets/img/products/product/gyath/gyath2@3x.png";
import gyath3 from "../../assets/img/products/product/gyath/gyath3@3x.png";
import gyath4 from "../../assets/img/products/product/gyath/gyath4@3x.png";
// TODO: إضافة الصور الجديدة:
// - fruitVegetableBag (أكياس حفظ وتخزين الخضر والفواكه)
// - mulchFilm (أفلام التغطية الزراعية)
// - heatShield (الستارة الحرارية)
// - solarizationFilm (أفلام بلاستيكية للتشميس)
// - greenhouseFilm (غطاء بلاستيكي للدفيئة)

// البيانات الثابتة
const HQ = {
  lat: 33.312,
  lng: 44.445,
  address: {
    ar: "العراق - كركوك - الحي الصناعي | كركوك - دارمان",
    en: "Iraq - Kirkuk - Industrial District | Kirkuk - Daraman"
  },
  phones: ["07701300995", "07811129492"],
  email: "gayath@hadigroup.iq",
  mapUrl: "https://maps.google.com/maps?q=Industrial+District,+Kirkuk,+Iraq&output=embed&z=14"
};

const mapSrc = (hq: typeof HQ) => 
  hq.mapUrl || `https://maps.google.com/maps?q=${hq.lat},${hq.lng}&z=14&output=embed`;

// الترجمات
const translations = {
  ar: {
    factoryName: "مصنع غياث",
    tagline: "ريادة • جودة • ابتكار",
    heroDesc: "متخصصون في إنتاج المنتجات الصناعية عالية الجودة وحلول التعبئة والتغليف للمشاريع الكبرى والمنشآت الصناعية.",
    requestQuote: "اطلب عرض سعر",
    downloadCatalog: "تحميل الكتالوج",
    aboutUs: "من نحن",
    aboutFactory: "نبذة عن المصنع",
    aboutText: "مصنع غياث هو المعمل المؤسس لمجموعة هادي، تأسس عام 1975. متخصص في الصناعات البلاستيكية الأولية التي تخدم القطاعين الصناعي والزراعي في العراق. نستخدم أحدث التقنيات الصناعية لضمان جودة عالية ومعايير إنتاج دقيقة.",
    manufacturingCapabilities: "القدرات التصنيعية",
    ourProducts: "منتجاتنا",
    productsDesc: "تشكيلة واسعة من المنتجات الصناعية عالية الجودة مع إمكانية التخصيص الكامل",
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
      { value: "50+", label: "عام خبرة" },
      { value: "10K+", label: "طن إنتاج سنوي" },
      { value: "95%", label: "التزام التوريد" },
      { value: "ISO", label: "معايير الجودة" },
    ],
    capabilities: [
      "إنتاج أنابيب بلاستيكية صناعية بأقطار متعددة",
      "تجهيزات بلاستيكية عالية الجودة للمشاريع الكبرى",
      "عبوات صناعية للمواد الكيماوية والصناعية",
      "حلول تعبئة وتغليف متكاملة",
      "تخصيص كامل حسب احتياجات المشروع",
      "ضمان الجودة وفق المعايير العالمية",
    ],
    advantages: [
      { title: "جودة معتمدة", desc: "مواد خام معتمدة ومعايير فحص جودة على كل دفعة إنتاج" },
      { title: "خبرة طويلة", desc: "أكثر من 50 عامًا من الخبرة في تصنيع البلاستيك الصناعي" },
      { title: "تخصيص كامل", desc: "حلول مصممة خصيصاً لمتطلبات مشروعك" },
      { title: "دعم فني", desc: "فريق هندسي متخصص وخدمة ما بعد البيع" },
      { title: "موثوقية التوريد", desc: "تخطيط إنتاج مرن مع مخزون أمان يضمن الاستمرارية" },
      { title: "كفاءة تكلفة", desc: "تحسينات تصميم تقلل الهدر وتضبط التكاليف" },
    ],
    industries: [
      { title: "الصناعة", desc: "منتجات بلاستيكية للمشاريع الصناعية الكبرى" },
      { title: "الزراعة", desc: "حلول بلاستيكية للقطاع الزراعي والري" },
      { title: "البنية التحتية", desc: "أنابيب وتجهيزات لشبكات المياه والصرف" },
    ],
    sustainability: [
      { title: "خامات قابلة للتدوير", desc: "اختيارات مواد متوافقة مع سلاسل التدوير" },
      { title: "تقليل الهدر", desc: "تحسين مستمر للعمليات لتقليل المخلفات" },
      { title: "سلامة وتشغيل", desc: "معايير سلامة عالية وأنظمة إطفاء متقدمة" },
    ],
    products: [
      {
        title: "أكياس حفظ وتخزين الخضر والفواكه",
        img: gyath1,
        desc: "أكياس بلاستيكية لحفظ وتخزين مختلف أنواع الخضر والفواكه مثل الخيار والجزر والطماطم والباذنجان والرمان والموز. مصنعة بمادة مضادة للضباب لمنع تراكم الرطوبة داخل الكيس. متوفرة مع أو بدون ثقوب حسب الطلب.",
        specs: {
          material: "بلاستيك",
          feature1: "مضاد للضباب",
          feature2: "متوفر مع أو بدون ثقوب",
          applications: "حفظ وتخزين الخضر والفواكه",
          benefits: "حماية المحتويات من العوامل الخارجية، الحفاظ على النضارة، تأخير تدهور المنتج",
        },
        additionalImages: [gyath1],
        contextImage: gyath1,
        technicalDrawing: gyath1,
        pdfUrl: "#",
      },
      {
        title: "أفلام التغطية الزراعية",
        img: gyath2,
        desc: "أفلام بلاستيكية خاصة لتغطية التربة في الزراعة. تمنع تطور الأعشاب الضارة، تمنع التربة من الجفاف، تمنع تبخر الماء من سطح التربة، تحمي درجة حرارة التربة، وتمنع تلوث الثمار القريبة من الأرض.",
        specs: {
          durability: "حتى 24 شهراً في طبقة واحدة",
          thickness: "20، 30، 40، 50، 60 ميكرون",
          colors: "أسود، أسود-أبيض، أسود-فضي رمادي، أخضر، أصفر-بني",
          applications: "تغطية التربة الزراعية",
          benefits: "منع الأعشاب، الحفاظ على الرطوبة، حماية التربة، تنظيف الثمار",
        },
        additionalImages: [gyath2],
        contextImage: gyath2,
        technicalDrawing: gyath2,
        pdfUrl: "#",
      },
      {
        title: "الستارة الحرارية",
        img: gyath3,
        desc: "خاصة في المناطق ذات المناخ البارد، تستخدم في الدفيئة أو البيت البلاستيكي لمنع فقدان الحرارة ومنع تساقط قطرات الماء بالتنقيط على النبات.",
        specs: {
          manufacturing: "شفافة في سمك طبقة واحدة",
          thickness: "20-25-30-40 ميكرون",
          additives: "UV، IR، AF (مضاد للضباب) حسب الطلب",
          applications: "الدفيئات الزراعية، البيوت البلاستيكية",
          benefits: "منع فقدان الحرارة، منع تساقط قطرات الماء، حماية النباتات",
        },
        additionalImages: [gyath3],
        contextImage: gyath3,
        technicalDrawing: gyath3,
        pdfUrl: "#",
      },
      {
        title: "أفلام بلاستيكية للتشميس",
        img: gyath4,
        desc: "أفلام بلاستيكية للتشميس لمكافحة الآفات الضارة والحشرات. مع تغطية الأرض بفيلم التشميس، يسمح بتسخينها بواسطة الطاقة الشمسية، مما يؤدي إلى تنظيف الأرض من الأمراض المنقولة عن طريق التربة مثل النيماتودا والأعشاب الضارة.",
        specs: {
          purpose: "معالجة التربة بالطاقة الشمسية",
          applications: "تغطية التربة الزراعية",
          benefits: "مكافحة النيماتودا، القضاء على الأعشاب الضارة، تنظيف التربة من الأمراض",
          method: "استخدام الطاقة الشمسية لتسخين التربة",
        },
        additionalImages: [gyath4],
        contextImage: gyath4,
        technicalDrawing: gyath4,
        pdfUrl: "#",
      },
      {
        title: "غطاء بلاستيكي للدفيئة",
        img: gyath1,
        desc: "أفلام بلاستيكية عالية الجودة لتغطية الدفيئات الزراعية. مصنعة بتقنية القذف الثلاثي. متوفرة بأحجام ومقاسات وسمك مختلف حسب خصوصيات المنطقة المرغوب التسويق لها.",
        specs: {
          technology: "تقنية القذف الثلاثي",
          warranty: "9، 12، 24، 36، 60 شهراً",
          treatments: "التأثير الحراري، تحسين الانتشار الضوئي، التأثير المضاد للعرق",
          customization: "أحجام ومقاسات وسمك مختلف حسب المنطقة",
          additives: "إضافات مختلفة حسب ظروف الطقس",
          applications: "الدفيئات الزراعية، البيوت البلاستيكية",
        },
        additionalImages: [gyath1],
        contextImage: gyath1,
        technicalDrawing: gyath1,
        pdfUrl: "#",
      },
      {
        title: "شرنك فلم",
        img: gyath2,
        desc: "يستخدم لتغليف المنتجات وغيرها. مادة مصنوعة من فيلم البلاستيك البوليمر، عندما تمرر عليها الحرارة تنكمش بإحكام على المنتج الذي تغلفه. مصنوعة من البولي ايثيلين منخفض الكثافة بلاستيكي يلف حول المنتج.",
        specs: {
          material: "بولي ايثيلين منخفض الكثافة",
          type: "فيلم بلاستيكي بوليمر",
          process: "ينكمش بإحكام عند تطبيق الحرارة",
          applications: "تغليف المنتجات، المشروبات، المعلبات",
          features: "يغلف المنتج بإحكام عند التعرض للحرارة",
        },
        additionalImages: [gyath2],
        contextImage: gyath2,
        technicalDrawing: gyath2,
        pdfUrl: "#",
      },
      {
        title: "شرنك فلم مطبوع",
        img: gyath3,
        desc: "تستخدم هذا النوعية في تغليف المشروبات الغازية والمياه المعدنية والمعلبات باستخدام أفران حراري أو النار المباشر. متوفر بألوان وتصاميم مطبوعة حسب الطلب.",
        specs: {
          material: "بولي ايثيلين منخفض الكثافة",
          type: "فيلم بلاستيكي مطبوع",
          process: "ينكمش بإحكام عند تطبيق الحرارة",
          applications: "المشروبات الغازية، المياه المعدنية، المعلبات",
          features: "مطبوع بألوان وتصاميم، يستخدم مع أفران حراري أو النار المباشر",
        },
        additionalImages: [gyath3],
        contextImage: gyath3,
        technicalDrawing: gyath3,
        pdfUrl: "#",
      },
      {
        title: "ستريج فلم",
        img: gyath4,
        desc: "ننتج رولات الاسترتش فيلم عالية الجودة والتي تستخدم في تغليف المنتجات والبالتات. نتميز بإنتاج أي مواصفة خاصة يتم طلبها حيث أننا نقوم بإنتاج ميكرون يبدأ من 17 ميكرون وحتى 40 ميكرون كما ننتج مقاسات تبدأ من 25 سم إلى 100 سم.",
        specs: {
          material: "بلاستيك قابل للتمدد",
          thickness: "17 إلى 40 ميكرون",
          sizes: "25 سم إلى 100 سم",
          applications: "تغليف المنتجات، تغليف البالتات",
          features: "عالي الجودة، قابل للتمدد، مواصفات خاصة حسب الطلب",
        },
        additionalImages: [gyath4],
        contextImage: gyath4,
        technicalDrawing: gyath4,
        pdfUrl: "#",
      },
      {
        title: "ستريج هود",
        img: gyath1,
        desc: "الفيلم القابل للتقلص يستعمل للحفظ والحماية. يسمح بحماية المنتجات ضد كل العوامل الخارجية من العبار أشعة شمسية. يصنع على شكل رولات أو أكياس مزودة بخاصية حماية ضد الأشعة فوق البنفسجية.",
        specs: {
          material: "بلاستيك قابل للتقلص",
          form: "رولات أو أكياس",
          protection: "حماية ضد الأشعة فوق البنفسجية",
          applications: "تغليف البالتات، الحفظ والحماية",
          features: "حماية ضد العوامل الخارجية، حماية من أشعة الشمس، تثبيت بالأشعة فوق البنفسجية",
        },
        additionalImages: [gyath1],
        contextImage: gyath1,
        technicalDrawing: gyath1,
        pdfUrl: "#",
      },
    ],
  },
  en: {
    factoryName: "Gayath Factory",
    tagline: "Leadership • Quality • Innovation",
    heroDesc: "Specialized in producing high-quality industrial products and packaging solutions for major projects and industrial facilities.",
    requestQuote: "Request Quote",
    downloadCatalog: "Download Catalog",
    aboutUs: "About Us",
    aboutFactory: "About the Factory",
    aboutText: "Gayath Factory is the founding factory of Hadi Group, established in 1975. Specialized in primary plastic industries serving industrial and agricultural sectors in Iraq. We use the latest industrial technologies to ensure high quality and precise production standards.",
    manufacturingCapabilities: "Manufacturing Capabilities",
    ourProducts: "Our Products",
    productsDesc: "Wide range of high-quality industrial products with full customization capabilities",
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
      { value: "50+", label: "Years Experience" },
      { value: "10K+", label: "Tons Annual Production" },
      { value: "95%", label: "Supply Commitment" },
      { value: "ISO", label: "Quality Standards" },
    ],
    capabilities: [
      "Production of industrial plastic pipes in various diameters",
      "High-quality plastic fittings for major projects",
      "Industrial containers for chemicals and industrial materials",
      "Integrated packaging solutions",
      "Full customization according to project needs",
      "Quality assurance according to international standards",
    ],
    advantages: [
      { title: "Certified Quality", desc: "Certified raw materials and quality inspection standards on every production batch" },
      { title: "Long Experience", desc: "Over 50 years of experience in industrial plastic manufacturing" },
      { title: "Full Customization", desc: "Solutions designed specifically for your project requirements" },
      { title: "Technical Support", desc: "Specialized engineering team and after-sales service" },
      { title: "Supply Reliability", desc: "Flexible production planning with safety stock ensures continuity" },
      { title: "Cost Efficiency", desc: "Design improvements reduce waste and control costs" },
    ],
    industries: [
      { title: "Industry", desc: "Plastic products for major industrial projects" },
      { title: "Agriculture", desc: "Plastic solutions for agricultural sector and irrigation" },
      { title: "Infrastructure", desc: "Pipes and fittings for water and sewage networks" },
    ],
    sustainability: [
      { title: "Recyclable Materials", desc: "Material choices compatible with recycling chains" },
      { title: "Waste Reduction", desc: "Continuous process improvement to reduce waste" },
      { title: "Safety & Operations", desc: "High safety standards and advanced fire systems" },
    ],
    products: [
      {
        title: "Fruit And Vegetable Bag",
        img: gyath1,
        desc: "Plastic bags for storing and preserving various types of fruits and vegetables such as cucumber, carrot, tomatoes, aubergine, pomegranates, and bananas. Manufactured with anti-fog additive to prevent moisture accumulation inside the bag. Available with or without holes on demand.",
        specs: {
          material: "Plastic",
          feature1: "Anti-fog",
          feature2: "Available with or without holes",
          applications: "Fruit and vegetable storage",
          benefits: "Protects contents from external factors, maintains freshness, delays product deterioration",
        },
        additionalImages: [gyath1],
        contextImage: gyath1,
        technicalDrawing: gyath1,
        pdfUrl: "#",
      },
      {
        title: "Mulch Film",
        img: gyath2,
        desc: "Plastic films specially prepared for covering soil in agriculture. Prevents weed development, prevents soil drying, prevents water evaporation from soil surface, protects soil temperature, and prevents contamination of fruits close to the ground.",
        specs: {
          durability: "Up to 24 months in a single layer",
          thickness: "20, 30, 40, 50, 60 microns",
          colors: "Black, Black-White, Black-Silver Gray, Green, Yellow-Brown",
          applications: "Agricultural soil covering",
          benefits: "Weed prevention, moisture retention, soil protection, fruit cleanliness",
        },
        additionalImages: [gyath2],
        contextImage: gyath2,
        technicalDrawing: gyath2,
        pdfUrl: "#",
      },
      {
        title: "Heat Shield",
        img: gyath3,
        desc: "Especially in cold climate regions, used in greenhouse to prevent heat loss and water drops to drip on plant that condensing on greenhouse film.",
        specs: {
          manufacturing: "Transparent in a single layer thickness",
          thickness: "20-25-30-40 microns",
          additives: "UV, IR, AF (anti-fog) according to demand",
          applications: "Greenhouses, plastic houses",
          benefits: "Prevents heat loss, prevents water drops, protects plants",
        },
        additionalImages: [gyath3],
        contextImage: gyath3,
        technicalDrawing: gyath3,
        pdfUrl: "#",
      },
      {
        title: "Solarization Film",
        img: gyath4,
        desc: "Plastic films for solarization to combat harmful pests and insects. Covering the ground with solarization film allows it to be heated by solar energy, resulting in the cleaning of the soil from soil-borne diseases such as nematodes and harmful weeds.",
        specs: {
          purpose: "Soil treatment using solar energy",
          applications: "Agricultural soil covering",
          benefits: "Combats nematodes, eliminates harmful weeds, cleans soil from diseases",
          method: "Uses solar energy to heat the soil",
        },
        additionalImages: [gyath4],
        contextImage: gyath4,
        technicalDrawing: gyath4,
        pdfUrl: "#",
      },
      {
        title: "Greenhouse Film",
        img: gyath1,
        desc: "High-quality plastic films for covering agricultural greenhouses. Manufactured with triple extrusion technology. Available in various sizes, dimensions, and film thicknesses according to the specific characteristics of the desired marketing region.",
        specs: {
          technology: "Triple extrusion technology",
          warranty: "9, 12, 24, 36, 60 months",
          treatments: "Thermal effect, light diffusion improvement effect, anti-sweat effect",
          customization: "Various sizes, dimensions, and thickness according to region",
          additives: "Various additives according to weather conditions",
          applications: "Agricultural greenhouses, plastic houses",
        },
        additionalImages: [gyath1],
        contextImage: gyath1,
        technicalDrawing: gyath1,
        pdfUrl: "#",
      },
      {
        title: "Shrink Film",
        img: gyath2,
        desc: "Used for packaging products and others. A material made of polymer plastic film, when heat is passed over it, it shrinks tightly around the product it wraps. Made of low-density polyethylene plastic film that wraps around the product.",
        specs: {
          material: "Low-density polyethylene",
          type: "Polymer plastic film",
          process: "Shrinks tightly when heat is applied",
          applications: "Product packaging, beverages, canned goods",
          features: "Wraps product tightly when exposed to heat",
        },
        additionalImages: [gyath2],
        contextImage: gyath2,
        technicalDrawing: gyath2,
        pdfUrl: "#",
      },
      {
        title: "Printed Shrink Film",
        img: gyath3,
        desc: "This type is used in the packaging of carbonated drinks, mineral water, and canned goods using thermal furnaces or direct fire. Available in printed colors and designs on demand.",
        specs: {
          material: "Low-density polyethylene",
          type: "Printed plastic film",
          process: "Shrinks tightly when heat is applied",
          applications: "Carbonated drinks, mineral water, canned goods",
          features: "Printed with colors and designs, used with thermal furnaces or direct fire",
        },
        additionalImages: [gyath3],
        contextImage: gyath3,
        technicalDrawing: gyath3,
        pdfUrl: "#",
      },
      {
        title: "Stretch Film",
        img: gyath4,
        desc: "We produce high-quality stretch film rolls that are used in the packaging of products and pallets and are distinguished by the production of any special specification that is requested as we produce microns starting from 17 microns up to 40 microns as we produce sizes starting from 25 cm to 100 cm.",
        specs: {
          material: "Stretchable plastic",
          thickness: "17 to 40 microns",
          sizes: "25 cm to 100 cm",
          applications: "Product packaging, pallet wrapping",
          features: "High quality, stretchable, custom specifications on demand",
        },
        additionalImages: [gyath4],
        contextImage: gyath4,
        technicalDrawing: gyath4,
        pdfUrl: "#",
      },
      {
        title: "Stretch Hood",
        img: gyath1,
        desc: "The shrinkable film is used for preservation and protection. It protects products against all external factors, including sun rays. It is produced in rolls or bags equipped with UV protection properties.",
        specs: {
          material: "Shrinkable plastic",
          form: "Rolls or bags",
          protection: "UV protection",
          applications: "Pallet wrapping, preservation and protection",
          features: "Protection against external factors, sun radiation protection, UV stabilization",
        },
        additionalImages: [gyath1],
        contextImage: gyath1,
        technicalDrawing: gyath1,
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
                    src={allImages[selectedImageIndex] || product.img}
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
                          src={img}
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
                      src={product.contextImage}
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
                      src={product.technicalDrawing}
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
                    {Object.entries(specs).map(([key, value]: [string, any]) => (
                      <tr key={key} className="hover:bg-emerald-50/30">
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm">
                          {key}
                        </td>
                        <td className="border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm">
                          {value}
                        </td>
                      </tr>
                    ))}
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
              src={product.img}
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

function ProductsSection({ lang, t, isRTL }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6; // 6 products per page for better layout
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

export default function GayathCompany() {
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
                  src={logoGayath} 
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain" 
                  alt="Gayath Logo" 
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
                    src={logoGayath}
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
      <ProductsSection lang={lang} t={t} isRTL={isRTL} />

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
                    title={isAR ? "خريطة مصنع غياث" : "Gayath Factory Map"}
                    src={mapSrc(HQ)}
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
