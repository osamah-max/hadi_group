// src/pages/Contact.tsx
import React, { useMemo } from "react";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Factory,
  Building2,
  Droplet,
  Package,
  Layers,
  Tractor,
} from "lucide-react";
import useDir from "../hooks/useDir";

// ----- بيانات المصانع (من صفحات الشركات) -----
type Plant = {
  key: string;
  name: string;        // عربي
  nameEn: string;      // إنجليزي
  address: {
    ar: string;
    en: string;
  };
  phones: string[];
  email: string;
  mapUrl: string;
  icon: React.ElementType;
  color: string;
  route: string;
};

const plants: Plant[] = [
  {
    key: "gayath",
    name: "مصنع غياث",
    nameEn: "Gayath Factory",
    address: {
      ar: "العراق - كركوك - الحي الصناعي | كركوك - دارمان",
      en: "Iraq - Kirkuk - Industrial District | Kirkuk - Daraman"
    },
    phones: ["07701300995", "07811129492"],
    email: "gayath@hadigroup.iq",
    mapUrl: "https://maps.google.com/maps?q=Industrial+District,+Kirkuk,+Iraq&output=embed&z=14",
    icon: Factory,
    color: "from-emerald-500 to-teal-600",
    route: "/companies/gayath",
  },
  {
    key: "hamdi",
    name: "مصنع حمدي",
    nameEn: "Hamdi Factory",
    address: {
      ar: "العراق - كركوك - دارمان",
      en: "Iraq - Kirkuk - Daraman"
    },
    phones: ["07700005551"],
    email: "hamidi@hadigroup.iq",
    mapUrl: "https://maps.google.com/maps?q=Daraman,+Kirkuk,+Iraq&output=embed&z=14",
    icon: Building2,
    color: "from-orange-500 to-amber-600",
    route: "/companies/hamdi",
  },
  {
    key: "sina",
    name: "مصنع سيناء",
    nameEn: "Sina Factory",
    address: {
      ar: "العراق - كركوك - الحي الصناعي",
      en: "Iraq - Kirkuk - Industrial District"
    },
    phones: ["07709122266", "07709090940"],
    email: "sinai@hadigroup.iq",
    mapUrl: "https://maps.google.com/maps?q=Industrial+District,+Kirkuk,+Iraq&output=embed&z=14",
    icon: Tractor,
    color: "from-green-500 to-lime-600",
    route: "/companies/sina",
  },
  {
    key: "alzab",
    name: "مصنع الزاب",
    nameEn: "Alzab Factory",
    address: {
      ar: "العراق - كركوك - دارمان",
      en: "Iraq - Kirkuk - Daraman"
    },
    phones: ["07713707074"],
    email: "alzab@hadigroup.iq",
    mapUrl: "https://maps.google.com/maps?q=Daraman,+Kirkuk,+Iraq&output=embed&z=14",
    icon: Droplet,
    color: "from-cyan-500 to-sky-600",
    route: "/companies/alzab",
  },
  {
    key: "hima",
    name: "هيما بلاستك",
    nameEn: "HIMA Plastic",
    address: {
      ar: "العراق - كركوك - دارمان",
      en: "Iraq - Kirkuk - Daraman"
    },
    phones: ["07737203059", "07815000823"],
    email: "hima@hadigroup.iq",
    mapUrl: "https://maps.google.com/maps?q=Daraman,+Kirkuk,+Iraq&output=embed&z=14",
    icon: Layers,
    color: "from-purple-500 to-violet-600",
    route: "/companies/hima",
  },
  {
    key: "hadiCap",
    name: "هادي كاب",
    nameEn: "HADICAP",
    address: {
      ar: "العراق - كركوك - حي الصناعي",
      en: "Iraq - Kirkuk - Industrial District"
    },
    phones: ["07709121122"],
    email: "cap@hadigroup.iq",
    mapUrl: "https://maps.google.com/maps?q=Industrial+District,+Kirkuk,+Iraq&output=embed&z=14",
    icon: Package,
    color: "from-blue-500 to-indigo-600",
    route: "/companies/hadi_cap",
  },
];

// ----- مكونات UI صغيرة -----
function InfoRow({
  Icon,
  title,
  children,
  isRTL,
}: {
  Icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  isRTL: boolean;
}) {
  return (
    <div className={`flex flex-col items-center text-center rounded-xl bg-white p-5 sm:p-6 border border-gray-200/80 shadow-md transition-all hover:shadow-lg hover:border-emerald-300 animate-fadeInUp`}>
      <div className="grid place-items-center h-12 w-12 rounded-full bg-emerald-600 text-white shadow-lg mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <div className="w-full" dir={isRTL ? "rtl" : "ltr"}>
        <div className="font-bold text-lg text-emerald-800 mb-2">{title}</div>
        <div className="text-gray-700 text-[15px] leading-relaxed break-words">{children}</div>
      </div>
    </div>
  );
}

// ----- بطاقة مصنع مع خريطة -----
function PlantCard({ plant, isRTL, isAR }: { plant: Plant; isRTL: boolean; isAR: boolean }) {
  const Icon = plant.icon;
  const plantName = isAR ? plant.name : plant.nameEn;
  const address = isAR ? plant.address.ar : plant.address.en;
  
  // Extract Google Maps link from embed URL
  const mapLink = plant.mapUrl.replace('&output=embed&z=14', '').replace('output=embed&z=14', '');

  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden transition-all hover:shadow-xl hover:border-emerald-300 animate-fadeInUp">
      <div className={`flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${plant.color} text-white`}>
        <div className="grid place-items-center h-12 w-12 rounded-xl bg-white/20 shadow-lg flex-shrink-0">
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-lg font-bold truncate">{plantName}</div>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        <div className={`flex items-start gap-3 rounded-lg bg-gray-50 px-4 py-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="grid place-items-center h-9 w-9 rounded-full bg-emerald-600 text-white flex-shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0" dir={isRTL ? "rtl" : "ltr"}>
            <div className="font-semibold text-emerald-800 mb-1 text-sm">
              {isAR ? "العنوان" : "Address"}
            </div>
            <div className="text-gray-700 text-sm leading-relaxed">
              {address.split(' | ').map((part, idx) => (
                <div key={idx}>{part}</div>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex items-start gap-3 rounded-lg bg-gray-50 px-4 py-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="grid place-items-center h-9 w-9 rounded-full bg-emerald-600 text-white flex-shrink-0">
            <Phone className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0" dir={isRTL ? "rtl" : "ltr"}>
            <div className="font-semibold text-emerald-800 mb-1 text-sm">
              {isAR ? "أرقام الاتصال" : "Phone Numbers"}
            </div>
            <div className="space-y-1">
              {plant.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s+/g, "")}`}
                  className="block text-gray-700 text-sm font-medium hover:text-emerald-700 transition-colors"
                >
                  {p}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex items-start gap-3 rounded-lg bg-gray-50 px-4 py-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="grid place-items-center h-9 w-9 rounded-full bg-emerald-600 text-white flex-shrink-0">
            <Mail className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0" dir={isRTL ? "rtl" : "ltr"}>
            <div className="font-semibold text-emerald-800 mb-1 text-sm">
              {isAR ? "البريد الإلكتروني" : "Email"}
            </div>
            <a
              href={`mailto:${plant.email}`}
              className="text-gray-700 text-sm break-all hover:text-emerald-700 transition-colors block"
            >
              {plant.email}
            </a>
          </div>
        </div>

        <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            title={isAR ? `خريطة ${plant.name}` : `Map of ${plant.nameEn}`}
            src={plant.mapUrl}
            className="w-full h-56"
            loading="lazy"
            allowFullScreen
          />
        </div>

        <a
          href={mapLink}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center justify-center gap-2 w-full text-emerald-700 font-semibold py-2.5 px-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <span>{isAR ? "فتح في خرائط جوجل" : "Open in Google Maps"}</span>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
            <path d="M5 5h5V3H3v7h2V5z" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ------------------ الصفحة الرئيسية ------------------
export default function Contact() {
  const { isRTL, isAR } = useDir();

  const t = useMemo(
    () =>
      isAR
        ? {
            title: "تواصل معنا",
            subtitle: "نحن هنا للإجابة على جميع استفساراتكم وتقديم أفضل الخدمات",
            address: "العنوان",
            phone: "الهاتف",
            email: "البريد الإلكتروني",
            hours: "ساعات العمل",
            factoriesTitle: "مواقع مصانع المجموعة",
            factoriesSubtitle: "اكتشف مواقع مصانعنا والتواصل معها مباشرة",
            hqAddress: "العراق - كركوك - دارمان",
            hqPhones: ["07700005551", "07737203059", "07709121122"],
            hqEmails: ["info@hadigroup.iq", "sales@hadigroup.iq"],
            workingHours: (
              <>
                الأحد - الخميس: 8:00 - 16:00
                <br />
                الجمعة - السبت: مغلق
              </>
            ),
          }
        : {
            title: "Contact Us",
            subtitle: "We're here to answer all your inquiries and provide the best services",
            address: "Address",
            phone: "Phone",
            email: "Email",
            hours: "Working Hours",
            factoriesTitle: "Group Factory Locations",
            factoriesSubtitle: "Discover our factory locations and contact them directly",
            hqAddress: "Iraq - Kirkuk - Daraman",
            hqPhones: ["07700005551", "07737203059", "07709121122"],
            hqEmails: ["info@hadigroup.iq", "sales@hadigroup.iq"],
            workingHours: (
              <>
                Sunday - Thursday: 8:00 - 16:00
                <br />
                Friday - Saturday: Closed
              </>
            ),
          },
    [isAR]
  );

  const hqMapUrl = "https://maps.google.com/maps?q=Daraman,+Kirkuk,+Iraq&output=embed&z=14";
  const hqMapLink = "https://maps.google.com/maps?q=Daraman,+Kirkuk,+Iraq";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 text-emerald-700">
            <Phone className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-widest">
              {t.title}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
        </div>

        {/* معلومات التواصل الرئيسية */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <InfoRow Icon={MapPin} title={t.address} isRTL={isRTL}>
              <div className="space-y-1">
                {t.hqAddress.split(" - ").map((part, idx) => (
                  <div key={idx}>{part}</div>
                ))}
              </div>
            </InfoRow>

            <InfoRow Icon={Phone} title={t.phone} isRTL={isRTL}>
              <div className="space-y-2">
                {t.hqPhones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s+/g, "")}`}
                    className="block font-medium hover:text-emerald-700 transition-colors"
                  >
                    {p}
                  </a>
                ))}
              </div>
            </InfoRow>

            <InfoRow Icon={Mail} title={t.email} isRTL={isRTL}>
              <div className="space-y-2">
                {t.hqEmails.map((m) => (
                  <a
                    key={m}
                    href={`mailto:${m}`}
                    className="block break-all hover:text-emerald-700 transition-colors"
                  >
                    {m}
                  </a>
                ))}
              </div>
            </InfoRow>

            <InfoRow Icon={Clock} title={t.hours} isRTL={isRTL}>
              <div>{t.workingHours}</div>
            </InfoRow>
          </div>

          {/* خريطة المقر الرئيسي */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white">
            <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <h3 className="text-lg font-bold">
                {isAR ? "موقع المقر الرئيسي" : "Main Office Location"}
              </h3>
            </div>
            <iframe
              title={isAR ? "خريطة المقر الرئيسي" : "Main Office Map"}
              src={hqMapUrl}
              className="w-full h-64 md:h-80"
              loading="lazy"
              allowFullScreen
            />
            <div className="p-4 bg-gray-50">
              <a
                href={hqMapLink}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <span>{isAR ? "فتح في خرائط جوجل" : "Open in Google Maps"}</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                  <path d="M5 5h5V3H3v7h2V5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* شبكة المصانع + الخرائط */}
        <section className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              {t.factoriesTitle}
            </h2>
            <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
              {t.factoriesSubtitle}
            </p>
            <span className="block mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {plants.map((plant) => (
              <PlantCard key={plant.key} plant={plant} isRTL={isRTL} isAR={isAR} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
