import { useState, useMemo, useEffect, useId, useRef } from "react";
import { Search, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';

/* ================== Icons ================== */

const LinkIcon = (props: any) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

/* ================== Types ================== */

type FAQItem = {
  q: string;
  a: string;
  cat?: string;
};

type Translation = {
  faq: FAQItem[];
  faqTitle: string;
  faqSub: string;
  searchPlaceholder: string;
  all: string;
  expandAll: string;
  collapseAll: string;
  results: string;
  noResults: string;
  copiedLink: string;
  updated: string;
};

/* ================== Helpers ================== */

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[\u0600-\u06FF]/g, (c) => c)
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

/* ================== FAQ Card Component ================== */

function FAQCard({
  index,
  item,
  isRTL,
  t,
  baseId,
  toastId,
  open: externalOpen, // تحكم خارجي بحالة الفتح/الإغلاق (من زر توسيع/طي الكل)
  setOpen: setExternalOpen, // دالة لتحديث الحالة الخارجية
}: {
  index: number;
  item: FAQItem;
  isRTL: boolean;
  t: Translation;
  baseId: string;
  toastId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const align = isRTL ? "text-right" : "text-left";

  // استخدام CSS transitions بدلاً من GSAP
  useEffect(() => {
    if (!contentRef.current || !iconRef.current) return;

    if (externalOpen) {
      // فتح
      contentRef.current.style.height = "auto";
      contentRef.current.style.visibility = "visible";
      contentRef.current.style.pointerEvents = "auto";
      iconRef.current.style.transform = "rotate(180deg)";
    } else {
      // إغلاق
      contentRef.current.style.height = "0";
      contentRef.current.style.visibility = "hidden";
      contentRef.current.style.pointerEvents = "none";
      iconRef.current.style.transform = "rotate(0deg)";
    }
  }, [externalOpen]);


  const toggleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); // منع الإجراء الافتراضي لـ <details>
    setExternalOpen(!externalOpen);
  };

  const anchor = `#${baseId}`;
  const copyLink = async () => {
    // ... (منطق نسخ الرابط - لم يتغير)
    try {
      const url = window.location.origin + window.location.pathname + anchor;
      const tempInput = document.createElement("input");
      tempInput.value = url;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);

      const toast = document.getElementById(toastId);
      if (toast) {
        toast.classList.remove("opacity-0", "translate-y-2");
        toast.classList.add("opacity-100", "translate-y-0");
        setTimeout(() => {
          toast.classList.add("opacity-0", "translate-y-2");
          toast.classList.remove("opacity-100", "translate-y-0");
        }, 1200);
      }
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };


  return (
    <div
      id={baseId}
      data-faq-item
      className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 ease-in-out hover:border-emerald-300 hover:shadow-xl"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* استخدمنا <div> بدلاً من <details> والتحكم في الفتح/الإغلاق كلياً عبر onClick/GSAP */}
      <div
        role="button"
        aria-expanded={externalOpen}
        aria-controls={`content-${baseId}`}
        onClick={toggleOpen}
        className="list-none cursor-pointer select-none px-6 py-5"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-base font-bold flex-shrink-0 shadow-lg shadow-emerald-600/30">
              {index + 1}
            </span>
            <h3 className={`font-bold text-lg text-gray-900 leading-relaxed ${align}`}>
              {item.q}
              {item.cat && (
                <span className="ms-3 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs text-emerald-700 font-semibold shadow-sm">
                  {item.cat}
                </span>
              )}
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation(); // منع إغلاق/فتح البطاقة عند نسخ الرابط
                copyLink();
              }}
              className="h-10 w-10 grid place-items-center rounded-full text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition duration-200"
              title={t.copiedLink}
              aria-label={t.copiedLink}
            >
              <LinkIcon className="h-5 w-5" />
            </button>
            <span
              ref={iconRef}
              aria-hidden
              className={`text-emerald-600 transition-transform duration-300 ease-out`}
            >
              <ChevronDown className="h-6 w-6" />
            </span>
          </div>
        </div>
      </div>

      <div
        id={`content-${baseId}`}
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ 
          height: externalOpen ? 'auto' : 0, 
          visibility: externalOpen ? 'visible' : 'hidden', 
          pointerEvents: externalOpen ? 'auto' : 'none' 
        }}
        aria-hidden={!externalOpen}
      >
        <div
          className={`px-6 pt-0 pb-5 ${align} text-gray-700 leading-relaxed border-t-2 border-gray-100 mt-2`}
        >
          <div className="pt-5 pb-2 text-base">{item.a}</div>
          <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 font-medium">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {t.updated}: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================== Main Component ================== */

export default function FAQ({
  isRTL = true,
  isAR = true,
  t: customT,
}: {
  isRTL?: boolean;
  isAR?: boolean;
  t?: Partial<Translation>;
}) {
  const defaultT: Translation = useMemo(
    // ... (بيانات الترجمة الافتراضية - لم تتغير)
    () => ({
      faqTitle: isAR ? "الأسئلة الشائعة" : "Frequently Asked Questions",
      faqSub: isAR
        ? "نحن هنا للإجابة على جميع استفساراتكم بوضوح وسرعة."
        : "We're here to answer all your inquiries clearly and quickly.",
      searchPlaceholder: isAR ? "ابحث في الأسئلة والأجوبة..." : "Search questions and answers...",
      all: isAR ? "الكل" : "All",
      expandAll: isAR ? "توسيع الكل" : "Expand All",
      collapseAll: isAR ? "طيّ الكل" : "Collapse All",
      results: isAR ? "عدد النتائج" : "Results",
      noResults: isAR
        ? "لا توجد نتائج مطابقة. جرّب كلمات بحث مختلفة."
        : "No matching results. Try different search terms.",
      copiedLink: isAR ? "تم نسخ رابط السؤال" : "Question link copied",
      updated: isAR ? "آخر تحديث" : "Last Updated",
      faq: [
        {
          q: isAR ? "ما هي خيارات الدفع المتاحة؟" : "What payment options are available?",
          a: isAR
            ? "نقبل الدفع عبر بطاقات الائتمان الرئيسية (فيزا، ماستركارد، أمريكان إكسبريس)، التحويل المصرفي المباشر، والدفع عند الاستلام. جميع المعاملات آمنة ومشفرة لحماية بياناتك المالية."
            : "We accept major credit cards (Visa, MasterCard, American Express), direct bank transfers, and cash on delivery. All transactions are secure and encrypted to protect your financial data.",
          cat: isAR ? "الطلبات" : "Orders",
        },
        {
          q: isAR ? "هل تقدمون خدمات شحن دولية؟" : "Do you offer international shipping?",
          a: isAR
            ? "نعم، نقدم خدمات شحن دولية سريعة وموثوقة لمعظم الدول في منطقة الشرق الأوسط وشمال أفريقيا وأوروبا. أوقات التسليم تتراوح بين 3-7 أيام عمل حسب الوجهة."
            : "Yes, we provide fast and reliable international shipping services to most countries in the MENA region and Europe. Delivery times range from 3-7 business days depending on the destination.",
          cat: isAR ? "الشحن" : "Shipping",
        },
        {
          q: isAR ? "ما هي سياسة الاسترجاع الخاصة بكم؟" : "What is your return policy?",
          a: isAR
            ? "يمكنك استرجاع المنتجات خلال 30 يوماً من تاريخ الاستلام، بشرط أن تكون في حالتها الأصلية مع الفاتورة والعبوة. نقوم بمعالجة طلبات الاسترجاع خلال 5-7 أيام عمل."
            : "You may return products within 30 days of receipt, provided they are in their original condition with the invoice and packaging. We process return requests within 5-7 business days.",
          cat: isAR ? "الاسترجاع" : "Returns",
        },
        {
          q: isAR ? "كيف يمكنني تتبع طلبي؟" : "How can I track my order?",
          a: isAR
            ? "بعد إتمام الطلب، ستتلقى رابطاً مباشراً للتتبع عبر البريد الإلكتروني ورسالة نصية. يمكنك استخدامه على صفحة التتبع الخاصة بنا لمعرفة حالة الشحنة في الوقت الفعلي."
            : "After completing your order, you will receive a direct tracking link via email and text message. You can use it on our tracking page to know the shipment status in real-time.",
          cat: isAR ? "الشحن" : "Shipping",
        },
        {
          q: isAR ? "هل يمكنني إلغاء طلبي؟" : "Can I cancel my order?",
          a: isAR
            ? "يمكن إلغاء الطلبات فقط قبل أن يتم شحنها. بمجرد شحن الطلب، لن نتمكن من إلغائه ولكن يمكنك استخدام سياسة الاسترجاع. يرجى الاتصال بنا فوراً إذا كنت ترغب في الإلغاء."
            : "Orders can only be cancelled before they have been shipped. Once shipped, we cannot cancel but you can use our return policy. Please contact us immediately if you wish to cancel.",
          cat: isAR ? "الطلبات" : "Orders",
        },
        {
          q: isAR ? "ما هي معايير الجودة التي تتبعونها؟" : "What quality standards do you follow?",
          a: isAR
            ? "نلتزم بأعلى معايير الجودة الدولية بما في ذلك ISO 9001 و ISO 14001. جميع منتجاتنا تخضع لفحوصات صارمة قبل الشحن لضمان تطابقها مع المواصفات."
            : "We adhere to the highest international quality standards including ISO 9001 and ISO 14001. All our products undergo rigorous inspections before shipping to ensure they meet specifications.",
          cat: isAR ? "الجودة" : "Quality",
        },
        {
          q: isAR ? "هل تقدمون خدمة الدعم الفني؟" : "Do you provide technical support?",
          a: isAR
            ? "نعم، فريق الدعم الفني لدينا متاح على مدار الساعة للإجابة على استفساراتكم وحل أي مشاكل تقنية. يمكنكم التواصل معنا عبر الهاتف، البريد الإلكتروني، أو الدردشة المباشرة."
            : "Yes, our technical support team is available 24/7 to answer your inquiries and resolve any technical issues. You can contact us via phone, email, or live chat.",
          cat: isAR ? "الدعم" : "Support",
        },
        {
          q: isAR ? "كيف أحصل على فاتورة ضريبية؟" : "How do I get a tax invoice?",
          a: isAR
            ? "يتم إرسال الفاتورة الضريبية تلقائياً عبر البريد الإلكتروني بعد إتمام الطلب. يمكنك أيضاً تحميلها من حسابك على الموقع في أي وقت."
            : "The tax invoice is automatically sent via email after completing the order. You can also download it from your account on the website at any time.",
          cat: isAR ? "الطلبات" : "Orders",
        },
      ],
    }),
    [isAR]
  );

  const t = { ...defaultT, ...customT };
  const faq: FAQItem[] = t.faq;

  const [query, setQuery] = useState("");
  const [openStates, setOpenStates] = useState<boolean[]>(faq.map(() => false)); // مصفوفة لحفظ حالة الفتح لكل عنصر
  const [activeCat, setActiveCat] = useState<string>("all");
  const toastId = useId();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemsContainerRef = useRef(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    faq.forEach((f) => f.cat && set.add(f.cat));
    return ["all", ...Array.from(set)];
  }, [faq]);

  const results = useMemo(() => {
    const base =
      activeCat === "all"
        ? faq
        : faq.filter((f) => (f.cat || "").toLowerCase() === activeCat.toLowerCase());
    if (!query.trim()) return base;
    const q = query.trim().toLowerCase();
    return base.filter((f) => (f.q + " " + f.a).toLowerCase().includes(q));
  }, [faq, query, activeCat]);

  // تحديث حالة الفتح/الإغلاق لجميع العناصر
  const handleToggleAll = (open: boolean) => {
    setOpenStates(faq.map(() => open));
  };

  // وظيفة لتحديث حالة عنصر واحد
  const setItemOpen = (index: number, open: boolean) => {
    setOpenStates((prev) => {
      const newState = [...prev];
      newState[index] = open;
      return newState;
    });
  };

  // تحديث حالات الفتح عند تغيير قائمة النتائج (للبحث/التصفية)
  useEffect(() => {
    setOpenStates(results.map(() => false));
  }, [results]);

  // CSS Animations (بدلاً من GSAP)

  const align = isRTL ? "text-right" : "text-left";
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white py-24 md:py-32"
      dir={dir}
      aria-labelledby="faq-title"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-200/20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className={`mb-16 ${align} animate-fadeInDown`}>
          {/* ... (Header Content - لم يتغير) */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 text-emerald-700">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">
              {isAR ? "الأسئلة الشائعة" : "FAQ"}
            </span>
          </div>

          <h2
            id="faq-title"
            className="mb-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            {t.faqTitle}
          </h2>

          <p className="max-w-3xl text-lg text-gray-600 md:text-xl">{t.faqSub}</p>

          <div className={`mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 ${isRTL ? "mr-auto" : ""}`} />
        </div>

        {/* Toolbar */}
        <div className="faq-toolbar mb-8 rounded-3xl border-2 border-gray-200 bg-white p-6 shadow-xl animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Bar - لم يتغير */}
            <div className="relative w-full lg:w-[400px]">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full rounded-2xl border-2 border-gray-200 bg-gray-50 px-5 py-3 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 ${
                  isRTL ? "pr-12 text-right" : "pl-12 text-left"
                }`}
                aria-label={t.searchPlaceholder}
              />
              <span
                className={`absolute top-1/2 -translate-y-1/2 text-gray-400 ${
                  isRTL ? "right-4" : "left-4"
                }`}
                aria-hidden
              >
                <Search className="h-5 w-5" />
              </span>
            </div>

            {/* Category Filters - لم يتغير */}
            {categories.length > 1 && (
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCat(c)}
                    className={`inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold transition duration-200 shadow-md ${
                      activeCat === c
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-emerald-600/30"
                        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-300"
                    }`}
                    aria-pressed={activeCat === c}
                  >
                    {c === "all" ? t.all : c}
                  </button>
                ))}
              </div>
            )}

            {/* Expand/Collapse - تم تعديلها لاستدعاء الدالة الجديدة */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleAll(true)}
                className="flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition duration-200 shadow-md"
                title={t.expandAll}
              >
                <Maximize2 className="h-4 w-4" />
                <span className="hidden sm:inline">{t.expandAll}</span>
              </button>
              <button
                onClick={() => handleToggleAll(false)}
                className="flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition duration-200 shadow-md"
                title={t.collapseAll}
              >
                <Minimize2 className="h-4 w-4" />
                <span className="hidden sm:inline">{t.collapseAll}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Count - لم يتغير */}
        <div className={`${align} mb-6 text-sm font-medium text-gray-600`}>
          {t.results}: <span className="font-bold text-emerald-600">{results.length}</span> /{" "}
          {faq.length}
        </div>

        {/* Empty State - لم يتغير */}
        {results.length === 0 && (
          <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-white/70 p-12 text-center shadow-inner">
            <svg
              className="mx-auto mb-4 h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-semibold text-gray-700">{t.noResults}</p>
          </div>
        )}

        {/* FAQ List */}
        <ul ref={itemsContainerRef} className="space-y-4" aria-live="polite">
          {results.map((item, i) => {
            // نستخدم FAQ.findIndex للعثور على الفهرس الأصلي في مصفوفة faq لتطابق حالة الفتح/الإغلاق
            const originalIndex = faq.findIndex(f => f.q === item.q && f.a === item.a);

            return (
              <li key={item.q} className="relative animate-fadeInUp" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
                <FAQCard
                  index={i}
                  item={item}
                  isRTL={isRTL}
                  t={t}
                  baseId={`${slugify(item.q)}-${i}`}
                  toastId={toastId}
                  open={openStates[originalIndex] ?? false} // استخدام الحالة من المصفوفة
                  setOpen={(open) => setItemOpen(originalIndex, open)} // تحديث الحالة
                />
              </li>
            );
          })}
        </ul>

        {/* Toast Notification - لم يتغير */}
        <div
          id={toastId}
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-8 inset-x-0 mx-auto w-fit px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-base font-semibold shadow-2xl shadow-emerald-600/50 opacity-0 translate-y-2 transition duration-300 ease-out z-50"
        >
          ✓ {t.copiedLink}
        </div>
      </div>
    </section>
  );
}