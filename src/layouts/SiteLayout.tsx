import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SiteLayout() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-white text-gray-900 font-sans antialiased">

      {/* رأس الموقع */}
      <Header />

      {/* المحتوى الرئيسي */}
      <main className="flex-1 w-full mx-auto">
        <Outlet />
      </main>

      {/* الفوتر */}
      <Footer />
      
    </div>
  );
}
