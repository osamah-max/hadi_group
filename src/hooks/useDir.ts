import { useEffect, useState } from "react";

type DirState = {
  dir: "rtl" | "ltr";
  lang: string;
  isRTL: boolean;
  isAR: boolean;
};

export default function useDir(): DirState {
  const read = (): DirState => {
    if (typeof document === "undefined") {
      // fallback آمن لو حصل SSR
      return { dir: "rtl", lang: "ar", isRTL: true, isAR: true };
    }
    const el = document.documentElement;
    const dir = (el.getAttribute("dir") || el.dir || "rtl").toLowerCase() as "rtl" | "ltr";
    const lang = (el.lang || (dir === "rtl" ? "ar" : "en")).toLowerCase();
    return { dir, lang, isRTL: dir === "rtl", isAR: lang.startsWith("ar") };
  };

  // lazy init ✅
  const [state, setState] = useState<DirState>(read);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const el = document.documentElement;
    const obs = new MutationObserver(() => setState(read()));
    obs.observe(el, { attributes: true, attributeFilter: ["dir", "lang"] });
    return () => obs.disconnect();
  }, []); // read لا يعتمد على state/props، فالمصفوفة الفارغة هنا آمنة

  return state;
}
