import { useMemo, useState, useEffect, useRef, memo, useCallback } from "react";
import { type FactoryKey } from "../../data/products";
import { allCompanyProducts, type CompanyProduct } from "../../data/companyProducts";

type FactoryKeyWithAll = FactoryKey | "all";

export default function OurProducts({
  isRTL = true,
  isAR = true,
  t = {},
  logos = {
    logoGroup: "https://placehold.co/140x56/059669/ffffff?text=HADI",
    logoGayath: "https://placehold.co/140x56/059669/ffffff?text=Gayath",
    logoHamdi: "https://placehold.co/140x56/f59e0b/ffffff?text=Hamdi",
    logoSina: "https://placehold.co/140x56/10b981/ffffff?text=Sina",
    logoAlzab: "https://placehold.co/140x56/6366f1/ffffff?text=Alzab",
    logoHima: "https://placehold.co/140x56/3b82f6/ffffff?text=HIMA",
    logoHadiCap: "https://placehold.co/140x56/ef4444/ffffff?text=HADICAP",
  },
}: {
  isRTL?: boolean;
  isAR?: boolean;
  t?: any;
  logos?: Record<string, string>;
}) {
  const [active, setActive] = useState<FactoryKeyWithAll>("all");
  const [q, setQ] = useState("");

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const sidebarRef = useRef(null);

  // Factory routes
  const factoryRoutes: Record<FactoryKey, string> = {
    gayath: "/companies/gayath",
    hamdi: "/companies/hamdi",
    sina: "/companies/sina",
    alzab: "/companies/alzab",
    hima: "/companies/hima",
    hadiCap: "/companies/hadi_cap",
  };

  // Filter products from all factories
  const filtered = useMemo(() => {
    let pool = allCompanyProducts;
    
    // Filter by search query first (if any)
    if (q.trim()) {
      const query = q.trim().toLowerCase();
      pool = pool.filter((p) => {
        const title = isAR ? p.title : p.titleEn;
        const desc = isAR ? p.desc : p.descEn;
        return title.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
      });
    }
    
    // Filter by factory
    if (active !== "all") {
      // Show all products from selected factory
      pool = pool.filter((p) => p.factory === active);
    } else {
      // When "all" is selected: show 1-2 products from each factory
      const factoryGroups: Record<FactoryKey, CompanyProduct[]> = {
        gayath: [],
        hamdi: [],
        sina: [],
        alzab: [],
        hima: [],
        hadiCap: [],
      };
      
      // Group products by factory
      pool.forEach((product) => {
        if (factoryGroups[product.factory]) {
          factoryGroups[product.factory].push(product);
        }
      });
      
      // Take 1-2 products from each factory
      pool = Object.values(factoryGroups).flatMap((factoryProducts) => {
        // Take 2 products if available, otherwise 1
        return factoryProducts.slice(0, Math.min(2, factoryProducts.length));
      });
    }
    
    return pool;
  }, [active, q, isAR]);

  // Factory information
  const factoriesInfo: Record<FactoryKey, { name: string; logo: string }> = {
    gayath: { name: t.fGayath || (isAR ? "مصنع غياث" : "Gayath Factory"), logo: logos.logoGayath },
    hamdi: { name: t.fHamdi || (isAR ? "مصنع حمدي" : "Hamdi Factory"), logo: logos.logoHamdi },
    sina: { name: t.fSina || (isAR ? "مصنع سيناء" : "Sina Factory"), logo: logos.logoSina },
    alzab: { name: t.fAlzab || (isAR ? "مصنع الزاب" : "Alzab Factory"), logo: logos.logoAlzab },
    hima: { name: t.fHima || (isAR ? "هيما بلاستك" : "HIMA Plastic"), logo: logos.logoHima },
    hadiCap: { name: t.fHadiCap || (isAR ? "هادي كاب" : "HADICAP"), logo: logos.logoHadiCap },
  };

  // Featured factory data
  const featureKey: FactoryKeyWithAll = active;
  const featureData =
    featureKey === "all"
      ? {
          name: t.feature?.all?.name || (isAR ? "جميع مصانعنا" : "All Factories"),
          logo: logos.logoGroup,
          tagline: t.feature?.all?.tagline || (isAR ? "مجموعة متكاملة من المنتجات عالية الجودة" : "Complete range of high-quality products"),
        }
      : {
          name: t.feature?.by?.[featureKey]?.name || factoriesInfo[featureKey].name,
          logo: factoriesInfo[featureKey].logo,
          tagline: t.feature?.by?.[featureKey]?.tagline || (isAR ? "منتجات مختارة من هذا المصنع" : "Highlighted products from this factory"),
        };

  // CSS animations are handled via classes

  const align = isRTL ? "text-right" : "text-left";
  const justify = isRTL ? "justify-end" : "justify-start";

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header - Responsive */}
        <div ref={headerRef} className="mb-8 md:mb-12 text-center animate-fadeInDown">
          <div className="mb-3 md:mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 md:px-4 py-1.5 md:py-2 text-emerald-700">
            <span className="text-xs font-bold uppercase tracking-widest">
              {isAR ? "منتجاتنا" : "Our Products"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900">
            {t.productsTitle || (isAR ? "تشكيلة واسعة من المنتجات" : "Wide Range of Products")}
          </h2>
          <div className="mx-auto mt-3 md:mt-4 h-1 w-16 md:w-20 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
        </div>

        {/* Search & Filter - Responsive */}
        <div ref={filterRef} className={`mb-6 md:mb-10 flex flex-col gap-4 md:flex-row md:items-center ${justify} animate-fadeInUp`}>
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              dir={isRTL ? "rtl" : "ltr"}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.searchPh || (isAR ? "ابحث عن منتج..." : "Search for a product...")}
              className={`w-full rounded-xl md:rounded-2xl border-2 border-gray-200 bg-white px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${isRTL ? 'pl-10 md:pl-12 pr-4 md:pr-5' : 'pr-10 md:pr-12 pl-4 md:pl-5'}`}
            />
            <span className={`absolute top-1/2 -translate-y-1/2 text-lg md:text-xl ${isRTL ? "left-3 md:left-4" : "right-3 md:right-4"} text-gray-400`}>
              🔍
            </span>
          </div>

          {/* Filter Pills - Scrollable on mobile */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 -mx-2 px-2 md:mx-0 md:px-0">
            {([
              { k: "all" as const, label: t.all || (isAR ? "الكل" : "All") },
              { k: "gayath" as const, label: t.fGayath || (isAR ? "غياث" : "Gayath") },
              { k: "hamdi" as const, label: t.fHamdi || (isAR ? "حمدي" : "Hamdi") },
              { k: "sina" as const, label: t.fSina || (isAR ? "سيناء" : "Sina") },
              { k: "alzab" as const, label: t.fAlzab || (isAR ? "الزاب" : "Alzab") },
              { k: "hima" as const, label: t.fHima || (isAR ? "هيما" : "HIMA") },
              { k: "hadiCap" as const, label: t.fHadiCap || (isAR ? "هادي كاب" : "HADICAP") },
            ] as Array<{ k: FactoryKeyWithAll; label: string }>).map((btn) => (
              <button
                key={btn.k}
                onClick={() => setActive(btn.k)}
                className={`inline-flex items-center gap-2 rounded-full border-2 px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold shadow-sm transition-all duration-300 whitespace-nowrap ${
                  active === btn.k
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-emerald-600/30 hover:shadow-emerald-600/40"
                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid - Responsive */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_380px]">
          {/* Products List */}
          <div>
            <div className={`grid gap-4 md:gap-6 ${active === "all" ? "sm:grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  factoryInfo={factoriesInfo[product.factory]}
                  factoryRoute={factoryRoutes[product.factory]}
                  isAR={isAR}
                  isRTL={isRTL}
                  align={align}
                />
              ))}

              {/* Empty State */}
              {filtered.length === 0 && (
                <div className="col-span-full rounded-3xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
                  <div className="mx-auto mb-4 text-6xl">🔍</div>
                  <p className="text-xl font-semibold text-gray-600">
                    {isAR ? "لا توجد نتائج مطابقة" : "No matching results"}
                  </p>
                  <p className="mt-2 text-gray-500">
                    {isAR ? "جرب تغيير البحث أو الفلتر" : "Try changing your search or filter"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Featured Sidebar - Hidden on mobile, visible on desktop */}
          <aside
            ref={sidebarRef}
            className="hidden lg:block lg:sticky lg:top-24 self-start rounded-2xl md:rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-600 p-6 md:p-8 text-white shadow-2xl shadow-emerald-600/40 animate-fadeIn"
          >
            {/* Logo Circle */}
            <div className="mb-4 md:mb-6 flex justify-center">
              <div className="grid h-28 w-28 md:h-36 md:w-36 place-items-center rounded-full bg-white p-3 md:p-4 shadow-2xl ring-4 ring-emerald-400/30">
                <img
                  src={featureData.logo}
                  alt={featureData.name}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Title */}
            <h4 className="mb-2 md:mb-3 text-center text-xl md:text-2xl font-black">
              {featureData.name}
            </h4>

            {/* Tagline */}
            <p className="mb-4 md:mb-6 text-center text-sm md:text-base text-white/90 leading-relaxed">
              {featureData.tagline}
            </p>

            {/* Divider */}
            <div className="mx-auto mb-4 md:mb-6 h-px w-12 md:w-16 bg-white/30" />

            {/* CTA Button */}
            <div className="flex justify-center">
              <a
                href="/products"
                className={`inline-flex items-center gap-2 md:gap-3 rounded-full bg-white px-5 md:px-6 py-2.5 md:py-3 text-sm md:text-base font-bold text-emerald-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <span>{t.feature?.cta || (isAR ? "تصفح الكل" : "Browse All")}</span>
                <span className={`text-lg md:text-xl transition-transform duration-300 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'}`}>
                  {isRTL ? '←' : '→'}
                </span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// Optimized Product Card Component
const ProductCard = memo(({ 
  product, 
  index, 
  factoryInfo, 
  factoryRoute, 
  isAR, 
  isRTL, 
  align 
}: {
  product: CompanyProduct;
  index: number;
  factoryInfo: { name: string; logo: string };
  factoryRoute: string;
  isAR: boolean;
  isRTL: boolean;
  align: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(index < 4);
  const [imageLoaded, setImageLoaded] = useState(false);
  const shouldLoadEagerly = index < 4;

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

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).style.display = "none";
  }, []);

  const productTitle = isAR ? product.title : product.titleEn;
  const productDesc = isAR ? product.desc : product.descEn;
  const category = isAR ? product.category : product.categoryEn;
  const sourceLabel = isAR ? `مصدر: ${factoryInfo.name}` : `Source: ${factoryInfo.name}`;

  return (
    <article
      ref={containerRef}
      className={`product-card group relative overflow-hidden rounded-2xl md:rounded-3xl border-2 border-gray-100 bg-white p-4 md:p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-600/10 animate-fadeInUp ${align}`}
    >
      <div className="flex items-start gap-3 md:gap-4">
        {/* Product Image - Responsive */}
        <div className="flex-shrink-0 relative">
          <div className="grid h-12 w-12 md:h-16 md:w-16 place-items-center rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-1.5 md:p-2 shadow-inner transition-transform duration-300 group-hover:scale-110">
            {!imageLoaded && isInView && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
            )}
            {isInView ? (
              <img
                src={product.img}
                alt={productTitle}
                className={`h-full w-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading={shouldLoadEagerly ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={shouldLoadEagerly ? "high" : "low"}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <div className="h-full w-full bg-gray-200 rounded-xl" />
            )}
          </div>
        </div>

        {/* Content - Responsive */}
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="text-base md:text-xl font-bold text-gray-900 transition-colors group-hover:text-emerald-600 line-clamp-2">
              {productTitle}
            </h3>
            <a
              href={factoryRoute}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 whitespace-nowrap flex-shrink-0 transition-colors"
            >
              {factoryInfo.name}
            </a>
          </div>
          <p className="mb-2 md:mb-3 text-sm md:text-base text-gray-600 leading-relaxed line-clamp-2">{productDesc}</p>
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <span className="h-1 w-1 rounded-full bg-emerald-600" />
            <span className="truncate">{sourceLabel}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
              {category}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';