// src/components/Header.tsx
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MegaMenu from "./MegaMenu";

// Logos for companies menu
import logoAlzab from "../assets/img/logo/alzab.png";
import logoGayath from "../assets/img/logo/gayath.png";
import logoHadiCap from "../assets/img/logo/hadi_cap.png";
import logoHima from "../assets/img/logo/hima1.png";
import logoSina from "../assets/img/logo/sina.png";
import logoHamdi from "../assets/img/logo/hamdi_factory.png";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const [lang, setLang] = useState<"ar" | "en">(
    (localStorage.getItem("lang") as "ar" | "en") || "ar"
  );
  const isAr = lang === "ar";
  const loc = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // ظل خفيف عند التمرير
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // اغلاق القوائم عند تغيير المسار
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setCompaniesOpen(false);
  }, [loc.pathname]);

  // تطبيق اللغة والاتجاه والتحكم في تمرير الجسم (Body Scroll Control)
  useEffect(() => {
    localStorage.setItem("lang", lang);
    const html = document.documentElement;
    html.dir = isAr ? "rtl" : "ltr";
    html.lang = isAr ? "ar" : "en";
    
    // Disable scrolling when mobile or mega menu is open
    document.body.style.overflow = (mobileOpen || megaOpen) ? 'hidden' : '';
    // Cleanup body overflow when component unmounts
    return () => {
        document.body.style.overflow = '';
    };
  }, [lang, isAr, mobileOpen, megaOpen]);

  const toggleLang = () => setLang(p => (p === "ar" ? "en" : "ar"));

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        // Only close if clicking outside, not on the hamburger button
        const target = event.target as HTMLElement;
        if (!target.closest('[aria-controls="mobileMenu"]')) {
          setMobileOpen(false);
        }
      }
    };

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setMegaOpen(false);
        setCompaniesOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "relative rounded-full px-4 py-2 text-base font-medium transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-emerald-900",
      isActive
        ? "text-white bg-emerald-600/70"
        : "text-emerald-100 hover:text-white hover:bg-emerald-700/50",
    ].join(" ");

  /* ===================== Desktop ===================== */
  const NavInline = (
    <nav className="hidden lg:flex" aria-label="Main navigation">
      <ul className="flex items-center gap-1 text-sm">
        <li>
          <NavLink to="/" className={navLinkClass}>
            {isAr ? "الرئيسية" : "Home"}
            <ActiveLine active={loc.pathname === "/"} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={navLinkClass}>
            {isAr ? "عن المجموعة" : "About"}
            <ActiveLine active={loc.pathname === "/about"} />
          </NavLink>
        </li>

        {/* Companies (Mega trigger) - NOW CLICK TO TOGGLE */}
        <li className="relative">
          <button
            className={[
              "rounded-full px-4 py-2 text-base font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-emerald-900",
              megaOpen ? "text-white bg-emerald-600/70" : "text-emerald-100 hover:text-white hover:bg-emerald-700/50",
            ].join(" ")}
            aria-haspopup="true"
            aria-expanded={megaOpen}
            onClick={() => setMegaOpen(p => !p)}
          >
            {isAr ? "الشركات" : "Companies"}
            <ActiveLine active={megaOpen} />
          </button>
        </li>

        <li>
          <NavLink to="/products" className={navLinkClass}>
            {isAr ? "المنتجات" : "Products"}
            <ActiveLine active={loc.pathname === "/products"} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={navLinkClass}>
            {isAr ? "التواصل" : "Contact"}
            <ActiveLine active={loc.pathname === "/contact"} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );

  const ButtonsInline = (
    <div className="hidden lg:flex items-center gap-3">
      <button
        onClick={toggleLang}
        className="inline-flex h-10 items-center rounded-xl border border-emerald-400/50 bg-white/10 px-4 text-sm font-semibold text-emerald-100 shadow-sm transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-400/80 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-emerald-900"
        title={isAr ? "Change language" : "تغيير اللغة"}
      >
        {isAr ? "EN" : "AR"}
      </button>
      <Link
        to="/contact"
        className="inline-flex h-10 items-center gap-2 rounded-xl bg-white text-emerald-800 px-5 font-bold shadow-xl shadow-black/30 hover:bg-gray-100 active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-emerald-900"
      >
        {isAr ? "اتصل بنا" : "Contact Us"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fillRule="evenodd"
            d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );

  // Companies data for mobile menu
  const companies = [
    { name: isAr ? "مصنع حمدي" : "Hamdi Factory", to: "/companies/hamdi", logo: logoHamdi },
    { name: isAr ? "مصنع غياث" : "Gayath Factory", to: "/companies/gayath", logo: logoGayath },
    { name: isAr ? "مصنع سيناء" : "Sina Factory", to: "/companies/sina", logo: logoSina },
    { name: isAr ? "مصنع الزاب" : "Alzab Factory", to: "/companies/alzab", logo: logoAlzab },
    { name: isAr ? "مصنع هادي كاب" : "HADICAP", to: "/companies/hadi_cap", logo: logoHadiCap },
    { name: isAr ? "مصنع هيما بلاستك" : "HIMA Plastic", to: "/companies/hima", logo: logoHima },
  ];

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-shadow duration-300",
        "border-b border-emerald-700/50",
        scrolled
          ? "shadow-2xl shadow-black/40"
          : "shadow-none",
      ].join(" ")}
      style={{
        background: `linear-gradient(90deg, #065F46 0%, #047857 50%, #065F46 100%)`,
      }}
    >
      {/* Desktop Header - Hidden on mobile/tablet */}
      <div className="hidden lg:block relative mx-auto w-full max-w-7xl px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          {isAr ? NavInline : ButtonsInline}
          {isAr ? ButtonsInline : NavInline}
        </div>

        {/* اللوجو في الوسط دائمًا */}
        <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2">
          <div className="flex justify-center">
            <Link
              to="/"
              className="pointer-events-auto font-black tracking-wide text-lg lg:text-xl transform transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-white/70 rounded-lg bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent"
              aria-label="HADI GROUP"
              title="HADI GROUP"
            >
              HADI GROUP
            </Link>
          </div>
        </div>
      </div>

      {/* Mega كطبقة منبثقة — تُغلق فقط عند الضغط خارجها (أو Escape/تغيير المسار) */}
      {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}

      {/* Mobile Menu - Off-canvas Sidebar */}
      <MobileMenu
        isAr={isAr}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        toggleLang={toggleLang}
        companiesOpen={companiesOpen}
        setCompaniesOpen={setCompaniesOpen}
        companies={companies}
        mobileMenuRef={mobileMenuRef}
      />
    </header>
  );
}

/* ====== Mobile Menu Component ====== */
function MobileMenu({
  isAr,
  mobileOpen,
  setMobileOpen,
  toggleLang,
  companiesOpen,
  setCompaniesOpen,
  companies,
  mobileMenuRef,
}: {
  isAr: boolean;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  toggleLang: () => void;
  companiesOpen: boolean;
  setCompaniesOpen: (v: boolean) => void;
  companies: Array<{ name: string; to: string; logo: string }>;
  mobileMenuRef: React.RefObject<HTMLDivElement>;
}) {
  const isRTL = isAr;

  return (
    <>
      {/* Mobile Bar - Always visible on mobile */}
      <div className="lg:hidden border-t border-emerald-700/50" style={{
        background: `linear-gradient(90deg, #065F46 0%, #047857 50%, #065F46 100%)`,
      }}>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
          {/* Hamburger Button */}
          <button
            aria-expanded={mobileOpen}
            aria-controls="mobileMenu"
            aria-label={isAr ? "القائمة" : "Menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`rounded-xl border border-emerald-400/50 bg-emerald-500/20 px-3.5 py-2 text-emerald-100 font-semibold shadow-md transition-all duration-300 hover:bg-emerald-600/30 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-emerald-900 ${isRTL ? '' : ''}`}
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="font-black tracking-wide text-lg bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent"
            aria-label="HADI GROUP"
            onClick={() => setMobileOpen(false)}
          >
            HADI GROUP
          </Link>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="rounded-xl border border-emerald-400/50 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100 shadow-sm transition-colors duration-300 hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-emerald-900"
            title={isAr ? "Change language" : "تغيير اللغة"}
          >
            {isAr ? "EN" : "AR"}
          </button>
        </div>
      </div>

      {/* Off-canvas Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Off-canvas Menu Sidebar */}
      <div
        ref={mobileMenuRef}
        id="mobileMenu"
        dir={isRTL ? "rtl" : "ltr"}
        className={[
          "fixed top-0 h-full w-80 max-w-[85vw] z-50 lg:hidden",
          "bg-white shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          "overflow-y-auto",
          isRTL ? (mobileOpen ? "right-0" : "-right-full") : (mobileOpen ? "left-0" : "-left-full"),
        ].join(" ")}
        aria-label={isAr ? "القائمة الرئيسية" : "Main menu"}
      >
        {/* Menu Header */}
        <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-4 flex items-center justify-between border-b border-emerald-700/30">
          <h2 className="text-xl font-bold">{isAr ? "القائمة" : "Menu"}</h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            aria-label={isAr ? "إغلاق" : "Close"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Content */}
        <nav className="p-4" aria-label={isAr ? "التنقل الرئيسي" : "Main navigation"}>
          <ul className="flex flex-col gap-2">
            {/* Home */}
            <MobileNavItem to="/" onClick={() => setMobileOpen(false)} isRTL={isRTL}>
              {isAr ? "الرئيسية" : "Home"}
            </MobileNavItem>

            {/* About */}
            <MobileNavItem to="/about" onClick={() => setMobileOpen(false)} isRTL={isRTL}>
              {isAr ? "عن المجموعة" : "About"}
            </MobileNavItem>

            {/* Products */}
            <MobileNavItem to="/products" onClick={() => setMobileOpen(false)} isRTL={isRTL}>
              {isAr ? "المنتجات" : "Products"}
            </MobileNavItem>

            {/* Companies - Accordion */}
            <li>
              <button
                onClick={() => setCompaniesOpen(!companiesOpen)}
                className={[
                  "w-full flex items-center justify-between rounded-xl px-4 py-3 font-semibold text-gray-700 transition-all duration-200",
                  "hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400/70",
                  companiesOpen ? "bg-emerald-50 text-emerald-700" : "",
                ].join(" ")}
                aria-expanded={companiesOpen}
                aria-controls="companiesSubmenu"
              >
                <span className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008V11.25zm-3.75 0h.008v.008h-.008V11.25z" />
                  </svg>
                  {isAr ? "الشركات" : "Companies"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-5 h-5 transition-transform duration-300 ${companiesOpen ? "rotate-180" : ""}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Companies Submenu */}
              <div
                id="companiesSubmenu"
                className={[
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  companiesOpen ? "max-h-[600px] opacity-100 mt-2" : "max-h-0 opacity-0",
                ].join(" ")}
              >
                <ul className="flex flex-col gap-2 pr-4 pl-4 border-r-2 border-emerald-200" style={{ [isRTL ? 'borderRight' : 'borderLeft']: '2px solid #10b98140' }}>
                  {companies.map((company) => (
                    <li key={company.to}>
                      <Link
                        to={company.to}
                        onClick={() => {
                          setMobileOpen(false);
                          setCompaniesOpen(false);
                        }}
                        className={[
                          "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700",
                          "transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700",
                          "focus:outline-none focus:ring-2 focus:ring-emerald-400/70",
                        ].join(" ")}
                      >
                        <img
                          src={company.logo}
                          alt=""
                          className="h-8 w-8 object-contain rounded"
                          loading="lazy"
                        />
                        <span>{company.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Contact */}
            <MobileNavItem to="/contact" onClick={() => setMobileOpen(false)} isRTL={isRTL}>
              {isAr ? "التواصل" : "Contact"}
            </MobileNavItem>
          </ul>

          {/* CTA Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4 text-white font-bold shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
            >
              <span>{isAr ? "اتصل بنا" : "Contact Us"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

function MobileNavItem({
  to,
  children,
  onClick,
  isRTL,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
  isRTL: boolean;
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li>
      <NavLink
        to={to}
        onClick={onClick}
        className={[
          "block rounded-xl px-4 py-3 font-semibold transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-emerald-400/70",
          isActive
            ? "bg-emerald-50 text-emerald-700 border-2 border-emerald-200"
            : "text-gray-700 hover:bg-emerald-50/50",
        ].join(" ")}
      >
        {children}
      </NavLink>
    </li>
  );
}

function ActiveLine({ active }: { active: boolean }) {
  return (
    <span
      className={[
        "pointer-events-none absolute inset-x-0 bottom-0 block h-0.5 rounded-full bg-white transition-all duration-500 ease-out",
        active
          ? "opacity-100 scale-x-100 translate-y-0"
          : "opacity-0 scale-x-75 translate-y-1",
      ].join(" ")}
      aria-hidden="true"
    />
  );
}
