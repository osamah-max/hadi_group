// src/components/Footer.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

/* ========================================================= */
/* 1. Hook for Locale Management (Retained as is - excellent)*/
/* ========================================================= */

function useHtmlLocale() {
  const read = () => {
    const dir = (document.documentElement.getAttribute("dir") || "rtl").toLowerCase() as "rtl" | "ltr";
    const lang = (document.documentElement.lang || (dir === "rtl" ? "ar" : "en")).toLowerCase();
    return { isRTL: dir === "rtl", isAR: lang.startsWith("ar") };
  };

  const [state, setState] = useState(read);

  useEffect(() => {
    const obs = new MutationObserver(() => setState(read()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["dir", "lang"] });

    // دعم ثانوي في حال تم الاعتماد على localStorage("lang")
    const onStorage = (e: StorageEvent) => {
      if (e.key === "lang") setState(read());
    };
    window.addEventListener("storage", onStorage);

    return () => {
      obs.disconnect();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return state;
}

/* ========================================================= */
/* 2. Reusable Component: FooterLinkGroup (New)              */
/* ========================================================= */

type FooterLink = { to: string; label: string };

function FooterLinkGroup({ title, links }: { title: string; links: FooterLink[] }) {
    // Check if the link uses the small dot prefix style (used for factories)
    const isFactoryGroup = links.some(link => link.to.includes("companies/"));

    return (
        <div>
            <h5 className="text-sm font-semibold mb-4 md:mb-5 uppercase tracking-wider text-emerald-100">{title}</h5>
            <ul className={`space-y-2.5 md:space-y-3 text-emerald-50/80 text-sm md:text-[15px] font-light ${isFactoryGroup ? 'grid grid-cols-1 gap-2.5 md:gap-3' : ''}`}>
                {links.map((link) => (
                    <li key={link.to}>
                        <Link 
                            className={`hover:text-white transition-colors duration-200 focus:outline-none focus:text-white ${isFactoryGroup ? 'group inline-flex items-center gap-2 md:gap-2.5' : 'block'}`} 
                            to={link.to}
                        >
                            {isFactoryGroup && (
                                <span className="h-1 w-1 rounded-full bg-emerald-300/70 group-hover:bg-white transition-colors flex-shrink-0" />
                            )}
                            <span className="text-sm md:text-[15px]">{link.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ========================================================= */
/* 3. Reusable Component: ContactItem (New)                  */
/* ========================================================= */

function ContactItem({ icon: Icon, text }: { icon: React.ElementType, text: string }) {
    return (
        <li className="flex items-start gap-2.5 md:gap-3">
            <Icon className="w-4 h-4 text-emerald-200 flex-shrink-0 mt-0.5" /> 
            <span className="text-sm md:text-[15px] leading-relaxed">{text}</span>
        </li>
    );
}


/* ========================================================= */
/* 4. Main Footer Component (Cleaner Return)                 */
/* ========================================================= */

export default function Footer() {
  const { isRTL, isAR } = useHtmlLocale();

  const t = useMemo(
    () =>
      isAR
        ? {
            brandTitle: "مجموعة هادي",
            brandTag: "مجموعة صناعية عراقية رائدة منذ 1975.",
            links: "روابط",
            about: "عنّا",
            companies: "الشركات",
            products: "المنتجات",
            contact: "تواصل",
            contactTitle: "تواصل معنا",
            addr: "العراق - كركوك - دارمان",
            phone: "+964 770 123 4567",
            mail: "info@hadigroup.iq",
            rights: "جميع الحقوق محفوظة ©️ مجموعة هادي",
            designed: "تم التصميم والتنفيذ بواسطة",
            amaan: "أمان تكنولوجي",
            zirve: "زيرفة جروب",
            factories: "المصانع التابعة",
            qta: "طلب عرض سعر؟",
            start: "ابدأ",
          }
        : {
            brandTitle: "HADI Group",
            brandTag: "A leading Iraqi industrial group since 1975.",
            links: "Links",
            about: "About",
            companies: "Companies",
            products: "Products",
            contact: "Contact",
            contactTitle: "Get in Touch",
            addr: "Iraq - Kirkuk - Daraman",
            phone: "+964 770 123 4567",
            mail: "info@hadigroup.iq",
            rights: "All rights reserved ©️ HADI Group",
            designed: "Designed & Developed by",
            amaan: "Amaan Technology",
            zirve: "Zirve Group",
            factories: "Our Factories",
            qta: "Need a quotation?",
            start: "Start",
          },
    [isAR]
  );

  // Define data structures for reusable components
  const quickLinks: FooterLink[] = [
    { to: "/about", label: t.about },
    { to: "/companies", label: t.companies },
    { to: "/products", label: t.products },
    { to: "/contact", label: t.contact },
  ];

  const factoryLinks: FooterLink[] = [
    { to: "/companies/gayath", label: isAR ? "مصنع غياث" : "Gayath Factory" },
    { to: "/companies/hamdi", label: isAR ? "مصنع حمدي" : "Hamdi Factory" },
    { to: "/companies/sina", label: isAR ? "مصنع سيناء" : "Sina Factory" },
    { to: "/companies/alzab", label: isAR ? "مصنع الزاب" : "Alzab Factory" },
    { to: "/companies/hadi_cap", label: isAR ? "مصنع هادي كاب" : "HADICAP" },
    { to: "/companies/hima", label: isAR ? "هيما بلاستك" : "HIMA Plastic" },
  ];
  
  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="relative mt-16 text-white bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 overflow-hidden"
    >
      {/* زخرفة لطيفة */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1), transparent 50%)," +
            "radial-gradient(circle at 0% 100%, rgba(16,185,129,0.3), transparent 50%)," +
            "radial-gradient(circle at 100% 100%, rgba(5,150,105,0.2), transparent 50%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="mx-auto mb-8 md:mb-14 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

        {/* Mobile & Tablet: Vertical Stack */}
        <div className="block md:hidden space-y-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h4 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
              {t.brandTitle}
            </h4>
            <p className="text-emerald-50/90 leading-6 text-sm font-light">{t.brandTag}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-emerald-50 backdrop-blur-sm">ISO-ready</span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-emerald-50 backdrop-blur-sm">Since 1975</span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-emerald-50 backdrop-blur-sm">Iraq • MENA</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <FooterLinkGroup title={t.links} links={quickLinks} />
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-sm font-semibold mb-4 uppercase tracking-wider text-emerald-100">{t.contactTitle}</h5>
            <ul className="space-y-3 text-sm text-emerald-50/80 font-light">
              <ContactItem icon={MapPin} text={t.addr} />
              <ContactItem icon={Phone} text={t.phone} />
              <ContactItem icon={Mail} text={t.mail} />
            </ul>
          </div>

          {/* Factories - Collapsible on Mobile */}
          <div>
            <FooterLinkGroup title={t.factories} links={factoryLinks} />
          </div>

          {/* CTA Card */}
          <div className="rounded-xl md:rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm p-4 text-sm shadow-lg shadow-black/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-emerald-50 font-light text-center sm:text-start">{t.qta}</span>
              <Link 
                to="/contact" 
                className="w-full sm:w-auto text-center rounded-full bg-white text-emerald-800 px-5 py-2 text-sm font-semibold hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t.start}
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid gap-8 lg:gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4 space-y-5 md:space-y-6">
            <h4 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
              {t.brandTitle}
            </h4>
            <p className="text-emerald-50/90 leading-7 text-sm md:text-[15px] font-light">{t.brandTag}</p>
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-emerald-50 backdrop-blur-sm">ISO-ready</span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-emerald-50 backdrop-blur-sm">Since 1975</span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-4 py-1.5 text-emerald-50 backdrop-blur-sm">Iraq • MENA</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <FooterLinkGroup title={t.links} links={quickLinks} />
          </div>

          {/* Factories */}
          <div className="md:col-span-3">
            <FooterLinkGroup title={t.factories} links={factoryLinks} />
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h5 className="text-sm font-semibold mb-5 uppercase tracking-wider text-emerald-100">{t.contactTitle}</h5>
            <ul className="space-y-3.5 text-[15px] text-emerald-50/80 font-light">
              <ContactItem icon={MapPin} text={t.addr} />
              <ContactItem icon={Phone} text={t.phone} />
              <ContactItem icon={Mail} text={t.mail} />
            </ul>
            <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 backdrop-blur-sm p-4 text-sm shadow-lg shadow-black/20">
              <div className="flex items-center justify-between gap-3">
                <span className="text-emerald-50 font-light">{t.qta}</span>
                <Link 
                  to="/contact" 
                  className="rounded-full bg-white text-emerald-800 px-5 py-2 text-sm font-semibold hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {t.start}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar - Responsive */}
        <div className="mt-10 md:mt-16 border-t border-emerald-700/40 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-xs md:text-[13px] text-emerald-100/70 font-light">
            <div className="text-center md:text-start">
              {t.rights} {new Date().getFullYear()}
            </div>
            <div className="text-center md:text-end text-xs md:text-[13px]">
              {t.designed}{" "}
              <a
                href="https://amaantechnology.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-emerald-100 hover:text-white transition-colors duration-200"
                title={isAR ? "أمان تكنولوجي" : "Amaan Technology"}
              >
                {t.amaan}
              </a>{" "}
              &{" "}
              <a
                href="https://zirvegroup.co"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-emerald-100 hover:text-white transition-colors duration-200"
                title={isAR ? "زيرفة جروب" : "Zirve Group"}
              >
                {t.zirve}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
