// src/pages/Products.tsx
import { useMemo, useState, memo, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import useDir from "../hooks/useDir";
import { type FactoryKey } from "../data/products";
import { allCompanyProducts, type CompanyProduct } from "../data/companyProducts";
import { X, Download, Image as ImageIcon, FileText, Ruler, Package } from "lucide-react";

// Logos
import logoAlzab from "../assets/img/logo/alzab.png";
import logoGayath from "../assets/img/logo/gayath.png";
import logoHadiCap from "../assets/img/logo/hadi_cap.png";
import logoHima from "../assets/img/logo/hima1.png";
import logoSina from "../assets/img/logo/sina.png";
import logoHamdi from "../assets/img/logo/hamdi_factory.png";

// Extended product type for modal
type ExtendedProduct = CompanyProduct & {
  specs?: Record<string, string>;
  additionalImages?: string[];
  contextImage?: string;
  technicalDrawing?: string;
  pdfUrl?: string;
};

export default function Products() {
  const { isRTL, isAR } = useDir();
  const [selectedFactory, setSelectedFactory] = useState<FactoryKey | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ExtendedProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = useMemo(
    () =>
      isAR
        ? {
            title: "منتجات مجموعة هادي الصناعية",
            subtitle: "اكتشف مجموعة واسعة من المنتجات البلاستيكية عالية الجودة",
            searchPlaceholder: "ابحث باسم المنتج أو وصفه...",
            all: "الكل",
            filterByFactory: "فلترة حسب المصنع",
            noResults: "لا توجد نتائج مطابقة",
            noResultsDesc: "جرب تغيير البحث أو الفلتر",
            viewDetails: "عرض التفاصيل",
            contactUs: "تواصل معنا",
            factories: {
              all: "جميع المصانع",
              gayath: "مصنع غياث",
              hamdi: "مصنع حمدي",
              sina: "مصنع سيناء",
              alzab: "مصنع الزاب",
              hima: "هيما بلاستك",
              hadiCap: "مصنع هادي كاب",
            },
          }
        : {
            title: "HADI Group Products",
            subtitle: "Discover a wide range of high-quality plastic products",
            searchPlaceholder: "Search by product name or description...",
            all: "All",
            filterByFactory: "Filter by Factory",
            noResults: "No matching results",
            noResultsDesc: "Try changing your search or filter",
            viewDetails: "View Details",
            contactUs: "Contact Us",
            factories: {
              all: "All Factories",
              gayath: "Gayath Factory",
              hamdi: "Hamdi Factory",
              sina: "Sina Factory",
              alzab: "Alzab Factory",
              hima: "HIMA Plastic",
              hadiCap: "HADICAP",
            },
          },
    [isAR]
  );

  // Use products from companyProducts file
  const products = allCompanyProducts as ExtendedProduct[];

  // Factory logos mapping
  const factoryLogos: Record<FactoryKey, string> = {
    gayath: logoGayath,
    hamdi: logoHamdi,
    sina: logoSina,
    alzab: logoAlzab,
    hima: logoHima,
    hadiCap: logoHadiCap,
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by factory
    if (selectedFactory !== "all") {
      filtered = filtered.filter((p) => p.factory === selectedFactory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((p) => {
        const name = isAR ? p.title : p.titleEn;
        const desc = isAR ? p.desc : p.descEn;
        return name.toLowerCase().includes(query) || desc.toLowerCase().includes(query);
      });
    }

    return filtered;
  }, [products, selectedFactory, searchQuery, isAR]);

  // Factory routes
  const factoryRoutes: Record<FactoryKey, string> = {
    gayath: "/companies/gayath",
    hamdi: "/companies/hamdi",
    sina: "/companies/sina",
    alzab: "/companies/alzab",
    hima: "/companies/hima",
    hadiCap: "/companies/hadi_cap",
  };

  const align = isRTL ? "text-right" : "text-left";
  const justify = isRTL ? "justify-end" : "justify-start";

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFactory, searchQuery]);

  const handleOpenModal = useCallback((product: ExtendedProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  }, []);

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 text-emerald-700">
            <span className="text-xs font-bold uppercase tracking-widest">
              {isAR ? "المنتجات" : "Products"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">{t.subtitle}</p>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
        </div>
      </section>

      {/* Filters Section */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full rounded-2xl border-2 border-gray-200 bg-white px-5 py-4 text-gray-900 shadow-sm outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 ${
                  isRTL ? "pr-14 pl-5 text-right" : "pl-14 pr-5 text-left"
                }`}
              />
              <span
                className={`absolute top-1/2 -translate-y-1/2 text-xl text-gray-400 ${
                  isRTL ? "right-5" : "left-5"
                }`}
              >
                🔍
              </span>
            </div>
          </div>

          {/* Factory Filter */}
          <div className={`flex flex-wrap items-center gap-3 ${justify} max-w-4xl mx-auto`}>
            <span className="text-sm font-semibold text-gray-700">{t.filterByFactory}:</span>
            {(
              [
                { key: "all" as const, label: t.factories.all },
                { key: "gayath" as const, label: t.factories.gayath },
                { key: "hamdi" as const, label: t.factories.hamdi },
                { key: "sina" as const, label: t.factories.sina },
                { key: "alzab" as const, label: t.factories.alzab },
                { key: "hima" as const, label: t.factories.hima },
                { key: "hadiCap" as const, label: t.factories.hadiCap },
              ] as Array<{ key: FactoryKey | "all"; label: string }>
            ).map((factory) => (
              <button
                key={factory.key}
                onClick={() => setSelectedFactory(factory.key)}
                className={`inline-flex items-center gap-2 rounded-full border-2 px-5 py-2 text-sm font-semibold shadow-sm transition-all duration-300 ${
                  selectedFactory === factory.key
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-emerald-600/30 hover:shadow-emerald-600/40"
                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50"
                }`}
              >
                {factory.key !== "all" && (
                  <img
                    src={factoryLogos[factory.key as FactoryKey]}
                    alt=""
                    className="h-5 w-5 object-contain"
                    loading="lazy"
                  />
                )}
                {factory.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    factoryLogo={factoryLogos[product.factory]}
                    factoryRoute={factoryRoutes[product.factory]}
                    isAR={isAR}
                    isRTL={isRTL}
                    t={t}
                    onOpenModal={handleOpenModal}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600 shadow-md'
                    }`}
                  >
                    {isRTL ? '→' : '←'}
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      return page === 1 || 
                             page === totalPages || 
                             (page >= currentPage - 1 && page <= currentPage + 1);
                    })
                    .map((page, idx, arr) => {
                      const showEllipsisBefore = idx > 0 && arr[idx - 1] < page - 1;
                      return (
                        <div key={page} className="flex items-center gap-1">
                          {showEllipsisBefore && <span className="px-2 text-gray-400">...</span>}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                              currentPage === page
                                ? 'bg-gradient-to-r from-emerald-600 to-emerald-600 text-white shadow-lg scale-110'
                                : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600'
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      );
                    })}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className={`h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600 shadow-md'
                    }`}
                  >
                    {isRTL ? '←' : '→'}
                  </button>
                </div>
              )}
              
              <div className="text-center mt-4 text-sm text-gray-500">
                {isAR 
                  ? `عرض ${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, filteredProducts.length)} من ${filteredProducts.length} منتج`
                  : `Showing ${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, filteredProducts.length)} of ${filteredProducts.length} products`
                }
              </div>
            </>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
              <div className="mx-auto mb-4 text-6xl">🔍</div>
              <p className="text-xl font-semibold text-gray-600 mb-2">{t.noResults}</p>
              <p className="text-gray-500">{t.noResultsDesc}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-emerald-600 to-green-600 p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            {isAR ? "هل تحتاج منتج مخصص؟" : "Need a Custom Product?"}
          </h2>
          <p className="text-lg text-white/90 mb-8">
            {isAR
              ? "فريقنا جاهز لمساعدتك في تصميم وتصنيع المنتجات التي تناسب احتياجاتك"
              : "Our team is ready to help you design and manufacture products that suit your needs"}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-emerald-700 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <span>{t.contactUs}</span>
            <span className={`text-xl ${isRTL ? "rotate-180" : ""}`}>→</span>
          </Link>
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <TechnicalDatasheetModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isRTL={isRTL}
          isAR={isAR}
        />
      )}
    </div>
  );
}

// Technical Datasheet Modal Component
const TechnicalDatasheetModal = memo(({ product, isOpen, onClose, isRTL, isAR }: {
  product: ExtendedProduct;
  isOpen: boolean;
  onClose: () => void;
  isRTL: boolean;
  isAR: boolean;
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const allImages = useMemo(() => product.additionalImages || [product.img], [product]);
  const specs = useMemo(() => {
    // Create specs from category if no specs exist
    if (product.specs) return product.specs;
    const baseSpecs: Record<string, string> = {};
    if (product.category) {
      baseSpecs[isAR ? "الفئة" : "Category"] = isAR ? product.category : (product.categoryEn || product.category);
    }
    return baseSpecs;
  }, [product, isAR]);

  const handleImageSelect = useCallback((idx: number) => {
    setSelectedImageIndex(idx);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      setSelectedImageIndex(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const productTitle = isAR ? product.title : product.titleEn;
  const productDesc = isAR ? product.desc : product.descEn;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 pb-4 px-4 bg-black/60 overflow-y-auto"
      onClick={onClose}
      style={{ paddingTop: '80px' }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-8"
        style={{ maxHeight: 'calc(100vh - 100px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 sm:p-6 flex items-center justify-between border-b-2 border-emerald-700 flex-shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl font-bold truncate">{productTitle}</h2>
              <p className="text-emerald-100 text-xs sm:text-sm">{isAR ? 'ورقة البيانات التقنية' : 'Technical Datasheet'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {product.pdfUrl && (
              <a
                href={product.pdfUrl}
                download
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="font-semibold text-xs sm:text-sm hidden sm:inline">{isAR ? 'تحميل PDF' : 'Download PDF'}</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 flex-shrink-0"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Images Section */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 lg:p-8 border-r border-gray-200">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                  <span>{isAR ? 'الصور التفصيلية' : 'Product Images'}</span>
                </h3>
                
                <div className="relative bg-white rounded-xl p-4 sm:p-6 mb-3 sm:mb-4 shadow-md border border-gray-200 min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
                  <img
                    src={allImages[selectedImageIndex] || product.img}
                    alt={productTitle}
                    className="max-w-full max-h-[220px] sm:max-h-[280px] object-contain"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {allImages.map((img: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => handleImageSelect(idx)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                          selectedImageIndex === idx
                            ? 'border-emerald-500 ring-1 ring-emerald-200'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${productTitle} - View ${idx + 1}`}
                          className="w-full h-16 sm:h-20 object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {product.contextImage && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <Package className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                    <span>{isAR ? 'المنتج على العبوة' : 'Product in Context'}</span>
                  </h3>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
                    <img
                      src={product.contextImage}
                      alt={`${productTitle} in context`}
                      className="w-full h-auto object-contain rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              )}

              {product.technicalDrawing && (
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                    <Ruler className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                    <span>{isAR ? 'المخطط الهندسي' : 'Technical Drawing'}</span>
                  </h3>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
                    <img
                      src={product.technicalDrawing}
                      alt={`${productTitle} technical drawing`}
                      className="w-full h-auto object-contain rounded-lg"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="mt-3 sm:mt-4 text-center">
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                        {isAR ? 'جميع الأبعاد بالمليمتر (mm)' : 'All dimensions in millimeters (mm)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Specifications Section */}
            <div className="bg-white p-4 sm:p-6 lg:p-8">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                <span>{isAR ? 'المواصفات التقنية' : 'Technical Specifications'}</span>
              </h3>

              {Object.keys(specs).length > 0 ? (
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-emerald-50 to-teal-50">
                        <th className={`border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                          {isAR ? 'الخاصية' : 'Property'}
                        </th>
                        <th className={`border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-bold text-gray-900 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                          {isAR ? 'القيمة' : 'Value'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(specs).map(([key, value]) => (
                        <tr key={key} className="hover:bg-emerald-50/30">
                          <td className={`border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                            {key}
                          </td>
                          <td className={`border border-gray-200 px-3 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {isAR ? 'لا توجد مواصفات متاحة' : 'No specifications available'}
                </div>
              )}

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                <h4 className="font-bold text-gray-900 mb-2 text-xs sm:text-sm">{isAR ? 'الوصف' : 'Description'}</h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{productDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TechnicalDatasheetModal.displayName = 'TechnicalDatasheetModal';

// Optimized Product Card Component with IntersectionObserver
const ProductCard = memo(({ 
  product, 
  index, 
  factoryLogo, 
  factoryRoute, 
  isAR, 
  isRTL, 
  t,
  onOpenModal
}: {
  product: ExtendedProduct;
  index: number;
  factoryLogo: string;
  factoryRoute: string;
  isAR: boolean;
  isRTL: boolean;
  t: any;
  onOpenModal: (product: ExtendedProduct) => void;
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

  const productName = isAR ? product.title : product.titleEn;
  const productDesc = isAR ? product.desc : product.descEn;
  const category = isAR ? product.category : product.categoryEn;
  const align = isRTL ? "text-right" : "text-left";

  return (
    <div
      ref={containerRef}
      className="group relative overflow-hidden rounded-3xl border-2 border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-600/10 cursor-pointer"
      onClick={() => onOpenModal(product)}
    >
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        {!imageLoaded && isInView && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse z-10" />
        )}
        {isInView ? (
          <img
            src={product.img}
            alt={productName}
            className={`h-full w-full object-contain p-6 transition-all duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading={shouldLoadEagerly ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={shouldLoadEagerly ? "high" : "low"}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100" />
        )}
        {/* Factory Badge */}
        <div className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-lg z-20">
          <img
            src={factoryLogo}
            alt=""
            className="h-8 w-8 object-contain"
            loading="lazy"
          />
        </div>
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-lg z-20">
            {category}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`p-6 ${align}`}>
        <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors group-hover:text-emerald-600">
          {productName}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
          {productDesc}
        </p>
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(product);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg"
          >
            <FileText className="h-4 w-4" />
            <span>{isAR ? 'عرض التفاصيل' : 'View Details'}</span>
          </button>
          <span className="text-xs text-gray-500">
            {t.factories[product.factory]}
          </span>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
