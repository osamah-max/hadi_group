import { useEffect, useRef, useMemo, useState } from "react";
import { viewBox, provinces } from "../../assets/maps/iraq";
import { GeoData, GeoUtils, WORLD_VIEWBOX as WORLD_BOX } from "../../assets/maps/geodata";

/* ================== Icons ================== */

const MapPin = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Phone = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const Mail = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Globe = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const Search = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const Maximize2 = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" x2="14" y1="3" y2="10" />
    <line x1="3" x2="10" y1="21" y2="14" />
  </svg>
);

/* ================== Types ================== */

type Dealer = {
  name: string;
  phone: string;
  address: string;
  email?: string;
};

/* ================== Utils ================== */

function seededRand(seed: number) {
  let x = seed | 0;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return ((x >>> 0) % 10000) / 10000;
  };
}

function strSeed(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function makeDealersForProvince(k: string, provinceName: string, isAR: boolean): Dealer[] {
  const areas = isAR
    ? ["المركز", "الشمال", "الجنوب", "الشرق", "الغرب"]
    : ["Central", "North", "South", "East", "West"];

  const rand = seededRand(strSeed(k));
  const fmt3 = (n: number) => String(100 + Math.floor(n * 800));
  const pick7 = () => String(1 + Math.floor(rand() * 9));

  return Array.from({ length: 2 }).map((_, i) => {
    const n1 = fmt3(rand());
    const n2 = fmt3(rand());
    return {
      name: isAR ? `وكيل ${areas[i]} - ${provinceName}` : `${areas[i]} Agent - ${provinceName}`,
      phone: `+964 77${pick7()} ${n1} ${n2}`,
      address: isAR ? `${areas[i]} - ${provinceName}` : `${areas[i]} - ${provinceName}`,
      email: `agent${i + 1}.${k}@hadi-group.com`,
    };
  });
}

function useProvinceNames(isAR: boolean) {
  return useMemo(() => {
    const en: Record<string, string> = {
      anbar: "Anbar",
      baghdad: "Baghdad",
      basra: "Basra",
      babil: "Babil",
      karbala: "Karbala",
      najaf: "Najaf",
      qadisiyyah: "Qadisiyyah",
      muthanna: "Muthanna",
      maysan: "Maysan",
      dhiqar: "Dhi Qar",
      wasit: "Wasit",
      diyala: "Diyala",
      ninawa: "Nineveh",
      kirkuk: "Kirkuk",
      salahaldin: "Salah Al-Din",
      erbil: "Erbil",
      sulaymaniyah: "Sulaymaniyah",
      duhok: "Duhok",
    };
    const ar: Record<string, string> = {
      anbar: "الأنبار",
      baghdad: "بغداد",
      basra: "البصرة",
      babil: "بابل",
      karbala: "كربلاء",
      najaf: "النجف",
      qadisiyyah: "القادسية",
      muthanna: "المثنى",
      maysan: "ميسان",
      dhiqar: "ذي قار",
      wasit: "واسط",
      diyala: "ديالى",
      ninawa: "نينوى",
      kirkuk: "كركوك",
      salahaldin: "صلاح الدين",
      erbil: "أربيل",
      sulaymaniyah: "السليمانية",
      duhok: "دهوك",
    };
    return (isAR ? ar : en) as Record<keyof typeof provinces, string>;
  }, [isAR]);
}

/* ================== Component ================== */

export default function DistributorNetwork({
  isRTL = true,
  isAR = true,
  t = {},
  worldProjection = "mercator" as "mercator" | "equirect",
}: {
  isRTL?: boolean;
  isAR?: boolean;
  t?: any;
  worldProjection?: "mercator" | "equirect";
}) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);
  const mapRef = useRef<SVGSVGElement>(null);

  const [activeProvince, setActiveProvince] = useState<keyof typeof provinces | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<keyof typeof provinces | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"iraq" | "world">("iraq");

  const names = useProvinceNames(isAR);

  // Generate dealers data
  const dealersData = useMemo(() => {
    const data: Record<string, Dealer[]> = {};
    (Object.keys(provinces) as Array<keyof typeof provinces>).forEach((k) => {
      data[k] = makeDealersForProvince(k, names[k], isAR);
    });
    return data;
  }, [isAR, names]);

  // Filter provinces based on search
  const filteredProvinces = useMemo(() => {
    if (!searchQuery) return Object.keys(provinces) as Array<keyof typeof provinces>;
    return (Object.keys(provinces) as Array<keyof typeof provinces>).filter((k) =>
      names[k].toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, names]);

  // Pin centers for Iraq map
  const [pinCenters, setPinCenters] = useState<Record<string, { x: number; y: number }>>({});
  useEffect(() => {
    const svg = mapRef.current;
    if (!svg) return;
    const centers: Record<string, { x: number; y: number }> = {};
    (Object.keys(provinces) as Array<keyof typeof provinces>).forEach((k) => {
      const el = svg.querySelector<SVGPathElement>(`path[data-k='${k}']`);
      if (el) {
        const box = el.getBBox();
        centers[k] = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
      }
    });
    setPinCenters(centers);
  }, [viewMode]);

  // World map data
  const worldSize = WORLD_BOX;
  const iraqXY = GeoUtils.getIraqAnchorXY(worldSize, worldProjection);

  const routes = useMemo(() => {
    return GeoUtils.buildAllRoutes(
      GeoData.WorldCapitals,
      { width: worldSize.width, height: worldSize.height, samples: 96 },
      GeoData.IRAQ_HUB,
      worldProjection
    );
  }, [worldProjection, worldSize]);

  // CSS Animations (بدلاً من GSAP)

  const align = isRTL ? "text-right" : "text-left";

  return (
    <section
      ref={sectionRef}
      id="distributors"
      className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white py-24 md:py-32"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-emerald-200/20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <div
            ref={headerRef}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 text-emerald-700 animate-fadeInDown"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">
              {isAR ? "شبكة الوكلاء والموزعين" : "Distributor Network"}
            </span>
          </div>

          <h2
            ref={headerRef}
            className="mx-auto mb-6 max-w-4xl text-4xl font-black tracking-tight text-gray-900 md:text-5xl lg:text-6xl animate-fadeInDown"
          >
            {t.distTitle || (isAR ? "نغطي كل محافظات العراق" : "We Cover All Iraqi Provinces")}
          </h2>

          <p ref={subtitleRef} className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {t.distSub ||
              (isAR
                ? "شبكة واسعة من الوكلاء والموزعين المعتمدين في جميع أنحاء العراق لخدمتكم"
                : "A wide network of authorized agents and distributors throughout Iraq to serve you")}
          </p>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
        </div>

        {/* Main Content Grid */}
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            {/* Left Column: Map + Search */}
            <div className="space-y-6">
              {/* Search Bar + View Toggle */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-4 shadow-lg">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="relative flex-1">
                    <Search
                      className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 ${
                        isRTL ? "right-3" : "left-3"
                      }`}
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isAR ? "ابحث عن محافظة..." : "Search for a province..."}
                      className={`w-full rounded-xl border-2 border-gray-200 bg-gray-50 py-3 font-medium text-gray-900 placeholder-gray-400 transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100 ${
                        isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"
                      }`}
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode("iraq")}
                      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        viewMode === "iraq"
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {isAR ? "🇮🇶 العراق" : "🇮🇶 Iraq"}
                    </button>
                    <button
                      onClick={() => setViewMode("world")}
                      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        viewMode === "world"
                          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {isAR ? "🌍 العالم" : "🌍 World"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Map Container - Full Height */}
              <div className="map-container rounded-3xl border-2 border-gray-200 bg-gradient-to-br from-emerald-50/30 to-white shadow-xl overflow-hidden animate-scaleIn" style={{ height: "calc(100vh - 400px)", minHeight: "600px", animationDelay: '0.4s' }}>
                
                {/* Iraq Map */}
                {viewMode === "iraq" && (
                  <svg
                    ref={mapRef}
                    viewBox={viewBox}
                    preserveAspectRatio="xMidYMid meet"
                    className="h-full w-full"
                    role="img"
                    aria-label={isAR ? "خريطة العراق" : "Iraq Map"}
                  >
                    <title>{isAR ? "خريطة العراق" : "Iraq Map"}</title>

                    {/* Provinces */}
                    <g className="opacity-95">
                      {(Object.entries(provinces) as Array<[keyof typeof provinces, string]>).map(([k, d]) => {
                        const isActive = activeProvince === k;
                        const isHovered = hoveredProvince === k;
                        const isFiltered = !filteredProvinces.includes(k);

                        return (
                          <path
                            key={k}
                            data-k={k}
                            d={d}
                            role="button"
                            tabIndex={0}
                            aria-label={names[k]}
                            className="cursor-pointer transition-all duration-300"
                            style={{
                              fill: isActive
                                ? "#10b981"
                                : isHovered
                                ? "#34d399"
                                : isFiltered
                                ? "#e5e7eb"
                                : "#f0fdf4",
                              stroke: isActive ? "#059669" : "#d1d5db",
                              strokeWidth: isActive ? 2 : 1.4,
                              opacity: isFiltered ? 0.3 : 1,
                            }}
                            onMouseEnter={() => !isFiltered && setHoveredProvince(k)}
                            onMouseLeave={() => setHoveredProvince(null)}
                            onClick={() => !isFiltered && setActiveProvince(k)}
                          />
                        );
                      })}

                      {/* Pins */}
                      {Object.entries(pinCenters).map(([k, c]) => {
                        if (!filteredProvinces.includes(k as keyof typeof provinces)) return null;
                        const dealers = dealersData[k] || [];
                        return [
                          { dx: -8, dy: -6 },
                          { dx: 10, dy: 8 },
                        ].map((off, idx) => {
                          const dealer = dealers[idx % dealers.length];
                          return (
                            <g
                              key={`${k}-pin-${idx}`}
                              transform={`translate(${c.x + off.dx}, ${c.y + off.dy})`}
                              className="cursor-pointer transition-all duration-300 hover:scale-125"
                              onClick={() => setActiveProvince(k as keyof typeof provinces)}
                            >
                              <circle
                                r={6}
                                fill="#10b981"
                                stroke="#ffffff"
                                strokeWidth={2}
                                className="drop-shadow-lg"
                              />
                              <circle r={2} fill="#ffffff" />
                            </g>
                          );
                        });
                      })}
                    </g>

                    {/* Province Label */}
                    {hoveredProvince && (
                      <text
                        x="50%"
                        y="5%"
                        textAnchor="middle"
                        className="fill-emerald-700 font-bold"
                        style={{ fontSize: 24 }}
                      >
                        {names[hoveredProvince]}
                      </text>
                    )}
                  </svg>
                )}

                {/* World Map */}
                {viewMode === "world" && (
                  <svg
                    viewBox={`0 0 ${worldSize.width} ${worldSize.height}`}
                    preserveAspectRatio="xMidYMid meet"
                    className="h-full w-full"
                    role="img"
                    aria-label={isAR ? "خريطة العالم" : "World Map"}
                  >
                    {/* Background */}
                    <rect
                      width={worldSize.width}
                      height={worldSize.height}
                      fill="#e0f2fe"
                      opacity={0.3}
                    />
                    
                    {/* Simple world continents outline (simplified representation) */}
                    <g fill="#f0fdf4" stroke="#10b981" strokeWidth={1.5} opacity={0.8}>
                      {/* This is a placeholder - the actual world map data should be loaded from geodata.ts */}
                      <rect x={worldSize.width * 0.1} y={worldSize.height * 0.2} width={worldSize.width * 0.8} height={worldSize.height * 0.6} rx={20} fill="#f0fdf4" opacity={0.4} />
                    </g>

                    {/* Routes */}
                    <g fill="none" stroke="#10b981" strokeWidth={2} opacity={0.6}>
                      {routes.map((r) => (
                        <path key={r.key} d={r.d} className="animate-dash" />
                      ))}
                    </g>

                    {/* Iraq Hub */}
                    <g transform={`translate(${iraqXY.x}, ${iraqXY.y})`}>
                      <circle r={8} fill="#10b981" stroke="#ffffff" strokeWidth={3} />
                      <circle r={3} fill="#ffffff" />
                      <text
                        y={-15}
                        textAnchor="middle"
                        className="fill-emerald-700 font-bold"
                        style={{ fontSize: 14 }}
                      >
                        {isAR ? "العراق 🇮🇶" : "Iraq 🇮🇶"}
                      </text>
                    </g>

                    {/* World Capitals */}
                    {GeoData.WorldCapitals.map((c) => {
                      const p = GeoUtils.projectWorld(c.coords, worldSize, worldProjection);
                      return (
                        <g key={c.key} transform={`translate(${p.x}, ${p.y})`}>
                          <circle r={4} fill="#059669" stroke="#ffffff" strokeWidth={1.5} />
                          <title>{isAR ? c.nameAR : c.nameEN}</title>
                        </g>
                      );
                    })}

                    <text
                      x="50%"
                      y="5%"
                      textAnchor="middle"
                      className="fill-emerald-700 font-bold"
                      style={{ fontSize: 18 }}
                    >
                      {isAR ? "الانتشار العالمي 🌍" : "Global Reach 🌍"}
                    </text>

                    <style>{`
                      .animate-dash {
                        stroke-dasharray: 6 8;
                        animation: dash 2.6s linear infinite;
                      }
                      @keyframes dash {
                        to {
                          stroke-dashoffset: -28;
                        }
                      }
                    `}</style>
                  </svg>
                )}
              </div>
            </div>

            {/* Right Column: Dealers List */}
            <div className="flex flex-col rounded-3xl border-2 border-gray-200 bg-white shadow-xl overflow-hidden" style={{ height: "calc(100vh - 400px)", minHeight: "600px" }}>
              <div className={`p-6 border-b-2 border-gray-200 ${align}`}>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-6 w-6 text-emerald-600" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {activeProvince
                      ? isAR
                        ? `وكلاء ${names[activeProvince]}`
                        : `${names[activeProvince]} Agents`
                      : isAR
                      ? "اختر محافظة"
                      : "Select a Province"}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {activeProvince
                    ? isAR
                      ? "اضغط على أي وكيل للاتصال أو إرسال بريد إلكتروني"
                      : "Click any agent to call or email"
                    : isAR
                    ? "اضغط على أي محافظة على الخريطة"
                    : "Click any province on the map"}
                </p>
              </div>

              <div className="flex-1 p-6 space-y-4 overflow-y-auto">{activeProvince ? (
                  dealersData[activeProvince]?.map((dealer, idx) => (
                    <div
                      key={idx}
                      className="dealer-card group rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl animate-fadeInUp"
                      style={{ animationDelay: `${0.6 + (idx * 0.1)}s` }}
                    >
                      <div className={`${align}`}>
                        <h4 className="mb-3 text-lg font-bold text-gray-900">{dealer.name}</h4>

                        <div className="space-y-2">
                          <div
                            className={`flex items-center gap-2 text-gray-600 ${
                              isRTL ? "flex-row-reverse" : ""
                            }`}
                          >
                            <MapPin className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                            <span className="text-sm">{dealer.address}</span>
                          </div>

                          <a
                            href={`tel:${dealer.phone.replace(/\s+/g, "")}`}
                            className={`flex items-center gap-2 text-emerald-600 transition-colors hover:text-emerald-700 ${
                              isRTL ? "flex-row-reverse" : ""
                            }`}
                          >
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm font-semibold">{dealer.phone}</span>
                          </a>

                          {dealer.email && (
                            <a
                              href={`mailto:${dealer.email}`}
                              className={`flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-700 ${
                                isRTL ? "flex-row-reverse" : ""
                              }`}
                            >
                              <Mail className="h-4 w-4 flex-shrink-0" />
                              <span className="text-sm">{dealer.email}</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center">
                    <MapPin className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                    <p className="text-gray-600">
                      {isAR
                        ? "اضغط على أي محافظة على الخريطة لعرض الوكلاء"
                        : "Click any province on the map to view agents"}
                    </p>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              {activeProvince && (
                <div className="p-6 border-t-2 border-gray-200 bg-gray-50">
                  <button
                    onClick={() => (window.location.href = "/contact")}
                    className="w-full inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/40"
                  >
                    <span>{isAR ? "تواصل معنا" : "Contact Us"}</span>
                    <svg
                      className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { number: "18", labelAR: "محافظة", labelEN: "Provinces", icon: "🗺️" },
            { number: "36+", labelAR: "وكيل معتمد", labelEN: "Authorized Agents", icon: "👥" },
            { number: "24/7", labelAR: "دعم متواصل", labelEN: "Support", icon: "⏰" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="rounded-3xl border-2 border-emerald-200 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-3 text-4xl">{stat.icon}</div>
              <div className="mb-2 text-5xl font-black text-emerald-600">{stat.number}</div>
              <div className="text-lg font-semibold text-gray-700">
                {isAR ? stat.labelAR : stat.labelEN}
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-12 rounded-3xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-emerald-50 p-8 text-center shadow-lg">
          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            {isAR ? "هل تريد أن تصبح وكيلاً معتمداً؟" : "Want to Become an Authorized Agent?"}
          </h3>
          <p className="mb-6 text-lg text-gray-700">
            {isAR
              ? "انضم إلى شبكتنا الواسعة من الوكلاء والموزعين في جميع أنحاء العراق والمنطقة"
              : "Join our extensive network of agents and distributors across Iraq and the region"}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/contact")}
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/40"
            >
              <span>{isAR ? "تواصل معنا الآن" : "Contact Us Now"}</span>
              <svg
                className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => (window.location.href = "/about")}
              className="inline-flex items-center gap-3 rounded-2xl border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:bg-gray-50 hover:text-emerald-600"
            >
              {isAR ? "معرفة المزيد" : "Learn More"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}