// src/data/products.ts
// This file aggregates all products from all company pages

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

import boro from "../assets/img/products/product/hima_plastic/boro.png";
import boro2 from "../assets/img/products/product/hima_plastic/boro2.png";
import marasha from "../assets/img/products/product/hima_plastic/marasha.png";
import marasha2 from "../assets/img/products/product/hima_plastic/marasha2.png";
import rabit from "../assets/img/products/product/hima_plastic/rabit.png";
import taqsim from "../assets/img/products/product/hima_plastic/taqsim.png";
import taqsim2 from "../assets/img/products/product/hima_plastic/taqsim2.png";
import tawsil from "../assets/img/products/product/hima_plastic/tawsil.png";

import hadicap1 from "../assets/img/products/product/hadicap/DSC00999.JPG";
import hadicap2 from "../assets/img/products/product/hadicap/DSC01000.JPG";
import hadicap3 from "../assets/img/products/product/hadicap/DSC01001.JPG";
import hadicap4 from "../assets/img/products/product/hadicap/DSC01005.JPG";

// Import Alzab products - using placeholders for now
import alzab1 from "../assets/img/products/product/alzap -zip/product1@3x.png";
import alzab2 from "../assets/img/products/product/alzap -zip/product2@3x.png";
import alzab3 from "../assets/img/products/product/alzap -zip/product3@3x.png";
import alzab4 from "../assets/img/products/product/alzap -zip/product4@3x.png";
import alzab5 from "../assets/img/products/product/alzap -zip/product5@3x.png";
import alzab6 from "../assets/img/products/product/alzap -zip/product6@3x.png";

export type FactoryKey = "gayath" | "hamdi" | "sina" | "alzab" | "hima" | "hadiCap";

export type Product = {
  id: string;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  img: string;
  factory: FactoryKey;
  category: string;
  categoryEn: string;
};

// All products from all factories
export const allProducts: Product[] = [
  // Gayath Factory Products
  {
    id: "gayath-1",
    title: "أنابيب بلاستيكية صناعية",
    titleEn: "Industrial Plastic Pipes",
    desc: "أنابيب متينة للمشاريع الصناعية الكبرى بأقطار متعددة",
    descEn: "Durable pipes for major industrial projects in various diameters",
    img: gyath1,
    factory: "gayath",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "gayath-2",
    title: "تجهيزات بلاستيكية",
    titleEn: "Plastic Fittings",
    desc: "وصلات وتجهيزات عالية الجودة للمشاريع الصناعية",
    descEn: "High-quality connections and fittings for industrial projects",
    img: gyath2,
    factory: "gayath",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "gayath-3",
    title: "عبوات صناعية",
    titleEn: "Industrial Containers",
    desc: "عبوات بلاستيكية للمواد الكيماوية والصناعية",
    descEn: "Plastic containers for chemicals and industrial materials",
    img: gyath3,
    factory: "gayath",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "gayath-4",
    title: "منتجات تعبئة",
    titleEn: "Packaging Products",
    desc: "حلول تعبئة وتغليف متكاملة للمشاريع الكبرى",
    descEn: "Integrated packaging solutions for major projects",
    img: gyath4,
    factory: "gayath",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  
  // Hamdi Factory Products
  {
    id: "hamdi-1",
    title: "أكياس بلاستيكية زراعية",
    titleEn: "Agricultural Plastic Bags",
    desc: "أكياس متينة للاستخدامات الزراعية والتجارية",
    descEn: "Durable bags for agricultural and commercial use",
    img: hamdi1,
    factory: "hamdi",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "hamdi-2",
    title: "أكياس تغليف",
    titleEn: "Packaging Bags",
    desc: "أكياس تغليف عالية الجودة للمواد الغذائية والصناعية",
    descEn: "High-quality packaging bags for food and industrial materials",
    img: hamdi2,
    factory: "hamdi",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "hamdi-3",
    title: "أكياس بلاستيكية متعددة الاستخدامات",
    titleEn: "Multi-purpose Plastic Bags",
    desc: "أكياس بلاستيكية متعددة الاستخدامات للاستخدامات المختلفة",
    descEn: "Multi-purpose plastic bags for various uses",
    img: hamdi3,
    factory: "hamdi",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "hamdi-4",
    title: "أكياس زراعية متخصصة",
    titleEn: "Specialized Agricultural Bags",
    desc: "أكياس متخصصة للاستخدامات الزراعية والبيئية",
    descEn: "Specialized bags for agricultural and environmental uses",
    img: hamdi4,
    factory: "hamdi",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  
  // Sina Factory Products
  {
    id: "sina-1",
    title: "أفلام زراعية متعددة الطبقات",
    titleEn: "Multi-layer Agricultural Films",
    desc: "أفلام متعددة الطبقات لتغطية التربة والأنفاق الزراعية",
    descEn: "Multi-layer films for soil covering and agricultural tunnels",
    img: kamish1,
    factory: "sina",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "sina-2",
    title: "أفلام تغطية زراعية",
    titleEn: "Agricultural Covering Films",
    desc: "أفلام عالية الجودة لتغطية المحاصيل والبيوت الزجاجية",
    descEn: "High-quality films for crop covering and greenhouses",
    img: kamish2,
    factory: "sina",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "sina-3",
    title: "أفلام بلاستيكية للري",
    titleEn: "Plastic Films for Irrigation",
    desc: "أفلام متخصصة لأنظمة الري الزراعية",
    descEn: "Specialized films for agricultural irrigation systems",
    img: kamish3,
    factory: "sina",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "sina-4",
    title: "أفلام تغليف زراعية",
    titleEn: "Agricultural Packaging Films",
    desc: "أفلام تغليف للمنتجات الزراعية والغذائية",
    descEn: "Packaging films for agricultural and food products",
    img: kamish4,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "sina-5",
    title: "أفلام حماية المحاصيل",
    titleEn: "Crop Protection Films",
    desc: "أفلام حماية للمحاصيل من العوامل الجوية",
    descEn: "Protection films for crops from weather factors",
    img: kamish5,
    factory: "sina",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "sina-6",
    title: "أفلام بلاستيكية متعددة الاستخدامات",
    titleEn: "Multi-purpose Plastic Films",
    desc: "أفلام بلاستيكية للاستخدامات الزراعية والصناعية",
    descEn: "Plastic films for agricultural and industrial uses",
    img: kamish6,
    factory: "sina",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "sina-7",
    title: "أفلام تغطية متخصصة",
    titleEn: "Specialized Covering Films",
    desc: "أفلام تغطية متخصصة للاستخدامات الزراعية المختلفة",
    descEn: "Specialized covering films for various agricultural uses",
    img: kamish7,
    factory: "sina",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "sina-8",
    title: "أفلام بلاستيكية عالية الجودة",
    titleEn: "High-quality Plastic Films",
    desc: "أفلام بلاستيكية عالية الجودة للمشاريع الزراعية",
    descEn: "High-quality plastic films for agricultural projects",
    img: kamish8,
    factory: "sina",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "sina-9",
    title: "أفلام تغليف متعددة الطبقات",
    titleEn: "Multi-layer Packaging Films",
    desc: "أفلام تغليف متعددة الطبقات للمنتجات الغذائية",
    descEn: "Multi-layer packaging films for food products",
    img: kamish9,
    factory: "sina",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "sina-10",
    title: "أفلام زراعية متطورة",
    titleEn: "Advanced Agricultural Films",
    desc: "أفلام زراعية متطورة بتقنيات حديثة",
    descEn: "Advanced agricultural films with modern technologies",
    img: kamish10,
    factory: "sina",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "sina-11",
    title: "أفلام بلاستيكية للاستخدامات الخاصة",
    titleEn: "Special Use Plastic Films",
    desc: "أفلام بلاستيكية للاستخدامات الخاصة والمشاريع المتخصصة",
    descEn: "Plastic films for special uses and specialized projects",
    img: kamish11,
    factory: "sina",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  
  // Hima Plastic Products
  {
    id: "hima-1",
    title: "برو - أنابيب PE قطر صغير",
    titleEn: "Boro - Small Diameter PE Pipes",
    desc: "أنابيب بولي إيثيلين بأقطار صغيرة للري الدقيق والتنقيط",
    descEn: "Small diameter polyethylene pipes for precision and drip irrigation",
    img: boro,
    factory: "hima",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "hima-2",
    title: "برو 2 - أنابيب PE كبيرة",
    titleEn: "Boro 2 - Large PE Pipes",
    desc: "أنابيب كبيرة القطر لشبكات المياه الرئيسية",
    descEn: "Large diameter pipes for main water networks",
    img: boro2,
    factory: "hima",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "hima-3",
    title: "مرشة رذاذ",
    titleEn: "Spray Nozzle",
    desc: "رشاشات عالية الجودة للري بالرش وأنظمة الضباب",
    descEn: "High-quality sprinklers for spray irrigation and mist systems",
    img: marasha,
    factory: "hima",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "hima-4",
    title: "مرشة رذاذ متطورة",
    titleEn: "Advanced Spray Nozzle",
    desc: "رشاشات بتصميم محسّن لكفاءة استهلاك المياه",
    descEn: "Enhanced design sprinklers for water consumption efficiency",
    img: marasha2,
    factory: "hima",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "hima-5",
    title: "وصلة ربط",
    titleEn: "Connection Joint",
    desc: "وصلات ربط قوية ومحكمة للأنابيب والخراطيم",
    descEn: "Strong and tight connection joints for pipes and hoses",
    img: rabit,
    factory: "hima",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "hima-6",
    title: "تقسيمة أنابيب T",
    titleEn: "T-Pipe Divider",
    desc: "قطع تقسيم بزوايا متعددة لتوزيع المياه",
    descEn: "Multi-angle dividers for water distribution",
    img: taqsim,
    factory: "hima",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "hima-7",
    title: "تقسيمة متقدمة",
    titleEn: "Advanced Divider",
    desc: "تقسيمات أنابيب متطورة بتصميم هندسي محسّن",
    descEn: "Advanced pipe dividers with improved engineering design",
    img: taqsim2,
    factory: "hima",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  {
    id: "hima-8",
    title: "وصلة توصيل مباشرة",
    titleEn: "Direct Connection Coupling",
    desc: "وصلات توصيل مباشرة محكمة ومقاومة للضغط",
    descEn: "Direct tight connection couplings resistant to pressure",
    img: tawsil,
    factory: "hima",
    category: "زراعي",
    categoryEn: "Agricultural",
  },
  
  // Hadi Cap Products
  {
    id: "hadiCap-1",
    title: "أغطية 28mm مياه/مشروبات",
    titleEn: "28mm Water/Beverage Caps",
    desc: "أغطية قياسية محكمة للمياه والعصائر مع توافق تام لخطوط التعبئة الآلية",
    descEn: "Standard sealed caps for water and juices with full compatibility for automatic filling lines",
    img: hadicap1,
    factory: "hadiCap",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  {
    id: "hadiCap-2",
    title: "أغطية Push-Pull رياضي",
    titleEn: "Sports Push-Pull Caps",
    desc: "أغطية رياضي للفتح السريع مثالية للقناني المحمولة مع ضمان عدم الانسكاب",
    descEn: "Sports caps for quick opening ideal for portable bottles with spill-proof guarantee",
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
    desc: "أغطية بإحكام إضافي مثالية للسوائل الحساسة ومنع التسرب المحسّن",
    descEn: "Caps with extra sealing ideal for sensitive liquids and improved leak prevention",
    img: hadicap4,
    factory: "hadiCap",
    category: "تغليف",
    categoryEn: "Packaging",
  },
  
  // Alzab Products
  {
    id: "alzab-1",
    title: "منتجات بلاستيكية متخصصة",
    titleEn: "Specialized Plastic Products",
    desc: "منتجات بلاستيكية متخصصة للاستخدامات الصناعية والزراعية",
    descEn: "Specialized plastic products for industrial and agricultural uses",
    img: alzab1,
    factory: "alzab",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "alzab-2",
    title: "حلول بلاستيكية متكاملة",
    titleEn: "Integrated Plastic Solutions",
    desc: "حلول بلاستيكية متكاملة للمشاريع الصناعية والزراعية",
    descEn: "Integrated plastic solutions for industrial and agricultural projects",
    img: alzab2,
    factory: "alzab",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "alzab-3",
    title: "منتجات بلاستيكية عالية الجودة",
    titleEn: "High-quality Plastic Products",
    desc: "منتجات بلاستيكية عالية الجودة للمشاريع الكبرى",
    descEn: "High-quality plastic products for major projects",
    img: alzab3,
    factory: "alzab",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "alzab-4",
    title: "حلول بلاستيكية متطورة",
    titleEn: "Advanced Plastic Solutions",
    desc: "حلول بلاستيكية متطورة بتقنيات حديثة",
    descEn: "Advanced plastic solutions with modern technologies",
    img: alzab4,
    factory: "alzab",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "alzab-5",
    title: "منتجات بلاستيكية مخصصة",
    titleEn: "Custom Plastic Products",
    desc: "منتجات بلاستيكية مخصصة حسب احتياجات المشروع",
    descEn: "Custom plastic products according to project needs",
    img: alzab5,
    factory: "alzab",
    category: "صناعي",
    categoryEn: "Industrial",
  },
  {
    id: "alzab-6",
    title: "حلول بلاستيكية شاملة",
    titleEn: "Comprehensive Plastic Solutions",
    desc: "حلول بلاستيكية شاملة للقطاعات المختلفة",
    descEn: "Comprehensive plastic solutions for various sectors",
    img: alzab6,
    factory: "alzab",
    category: "صناعي",
    categoryEn: "Industrial",
  },
];
