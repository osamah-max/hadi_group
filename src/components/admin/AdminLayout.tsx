// src/components/admin/AdminLayout.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard,
  Factory,
  Package,
  Users,
  LogOut,
  Menu,
  X,
  Image,
  Settings,
} from 'lucide-react';
import { useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'لوحة التحكم', to: '/admin/dashboard' },
    { icon: Factory, label: 'المصانع', to: '/admin/factories' },
    { icon: Package, label: 'المنتجات', to: '/admin/products' },
    { icon: Image, label: 'مكتبة الملفات', to: '/admin/media' },
    { icon: Settings, label: 'الإعدادات', to: '/admin/settings' },
    ...(user?.role === 'admin' ? [{ icon: Users, label: 'المستخدمين', to: '/admin/users' }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-emerald-700 to-emerald-800 text-white z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-emerald-600">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">HADI CMS</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:text-emerald-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-sm text-emerald-200 mt-1">نظام إدارة المحتوى</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = window.location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white text-emerald-700 font-semibold'
                      : 'text-emerald-100 hover:bg-emerald-600/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-emerald-600">
            <div className="mb-3">
              <p className="text-sm font-semibold">{user?.name || user?.email}</p>
              <p className="text-xs text-emerald-200">
                {user?.role === 'admin' ? 'مدير' : user?.role === 'editor' ? 'محرر' : 'مشاهد'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:mr-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1" />
            <Link
              to="/"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              عرض الموقع
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
