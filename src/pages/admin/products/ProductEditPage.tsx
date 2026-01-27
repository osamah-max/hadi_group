// src/pages/admin/products/ProductEditPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Plus, X } from 'lucide-react';
import api from '../../../lib/api';
import ImageUpload from '../../../components/admin/ImageUpload';

interface Factory {
  id: number;
  slug: string;
  name_ar: string;
  name_en: string;
}

interface ProductData {
  factory_id: number;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
  img: string;
  category_ar: string;
  category_en: string;
  specs: Record<string, string>;
  additional_images: string[];
  context_image: string;
  technical_drawing: string;
  pdf_url: string;
  order_index: number;
  status: 'draft' | 'published';
}

interface ProductEditPageProps {
  mode?: 'new' | 'edit';
}

export default function ProductEditPage({ mode }: ProductEditPageProps = {}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = mode === 'new' || id === 'new';
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [factories, setFactories] = useState<Factory[]>([]);
  const [data, setData] = useState<ProductData>({
    factory_id: 0,
    title_ar: '',
    title_en: '',
    desc_ar: '',
    desc_en: '',
    img: '',
    category_ar: '',
    category_en: '',
    specs: {},
    additional_images: [],
    context_image: '',
    technical_drawing: '',
    pdf_url: '',
    order_index: 0,
    status: 'draft',
  });

  useEffect(() => {
    fetchFactories();
    if (!isNew && id) {
      fetchProduct();
    } else if (isNew) {
      setLoading(false);
    }
  }, [id, isNew]);

  const fetchFactories = async () => {
    try {
      const response = await api.get('/api/admin/factories');
      const fetchedFactories = response.data.factories || [];
      setFactories(fetchedFactories);
      if (isNew && fetchedFactories.length > 0) {
        setData(prev => ({ ...prev, factory_id: fetchedFactories[0].id }));
      }
    } catch (error) {
      console.error('Error fetching factories:', error);
    }
  };

  const fetchProduct = async () => {
    if (!id || id === 'new') {
      setLoading(false);
      return;
    }
    
    try {
      const response = await api.get(`/api/admin/products/${id}`);
      const product = response.data.product;
      setData({
        factory_id: product.factory_id,
        title_ar: product.title_ar || '',
        title_en: product.title_en || '',
        desc_ar: product.desc_ar || '',
        desc_en: product.desc_en || '',
        img: product.img || '',
        category_ar: product.category_ar || '',
        category_en: product.category_en || '',
        specs: product.specs || {},
        additional_images: product.additional_images || [],
        context_image: product.context_image || '',
        technical_drawing: product.technical_drawing || '',
        pdf_url: product.pdf_url || '',
        order_index: product.order_index || 0,
        status: product.status || 'draft',
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/#/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data.factory_id) {
      alert('يرجى اختيار المصنع');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...data,
        specs: Object.fromEntries(
          Object.entries(data.specs).filter(([k, v]) => k.trim() !== '' && v.trim() !== '')
        ),
        additional_images: data.additional_images.filter(img => img.trim() !== ''),
      };

      if (isNew) {
        await api.post('/api/admin/products', payload);
      } else {
        await api.put(`/api/admin/products/${id}`, payload);
      }

      navigate('/admin/products');
    } catch (error: any) {
      alert(error.response?.data?.error || 'فشل حفظ المنتج');
    } finally {
      setSaving(false);
    }
  };

  const addSpec = () => {
    setData({ ...data, specs: { ...data.specs, '': '' } });
  };

  const updateSpec = (oldKey: string, newKey: string, value: string) => {
    const newSpecs = { ...data.specs };
    if (oldKey !== newKey) {
      delete newSpecs[oldKey];
    }
    newSpecs[newKey] = value;
    setData({ ...data, specs: newSpecs });
  };

  const removeSpec = (key: string) => {
    const newSpecs = { ...data.specs };
    delete newSpecs[key];
    setData({ ...data, specs: newSpecs });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            {isNew ? 'إضافة منتج جديد' : 'تعديل المنتج'}
          </h1>
          <p className="text-gray-600">
            {isNew ? 'إنشاء منتج جديد وإضافته لمصنع' : 'تعديل معلومات المنتج'}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          <span>{saving ? 'جاري الحفظ...' : 'حفظ'}</span>
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Basic Info */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">المعلومات الأساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">المصنع *</label>
              <select
                value={data.factory_id}
                onChange={(e) => setData({ ...data, factory_id: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                required
              >
                <option value={0}>اختر المصنع</option>
                {factories.map((factory) => (
                  <option key={factory.id} value={factory.id}>
                    {factory.name_ar} ({factory.slug})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الترتيب</label>
              <input
                type="number"
                value={data.order_index}
                onChange={(e) => setData({ ...data, order_index: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم (عربي) *</label>
              <input
                type="text"
                value={data.title_ar}
                onChange={(e) => setData({ ...data, title_ar: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم (إنجليزي) *</label>
              <input
                type="text"
                value={data.title_en}
                onChange={(e) => setData({ ...data, title_en: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الفئة (عربي)</label>
              <input
                type="text"
                value={data.category_ar}
                onChange={(e) => setData({ ...data, category_ar: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الفئة (إنجليزي)</label>
              <input
                type="text"
                value={data.category_en}
                onChange={(e) => setData({ ...data, category_en: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الحالة</label>
              <select
                value={data.status}
                onChange={(e) => setData({ ...data, status: e.target.value as 'draft' | 'published' })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
              >
                <option value="draft">مسودة</option>
                <option value="published">منشور</option>
              </select>
            </div>
          </div>
        </section>

        {/* Description */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">الوصف</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف (عربي)</label>
              <textarea
                value={data.desc_ar}
                onChange={(e) => setData({ ...data, desc_ar: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none resize-none"
                placeholder="وصف تفصيلي للمنتج باللغة العربية..."
              />
              <p className="text-xs text-gray-500 mt-1">يظهر في صفحة المنتج وفي النافذة المنبثقة</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف (إنجليزي)</label>
              <textarea
                value={data.desc_en}
                onChange={(e) => setData({ ...data, desc_en: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none resize-none"
                placeholder="Detailed product description in English..."
              />
              <p className="text-xs text-gray-500 mt-1">Appears on the product page and in the modal</p>
            </div>
          </div>
        </section>

        {/* Images */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">الصور</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800 mb-2">
              <strong>إرشادات رفع الصور:</strong>
            </p>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li>الصورة الرئيسية: تظهر في قائمة المنتجات وكصورة رئيسية في صفحة المنتج</li>
              <li>صورة السياق: تظهر في قسم "استخدام المنتج" أو "التطبيقات"</li>
              <li>المخطط الهندسي: مخطط تقني يظهر في النافذة المنبثقة للمنتج</li>
              <li>الصور الإضافية: صور إضافية للمنتج (يمكن رفع عدة صور)</li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUpload
              value={data.img}
              onChange={(url) => setData({ ...data, img: url })}
              category="products"
              label="الصورة الرئيسية *"
            />
            <ImageUpload
              value={data.context_image}
              onChange={(url) => setData({ ...data, context_image: url })}
              category="products"
              label="صورة السياق (اختياري)"
            />
            <ImageUpload
              value={data.technical_drawing}
              onChange={(url) => setData({ ...data, technical_drawing: url })}
              category="products"
              label="المخطط الهندسي (اختياري)"
            />
          </div>
        </section>

        {/* Additional Images */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">صور إضافية</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.additional_images.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt={`Additional ${index + 1}`} className="w-full h-32 object-contain rounded-lg bg-gray-100" />
                <button
                  type="button"
                  onClick={() => {
                    const newImages = data.additional_images.filter((_, i) => i !== index);
                    setData({ ...data, additional_images: newImages });
                  }}
                  className="absolute top-2 left-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = async (e: any) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('category', 'products');
                  try {
                    const response = await api.post('/api/upload/single', formData, {
                      headers: { 'Content-Type': 'multipart/form-data' },
                    });
                    setData({ ...data, additional_images: [...data.additional_images, response.data.url] });
                  } catch (error) {
                    alert('فشل رفع الصورة');
                  }
                };
                input.click();
              }}
              className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-all"
            >
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">المواصفات الفنية</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700 mb-2">
              <strong>مثال على المواصفات:</strong>
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>الأحجام المتوفرة:</strong> 75, 90, 110, 125</p>
              <p><strong>النوع:</strong> يوجد ذكر ونثية</p>
              <p><strong>المادة:</strong> بولي إيثيلين (PE)</p>
            </div>
          </div>
          <div className="space-y-3">
            {Object.entries(data.specs).map(([key, value], index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => updateSpec(key, e.target.value, value)}
                  placeholder="اسم الخاصية (عربي/إنجليزي)"
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateSpec(key, key, e.target.value)}
                  placeholder="القيمة"
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(key)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="حذف المواصفة"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpec}
              className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium px-4 py-2 border-2 border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>إضافة مواصفة</span>
            </button>
          </div>
        </section>

        {/* PDF URL */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">ملف PDF (اختياري)</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              يمكنك رفع ملف PDF يحتوي على المواصفات الفنية التفصيلية أو الكتالوج. سيظهر رابط تحميل في صفحة المنتج.
            </p>
          </div>
          <input
            type="url"
            value={data.pdf_url}
            onChange={(e) => setData({ ...data, pdf_url: e.target.value })}
            placeholder="https://example.com/product-specs.pdf أو رابط ملف PDF مرفوع"
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
            dir="ltr"
          />
          <p className="text-xs text-gray-500 mt-1">يمكن رفع ملف PDF عبر نظام رفع الملفات ثم إضافة الرابط هنا</p>
        </section>
      </div>
    </div>
  );
}
