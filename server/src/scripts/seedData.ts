/**
 * Seed data for factories and products, in DB-friendly shape.
 * Extracted from src/pages/companies/*.tsx and src/data/companyProducts.ts.
 * Image paths use /assets/img/... (public-relative; may need manual copy to server/uploads).
 */

const assets = '/assets/img';

export type SeedLocation = {
  address_ar: string;
  address_en: string;
  phones: string[];
  email: string;
  map_url: string | null;
  lat: number;
  lng: number;
  is_primary: boolean;
  order_index: number;
};

export type SeedFactory = {
  slug: string;
  name_ar: string;
  name_en: string;
  tagline_ar: string;
  tagline_en: string;
  description_ar: string;
  description_en: string;
  logo: string;
  hero_image: string;
  locations: SeedLocation[];
  capabilities_ar: string[];
  capabilities_en: string[];
  advantages_ar: { title: string; desc: string }[];
  advantages_en: { title: string; desc: string }[];
  industries_ar: { title: string; desc: string }[];
  industries_en: { title: string; desc: string }[];
  kpis: { value: string; label: string }[];
};

export type SeedProduct = {
  slug_factory: string; // factory slug
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
  img: string;
  category_ar: string | null;
  category_en: string | null;
  order_index: number;
};

const loc = (
  address_ar: string,
  address_en: string,
  phones: string[],
  email: string,
  map_url: string | null,
  lat: number,
  lng: number,
  is_primary: boolean,
  order_index: number
): SeedLocation =>
  ({ address_ar, address_en, phones, email, map_url, lat, lng, is_primary, order_index });

export const seedFactories: SeedFactory[] = [
  {
    slug: 'hima',
    name_ar: 'شركة هيما بلاستيك',
    name_en: 'Hima Plastic Company',
    tagline_ar: 'جودة • ابتكار • استدامة',
    tagline_en: 'Quality • Innovation • Sustainability',
    description_ar:
      'شركة هيما بلاستيك، أحد مصانع مجموعة شركات الهادي، حيث نستخدم أحدث الأجهزة الأوروبية لإنتاج الأنابيب الزراعية بتقنيات حديثة مطابقة للمواصفات العالمية ضمن أعلى درجات الجودة والتقييس.',
    description_en:
      'Hima Plastic Company, one of the factories of Hadi Group, where we use the latest European equipment to produce agricultural pipes with modern technologies that comply with international specifications within the highest degrees of quality and standardization.',
    logo: `${assets}/logo/hima1.png`,
    hero_image: `${assets}/backgrounds/himaplastic_hero.jpg`,
    locations: [
      loc(
        'العراق - كركوك - دارمان',
        'Iraq - Kirkuk - Daraman',
        ['07737203059', '07815000823'],
        'hima@hadigroup.iq',
        'https://maps.google.com/maps?q=Daraman,+Kirkuk,+Iraq&output=embed&z=14',
        33.312,
        44.445,
        true,
        0
      ),
    ],
    capabilities_ar: [
      'إنتاج أنابيب بولي إيثيلين (PE) بأقطار متعددة',
      'أنظمة ري زراعية متكاملة بكفاءة عالية',
      'وصلات ومحابس بلاستيكية مطابقة للمواصفات الأوروبية',
      'تقنيات إنتاج حديثة ومتطورة',
      'تخصيص كامل حسب احتياجات المشروع',
      'ضمان الجودة وفق المعايير العالمية',
    ],
    capabilities_en: [
      'PE pipe production in multiple diameters',
      'Integrated agricultural irrigation systems',
      'Plastic fittings and valves meeting European specs',
      'Modern production technologies',
      'Full customization per project',
      'Quality assurance to international standards',
    ],
    advantages_ar: [
      { title: 'موثوقية التوريد', desc: 'تخطيط إنتاج مرن مع مخزون أمان يضمن الاستمرارية' },
      { title: 'جودة منضبطة', desc: 'مراقبة جودة صارمة مع سجلات تتبع كاملة' },
      { title: 'تنفيذ سريع', desc: 'دورات إنتاج فعالة ومسار موافقات مبسط' },
      { title: 'كفاءة تكلفة', desc: 'تحسينات تصميم تقلل الهدر وتضبط التكاليف' },
      { title: 'استدامة', desc: 'مواد قابلة لإعادة التدوير وبرامج تقليل الفاقد' },
      { title: 'تخصيص كامل', desc: 'حلول مصممة خصيصاً لمتطلبات مشروعك' },
    ],
    advantages_en: [
      { title: 'Supply reliability', desc: 'Flexible production planning with safety stock' },
      { title: 'Quality control', desc: 'Strict QA with full traceability' },
      { title: 'Fast execution', desc: 'Efficient production cycles and simple approvals' },
      { title: 'Cost efficiency', desc: 'Design improvements reducing waste and cost' },
      { title: 'Sustainability', desc: 'Recyclable materials and waste reduction' },
      { title: 'Full customization', desc: 'Solutions tailored to your project' },
    ],
    industries_ar: [
      { title: 'الزراعة', desc: 'أنظمة ري متطورة للمزارع والبيوت الزجاجية' },
      { title: 'البنية التحتية', desc: 'أنابيب لشبكات المياه والصرف الصحي' },
      { title: 'الصناعة', desc: 'حلول أنابيب للمشاريع الصناعية الكبرى' },
    ],
    industries_en: [
      { title: 'Agriculture', desc: 'Advanced irrigation for farms and greenhouses' },
      { title: 'Infrastructure', desc: 'Pipes for water and sanitation networks' },
      { title: 'Industry', desc: 'Pipe solutions for major industrial projects' },
    ],
    kpis: [
      { value: '18K+', label: 'طن إنتاج سنوي' },
      { value: '95%', label: 'التزام التوريد' },
      { value: '10', label: 'أيام تنفيذ' },
      { value: 'ISO', label: 'معايير الجودة' },
    ],
  },
  {
    slug: 'gayath',
    name_ar: 'مصنع غياث',
    name_en: 'Gayath Factory',
    tagline_ar: 'ريادة • جودة • ابتكار',
    tagline_en: 'Leadership • Quality • Innovation',
    description_ar:
      'مصنع غياث هو المعمل المؤسس لمجموعة هادي، تأسس عام 1975. متخصص في الصناعات البلاستيكية الأولية التي تخدم القطاعين الصناعي والزراعي في العراق. نستخدم أحدث التقنيات الصناعية لضمان جودة عالية ومعايير إنتاج دقيقة.',
    description_en:
      'Gayath Factory is the founding factory of Hadi Group, established in 1975. Specialized in primary plastic industries serving industrial and agricultural sectors in Iraq. We use the latest industrial technologies to ensure high quality and precise production standards.',
    logo: `${assets}/logo/gayath.png`,
    hero_image: `${assets}/backgrounds/gayath_hero.jpg`,
    locations: [
      loc(
        'العراق - كركوك - الحي الصناعي',
        'Iraq - Kirkuk - Industrial District',
        ['07701300995', '07811129492'],
        'gayath@hadigroup.iq',
        'https://maps.google.com/maps?q=Industrial+District,+Kirkuk,+Iraq&output=embed&z=14',
        33.312,
        44.445,
        true,
        0
      ),
      loc(
        'كركوك - دارمان',
        'Kirkuk - Daraman',
        ['07701300995', '07811129492'],
        'gayath@hadigroup.iq',
        'https://maps.google.com/maps?q=Daraman,+Kirkuk,+Iraq&output=embed&z=14',
        33.312,
        44.445,
        false,
        1
      ),
    ],
    capabilities_ar: [
      'إنتاج أنابيب بلاستيكية صناعية بأقطار متعددة',
      'تجهيزات بلاستيكية عالية الجودة للمشاريع الكبرى',
      'عبوات صناعية للمواد الكيماوية والصناعية',
      'حلول تعبئة وتغليف متكاملة',
      'تخصيص كامل حسب احتياجات المشروع',
      'ضمان الجودة وفق المعايير العالمية',
    ],
    capabilities_en: [
      'Industrial plastic pipe production in multiple diameters',
      'High-quality plastic fittings for major projects',
      'Industrial containers for chemicals and industrial use',
      'Integrated packaging solutions',
      'Full customization per project',
      'Quality assurance to international standards',
    ],
    advantages_ar: [
      { title: 'جودة معتمدة', desc: 'مواد خام معتمدة ومعايير فحص جودة على كل دفعة إنتاج' },
      { title: 'خبرة طويلة', desc: 'أكثر من 50 عامًا من الخبرة في تصنيع البلاستيك الصناعي' },
      { title: 'تخصيص كامل', desc: 'حلول مصممة خصيصاً لمتطلبات مشروعك' },
      { title: 'دعم فني', desc: 'فريق هندسي متخصص وخدمة ما بعد البيع' },
      { title: 'موثوقية التوريد', desc: 'تخطيط إنتاج مرن مع مخزون أمان يضمن الاستمرارية' },
      { title: 'كفاءة تكلفة', desc: 'تحسينات تصميم تقلل الهدر وتضبط التكاليف' },
    ],
    advantages_en: [
      { title: 'Certified quality', desc: 'Approved raw materials and QA on every batch' },
      { title: 'Long experience', desc: 'Over 50 years in industrial plastic manufacturing' },
      { title: 'Full customization', desc: 'Solutions tailored to your project' },
      { title: 'Technical support', desc: 'Dedicated engineering and after-sales service' },
      { title: 'Supply reliability', desc: 'Flexible production with safety stock' },
      { title: 'Cost efficiency', desc: 'Design improvements reducing waste and cost' },
    ],
    industries_ar: [
      { title: 'الزراعة', desc: 'أفلام وتغليف زراعي' },
      { title: 'التغليف', desc: 'أكياس وأفلام صناعية' },
      { title: 'الصناعة', desc: 'مواد أولية بلاستيكية' },
    ],
    industries_en: [
      { title: 'Agriculture', desc: 'Agricultural films and packaging' },
      { title: 'Packaging', desc: 'Bags and industrial films' },
      { title: 'Industry', desc: 'Primary plastic materials' },
    ],
    kpis: [
      { value: '50+', label: 'عام خبرة' },
      { value: '10K+', label: 'طن إنتاج سنوي' },
      { value: '95%', label: 'التزام التوريد' },
      { value: 'ISO', label: 'معايير الجودة' },
    ],
  },
  {
    slug: 'hamdi',
    name_ar: 'معمل حمدي',
    name_en: 'Hamdi Factory',
    tagline_ar: 'دقة • اتساق • موثوقية',
    tagline_en: 'Precision • Consistency • Reliability',
    description_ar:
      'يعد معمل حمدي ذراعًا إنتاجيًا متخصصًا ضمن مجموعة هادي، يركز على الأغطية والعبوات لقطاعات المنظفات والمشروبات. نقدم تخصيصات مرنة مع توافق كامل مع خطوط التعبئة القائمة.',
    description_en:
      'Hamdi Factory is a specialized production arm within Hadi Group, focusing on caps and containers for detergents and beverage sectors. We provide flexible customizations with full compatibility with existing filling lines.',
    logo: `${assets}/logo/hamdi_factory.png`,
    hero_image: `${assets}/backgrounds/hamdi_hero.jpg`,
    locations: [
      loc(
        'العراق - كركوك - دارمان',
        'Iraq - Kirkuk - Daraman',
        ['07700005551'],
        'hamidi@hadigroup.iq',
        'https://maps.google.com/maps?q=Daraman,+Kirkuk,+Iraq&output=embed&z=14',
        33.312,
        44.445,
        true,
        0
      ),
    ],
    capabilities_ar: [
      'أغطية قياسية ومخصصة للمياه والمشروبات',
      'عبوات HDPE و PP للمنظفات والسوائل',
      'توافق مع خطوط التعبئة الآلية',
      'تخصيص أشكال وألوان',
      'ضمان الجودة والاتساق',
    ],
    capabilities_en: [
      'Standard and custom caps for water and beverages',
      'HDPE and PP containers for detergents and liquids',
      'Compatibility with automatic filling lines',
      'Custom shapes and colors',
      'Quality and consistency assurance',
    ],
    advantages_ar: [
      { title: 'دقة القياس', desc: 'أغطية متوافقة مع معايير 28mm و 26mm' },
      { title: 'موثوقية التوريد', desc: 'التزام بالمواعيد مع مخزون أمان' },
      { title: 'تخصيص مرن', desc: 'ألوان وأشكال حسب الطلب' },
      { title: 'كفاءة تكلفة', desc: 'حلول مناسبة لخطوط التعبئة الحالية' },
    ],
    advantages_en: [
      { title: 'Dimensional accuracy', desc: 'Caps compatible with 28mm and 26mm standards' },
      { title: 'Supply reliability', desc: 'On-time delivery with safety stock' },
      { title: 'Flexible customization', desc: 'Colors and shapes on request' },
      { title: 'Cost efficiency', desc: 'Solutions for existing filling lines' },
    ],
    industries_ar: [
      { title: 'المشروبات', desc: 'أغطية وقناني للمياه والعصائر' },
      { title: 'المنظفات', desc: 'عبوات وغالونات' },
    ],
    industries_en: [
      { title: 'Beverages', desc: 'Caps and bottles for water and juices' },
      { title: 'Detergents', desc: 'Containers and gallons' },
    ],
    kpis: [
      { value: 'ISO', label: 'معايير الجودة' },
      { value: '95%', label: 'التزام التوريد' },
      { value: '28mm', label: 'غطاء قياسي' },
    ],
  },
  {
    slug: 'sina',
    name_ar: 'مصنع سيناء',
    name_en: 'Sina Factory',
    tagline_ar: 'استدامة • جودة • ابتكار',
    tagline_en: 'Sustainability • Quality • Innovation',
    description_ar:
      'متخصص في دعم القطاع الزراعي بإنتاج القصبات والبذور للبيوت الزجاجية والمزارع الحديثة. تأسس عام 2018 ويساهم في إنتاج شهري يتجاوز 241 مليون وحدة من المنتجات الزراعية عالية الجودة.',
    description_en:
      'Specialized in supporting the agricultural sector by producing straws and seeds for greenhouses and modern farms. Established in 2018, it contributes to monthly production exceeding 241 million units of high-quality agricultural products.',
    logo: `${assets}/logo/sina.png`,
    hero_image: `${assets}/backgrounds/sina_hero.jpg`,
    locations: [
      loc(
        'العراق - كركوك - الحي الصناعي',
        'Iraq - Kirkuk - Industrial District',
        ['07709122266', '07709090940'],
        'sinai@hadigroup.iq',
        'https://maps.google.com/maps?q=Industrial+District,+Kirkuk,+Iraq&output=embed&z=14',
        33.312,
        44.445,
        true,
        0
      ),
    ],
    capabilities_ar: [
      'إنتاج قصبات شرب PP بمقاسات متعددة',
      'توافق مع معايير الغذاء',
      'ألوان ومقاسات حسب الطلب',
      'إنتاج شهري عالي الكمية',
    ],
    capabilities_en: [
      'PP drinking straw production in multiple sizes',
      'Food-grade compliance',
      'Colors and sizes on request',
      'High-volume monthly production',
    ],
    advantages_ar: [
      { title: 'جودة غذائية', desc: 'مواد وآلات مطابقة لمعايير التغليف الغذائي' },
      { title: 'تشكيلة مقاسات', desc: 'من 7.5 سم إلى 29 سم' },
      { title: 'إنتاج ضخم', desc: 'أكثر من 241 مليون وحدة شهرياً' },
    ],
    advantages_en: [
      { title: 'Food-grade quality', desc: 'Materials and equipment meeting food packaging standards' },
      { title: 'Size range', desc: 'From 7.5 cm to 29 cm' },
      { title: 'High volume', desc: 'Over 241 million units per month' },
    ],
    industries_ar: [
      { title: 'المشروبات', desc: 'قصبات للمشروبات والعصائر' },
      { title: 'الزراعة', desc: 'منتجات للبيوت الزجاجية' },
    ],
    industries_en: [
      { title: 'Beverages', desc: 'Straws for drinks and juices' },
      { title: 'Agriculture', desc: 'Products for greenhouses' },
    ],
    kpis: [
      { value: '241M+', label: 'وحدة/شهر' },
      { value: '2018', label: 'سنة التأسيس' },
      { value: 'ISO', label: 'معايير الجودة' },
    ],
  },
  {
    slug: 'alzab',
    name_ar: 'مصنع الزاب',
    name_en: 'Alzab Factory',
    tagline_ar: 'شبكة توزيع • جودة • ابتكار',
    tagline_en: 'Distribution Network • Quality • Innovation',
    description_ar:
      'يركز مصنع الزاب على حلول التغليف الزراعي المتقدمة والري، وتصنيع أغشية الأسمدة لنباتات PET. تأسس عام 2018 ويساهم في إنتاج سنوي يتجاوز 18,000 طن من المنتجات البلاستيكية عالية الجودة.',
    description_en:
      'Alzab Factory focuses on advanced agricultural packaging and irrigation solutions, manufacturing fertilizer films for PET plants. Established in 2018, it contributes to annual production exceeding 18,000 tons of high-quality plastic products.',
    logo: `${assets}/logo/alzab.png`,
    hero_image: `${assets}/backgrounds/alzab_hero.jpg`,
    locations: [
      loc(
        'العراق - كركوك - دارمان',
        'Iraq - Kirkuk - Daraman',
        ['07713707074'],
        'alzab@hadigroup.iq',
        'https://maps.google.com/maps?q=Daraman,+Kirkuk,+Iraq&output=embed&z=14',
        33.312,
        44.445,
        true,
        0
      ),
    ],
    capabilities_ar: [
      'بريفورم PET للزيت والماء',
      'أقطار فم وأوزان متعددة',
      'شبكة توزيع واسعة',
      'جودة عالية للمواد الخام',
    ],
    capabilities_en: [
      'PET preforms for oil and water',
      'Multiple neck finishes and weights',
      'Wide distribution network',
      'High-quality raw materials',
    ],
    advantages_ar: [
      { title: 'تشكيلة بريفورم', desc: 'من 8.5 جرام إلى 25 جرام لزيت وماء' },
      { title: 'معايير فم دقيقة', desc: '28مم، 29/25مم، 32مم' },
      { title: 'إنتاج سنوي كبير', desc: 'أكثر من 18,000 طن' },
    ],
    advantages_en: [
      { title: 'Preform range', desc: 'From 8.5g to 25g for oil and water' },
      { title: 'Precise neck specs', desc: '28mm, 29/25mm, 32mm' },
      { title: 'Annual output', desc: 'Over 18,000 tons' },
    ],
    industries_ar: [
      { title: 'الزيت والمياه', desc: 'بريفورم PET للتعبئة' },
      { title: 'الزراعة', desc: 'أغشية وأفلام زراعية' },
    ],
    industries_en: [
      { title: 'Oil and water', desc: 'PET preforms for packaging' },
      { title: 'Agriculture', desc: 'Agricultural films and sheets' },
    ],
    kpis: [
      { value: '18K+', label: 'طن/سنوياً' },
      { value: '2018', label: 'سنة التأسيس' },
      { value: 'ISO', label: 'معايير الجودة' },
    ],
  },
  {
    slug: 'hadi_cap',
    name_ar: 'مصنع هادي كاب',
    name_en: 'HADICAP',
    tagline_ar: 'دقة • جودة • موثوقية',
    tagline_en: 'Precision • Quality • Reliability',
    description_ar:
      'متخصص في إنتاج أغطية القناني والعبوات، معتمدًا على أحدث تقنيات القولبة لضمان الإغلاق الآمن. تأسس عام 1998 ويساهم في إنتاج شهري يصل إلى 518 مليون كاب من أغطية بلاستيكية للمياه والعصائر والمنظفات.',
    description_en:
      'Specialized in producing bottle caps and container lids, using latest molding technologies to ensure safe closure. Established in 1998, it contributes to monthly production up to 518 million caps of plastic caps for water, juices and detergents.',
    logo: `${assets}/logo/hadi_cap.png`,
    hero_image: `${assets}/backgrounds/hadicap_hero.jpg`,
    locations: [
      loc(
        'العراق - كركوك - حي الصناعي',
        'Iraq - Kirkuk - Industrial District',
        ['07709121122'],
        'cap@hadigroup.iq',
        'https://maps.google.com/maps?q=Industrial+District,+Kirkuk,+Iraq&output=embed&z=14',
        33.312,
        44.445,
        true,
        0
      ),
    ],
    capabilities_ar: [
      'أغطية 28mm للمياه والمشروبات',
      'أغطية Push-Pull رياضية',
      'عبوات بلاستيكية معيارية ومخصصة',
      'أغطية ببطانة Foam',
    ],
    capabilities_en: [
      '28mm caps for water and beverages',
      'Sports Push-Pull caps',
      'Standard and custom plastic containers',
      'Caps with Foam liner',
    ],
    advantages_ar: [
      { title: 'إنتاج ضخم', desc: '518 مليون كاب شهرياً' },
      { title: 'خبرة منذ 1998', desc: 'أقدم مصنع أغطية في المجموعة' },
      { title: 'تشكيلة متكاملة', desc: 'أغطية وعبوات للسوائل والمنظفات' },
    ],
    advantages_en: [
      { title: 'High volume', desc: '518 million caps per month' },
      { title: 'Experience since 1998', desc: 'Oldest cap factory in the group' },
      { title: 'Full range', desc: 'Caps and containers for liquids and detergents' },
    ],
    industries_ar: [
      { title: 'المشروبات', desc: 'أغطية للمياه والعصائر' },
      { title: 'المنظفات', desc: 'أغطية وعبوات' },
    ],
    industries_en: [
      { title: 'Beverages', desc: 'Caps for water and juices' },
      { title: 'Detergents', desc: 'Caps and containers' },
    ],
    kpis: [
      { value: '518M', label: 'كاب/شهر' },
      { value: '1998', label: 'سنة التأسيس' },
      { value: '28mm', label: 'غطاء قياسي' },
    ],
  },
];

/** Product image paths by factory folder (under /assets/img/products/product/). */
const productImg = (folder: string, file: string) => `${assets}/products/product/${folder}/${file}`;

export const seedProducts: SeedProduct[] = [
  // hima
  { slug_factory: 'hima', title_ar: 'سدادة', title_en: 'Plug', desc_ar: 'سدادة محكمة لسد فتحات الأنابيب بفعالية. يوجد ذكر ونثية.', desc_en: 'Plug for effectively sealing pipe openings. Available in male and female.', img: productImg('hima_plastic', 'sadada.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 0 },
  { slug_factory: 'hima', title_ar: 'رأس', title_en: 'Head', desc_ar: 'رأس للوصل والتوصيل بين الأنابيب. يوجد ذكر ونثية.', desc_en: 'Head for connecting and joining pipes. Available in male and female.', img: productImg('hima_plastic', 'rabit.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 1 },
  { slug_factory: 'hima', title_ar: 'واشر', title_en: 'Latch Washer (Gasket)', desc_ar: 'واشر مطاطي محكم لمنع التسرب وضمان الإغلاق الكامل', desc_en: 'Rubber washer seal to prevent leaks and ensure complete closure', img: productImg('hima_plastic', 'rabit.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 2 },
  { slug_factory: 'hima', title_ar: 'تحويلة', title_en: 'Reduction Coupling', desc_ar: 'تحويلة لتقليل قطر الأنبوب بسلاسة وكفاءة', desc_en: 'Reduction coupling for smoothly and efficiently reducing pipe diameter', img: productImg('hima_plastic', 'tawsil.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 3 },
  { slug_factory: 'hima', title_ar: 'صليب', title_en: 'Spider (Cross) Connector', desc_ar: 'وصلة صليبية لتوزيع المياه في أربع اتجاهات', desc_en: 'Cross connector for distributing water in four directions', img: productImg('hima_plastic', 'taqsim.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 4 },
  { slug_factory: 'hima', title_ar: 'تي', title_en: 'T Connector', desc_ar: 'وصلة T لتوزيع المياه في ثلاثة اتجاهات', desc_en: 'T connector for distributing water in three directions', img: productImg('hima_plastic', 'taqsim.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 5 },
  { slug_factory: 'hima', title_ar: 'قاعدة', title_en: 'Base (Abot)', desc_ar: 'قاعدة ثابتة لدعم أنظمة الري والرشاشات', desc_en: 'Stable base for supporting irrigation systems and sprinklers', img: productImg('hima_plastic', 'rabit.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 6 },
  { slug_factory: 'hima', title_ar: 'تطوالة', title_en: 'Sleeve', desc_ar: 'تطوالة للربط والتوصيل بين أجزاء الأنابيب', desc_en: 'Sleeve for connecting and joining pipe sections', img: productImg('hima_plastic', 'rabit.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 7 },
  { slug_factory: 'hima', title_ar: 'قفل عصفر', title_en: 'Spherical Valve', desc_ar: 'صمام كروي للتحكم في تدفق المياه', desc_en: 'Spherical valve for controlling water flow', img: productImg('hima_plastic', 'rabit.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 8 },
  { slug_factory: 'hima', title_ar: 'وصالة قاعدة', title_en: 'Abot Sleeve', desc_ar: 'وصلة قاعدة لربط القاعدة بالأنابيب', desc_en: 'Base sleeve for connecting the base to pipes', img: productImg('hima_plastic', 'rabit.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 9 },
  { slug_factory: 'hima', title_ar: 'طقم قاعدة كامل', title_en: 'Clamp Abot Team', desc_ar: 'طقم قاعدة كامل مع الرشاش والأنبوب والقاعدة', desc_en: 'Complete base set with sprinkler, pipe, and base', img: productImg('hima_plastic', 'marasha.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 10 },
  { slug_factory: 'hima', title_ar: 'امتداد', title_en: 'Extension', desc_ar: 'أنبوب امتداد للوصول لارتفاعات مختلفة', desc_en: 'Extension pipe for reaching different heights', img: productImg('hima_plastic', 'boro.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 11 },
  { slug_factory: 'hima', title_ar: 'عکس', title_en: 'Elbow', desc_ar: 'كوع للانحناء وتوجيه الأنابيب في اتجاهات مختلفة', desc_en: 'Elbow fitting for bending and directing pipes in different directions', img: productImg('hima_plastic', 'rabit.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 12 },
  { slug_factory: 'hima', title_ar: 'قفل', title_en: 'LINE BUTTERFLY VALVE', desc_ar: 'صمام فراشة خطي للتحكم في تدفق المياه', desc_en: 'Line butterfly valve for controlling water flow', img: productImg('hima_plastic', 'rabit.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 13 },
  { slug_factory: 'hima', title_ar: 'أنبوب الري بالتنقيط', title_en: 'Drip Irrigation Pipe', desc_ar: 'أنبوب ري بالتنقيط عالي الجودة لتوفير المياه في الزراعة', desc_en: 'High-quality drip irrigation pipe for water-efficient agriculture', img: productImg('hima_plastic', 'boro.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 14 },
  { slug_factory: 'hima', title_ar: 'قطع التوصيل والربط PE', title_en: 'PE Connection and Joining Pieces', desc_ar: 'قطع توصيل وربط PE متطورة لأنظمة الري من بولي إيثيلين عالي ومتوسط الكثافة', desc_en: 'Advanced PE connection and joining pieces for irrigation systems from high and medium density polyethylene', img: productImg('hima_plastic', 'rabit.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 15 },
  { slug_factory: 'hima', title_ar: 'كوع 90 درجة', title_en: '90-Degree Elbow', desc_ar: 'كوع 90 درجة من سلسلة PEFEL للانحناء وتوجيه الأنابيب', desc_en: '90-degree elbow from PEFEL series for bending and directing pipes', img: productImg('hima_plastic', 'rabit.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 16 },
  { slug_factory: 'hima', title_ar: 'وصلة توصيل', title_en: 'Connection Fitting', desc_ar: 'وصلة توصيل مباشرة من سلسلة PEFEL و PEFCO للربط بين الأنابيب', desc_en: 'Direct connection fitting from PEFEL and PEFCO series for joining pipes', img: productImg('hima_plastic', 'tawsil.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 17 },
  { slug_factory: 'hima', title_ar: 'مثلث تنقيص 90 درجة', title_en: '90-Degree Reduction Tee', desc_ar: 'مثلث تنقيص 90 درجة من سلسلة PEFTR لتقليل القطر', desc_en: '90-degree reduction tee from PEFTR series for diameter reduction', img: productImg('hima_plastic', 'taqsim.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 18 },
  { slug_factory: 'hima', title_ar: 'وصلة تنقيص', title_en: 'Reduction Connection', desc_ar: 'وصلة تنقيص من سلسلة PEFCOR لتقليل قطر الأنبوب', desc_en: 'Reduction connection from PEFCOR series for reducing pipe diameter', img: productImg('hima_plastic', 'tawsil.png'), category_ar: 'ري', category_en: 'Irrigation', order_index: 19 },
  // gayath
  { slug_factory: 'gayath', title_ar: 'أكياس حفظ وتخزين الخضر والفواكه', title_en: 'Fruit and Vegetable Storage Bags', desc_ar: 'أكياس بلاستيكية لحفظ وتخزين مختلف أنواع الخضر والفواكه مثل الخيار والجزر والطماطم والباذنجان والرمان والموز', desc_en: 'Plastic bags for storing and preserving various types of vegetables and fruits such as cucumbers, carrots, tomatoes, eggplants, pomegranates, and bananas', img: productImg('gyath', 'gyath@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 0 },
  { slug_factory: 'gayath', title_ar: 'أفلام التغطية الزراعية', title_en: 'Agricultural Mulch Films', desc_ar: 'أفلام بلاستيكية خاصة لتغطية التربة في الزراعة. تمنع تطور الأعشاب الضارة، تمنع التربة من الجفاف، وتمنع تبخر الماء', desc_en: 'Special plastic films for covering soil in agriculture. Prevent weed growth, prevent soil dryness, and prevent water evaporation', img: productImg('gyath', 'gyath2@3x.png'), category_ar: 'زراعي', category_en: 'Agricultural', order_index: 1 },
  { slug_factory: 'gayath', title_ar: 'الستارة الحرارية', title_en: 'Thermal Curtain', desc_ar: 'خاصة في المناطق ذات المناخ البارد، تستخدم في الدفيئة أو البيت البلاستيكي لمنع فقدان الحرارة', desc_en: 'Special for cold climate areas, used in greenhouses or plastic houses to prevent heat loss', img: productImg('gyath', 'gyath3@3x.png'), category_ar: 'زراعي', category_en: 'Agricultural', order_index: 2 },
  { slug_factory: 'gayath', title_ar: 'أفلام بلاستيكية للتشميس', title_en: 'Solarization Films', desc_ar: 'أفلام بلاستيكية للتشميس لمكافحة الآفات الضارة والحشرات والنيماتودا', desc_en: 'Plastic films for solarization to combat harmful pests, insects, and nematodes', img: productImg('gyath', 'gyath4@3x.png'), category_ar: 'زراعي', category_en: 'Agricultural', order_index: 3 },
  { slug_factory: 'gayath', title_ar: 'غطاء بلاستيكي للدفيئة', title_en: 'Greenhouse Cover', desc_ar: 'أفلام بلاستيكية عالية الجودة لتغطية الدفيئات الزراعية. مصنعة بتقنية القذف الثلاثي', desc_en: 'High-quality plastic films for covering agricultural greenhouses. Manufactured using triple extrusion technology', img: productImg('gyath', 'gyath@3x.png'), category_ar: 'زراعي', category_en: 'Agricultural', order_index: 4 },
  { slug_factory: 'gayath', title_ar: 'شرنك فلم', title_en: 'Shrink Film', desc_ar: 'يستخدم لتغليف المنتجات وغيرها. مادة مصنوعة من فيلم البلاستيك البوليمر، عندما تمرر عليها الحرارة تنكمش بإحكام على المنتج', desc_en: 'Used for packaging products. Material made of polymer plastic film that shrinks tightly around the product when heat is applied', img: productImg('gyath', 'gyath2@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 5 },
  { slug_factory: 'gayath', title_ar: 'شرنك فلم مطبوع', title_en: 'Printed Shrink Film', desc_ar: 'يستخدم في تغليف المشروبات الغازية والمياه المعدنية والمعلبات باستخدام أفران حراري أو النار المباشر. متوفر بألوان وتصاميم مطبوعة حسب الطلب', desc_en: 'Used for packaging carbonated beverages, mineral water, and canned goods using thermal ovens or direct flame. Available in printed colors and designs as requested', img: productImg('gyath', 'gyath3@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 6 },
  { slug_factory: 'gayath', title_ar: 'ستريج فلم', title_en: 'Stretch Film', desc_ar: 'رولات الاسترتش فيلم عالية الجودة والتي تستخدم في تغليف المنتجات والبالتات. متوفر من 17 ميكرون وحتى 40 ميكرون', desc_en: 'High-quality stretch film rolls used for packaging products and pallets. Available from 17 to 40 microns', img: productImg('gyath', 'gyath4@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 7 },
  { slug_factory: 'gayath', title_ar: 'ستريج هود', title_en: 'Stretch Hood', desc_ar: 'الفيلم القابل للتقلص يستعمل للحفظ والحماية. يسمح بحماية المنتجات ضد كل العوامل الخارجية من أشعة شمسية', desc_en: 'Shrinkable film used for storage and protection. Allows protection of products against all external factors including sunlight', img: productImg('gyath', 'gyath@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 8 },
  // hamdi
  { slug_factory: 'hamdi', title_ar: 'غطاء 28mm مياه/مشروبات', title_en: '28mm Water/Beverage Cap', desc_ar: 'غطاء قياسي محكم للمياه والعصائر مع توافق تام لخطوط التعبئة الآلية', desc_en: 'Standard sealed cap for water and juices with full compatibility for automatic filling lines', img: productImg('hamdi', 'DSC00921.JPG'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 0 },
  { slug_factory: 'hamdi', title_ar: 'غطاء Push-Pull رياضي', title_en: 'Sports Push-Pull Cap', desc_ar: 'غطاء رياضي للفتح السريع مثالي للقناني المحمولة مع ضمان عدم الانسكاب', desc_en: 'Sports cap for quick opening ideal for portable bottles with spill-proof guarantee', img: productImg('hamdi', 'DSC00984.JPG'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 1 },
  { slug_factory: 'hamdi', title_ar: 'قنينة HDPE — 1 لتر', title_en: 'HDPE Bottle — 1 Liter', desc_ar: 'قنينة متينة للمنظفات السائلة بسماكات متوازنة ومقاومة كيماوية ممتازة', desc_en: 'Durable bottle for liquid detergents with balanced thickness and excellent chemical resistance', img: productImg('hamdi', 'DSC01034.JPG'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 2 },
  { slug_factory: 'hamdi', title_ar: 'غالون HDPE — 5 لتر', title_en: 'HDPE Gallon — 5 Liters', desc_ar: 'غالون بيد مريحة للمنظفات الصناعية مع فوهات متعددة وقوة تحمل عالية', desc_en: 'Gallon with comfortable handle for industrial detergents with multiple nozzles and high durability', img: productImg('hamdi', 'DSC01040.JPG'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 3 },
  { slug_factory: 'hamdi', title_ar: 'علبة Pail', title_en: 'Pail Container', desc_ar: 'علبة بلاستيكية متينة من مادة PP مصممة خصيصاً لتعبئة منتجات الألبان', desc_en: 'Durable plastic container made of PP material specifically designed for packaging dairy products', img: productImg('hamdi', 'DSC01034.JPG'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 4 },
  // sina
  { slug_factory: 'sina', title_ar: 'قصب - 7.5 سم', title_en: 'Straw - 7.5 cm', desc_ar: 'قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان', desc_en: 'Drinking straw made of PP material, versatile for juices and beverages. Available in all colors', img: productImg('sina', 'kamish1@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 0 },
  { slug_factory: 'sina', title_ar: 'قصب - 8.5 سم', title_en: 'Straw - 8.5 cm', desc_ar: 'قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان', desc_en: 'Drinking straw made of PP material, versatile for juices and beverages. Available in all colors', img: productImg('sina', 'kamish2@3x@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 1 },
  { slug_factory: 'sina', title_ar: 'قصب - 10.5 / 12 سم', title_en: 'Straw - 10.5 / 12 cm', desc_ar: 'قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان', desc_en: 'Drinking straw made of PP material, versatile for juices and beverages. Available in all colors', img: productImg('sina', 'kamish3@3x@3x@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 2 },
  { slug_factory: 'sina', title_ar: 'قصب - 15 سم', title_en: 'Straw - 15 cm', desc_ar: 'قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان', desc_en: 'Drinking straw made of PP material, versatile for juices and beverages. Available in all colors', img: productImg('sina', 'kamish4@3xx@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 3 },
  { slug_factory: 'sina', title_ar: 'قصب - 17.5 سم', title_en: 'Straw - 17.5 cm', desc_ar: 'قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان', desc_en: 'Drinking straw made of PP material, versatile for juices and beverages. Available in all colors', img: productImg('sina', 'kamish5@3xx@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 4 },
  { slug_factory: 'sina', title_ar: 'قصب - 19.5 سم', title_en: 'Straw - 19.5 cm', desc_ar: 'قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان', desc_en: 'Drinking straw made of PP material, versatile for juices and beverages. Available in all colors', img: productImg('sina', 'kamish6@3x@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 5 },
  { slug_factory: 'sina', title_ar: 'قصب - 21 سم', title_en: 'Straw - 21 cm', desc_ar: 'قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان', desc_en: 'Drinking straw made of PP material, versatile for juices and beverages. Available in all colors', img: productImg('sina', 'kamish7@3x@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 6 },
  { slug_factory: 'sina', title_ar: 'قصب - 23 سم', title_en: 'Straw - 23 cm', desc_ar: 'قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان', desc_en: 'Drinking straw made of PP material, versatile for juices and beverages. Available in all colors', img: productImg('sina', 'kamish8@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 7 },
  { slug_factory: 'sina', title_ar: 'قصب - 25 سم', title_en: 'Straw - 25 cm', desc_ar: 'قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان', desc_en: 'Drinking straw made of PP material, versatile for juices and beverages. Available in all colors', img: productImg('sina', 'kamish9@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 8 },
  { slug_factory: 'sina', title_ar: 'قصب - 27 سم', title_en: 'Straw - 27 cm', desc_ar: 'قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان', desc_en: 'Drinking straw made of PP material, versatile for juices and beverages. Available in all colors', img: productImg('sina', 'kamish10@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 9 },
  { slug_factory: 'sina', title_ar: 'قصب - 29 سم', title_en: 'Straw - 29 cm', desc_ar: 'قصب شرب مصنوع من مادة PP متعدد الاستخدامات للعصائر والمشروبات. متوفر بجميع الألوان', desc_en: 'Drinking straw made of PP material, versatile for juices and beverages. Available in all colors', img: productImg('sina', 'kamish11@3x.png'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 10 },
  // hadi_cap
  { slug_factory: 'hadi_cap', title_ar: 'أغطية 28mm مياه/مشروبات', title_en: '28mm Water/Beverage Caps', desc_ar: 'أغطية قياسية محكمة للمياه والعصائر', desc_en: 'Standard sealed caps for water and juices', img: productImg('hadicap', 'DSC00999.JPG'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 0 },
  { slug_factory: 'hadi_cap', title_ar: 'أغطية Push-Pull رياضي', title_en: 'Sports Push-Pull Caps', desc_ar: 'أغطية رياضي للفتح السريع مثالية للقناني المحمولة', desc_en: 'Sports caps for quick opening ideal for portable bottles', img: productImg('hadicap', 'DSC01000.JPG'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 1 },
  { slug_factory: 'hadi_cap', title_ar: 'عبوات بلاستيكية', title_en: 'Plastic Containers', desc_ar: 'عبوات بلاستيكية بمقاسات معيارية ومخصصة للمنتجات الغذائية', desc_en: 'Plastic containers with standard and custom sizes for food products', img: productImg('hadicap', 'DSC01001.JPG'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 2 },
  { slug_factory: 'hadi_cap', title_ar: 'أغطية ببطانة Foam', title_en: 'Caps with Foam Liner', desc_ar: 'أغطية بإحكام إضافي مثالية للسوائل الحساسة', desc_en: 'Caps with extra sealing ideal for sensitive liquids', img: productImg('hadicap', 'DSC01005.JPG'), category_ar: 'تغليف', category_en: 'Packaging', order_index: 3 },
  // alzab
  { slug_factory: 'alzab', title_ar: 'بريفورم زيت - 22.5 جرام', title_en: 'Oil Preform - 22.5 grams', desc_ar: 'بريفورم PET للزيت بسعة 1 لتر. وزن 22.5 جرام مع مقياس قطر الفم 32 مم', desc_en: 'PET preform for oil with 1 liter capacity. Weight 22.5 grams with 32mm neck finish', img: productImg('alzap -zip', 'product1@3x.png'), category_ar: 'صناعي', category_en: 'Industrial', order_index: 0 },
  { slug_factory: 'alzab', title_ar: 'بريفورم زيت - 25 جرام', title_en: 'Oil Preform - 25 grams', desc_ar: 'بريفورم PET للزيت بسعة 1 لتر. وزن 25 جرام مع مقياس قطر الفم 32 مم', desc_en: 'PET preform for oil with 1 liter capacity. Weight 25 grams with 32mm neck finish', img: productImg('alzap -zip', 'product2@3x.png'), category_ar: 'صناعي', category_en: 'Industrial', order_index: 1 },
  { slug_factory: 'alzab', title_ar: 'بريفورم ماء - 8.5 جرام', title_en: 'Water Preform - 8.5 grams', desc_ar: 'بريفورم PET للماء بسعة 0.25-0.33 لتر. وزن 8.5 جرام مع مقياس قطر الفم 29/25 مم', desc_en: 'PET preform for water with 0.25-0.33 liter capacity. Weight 8.5 grams with 29/25mm neck finish', img: productImg('alzap -zip', 'product3@3x.png'), category_ar: 'صناعي', category_en: 'Industrial', order_index: 2 },
  { slug_factory: 'alzab', title_ar: 'بريفورم ماء - 12.5 جرام', title_en: 'Water Preform - 12.5 grams', desc_ar: 'بريفورم PET للماء بسعة 0.5 لتر. وزن 12.5 جرام مع مقياس قطر الفم 28 مم', desc_en: 'PET preform for water with 0.5 liter capacity. Weight 12.5 grams with 28mm neck finish', img: productImg('alzap -zip', 'product4@3x.png'), category_ar: 'صناعي', category_en: 'Industrial', order_index: 3 },
  { slug_factory: 'alzab', title_ar: 'بريفورم ماء - 17.5 جرام', title_en: 'Water Preform - 17.5 grams', desc_ar: 'بريفورم PET للماء بسعة 0.75 لتر. وزن 17.5 جرام مع مقياس قطر الفم 28 مم', desc_en: 'PET preform for water with 0.75 liter capacity. Weight 17.5 grams with 28mm neck finish', img: productImg('alzap -zip', 'product5@3x.png'), category_ar: 'صناعي', category_en: 'Industrial', order_index: 4 },
  { slug_factory: 'alzab', title_ar: 'بريفورم ماء - 20 جرام', title_en: 'Water Preform - 20 grams', desc_ar: 'بريفورم PET للماء بسعة 0.75 لتر. وزن 20 جرام مع مقياس قطر الفم 28 مم', desc_en: 'PET preform for water with 0.75 liter capacity. Weight 20 grams with 28mm neck finish', img: productImg('alzap -zip', 'product6@3x.png'), category_ar: 'صناعي', category_en: 'Industrial', order_index: 5 },
];
