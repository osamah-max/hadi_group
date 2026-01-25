// src/data/companyProducts.ts
// This file collects products directly from company pages

import type { FactoryKey } from './products';

// Import product images from company pages
import boro from "../assets/img/products/product/hima_plastic/boro.png";
import boro2 from "../assets/img/products/product/hima_plastic/boro2.png";
import marasha from "../assets/img/products/product/hima_plastic/marasha.png";
import marasha2 from "../assets/img/products/product/hima_plastic/marasha2.png";
import rabit from "../assets/img/products/product/hima_plastic/rabit.png";
import taqsim from "../assets/img/products/product/hima_plastic/taqsim.png";
import taqsim2 from "../assets/img/products/product/hima_plastic/taqsim2.png";
import tawsil from "../assets/img/products/product/hima_plastic/tawsil.png";

import gyath1 from "../assets/img/products/product/gyath/gyath@3x.png";
import gyath2 from "../assets/img/products/product/gyath/gyath2@3x.png";
import gyath3 from "../assets/img/products/product/gyath/gyath3@3x.png";
import gyath4 from "../assets/img/products/product/gyath/gyath4@3x.png";

import hamdi1 from "../assets/img/products/product/hamdi/DSC00921.JPG";
import hamdi2 from "../assets/img/products/product/hamdi/DSC00984.JPG";
import hamdi3 from "../assets/img/products/product/hamdi/DSC01034.JPG";
import hamdi4 from "../assets/img/products/product/hamdi/DSC01040.JPG";

import kamish1 from "../assets/img/products/product/sina/kamish1@3x.png";
import kamish2 from "../assets/img/products/product/sina/kamish2@3x@3x.png";
import kamish3 from "../assets/img/products/product/sina/kamish3@3x@3x@3x.png";
import kamish4 from "../assets/img/products/product/sina/kamish4@3xx@3x.png";
import kamish5 from "../assets/img/products/product/sina/kamish5@3xx@3x.png";
import kamish6 from "../assets/img/products/product/sina/kamish6@3x@3x.png";
import kamish7 from "../assets/img/products/product/sina/kamish7@3x@3x.png";
import kamish8 from "../assets/img/products/product/sina/kamish8@3x.png";
import kamish9 from "../assets/img/products/product/sina/kamish9@3x.png";
import kamish10 from "../assets/img/products/product/sina/kamish10@3x.png";
import kamish11 from "../assets/img/products/product/sina/kamish11@3x.png";

import hadicap1 from "../assets/img/products/product/hadicap/DSC00999.JPG";
import hadicap2 from "../assets/img/products/product/hadicap/DSC01000.JPG";
import hadicap3 from "../assets/img/products/product/hadicap/DSC01001.JPG";
import hadicap4 from "../assets/img/products/product/hadicap/DSC01005.JPG";

import alzab1 from "../assets/img/products/product/alzap -zip/product1@3x.png";
import alzab2 from "../assets/img/products/product/alzap -zip/product2@3x.png";
import alzab3 from "../assets/img/products/product/alzap -zip/product3@3x.png";
import alzab4 from "../assets/img/products/product/alzap -zip/product4@3x.png";
import alzab5 from "../assets/img/products/product/alzap -zip/product5@3x.png";
import alzab6 from "../assets/img/products/product/alzap -zip/product6@3x.png";

export type CompanyProduct = {
  id: string;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  img: string;
  factory: FactoryKey;
  category?: string;
  categoryEn?: string;
};

// Helper function to extract title parts (Arabic/English)
function extractTitleParts(title: string): { ar: string; en: string } {
  const parts = title.split(' / ');
  if (parts.length === 2) {
    return { ar: parts[0].trim(), en: parts[1].trim() };
  }
  // If no separator, assume Arabic
  return { ar: title.trim(), en: title.trim() };
}

// Hima Plastic Products (from hima.tsx)
const himaProducts: CompanyProduct[] = [
  {
    id: "hima-1",
    ...extractTitleParts("سدادة / Plug"),
    desc: "سدادة محكمة لسد فتحات الأنابيب بفعالية. يوجد ذكر ونثية.",
    descEn: "Plug for effectively sealing pipe openings. Available in male and female.",
    img: tawsil,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-2",
    ...extractTitleParts("رأس / Head"),
    desc: "رأس للوصل والتوصيل بين الأنابيب. يوجد ذكر ونثية.",
    descEn: "Head for connecting and joining pipes. Available in male and female.",
    img: rabit,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-3",
    ...extractTitleParts("واشر / Latch Washer (Gasket)"),
    desc: "واشر مطاطي محكم لمنع التسرب وضمان الإغلاق الكامل",
    descEn: "Rubber washer seal to prevent leaks and ensure complete closure",
    img: rabit,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-4",
    ...extractTitleParts("تحويلة / Reduction Coupling"),
    desc: "تحويلة لتقليل قطر الأنبوب بسلاسة وكفاءة",
    descEn: "Reduction coupling for smoothly and efficiently reducing pipe diameter",
    img: tawsil,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-5",
    ...extractTitleParts("صليب / Spider (Cross) Connector"),
    desc: "وصلة صليبية لتوزيع المياه في أربع اتجاهات",
    descEn: "Cross connector for distributing water in four directions",
    img: taqsim,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-6",
    ...extractTitleParts("تي / T Connector"),
    desc: "وصلة T لتوزيع المياه في ثلاثة اتجاهات",
    descEn: "T connector for distributing water in three directions",
    img: taqsim,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-7",
    ...extractTitleParts("قاعدة / Base (Abot)"),
    desc: "قاعدة ثابتة لدعم أنظمة الري والرشاشات",
    descEn: "Stable base for supporting irrigation systems and sprinklers",
    img: rabit,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-8",
    ...extractTitleParts("تطوالة / Sleeve"),
    desc: "تطوالة للربط والتوصيل بين أجزاء الأنابيب",
    descEn: "Sleeve for connecting and joining pipe sections",
    img: rabit,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-9",
    ...extractTitleParts("قفل عصفر / Spherical Valve"),
    desc: "صمام كروي للتحكم في تدفق المياه",
    descEn: "Spherical valve for controlling water flow",
    img: rabit,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-10",
    ...extractTitleParts("وصالة قاعدة / Abot Sleeve"),
    desc: "وصلة قاعدة لربط القاعدة بالأنابيب",
    descEn: "Base sleeve for connecting the base to pipes",
    img: rabit,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-11",
    ...extractTitleParts("طقم قاعدة كامل / Clamp Abot Team"),
    desc: "طقم قاعدة كامل مع الرشاش والأنبوب والقاعدة",
    descEn: "Complete base set with sprinkler, pipe, and base",
    img: marasha,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-12",
    ...extractTitleParts("امتداد / Extension"),
    desc: "أنبوب امتداد للوصول لارتفاعات مختلفة",
    descEn: "Extension pipe for reaching different heights",
    img: boro,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-13",
    ...extractTitleParts("عکس / Elbow"),
    desc: "كوع للانحناء وتوجيه الأنابيب في اتجاهات مختلفة",
    descEn: "Elbow fitting for bending and directing pipes in different directions",
    img: rabit,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-14",
    ...extractTitleParts("قفل / LINE BUTTERFLY VALVE"),
    desc: "صمام فراشة خطي للتحكم في تدفق المياه",
    descEn: "Line butterfly valve for controlling water flow",
    img: rabit,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-15",
    ...extractTitleParts("أنبوب الري بالتنقيط / Drip Irrigation Pipe"),
    desc: "أنبوب ري بالتنقيط عالي الجودة لتوفير المياه في الزراعة",
    descEn: "High-quality drip irrigation pipe for water-efficient agriculture",
    img: boro,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-16",
    ...extractTitleParts("قطع التوصيل والربط PE / PE Connection and Joining Pieces"),
    desc: "قطع توصيل وربط PE متطورة لأنظمة الري من بولي إيثيلين عالي ومتوسط الكثافة",
    descEn: "Advanced PE connection and joining pieces for irrigation systems from high and medium density polyethylene",
    img: rabit,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-17",
    ...extractTitleParts("كوع 90 درجة / 90-Degree Elbow"),
    desc: "كوع 90 درجة من سلسلة PEFEL للانحناء وتوجيه الأنابيب",
    descEn: "90-degree elbow from PEFEL series for bending and directing pipes",
    img: rabit,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-18",
    ...extractTitleParts("وصلة توصيل / Connection Fitting"),
    desc: "وصلة توصيل مباشرة من سلسلة PEFEL و PEFCO للربط بين الأنابيب",
    descEn: "Direct connection fitting from PEFEL and PEFCO series for joining pipes",
    img: tawsil,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-19",
    ...extractTitleParts("مثلث تنقيص 90 درجة / 90-Degree Reduction Tee"),
    desc: "مثلث تنقيص 90 درجة من سلسلة PEFTR لتقليل القطر",
    descEn: "90-degree reduction tee from PEFTR series for diameter reduction",
    img: taqsim,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
  {
    id: "hima-20",
    ...extractTitleParts("وصلة تنقيص / Reduction Connection"),
    desc: "وصلة تنقيص من سلسلة PEFCOR لتقليل قطر الأنبوب",
    descEn: "Reduction connection from PEFCOR series for reducing pipe diameter",
    img: tawsil,
    factory: "hima",
    category: "ري",
    categoryEn: "Irrigation",
  },
];

// Gayath Products (from gayath.tsx)
const gayathProducts: CompanyProduct[] = [
  {
    id: "gayath-1",
    title: "أكياس حفظ وتخزين الخضر والفواكه",
    titleEn: "Fruit and Vegetable Storage Bags",
    desc: "أكياس بلاستيكية لحفظ وتخزين مختلف أنواع الخضر والفواكه مثل الخيار والجزر والطماطم والباذنجان والرمان والموز",
    descEn: "Plastic bags for storing and preserving various types of vegetables and fruits such as cucumbers, carrots, tomatoes, eggplants, pomegranates, and bananas",
    img: gyath1,
    factory: "gayath",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "gayath-2",
    title: "أفلام التغطية الزراعية",
    titleEn: "Agricultural Mulch Films",
    desc: "أفلام بلاستيكية خاصة لتغطية التربة في الزراعة. تمنع تطور الأعشاب الضارة، تمنع التربة من الجفاف، وتمنع تبخر الماء",
    descEn: "Special plastic films for covering soil in agriculture. Prevent weed growth, prevent soil dryness, and prevent water evaporation",
    img: gyath2,
    factory: "gayath",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "gayath-3",
    title: "الستارة الحرارية",
    titleEn: "Thermal Curtain",
    desc: "خاصة في المناطق ذات المناخ البارد، تستخدم في الدفيئة أو البيت البلاستيكي لمنع فقدان الحرارة",
    descEn: "Special for cold climate areas, used in greenhouses or plastic houses to prevent heat loss",
    img: gyath3,
    factory: "gayath",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "gayath-4",
    title: "أفلام بلاستيكية للتشميس",
    titleEn: "Solarization Films",
    desc: "أفلام بلاستيكية للتشميس لمكافحة الآفات الضارة والحشرات والنيماتودا",
    descEn: "Plastic films for solarization to combat harmful pests, insects, and nematodes",
    img: gyath4,
    factory: "gayath",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "gayath-5",
    title: "غطاء بلاستيكي للدفيئة",
    titleEn: "Greenhouse Cover",
    desc: "أفلام بلاستيكية عالية الجودة لتغطية الدفيئات الزراعية. مصنعة بتقنية القذف الثلاثي",
    descEn: "High-quality plastic films for covering agricultural greenhouses. Manufactured using triple extrusion technology",
    img: gyath1,
    factory: "gayath",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "gayath-6",
    title: "شرنك فلم",
    titleEn: "Shrink Film",
    desc: "يستخدم لتغليف المنتجات وغيرها. مادة مصنوعة من فيلم البلاستيك البوليمر، عندما تمرر عليها الحرارة تنكمش بإحكام على المنتج",
    descEn: "Used for packaging products. Material made of polymer plastic film that shrinks tightly around the product when heat is applied",
    img: gyath2,
    factory: "gayath",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "gayath-7",
    title: "شرنك فلم مطبوع",
    titleEn: "Printed Shrink Film",
    desc: "يستخدم في تغليف المشروبات الغازية والمياه المعدنية والمعلبات باستخدام أفران حراري أو النار المباشر. متوفر بألوان وتصاميم مطبوعة حسب الطلب",
    descEn: "Used for packaging carbonated beverages, mineral water, and canned goods using thermal ovens or direct flame. Available in printed colors and designs as requested",
    img: gyath3,
    factory: "gayath",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "gayath-8",
    title: "ستريج فلم",
    titleEn: "Stretch Film",
    desc: "رولات الاسترتش فيلم عالية الجودة والتي تستخدم في تغليف المنتجات والبالتات. متوفر من 17 ميكرون وحتى 40 ميكرون",
    descEn: "High-quality stretch film rolls used for packaging products and pallets. Available from 17 to 40 microns",
    img: gyath4,
    factory: "gayath",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "gayath-9",
    title: "ستريج هود",
    titleEn: "Stretch Hood",
    desc: "الفيلم القابل للتقلص يستعمل للحفظ والحماية. يسمح بحماية المنتجات ضد كل العوامل الخارجية من أشعة شمسية",
    descEn: "Shrinkable film used for storage and protection. Allows protection of products against all external factors including sunlight",
    img: gyath1,
    factory: "gayath",
    category: "تغليف",
    categoryEn: "Packaging",
  },
];

// Hamdi Products (from hamdi.tsx)
const hamdiProducts: CompanyProduct[] = [
  {
    id: "hamdi-1",
    title: "غطاء 28mm مياه/مشروبات",
    titleEn: "28mm Water/Beverage Cap",
    desc: "غطاء قياسي محكم للمياه والعصائر مع توافق تام لخطوط التعبئة الآلية",
    descEn: "Standard sealed cap for water and juices with full compatibility for automatic filling lines",
    img: hamdi1,
    factory: "hamdi",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "hamdi-2",
    title: "غطاء Push-Pull رياضي",
    titleEn: "Sports Push-Pull Cap",
    desc: "غطاء رياضي للفتح السريع مثالي للقناني المحمولة مع ضمان عدم الانسكاب",
    descEn: "Sports cap for quick opening ideal for portable bottles with spill-proof guarantee",
    img: hamdi2,
    factory: "hamdi",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "hamdi-3",
    title: "قنينة HDPE — 1 لتر",
    titleEn: "HDPE Bottle — 1 Liter",
    desc: "قنينة متينة للمنظفات السائلة بسماكات متوازنة ومقاومة كيماوية ممتازة",
    descEn: "Durable bottle for liquid detergents with balanced thickness and excellent chemical resistance",
    img: hamdi3,
    factory: "hamdi",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "hamdi-4",
    title: "غالون HDPE — 5 لتر",
    titleEn: "HDPE Gallon — 5 Liters",
    desc: "غالون بيد مريحة للمنظفات الصناعية مع فوهات متعددة وقوة تحمل عالية",
    descEn: "Gallon with comfortable handle for industrial detergents with multiple nozzles and high durability",
    img: hamdi4,
    factory: "hamdi",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "hamdi-5",
    title: "علبة Pail",
    titleEn: "Pail Container",
    desc: "علبة بلاستيكية متينة من مادة PP مصممة خصيصاً لتعبئة منتجات الألبان",
    descEn: "Durable plastic container made of PP material specifically designed for packaging dairy products",
    img: hamdi3,
    factory: "hamdi",
    category: "تغليف",
    categoryEn: "Packaging",
  },
];

// Sina Products (from sina.tsx)
const sinaProducts: CompanyProduct[] = [
  {
    id: "sina-1",
    title: "قصب - 7.5 سم",
    titleEn: "Straw - 7.5 cm",
    desc: "قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان",
    descEn: "Drinking straw made of PP material, versatile for juices and beverages. Available in all colors",
    img: kamish1,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "sina-2",
    title: "قصب - 8.5 سم",
    titleEn: "Straw - 8.5 cm",
    desc: "قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان",
    descEn: "Drinking straw made of PP material, versatile for juices and beverages. Available in all colors",
    img: kamish2,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "sina-3",
    title: "قصب - 10.5 / 12 سم",
    titleEn: "Straw - 10.5 / 12 cm",
    desc: "قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان",
    descEn: "Drinking straw made of PP material, versatile for juices and beverages. Available in all colors",
    img: kamish3,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "sina-4",
    title: "قصب - 15 سم",
    titleEn: "Straw - 15 cm",
    desc: "قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان",
    descEn: "Drinking straw made of PP material, versatile for juices and beverages. Available in all colors",
    img: kamish4,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "sina-5",
    title: "قصب - 17.5 سم",
    titleEn: "Straw - 17.5 cm",
    desc: "قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان",
    descEn: "Drinking straw made of PP material, versatile for juices and beverages. Available in all colors",
    img: kamish5,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "sina-6",
    title: "قصب - 19.5 سم",
    titleEn: "Straw - 19.5 cm",
    desc: "قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان",
    descEn: "Drinking straw made of PP material, versatile for juices and beverages. Available in all colors",
    img: kamish6,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "sina-7",
    title: "قصب - 21 سم",
    titleEn: "Straw - 21 cm",
    desc: "قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان",
    descEn: "Drinking straw made of PP material, versatile for juices and beverages. Available in all colors",
    img: kamish7,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "sina-8",
    title: "قصب - 23 سم",
    titleEn: "Straw - 23 cm",
    desc: "قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان",
    descEn: "Drinking straw made of PP material, versatile for juices and beverages. Available in all colors",
    img: kamish8,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "sina-9",
    title: "قصب - 25 سم",
    titleEn: "Straw - 25 cm",
    desc: "قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان",
    descEn: "Drinking straw made of PP material, versatile for juices and beverages. Available in all colors",
    img: kamish9,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "sina-10",
    title: "قصب - 27 سم",
    titleEn: "Straw - 27 cm",
    desc: "قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان",
    descEn: "Drinking straw made of PP material, versatile for juices and beverages. Available in all colors",
    img: kamish10,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "sina-11",
    title: "قصب - 29 سم",
    titleEn: "Straw - 29 cm",
    desc: "قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان",
    descEn: "Drinking straw made of PP material, versatile for juices and beverages. Available in all colors",
    img: kamish11,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
];

// HadiCap Products (from hadi_cap.tsx) - simplified
const hadiCapProducts: CompanyProduct[] = [
  {
    id: "hadiCap-1",
    title: "أغطية 28mm مياه/مشروبات",
    titleEn: "28mm Water/Beverage Caps",
    desc: "أغطية قياسية محكمة للمياه والعصائر",
    descEn: "Standard sealed caps for water and juices",
    img: hadicap1,
    factory: "hadiCap",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "hadiCap-2",
    title: "أغطية Push-Pull رياضي",
    titleEn: "Sports Push-Pull Caps",
    desc: "أغطية رياضي للفتح السريع مثالية للقناني المحمولة",
    descEn: "Sports caps for quick opening ideal for portable bottles",
    img: hadicap2,
    factory: "hadiCap",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "hadiCap-3",
    title: "عبوات بلاستيكية",
    titleEn: "Plastic Containers",
    desc: "عبوات بلاستيكية بمقاسات معيارية ومخصصة للمنتجات الغذائية",
    descEn: "Plastic containers with standard and custom sizes for food products",
    img: hadicap3,
    factory: "hadiCap",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "hadiCap-4",
    title: "أغطية ببطانة Foam",
    titleEn: "Caps with Foam Liner",
    desc: "أغطية بإحكام إضافي مثالية للسوائل الحساسة",
    descEn: "Caps with extra sealing ideal for sensitive liquids",
    img: hadicap4,
    factory: "hadiCap",
    category: "تغليف",
    categoryEn: "Packaging",
  },
];

// Alzab Products (from alzab.tsx)
const alzabProducts: CompanyProduct[] = [
  {
    id: "alzab-1",
    title: "بريفورم زيت - 22.5 جرام",
    titleEn: "Oil Preform - 22.5 grams",
    desc: "بريفورم PET للزيت بسعة 1 لتر. وزن 22.5 جرام مع مقياس قطر الفم 32 مم",
    descEn: "PET preform for oil with 1 liter capacity. Weight 22.5 grams with 32mm neck finish",
    img: alzab1,
    factory: "alzab",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "alzab-2",
    title: "بريفورم زيت - 25 جرام",
    titleEn: "Oil Preform - 25 grams",
    desc: "بريفورم PET للزيت بسعة 1 لتر. وزن 25 جرام مع مقياس قطر الفم 32 مم",
    descEn: "PET preform for oil with 1 liter capacity. Weight 25 grams with 32mm neck finish",
    img: alzab2,
    factory: "alzab",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "alzab-3",
    title: "بريفورم ماء - 8.5 جرام",
    titleEn: "Water Preform - 8.5 grams",
    desc: "بريفورم PET للماء بسعة 0.25-0.33 لتر. وزن 8.5 جرام مع مقياس قطر الفم 29/25 مم",
    descEn: "PET preform for water with 0.25-0.33 liter capacity. Weight 8.5 grams with 29/25mm neck finish",
    img: alzab3,
    factory: "alzab",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "alzab-4",
    title: "بريفورم ماء - 12.5 جرام",
    titleEn: "Water Preform - 12.5 grams",
    desc: "بريفورم PET للماء بسعة 0.5 لتر. وزن 12.5 جرام مع مقياس قطر الفم 28 مم",
    descEn: "PET preform for water with 0.5 liter capacity. Weight 12.5 grams with 28mm neck finish",
    img: alzab4,
    factory: "alzab",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "alzab-5",
    title: "بريفورم ماء - 17.5 جرام",
    titleEn: "Water Preform - 17.5 grams",
    desc: "بريفورم PET للماء بسعة 0.75 لتر. وزن 17.5 جرام مع مقياس قطر الفم 28 مم",
    descEn: "PET preform for water with 0.75 liter capacity. Weight 17.5 grams with 28mm neck finish",
    img: alzab5,
    factory: "alzab",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "alzab-6",
    title: "بريفورم ماء - 20 جرام",
    titleEn: "Water Preform - 20 grams",
    desc: "بريفورم PET للماء بسعة 0.75 لتر. وزن 20 جرام مع مقياس قطر الفم 28 مم",
    descEn: "PET preform for water with 0.75 liter capacity. Weight 20 grams with 28mm neck finish",
    img: alzab6,
    factory: "alzab",
    category: "صناعي",
    categoryEn: "Industrial",
  },
];

// Combine all products
export const allCompanyProducts: CompanyProduct[] = [
  ...himaProducts,
  ...gayathProducts,
  ...hamdiProducts,
  ...sinaProducts,
  ...hadiCapProducts,
  ...alzabProducts,
];
