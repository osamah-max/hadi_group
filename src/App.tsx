// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Companies from "./pages/Companies";

// companies
import Alzab from "./pages/companies/alzab";
import Gayath from "./pages/companies/gayath";
import HadiCap from "./pages/companies/hadi_cap";
import Hamdi from "./pages/companies/hamdi";
import Hima from "./pages/companies/hima";
import Sina from "./pages/companies/sina";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* كل صفحات الموقع تمر عبر نفس ال-layout */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/companies" element={<Companies />} />

          {/* شركات المجموعة */}
          <Route path="/companies/alzab" element={<Alzab />} />
          <Route path="/companies/gayath" element={<Gayath />} />
          <Route path="/companies/hadi_cap" element={<HadiCap />} />
          <Route path="/companies/hamdi" element={<Hamdi />} />
          <Route path="/companies/hima" element={<Hima />} />
          <Route path="/companies/sina" element={<Sina />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
