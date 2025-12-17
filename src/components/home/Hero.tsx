import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Company = { name: string; to: string; logo?: string };

export default function Hero({
  isRTL = false,
  isAR = false,
  t = {},
  companies = [
    { name: 'شركة هادي للبلاستيك', to: '/plastic', logo: 'https://placehold.co/200x80/f0fdf4/059669?text=Plastic' },
    { name: 'شركة هادي للكيماويات', to: '/chemical', logo: 'https://placehold.co/200x80/f0fdf4/059669?text=Chemical' },
    { name: 'شركة هادي للتجارة', to: '/trade', logo: 'https://placehold.co/200x80/f0fdf4/059669?text=Trade' },
    { name: 'شركة هادي للزراعة', to: '/agriculture', logo: 'https://placehold.co/200x80/f0fdf4/059669?text=Agriculture' },
  ],
  logoGroup = 'https://placehold.co/120x48/059669/ffffff?text=HADI+GROUP',
}: {
  isRTL?: boolean;
  isAR?: boolean;
  t?: any;
  companies?: Company[];
  logoGroup?: string;
}) {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const cardsRef = useRef(null);

  const alignText = isRTL ? 'text-right' : 'text-left';
  const flexDirection = isRTL ? 'flex-row-reverse' : 'flex-row';
  const justifyContent = isRTL ? 'justify-end' : 'justify-start';

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50 py-8 md:py-12 lg:py-20"
      aria-label={isAR ? 'القسم الرئيسي' : 'Hero Section'}
    >
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient Orbs - Hidden on mobile, visible on larger screens */}
        <div className="deco-circle hidden md:block absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-200/40 to-emerald-400/20 blur-3xl animate-fadeIn" />
        <div className="deco-circle hidden md:block absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-tl from-emerald-300/30 to-emerald-500/10 blur-3xl animate-fadeIn" />
        
        {/* Geometric Circles - Hidden on mobile */}
        <div
          className={`deco-circle hidden lg:block absolute top-1/3 h-[400px] w-[400px] rounded-full border-2 border-emerald-200/40 ${
            isRTL ? 'right-[45%]' : 'left-[45%]'
          } animate-fadeIn`}
        />
        <div
          className={`deco-circle hidden lg:block absolute top-[38%] h-[480px] w-[480px] rounded-full border-2 border-emerald-100/30 ${
            isRTL ? 'right-[41%]' : 'left-[41%]'
          } animate-fadeIn`}
        />
      </div>

      {/* Main Content Container */}
      <div className="container relative z-10 mx-auto px-4 w-full">
        <div className="mx-auto w-full max-w-7xl">
          {/* Mobile & Tablet: Vertical Layout */}
          <div className="flex flex-col gap-8 lg:hidden">
            {/* Content Card - Full Width on Mobile/Tablet */}
            <div className="w-full animate-fadeInDown">
              <div
                className={`flex h-full flex-col rounded-2xl md:rounded-3xl border border-white/60 bg-white/95 p-6 md:p-8 shadow-2xl shadow-emerald-900/10 backdrop-blur-sm ${alignText}`}
              >
                {/* Logo & Brand */}
                <div className={`hero-logo mb-4 md:mb-6 flex items-center gap-2 md:gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'} animate-fadeIn`}>
                  <img
                    src={logoGroup}
                    alt={isAR ? 'شعار مجموعة هادي' : 'HADI Group Logo'}
                    className="h-10 md:h-12 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="h-6 md:h-8 w-px bg-emerald-600/30" />
                  <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
                    {isAR ? 'شركة هادي' : 'HADI COMPANY'}
                  </span>
                </div>

                {/* Main Headline - Responsive Sizes */}
                <h1 ref={titleRef} className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-gray-900 animate-fadeInDown">
                  {t.heroTitleL1 || (isAR ? 'اكتشف عالمًا من البلاستيك المتجدّد،' : 'Discover a world of renewable plastics,')}
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                    {t.heroTitleL2 || (isAR ? 'وأثرنا فيه.' : 'and our impact in it.')}
                  </span>
                </h1>

                {/* Description - Responsive */}
                <p ref={descRef} className="mb-6 md:mb-8 flex-grow text-base md:text-lg leading-relaxed text-gray-600 animate-fadeInUp">
                  {t.heroDesc ||
                    (isAR
                      ? 'مجموعة متخصصة في تقديم حلول صناعية وتجارية بمعايير جودة عالية وتصميم عصري.'
                      : 'A specialized group delivering industrial & commercial solutions with high standards and modern design.')}
                </p>

                {/* CTA Buttons - Full Width on Mobile */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full animate-fadeInUp">
                  <button
                    onClick={() => navigate('/contact')}
                    className={`group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/40 ${flexDirection}`}
                    aria-label={isAR ? 'تواصل معنا الآن' : 'Contact us now'}
                  >
                    <span>{t.contactUs || (isAR ? 'تواصل معنا' : 'Contact Us')}</span>
                    <span className={`text-lg md:text-xl transition-transform duration-300 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'}`}>
                      {isRTL ? '←' : '→'}
                    </span>
                  </button>

                  <button
                    onClick={() => navigate('/about')}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl md:rounded-2xl border-2 border-gray-300 bg-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:bg-gray-50 hover:text-emerald-600"
                    aria-label={isAR ? 'اكتشف مجموعتنا' : 'Explore our group'}
                  >
                    {t.aboutUs || (isAR ? 'عنّا' : 'About')}
                  </button>
                </div>
              </div>
            </div>

            {/* Company Cards - Full Width Grid on Mobile/Tablet */}
            <div ref={cardsRef} className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {companies.map((company, index) => (
                  <Link
                    key={company.to}
                    to={company.to}
                    className="company-card group relative flex h-48 md:h-56 flex-col overflow-hidden rounded-2xl md:rounded-3xl border border-emerald-100/80 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-600/20 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-label={`${isAR ? 'زيارة' : 'Visit'} ${company.name}`}
                  >
                    {/* Logo Area */}
                    <div className="flex flex-1 items-center justify-center bg-white p-6 md:p-8">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={`${company.name} ${isAR ? 'شعار' : 'logo'}`}
                          className="h-20 md:h-24 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/200x80/f0fdf4/059669?text=' + encodeURIComponent(company.name);
                          }}
                        />
                      ) : (
                        <span className="text-lg md:text-xl font-bold text-gray-400 text-center px-2">{company.name}</span>
                      )}
                    </div>

                    {/* Footer with Name */}
                    <div className="flex h-14 md:h-16 items-center justify-center border-t border-gray-100 bg-white px-4 md:px-5">
                      <span className="text-center text-sm md:text-base font-bold text-gray-800 line-clamp-2">{company.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop: Horizontal Layout (lg and above) */}
          <div className="hidden lg:grid min-h-[calc(100vh-12rem)] items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left Column (Content Card) - Order changes based on RTL */}
            <div className={isRTL ? 'lg:order-2' : 'lg:order-1'}>
              <div
                className={`flex h-full flex-col rounded-3xl border border-white/60 bg-white/95 p-8 md:p-12 shadow-2xl shadow-emerald-900/10 backdrop-blur-sm ${alignText} animate-fadeInDown`}
              >
                {/* Logo & Brand */}
                <div className={`hero-logo mb-6 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'} animate-fadeIn`}>
                  <img
                    src={logoGroup}
                    alt={isAR ? 'شعار مجموعة هادي' : 'HADI Group Logo'}
                    className="h-12 object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="h-8 w-px bg-emerald-600/30" />
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
                    {isAR ? 'شركة هادي' : 'HADI COMPANY'}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 ref={titleRef} className="mb-6 text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-gray-900 animate-fadeInDown">
                  {t.heroTitleL1 || (isAR ? 'اكتشف عالمًا من البلاستيك المتجدّد،' : 'Discover a world of renewable plastics,')}
                  <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                    {t.heroTitleL2 || (isAR ? 'وأثرنا فيه.' : 'and our impact in it.')}
                  </span>
                </h1>

                {/* Description */}
                <p ref={descRef} className="mb-8 flex-grow text-lg md:text-xl leading-relaxed text-gray-600 animate-fadeInUp">
                  {t.heroDesc ||
                    (isAR
                      ? 'مجموعة متخصصة في تقديم حلول صناعية وتجارية بمعايير جودة عالية وتصميم عصري.'
                      : 'A specialized group delivering industrial & commercial solutions with high standards and modern design.')}
                </p>

                {/* CTA Buttons */}
                <div ref={ctaRef} className={`flex flex-wrap gap-4 ${justifyContent} animate-fadeInUp`}>
                  <button
                    onClick={() => navigate('/contact')}
                    className={`group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/40 ${flexDirection}`}
                    aria-label={isAR ? 'تواصل معنا الآن' : 'Contact us now'}
                  >
                    <span>{t.contactUs || (isAR ? 'تواصل معنا' : 'Contact Us')}</span>
                    <span className={`text-xl transition-transform duration-300 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'}`}>
                      {isRTL ? '←' : '→'}
                    </span>
                  </button>

                  <button
                    onClick={() => navigate('/about')}
                    className="inline-flex items-center gap-3 rounded-2xl border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:bg-gray-50 hover:text-emerald-600"
                    aria-label={isAR ? 'اكتشف مجموعتنا' : 'Explore our group'}
                  >
                    {t.aboutUs || (isAR ? 'عنّا' : 'About')}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column (Company Cards) - Order changes based on RTL */}
            <div ref={cardsRef} className={isRTL ? 'lg:order-1' : 'lg:order-2'}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {companies.map((company, index) => (
                  <Link
                    key={company.to}
                    to={company.to}
                    className="company-card group relative flex h-56 flex-col overflow-hidden rounded-3xl border border-emerald-100/80 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-600/20 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-label={`${isAR ? 'زيارة' : 'Visit'} ${company.name}`}
                  >
                    {/* Logo Area */}
                    <div className="flex flex-1 items-center justify-center bg-white p-8">
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={`${company.name} ${isAR ? 'شعار' : 'logo'}`}
                          className="h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = 'https://placehold.co/200x80/f0fdf4/059669?text=' + encodeURIComponent(company.name);
                          }}
                        />
                      ) : (
                        <span className="text-xl font-bold text-gray-400">{company.name}</span>
                      )}
                    </div>

                    {/* Footer with Name */}
                    <div className="flex h-16 items-center justify-center border-t border-gray-100 bg-white px-5">
                      <span className="text-center text-base font-bold text-gray-800">{company.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile, visible on larger screens */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-600">
            {isAR ? 'استكشف' : 'Scroll'}
          </span>
          <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
