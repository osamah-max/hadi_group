// src/pages/Contact.tsx
import React from "react";
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

// ----- بيانات المصانع (يمكنك تعديل العناوين والإحداثيات والأرقام لاحقًا) -----
type Plant = {
  key: string;
  name: string;        // عربي
  nameEn: string;      // إنجليزي (للاستخدام لاحقًا إذا لزم)
  address: string;
  phones: string[];
  email?: string;
  lat: number;
  lng: number;
  icon: React.ElementType;
  color: string;
};

const plants: Plant[] = [
  {
    key: "gayath",
    name: "معمل غياث الدين مادي",
    nameEn: "Ghiyath Al-Din Madi Factory",
    address: "العراق - كركوك - دارمان",
    phones: ["+964 770 000 1111", "+964 780 000 1112"],
    email: "gayath@hadigroup.iq",
    lat: 33.3253,
    lng: 44.4220,
    icon: Factory,
    color: "from-emerald-500 to-teal-600",
  },
  {
    key: "hadi_cap",
    name: "معمل هادي كاب",
    nameEn: "Hadi Cap Factory",
    address: "العراق - كركوك - دارمان",
    phones: ["+964 770 000 2221"],
    email: "cap@hadigroup.iq",
    lat: 33.3353,
    lng: 44.392,
    icon: Package,
    color: "from-blue-500 to-indigo-600",
  },
  {
    key: "hima",
    name: "هيما بلاستيك",
    nameEn: "Hima Plastic",
    address: "العراق - كركوك - دارمان",
    phones: ["+964 770 000 3331"],
    email: "hima@hadigroup.iq",
    lat: 33.3155,
    lng: 44.41,
    icon: Layers,
    color: "from-purple-500 to-violet-600",
  },
  {
    key: "alzab",
    name: "معمل الزاب",
    nameEn: "Al-Zab Factory",
    address: "العراق - كركوك - دارمان",
    phones: ["+964 770 000 4441"],
    email: "alzab@hadigroup.iq",
    lat: 36.3466,
    lng: 43.1362,
    icon: Droplet,
    color: "from-cyan-500 to-sky-600",
  },
  {
    key: "hamidi",
    name: "معمل حميدي نظام الدين",
    nameEn: "Hamidi Nizam Al-Din Factory",
    address: "العراق - كركوك - دارمان",
    phones: ["+964 770 000 5551"],
    email: "hamidi@hadigroup.iq",
    lat: 33.312,
    lng: 44.445,
    icon: Building2,
    color: "from-orange-500 to-amber-600",
  },
  {
    key: "sinai",
    name: "معمل سيناء",
    nameEn: "Sinai Factory",
    address: "العراق - كركوك - دارمان",
    phones: ["+964 770 000 6661"],
    email: "sinai@hadigroup.iq",
    lat: 33.302,
    lng: 44.41,
    icon: Tractor,
    color: "from-green-500 to-lime-600",
  },
];

// مولّد رابط تضمين خرائط جوجل
const mapSrc = (lat: number, lng: number) =>
  `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`;

const mapLink = (lat: number, lng: number) =>
  `https://www.google.com/maps?q=${lat},${lng}`;

// ----- مكونات UI صغيرة -----
function InfoRow({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center rounded-xl bg-white p-5 border border-gray-200/80 shadow-md transition-all hover:shadow-lg hover:border-emerald-300">
      <div className="grid place-items-center h-12 w-12 rounded-full bg-emerald-600 text-white shadow-lg mb-4">
        {icon}
      </div>
      <div className="w-full">
        <div className="font-bold text-lg text-emerald-800 mb-2">{title}</div>
        <div className="text-gray-700 text-[15px] leading-relaxed break-words">{children}</div>
      </div>
    </div>
  );
}

// ----- بطاقة مصنع مع خريطة -----
function PlantCard({ plant }: { plant: Plant }) {
  const Icon = plant.icon;
  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-md overflow-hidden transition-all hover:shadow-lg hover:border-emerald-300">
      <div className={`flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${plant.color} text-white`}>
        <div className="grid place-items-center h-12 w-12 rounded-xl bg-white/20 shadow-lg">
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-lg font-bold">{plant.name}</div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-4 py-3">
          <div className="grid place-items-center h-9 w-9 rounded-full bg-emerald-600 text-white flex-shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-emerald-800 mb-1">العنوان</div>
            <div className="text-gray-700 text-sm leading-relaxed">
              {plant.address.split(' - ').map((part, idx) => (
                <div key={idx}>{part}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-4 py-3">
          <div className="grid place-items-center h-9 w-9 rounded-full bg-emerald-600 text-white flex-shrink-0">
            <Phone className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-emerald-800 mb-1">أرقام الاتصال</div>
            <div className="space-y-1">
              {plant.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s+/g, "")}`} className="block text-gray-700 text-sm font-medium hover:text-emerald-700 transition-colors">
                  {p}
                </a>
              ))}
            </div>
          </div>
        </div>

        {plant.email && (
          <div className="flex items-start gap-3 rounded-lg bg-gray-50 px-4 py-3">
            <div className="grid place-items-center h-9 w-9 rounded-full bg-emerald-600 text-white flex-shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-emerald-800 mb-1">البريد</div>
              <a href={`mailto:${plant.email}`} className="text-gray-700 text-sm break-all hover:text-emerald-700 transition-colors">
                {plant.email}
              </a>
            </div>
          </div>
        )}

        <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <iframe
            title={`خريطة ${plant.name}`}
            src={mapSrc(plant.lat, plant.lng)}
            className="w-full h-56"
            loading="lazy"
          />
        </div>

        <a
          href={mapLink(plant.lat, plant.lng)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full text-emerald-700 font-semibold py-2 px-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
        >
          فتح في خرائط جوجل
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
  // بيانات المجموعة الرئيسية
  const hq = {
    address: "العراق - كركوك - دارمان",
    phones: ["+964 1 234 5678", "+964 770 123 4567"],
    emails: ["info@hadigroup.iq", "sales@hadigroup.iq"],
    hours: (
      <>
        الأحد - الخميس: 8:00 - 16:00
        <br />
        الجمعة - السبت: مغلق
      </>
    ),
    lat: 33.3152,
    lng: 44.3661,
  };

  return (
    <div dir="rtl" className="bg-gray-50 min-h-screen">
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3">
            تواصل معنا
          </h2>
          <span className="block mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
        </div>

        {/* معلومات التواصل + خريطة المقر */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <InfoRow icon={<MapPin className="h-6 w-6" />} title="العنوان">
              <div className="space-y-1">
                {hq.address.split(' - ').map((part, idx) => (
                  <div key={idx}>{part}</div>
                ))}
              </div>
            </InfoRow>

            <InfoRow icon={<Phone className="h-6 w-6" />} title="الهاتف">
              <div className="space-y-2">
                {hq.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s+/g, "")}`} className="block font-medium hover:text-emerald-700 transition-colors">
                    {p}
                  </a>
                ))}
              </div>
            </InfoRow>

            <InfoRow icon={<Mail className="h-6 w-6" />} title="البريد الإلكتروني">
              <div className="space-y-2">
                {hq.emails.map((m) => (
                  <a key={m} href={`mailto:${m}`} className="block break-all hover:text-emerald-700 transition-colors">
                    {m}
                  </a>
                ))}
              </div>
            </InfoRow>

            <InfoRow icon={<Clock className="h-6 w-6" />} title="ساعات العمل">
              <div className="space-y-2">
                {typeof hq.hours === 'string' ? (
                  hq.hours.split(' | ').map((hours, idx) => (
                    <div key={idx}>{hours}</div>
                  ))
                ) : (
                  <div>
                    الأحد - الخميس: 8:00 - 16:00
                    <br />
                    الجمعة - السبت: مغلق
                  </div>
                )}
              </div>
            </InfoRow>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
            <iframe
              title="خريطة المقر"
              src={mapSrc(hq.lat, hq.lng)}
              className="w-full h-64 md:h-80"
              loading="lazy"
            />
          </div>
        </div>

        {/* شبكة المصانع + الخرائط */}
        <section className="mb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
              مواقع مصانع المجموعة
            </h3>
            <span className="block mx-auto mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {plants.map((p) => (
              <PlantCard key={p.key} plant={p} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
