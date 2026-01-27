// src/pages/admin/DashboardPage.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';
import { Factory, Package, TrendingUp, Clock } from 'lucide-react';

interface Stats {
  factories: number;
  products: number;
  publishedFactories: number;
  publishedProducts: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [factoriesRes, productsRes] = await Promise.all([
        api.get('/api/admin/factories'),
        api.get('/api/admin/products'),
      ]);

      const factories = factoriesRes.data.factories || [];
      const products = productsRes.data.products || [];

      setStats({
        factories: factories.length,
        products: products.length,
        publishedFactories: factories.filter((f: any) => f.status === 'published').length,
        publishedProducts: products.filter((p: any) => p.status === 'published').length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">لوحة التحكم</h1>
        <p className="text-gray-600">نظرة عامة على المحتوى والإحصائيات</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Factory}
          title="إجمالي المصانع"
          value={stats?.factories || 0}
          subtitle={`${stats?.publishedFactories || 0} منشور`}
          color="from-emerald-500 to-teal-600"
          link="/admin/factories"
        />
        <StatCard
          icon={Package}
          title="إجمالي المنتجات"
          value={stats?.products || 0}
          subtitle={`${stats?.publishedProducts || 0} منشور`}
          color="from-blue-500 to-indigo-600"
          link="/admin/products"
        />
        <StatCard
          icon={TrendingUp}
          title="نسبة النشر"
          value={
            stats && stats.factories > 0
              ? Math.round((stats.publishedFactories / stats.factories) * 100)
              : 0
          }
          subtitle="من المصانع"
          color="from-purple-500 to-pink-600"
        />
        <StatCard
          icon={Clock}
          title="آخر تحديث"
          value="الآن"
          subtitle="نشط"
          color="from-orange-500 to-red-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/factories/new"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-300 transition-all"
          >
            <Factory className="h-6 w-6 text-emerald-600" />
            <div>
              <div className="font-semibold text-gray-900">إضافة مصنع جديد</div>
              <div className="text-sm text-gray-600">إنشاء مصنع جديد في النظام</div>
            </div>
          </Link>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all"
          >
            <Package className="h-6 w-6 text-blue-600" />
            <div>
              <div className="font-semibold text-gray-900">إضافة منتج جديد</div>
              <div className="text-sm text-gray-600">إضافة منتج لمصنع موجود</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
  link,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
  link?: string;
}) {
  const content = (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-8 w-8 opacity-80" />
      </div>
      <div className="text-3xl font-black mb-1">{value}</div>
      <div className="text-sm opacity-90 mb-2">{title}</div>
      <div className="text-xs opacity-75">{subtitle}</div>
    </div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }

  return content;
}
