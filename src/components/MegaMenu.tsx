// src/components/MegaMenu.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* Logos */
import logoAlzab from "../assets/img/logo/alzab.png";
import logoGayath from "../assets/img/logo/gayath.png";
import logoHadiCap from "../assets/img/logo/hadi_cap.png";
import logoHima from "../assets/img/logo/hima1.png";
import logoSina from "../assets/img/logo/sina.png";
import logoGroup from "../assets/img/logo/hadi_group.png";
import logoHamdi from "../assets/img/logo/hamdi_factory.png";

/* ============================ Locale helper (Re-included for completeness) ============================ */
function useHtmlLocale() {
  const dirAttr = (document.documentElement.getAttribute("dir") || "rtl").toLowerCase() as
    | "rtl"
    | "ltr";
  const langAttr = (document.documentElement.lang || (dirAttr === "rtl" ? "ar" : "en")).toLowerCase();
  return { dir: dirAttr, lang: langAttr, isRTL: dirAttr === "rtl", isAR: langAttr.startsWith("ar") };
}

/* ================================ i18n (Re-included for completeness) ================================= */
function dict(isAR: boolean) {
  if (isAR) {
    return {
      title: "الشركات التابعة",
      viewAll: "عرض الكل",
      groupTitle: "مجموعة هادي",
      groupDesc:
        "حلول صناعية وتجارية بمعايير جودة عالية وتصميم عصري — نصنع الفرق ونوزّع الأثر.",
      contact: "تواصل معنا",
      about: "عنّا",
      statsLeft: "6 شركات تابعة",
      statsRight: "+50K طن إنتاج سنوي",
      seeAllCompanies: "عرض كل الشركات",
      tags: { home: "منزلي", industrial: "صناعي", agri: "زراعي", distribution: "توزيع", packaging: "تغليف" },
      companies: [
        { name: "مصنع حمدي", to: "/companies/hamdi", logo: logoHamdi, tagKey: "home" as const },
        { name: "مصنع غياث", to: "/companies/gayath", logo: logoGayath, tagKey: "industrial" as const },
        { name: "مصنع سيناء", to: "/companies/sina", logo: logoSina, tagKey: "agri" as const },
        { name: "مصنع الزاب", to: "/companies/alzab", logo: logoAlzab, tagKey: "distribution" as const },
        { name: "مصنع هادي كاب", to: "/companies/hadi_cap", logo: logoHadiCap, tagKey: "packaging" as const },
        { name: "مصنع هيما بلاستك", to: "/companies/hima", logo: logoHima, tagKey: "home" as const },
      ],
    };
  }
  return {
    title: "Subsidiaries",
    viewAll: "View all",
    groupTitle: "HADI Group",
    groupDesc:
      "Industrial & commercial solutions with high standards and modern design — we build quality and scale impact.",
    contact: "Contact us",
    about: "About",
    statsLeft: "6 subsidiaries",
    statsRight: "50K+ tons yearly output",
    seeAllCompanies: "Browse all companies",
    tags: { home: "Home", industrial: "Industrial", agri: "Agriculture", distribution: "Distribution", packaging: "Packaging" },
    companies: [
      { name: "Hamdi Factory", to: "/companies/hamdi", logo: logoHamdi, tagKey: "home" as const },
      { name: "Gayath Factory", to: "/companies/gayath", logo: logoGayath, tagKey: "industrial" as const },
      { name: "Sina Factory", to: "/companies/sina", logo: logoSina, tagKey: "agri" as const },
      { name: "Alzab Factory", to: "/companies/alzab", logo: logoAlzab, tagKey: "distribution" as const },
      { name: "HADICAP", to: "/companies/hadi_cap", logo: logoHadiCap, tagKey: "packaging" as const },
      { name: "HIMA Plastic", to: "/companies/hima", logo: logoHima, tagKey: "home" as const },
    ],
  };
}

/* ============================== Bits (Re-included for completeness) ============================== */
function Dot() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />;
}
function Chevron({ rtl }: { rtl: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className={`opacity-80 ${rtl ? "" : "rotate-180"}`} aria-hidden>
      <path d="M15 19l-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Tags = ReturnType<typeof dict>["tags"];
type Company = { name: string; to: string; logo?: string; tagKey: keyof Tags };

function CompanyRow({ c, tag, rtl }: { c: Company; tag: string; rtl: boolean }) {
  return (
    <Link
      to={c.to}
      className="group flex items-center justify-between gap-3 rounded-2xl border border-emerald-400/50 bg-white/95 px-4 py-3 shadow-[0_4px_16px_rgba(2,6,23,0.1)] hover:shadow-[0_8px_20px_rgba(2,6,23,0.15)] hover:-translate-y-0.5 transition"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-xl border border-emerald-100 bg-white text-emerald-600">
          {c.logo ? (
            <img
              src={c.logo}
              alt=""
              loading="eager"
              decoding="async"
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
            />
          ) : (
            <span className="text-[10px] text-gray-500">LOGO</span>
          )}
        </span>
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold text-slate-800 group-hover:text-emerald-700">{c.name}</span>
          <span className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-500"><Dot /> {tag}</span>
        </div>
      </div>
      <span className="text-emerald-600 group-hover:translate-x-0.5 transition">
        <Chevron rtl={rtl} />
      </span>
    </Link>
  );
}


/* ============================ Mega Menu ============================ */
export default function MegaMenu({ compact, onClose }: { compact?: boolean; onClose?: () => void }) {
  const { isRTL, isAR } = useHtmlLocale();
  const t = useMemo(() => dict(isAR), [isAR]);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);


  // --- CRITICAL: Click-Outside and Keydown Closure Logic ---
  useEffect(() => {
    // Focus the panel for accessibility (can be adjusted if needed)
    panelRef.current?.focus();
    
    // 1. Keydown (Escape)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    
    // 2. Mousedown/Click outside logic (Desktop only)
    const handleMousedownOutside = (e: MouseEvent) => {
        const panel = panelRef.current;
        // If the click happened and the panel exists, and the click target is NOT inside the panel, close the menu.
        if (panel && !panel.contains(e.target as Node)) {
            onClose?.();
        }
    };
    
    document.addEventListener("keydown", onKey);
    
    // Only attach the click outside listener if it's the desktop version
    if (!compact) {
        // Use 'mousedown' instead of 'click' for faster response and better propagation handling
        document.addEventListener("mousedown", handleMousedownOutside);
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      if (!compact) {
          document.removeEventListener("mousedown", handleMousedownOutside);
      }
    };
  }, [onClose, compact]);


  const handleCapture = (e: React.SyntheticEvent) => {
    // Closes menu if any link inside is clicked
    if ((e.target as HTMLElement).closest("a")) onClose?.();
  };

  /* ============================== Mobile ============================== */
  if (compact) {
    return (
      <div
        ref={panelRef} // Using panelRef for mobile content inside <details>
        tabIndex={-1}
        dir={isRTL ? "rtl" : "ltr"}
        role="menu"
        aria-label={t.title}
        onClickCapture={handleCapture}
        className="grid grid-cols-1 gap-3 outline-none"
      >
        {t.companies.map((c) => (
          <CompanyRow key={c.to} c={c as Company} tag={t.tags[c.tagKey]} rtl={isRTL} />
        ))}
        <Link to="/companies" className="text-center text-sm text-emerald-700 hover:underline">
          {t.seeAllCompanies}
        </Link>
      </div>
    );
  }

  /* ============================== Desktop (Glossy) ============================= */
  return (
    // Fixed Overlay Wrapper
    <div
        ref={wrapperRef}
        className="fixed inset-0 z-50 transition-colors duration-300 bg-black/25"
        style={{ 
            pointerEvents: 'auto', 
            paddingTop: '64px', // Adjust padding to start below the sticky header
        }}
        // The global Mousedown listener in useEffect handles closing, 
        // but this wrapper element ensures the mouse can 'click' the empty space.
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        dir={isRTL ? "rtl" : "ltr"}
        role="menu"
        aria-label={t.title}
        onClickCapture={handleCapture}
        // Positioning: Centered under the fixed header
        className={[
          "max-w-[1080px] w-[96vw] max-h-[78vh] mx-auto",
          "rounded-[28px] p-5 outline-none",
          // Glassmorphism Styles (زجاجي) - خلفية بيضاء زجاجية
          "border border-white/20 bg-white/80 backdrop-blur-xl supports-backdrop-filter:bg-white/80",
          "shadow-[0_24px_60px_rgba(0,0,0,0.15)]",
          "relative overflow-hidden",
          // CSS Animation instead of GSAP
          "animate-[fadeInDown_0.5s_ease-out]",
        ].join(" ")}
        style={{
             boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.3)',
        }}
      >

        {/* زخرفة */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 220px at 85% 20%, rgba(16,185,129,0.15), transparent 60%), radial-gradient(500px 360px at 10% 90%, rgba(16,185,129,0.12), transparent 60%)",
          }}
        />

        {/* رأس */}
        <div className="relative mb-3 flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">⋯</span>
            <h4 className="text-sm font-semibold text-gray-800">{t.title}</h4>
          </div>
          <Link to="/companies" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">{t.viewAll}</Link>
        </div>

        {/* الشبكة: قائمة + بطاقة خضراء */}
        <div className="relative grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          <div className={`${isRTL ? "order-1" : "order-2"} grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[56vh] lg:max-h-[50vh] overflow-y-auto pr-1`}>
            {t.companies.map((c) => (
              <CompanyRow key={c.to} c={c as Company} tag={t.tags[c.tagKey]} rtl={isRTL} />
            ))}
          </div>

          <div className={`${isRTL ? "order-2" : "order-1"} rounded-3xl p-6 text-white shadow-[0_16px_44px_rgba(16,185,129,0.40)] relative overflow-hidden bg-linear-to-br from-emerald-500 via-emerald-600 to-emerald-700`}>
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-emerald-900/20 blur-2xl" />
            <div className="relative grid place-items-center">
              <img src={logoGroup} alt="HADI GROUP" className="h-20 sm:h-24 object-contain drop-shadow-sm" />
            </div>
            <h3 className="relative mt-4 text-2xl font-extrabold text-center">{t.groupTitle}</h3>
            <p className="relative mt-3 text-white/90 text-center leading-7">{t.groupDesc}</p>
            <div className="relative mt-5 flex items-center justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-emerald-700 font-semibold hover:bg-white/90">
                {t.contact} ↪
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-900/20 px-4 py-2 font-semibold hover:bg-emerald-900/30">
                {t.about} →
              </Link>
            </div>
            <div className="relative mt-6 rounded-xl bg-emerald-900/20 px-4 py-2 text-sm text-white/90 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2"><Dot /> {t.statsLeft}</span>
                <span className="inline-flex items-center gap-2"><Dot /> {t.statsRight}</span>
              </div>
            </div>
          </div>
        </div>

        {/* فوتر */}
        <div className="relative mt-5 flex items-center justify-between border-t border-gray-200 pt-3 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} HADI GROUP</span>
          <div className="text-gray-600">
            تم التصميم و التنفيذ بواسطة شركتي{" "}
            <a href="https://amaantechnology.com" target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium">أمان تكنولوجي</a>
            {" "}و{" "}
            <a href="https://zirvegroup.co" target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium">زرفه كروب</a>
          </div>
        </div>
      </div>
    </div>
  );
}