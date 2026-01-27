// src/pages/admin/users/UsersListPage.tsx
import { useEffect, useState } from 'react';
import { Users, Plus, Edit, Trash2, Search, X } from 'lucide-react';
import api from '../../../lib/api';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';

interface User {
  id: number;
  email: string;
  name: string | null;
  role: 'admin' | 'editor' | 'viewer';
  created_at: string;
  updated_at: string;
}

export default function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; user: User | null }>({
    isOpen: false,
    user: null,
  });
  const [formDialog, setFormDialog] = useState<{ isOpen: boolean; user: User | null }>({
    isOpen: false,
    user: null,
  });
  const [form, setForm] = useState({ email: '', name: '', role: 'viewer' as const, password: '' });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/admin/users');
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.user) return;
    try {
      await api.delete(`/api/admin/users/${deleteDialog.user.id}`);
      setDeleteDialog({ isOpen: false, user: null });
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.error || 'فشل حذف المستخدم');
    }
  };

  const openAdd = () => {
    setForm({ email: '', name: '', role: 'viewer', password: '' });
    setFormError('');
    setFormDialog({ isOpen: true, user: null });
  };

  const openEdit = (user: User) => {
    setForm({ email: user.email, name: user.name || '', role: user.role, password: '' });
    setFormError('');
    setFormDialog({ isOpen: true, user });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!form.email.trim()) {
      setFormError('البريد الإلكتروني مطلوب');
      return;
    }
    if (!formDialog.user && !form.password) {
      setFormError('كلمة المرور مطلوبة عند إنشاء مستخدم جديد');
      return;
    }
    if (form.password && form.password.length < 6) {
      setFormError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    setSaving(true);
    try {
      if (formDialog.user) {
        const body: any = { email: form.email.trim(), name: form.name.trim() || null, role: form.role };
        if (form.password) body.password = form.password;
        await api.put(`/api/admin/users/${formDialog.user.id}`, body);
      } else {
        await api.post('/api/admin/users', {
          email: form.email.trim(),
          name: form.name.trim() || null,
          role: form.role,
          password: form.password,
        });
      }
      setFormDialog({ isOpen: false, user: null });
      fetchUsers();
    } catch (error: any) {
      setFormError(error.response?.data?.error || 'حدث خطأ');
    } finally {
      setSaving(false);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roleLabel: Record<string, string> = { admin: 'مدير', editor: 'محرر', viewer: 'مشاهد' };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">إدارة المستخدمين</h1>
          <p className="text-gray-600">إضافة وتعديل وحذف مستخدمي لوحة التحكم</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة مستخدم</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالبريد أو الاسم..."
            className="w-full pr-10 pl-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-600 mb-2">لا يوجد مستخدمون</p>
            <p className="text-gray-500 mb-6">أضف مستخدماً جديداً للبدء</p>
            <button
              type="button"
              onClick={openAdd}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>إضافة مستخدم</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">البريد الإلكتروني</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الاسم</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الدور</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">التاريخ</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{user.email}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.name || '—'}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-emerald-100 text-emerald-700'
                            : user.role === 'editor'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {roleLabel[user.role] || user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString('ar-IQ')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteDialog({ isOpen: true, user })}
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

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="حذف المستخدم"
        message={`هل أنت متأكد من حذف "${deleteDialog.user?.email}"؟ لا يمكن حذف حسابك الخاص.`}
        confirmText="حذف"
        cancelText="إلغاء"
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, user: null })}
        variant="danger"
      />

      {/* Add/Edit User Modal */}
      {formDialog.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setFormDialog({ isOpen: false, user: null })}
          dir="rtl"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {formDialog.user ? 'تعديل المستخدم' : 'إضافة مستخدم'}
              </h3>
              <button
                type="button"
                onClick={() => setFormDialog({ isOpen: false, user: null })}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{formError}</div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">الاسم (اختياري)</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">الدور</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as 'admin' | 'editor' | 'viewer' }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none"
                >
                  <option value="viewer">مشاهد</option>
                  <option value="editor">محرر</option>
                  <option value="admin">مدير</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  كلمة المرور {formDialog.user ? '(اتركها فارغة للإبقاء على الحالية)' : '(مطلوبة)'}
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 outline-none"
                  minLength={formDialog.user ? undefined : 6}
                  placeholder={formDialog.user ? '••••••••' : ''}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFormDialog({ isOpen: false, user: null })}
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50"
                >
                  {saving ? 'جاري الحفظ...' : formDialog.user ? 'حفظ' : 'إضافة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
