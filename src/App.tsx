// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

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

// admin pages
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import FactoriesListPage from "./pages/admin/factories/FactoriesListPage";
import FactoryEditPage from "./pages/admin/factories/FactoryEditPage";
import ProductsListPage from "./pages/admin/products/ProductsListPage";
import ProductEditPage from "./pages/admin/products/ProductEditPage";
import MediaLibraryPage from "./pages/admin/media/MediaLibraryPage";
import SettingsPage from "./pages/admin/settings/SettingsPage";
import UsersListPage from "./pages/admin/users/UsersListPage";

export default function App() {
  return (
    <Routes>
      {/* Admin routes */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Navigate to="/admin/dashboard" replace />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <DashboardPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/factories"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <FactoriesListPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/factories/new"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <FactoryEditPage mode="new" />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/factories/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <FactoryEditPage mode="edit" />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProductsListPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/new"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProductEditPage mode="new" />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/:id"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProductEditPage mode="edit" />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/media"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <MediaLibraryPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <SettingsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <UsersListPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

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

        {/* Fallback لأي مسار غير معروف */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
