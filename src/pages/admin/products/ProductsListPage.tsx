// src/pages/admin/products/ProductsListPage.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import api, { getProductImageUrl } from '../../../lib/api';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';

interface Product {
  id: number;
  factory_id: number;
  factory_slug: string;
  factory_name_ar: string;
  factory_name_en: string;
  title_ar: string;
  title_en: string;
  img?: string;
  status: 'draft' | 'published';
  created_at: string;
}

interface Factory {
  id: number;
  slug: string;
  name_ar: string;
  name_en: string;
}

export default function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [factories, setFactories] = useState<Factory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [factoryFilter, setFactoryFilter] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; product: Product | null }>({
    isOpen: false,
    product: null,
  });

  useEffect(() => {
    fetchFactories();
    fetchProducts();
  }, [factoryFilter, statusFilter]);

  const fetchFactories = async () => {
    try {
      const response = await api.get('/api/admin/factories');
      setFactories(response.data.factories || []);
    } catch (error) {
      console.error('Error fetching factories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const params: any = {};
      if (factoryFilter !== 'all') {
        params.factory_id = factoryFilter;
      }
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }

      const response = await api.get('/api/admin/products', { params });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.product) return;

    try {
      await api.delete(`/api/admin/products/${deleteDialog.product.id}`);
      setDeleteDialog({ isOpen: false, product: null });
      fetchProducts();
    } catch (error: any) {
      alert(error.response?.data?.error || 'فشل حذف المنتج');
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.title_en.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">إدارة المنتجات</h1>
          <p className="text-gray-600">إدارة جميع منتجات المصانع</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة منتج جديد</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full pr-10 pl-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={factoryFilter}
              onChange={(e) => setFactoryFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
            >
              <option value="all">جميع المصانع</option>
              {factories.map((factory) => (
                <option key={factory.id} value={factory.id}>
                  {factory.name_ar}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
            >
              <option value="all">جميع الحالات</option>
              <option value="published">منشور</option>
              <option value="draft">مسودة</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-600 mb-2">لا توجد منتجات</p>
            <p className="text-gray-500 mb-6">ابدأ بإضافة منتج جديد</p>
            <Link
              to="/admin/products/new"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>إضافة منتج</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الصورة</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الاسم</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">المصنع</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">التاريخ</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {product.img ? (
                        <img
                          src={getProductImageUrl(product.img)}
                          alt={product.title_ar}
                          className="h-16 w-16 object-contain rounded-lg bg-gray-100"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{product.title_ar}</div>
                      <div className="text-sm text-gray-500">{product.title_en}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-700">{product.factory_name_ar}</div>
                      <code className="text-xs text-gray-500">{product.factory_slug}</code>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          product.status === 'published'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {product.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(product.created_at).toLocaleDateString('ar-IQ')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/admin/products/${product.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => setDeleteDialog({ isOpen: true, product })}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="حذف المنتج"
        message={`هل أنت متأكد من حذف "${deleteDialog.product?.title_ar}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
        confirmText="حذف"
        cancelText="إلغاء"
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, product: null })}
        variant="danger"
      />
    </div>
  );
}
