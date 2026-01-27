// src/pages/admin/factories/FactoriesListPage.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Factory, Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import api, { getProductImageUrl } from '../../../lib/api';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';

interface Factory {
  id: number;
  slug: string;
  name_ar: string;
  name_en: string;
  logo?: string;
  status: 'draft' | 'published';
  created_at: string;
}

export default function FactoriesListPage() {
  const [factories, setFactories] = useState<Factory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; factory: Factory | null }>({
    isOpen: false,
    factory: null,
  });

  useEffect(() => {
    fetchFactories();
  }, [statusFilter]);

  const fetchFactories = async () => {
    try {
      const params: any = {};
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }

      const response = await api.get('/api/admin/factories', { params });
      setFactories(response.data.factories || []);
    } catch (error) {
      console.error('Error fetching factories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.factory) return;

    try {
      await api.delete(`/api/admin/factories/${deleteDialog.factory.id}`);
      setDeleteDialog({ isOpen: false, factory: null });
      fetchFactories();
    } catch (error: any) {
      alert(error.response?.data?.error || 'فشل حذف المصنع');
    }
  };

  const filteredFactories = factories.filter((factory) => {
    const matchesSearch =
      factory.name_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      factory.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      factory.slug.toLowerCase().includes(searchQuery.toLowerCase());
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
          <h1 className="text-3xl font-black text-gray-900 mb-2">إدارة المصانع</h1>
          <p className="text-gray-600">إدارة جميع مصانع المجموعة</p>
        </div>
        <Link
          to="/admin/factories/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة مصنع جديد</span>
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
              placeholder="ابحث عن مصنع..."
              className="w-full pr-10 pl-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
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

      {/* Factories Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {filteredFactories.length === 0 ? (
          <div className="p-12 text-center">
            <Factory className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-600 mb-2">لا توجد مصانع</p>
            <p className="text-gray-500 mb-6">ابدأ بإضافة مصنع جديد</p>
            <Link
              to="/admin/factories/new"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>إضافة مصنع</span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الشعار</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الاسم</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">Slug</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">التاريخ</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFactories.map((factory) => (
                  <tr key={factory.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {factory.logo ? (
                        <img
                          src={getProductImageUrl(factory.logo)}
                          alt={factory.name_ar}
                          className="h-12 w-12 object-contain rounded-lg bg-gray-100"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Factory className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{factory.name_ar}</div>
                      <div className="text-sm text-gray-500">{factory.name_en}</div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                        {factory.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          factory.status === 'published'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {factory.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(factory.created_at).toLocaleDateString('ar-IQ')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/admin/factories/${factory.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => setDeleteDialog({ isOpen: true, factory })}
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
        title="حذف المصنع"
        message={`هل أنت متأكد من حذف "${deleteDialog.factory?.name_ar}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
        confirmText="حذف"
        cancelText="إلغاء"
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, factory: null })}
        variant="danger"
      />
    </div>
  );
}
