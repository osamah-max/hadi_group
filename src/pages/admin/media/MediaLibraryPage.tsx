// src/pages/admin/media/MediaLibraryPage.tsx
import { useEffect, useState } from 'react';
import { Image, FileText, Search, Filter, Copy, Trash2, X, Check } from 'lucide-react';
import api from '../../../lib/api';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';

interface MediaFile {
  name: string;
  path: string;
  url: string;
  size: number;
  mimetype: string;
  extension: string;
  createdAt: string;
  category: string;
}

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; file: MediaFile | null }>({
    isOpen: false,
    file: null,
  });

  useEffect(() => {
    fetchFiles();
  }, [categoryFilter, typeFilter, searchQuery]);

  const fetchFiles = async () => {
    try {
      const params: any = {};
      if (categoryFilter !== 'all') {
        params.category = categoryFilter;
      }
      if (typeFilter !== 'all') {
        params.type = typeFilter;
      }
      if (searchQuery) {
        params.q = searchQuery;
      }

      const response = await api.get('/api/admin/media', { params });
      setFiles(response.data.files || []);
    } catch (error) {
      console.error('Error fetching media files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (path: string) => {
    try {
      await navigator.clipboard.writeText(path);
      setCopiedPath(path);
      setTimeout(() => setCopiedPath(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteDialog.file) return;

    try {
      await api.delete('/api/admin/media', {
        data: { path: deleteDialog.file.path },
      });
      setDeleteDialog({ isOpen: false, file: null });
      fetchFiles();
    } catch (error: any) {
      alert(error.response?.data?.error || 'فشل حذف الملف');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const isImage = (mimetype: string): boolean => {
    return mimetype.startsWith('image/');
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
        <h1 className="text-3xl font-black text-gray-900 mb-2">مكتبة الملفات</h1>
        <p className="text-gray-600">إدارة جميع الصور والملفات المرفوعة</p>
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
              placeholder="ابحث عن ملف..."
              className="w-full pr-10 pl-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
            >
              <option value="all">جميع المجلدات</option>
              <option value="factories">المصانع</option>
              <option value="products">المنتجات</option>
              <option value="general">عام</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
            >
              <option value="all">جميع الأنواع</option>
              <option value="image">صور</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
        </div>
      </div>

      {/* Files Grid */}
      {files.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Image className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-600 mb-2">لا توجد ملفات</p>
          <p className="text-gray-500">ابدأ برفع ملفات من صفحات المصانع أو المنتجات</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.path}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Preview */}
              <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                {isImage(file.mimetype) ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-center p-4">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 font-medium">{file.extension.toUpperCase()}</p>
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-black/60 text-white text-xs rounded">
                    {file.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-900 mb-1 truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  {formatFileSize(file.size)} • {new Date(file.createdAt).toLocaleDateString('ar-IQ')}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(file.url)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"
                    title="نسخ الرابط"
                  >
                    {copiedPath === file.url ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>تم</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>نسخ</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setDeleteDialog({ isOpen: true, file })}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="حذف الملف"
        message={`هل أنت متأكد من حذف "${deleteDialog.file?.name}"؟ هذا الإجراء لا يمكن التراجع عنه.`}
        confirmText="حذف"
        cancelText="إلغاء"
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, file: null })}
        variant="danger"
      />
    </div>
  );
}
