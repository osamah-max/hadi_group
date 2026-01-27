// src/pages/admin/factories/FactoryEditPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowRight, Plus, X, MapPin, Star } from 'lucide-react';
import api from '../../../lib/api';
import ImageUpload from '../../../components/admin/ImageUpload';
import ConfirmDialog from '../../../components/admin/ConfirmDialog';

interface LocationItem {
  id?: number;
  address_ar: string;
  address_en: string;
  phones: string[];
  email: string;
  map_url: string;
  lat: number;
  lng: number;
  is_primary: boolean;
  order_index: number;
}

interface FactoryData {
  slug: string;
  name_ar: string;
  name_en: string;
  tagline_ar: string;
  tagline_en: string;
  logo: string;
  hero_image: string;
  address_ar: string;
  address_en: string;
  phones: string[];
  email: string;
  map_url: string;
  lat: number;
  lng: number;
  description_ar: string;
  description_en: string;
  capabilities_ar: string[];
  capabilities_en: string[];
  advantages_ar: Array<{ title: string; desc: string }>;
  advantages_en: Array<{ title: string; desc: string }>;
  industries_ar: Array<{ title: string; desc: string }>;
  industries_en: Array<{ title: string; desc: string }>;
  kpis: Array<{ value: string; label: string }>;
  order_index: number;
  status: 'draft' | 'published';
  locations: LocationItem[];
}

interface FactoryEditPageProps {
  mode?: 'new' | 'edit';
}

export default function FactoryEditPage({ mode }: FactoryEditPageProps = {}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = mode === 'new' || id === 'new';
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<number | null>(null);
  const [data, setData] = useState<FactoryData>({
    slug: '',
    name_ar: '',
    name_en: '',
    tagline_ar: '',
    tagline_en: '',
    logo: '',
    hero_image: '',
    address_ar: '',
    address_en: '',
    phones: [''],
    email: '',
    map_url: '',
    lat: 0,
    lng: 0,
    description_ar: '',
    description_en: '',
    capabilities_ar: [''],
    capabilities_en: [''],
    advantages_ar: [{ title: '', desc: '' }],
    advantages_en: [{ title: '', desc: '' }],
    industries_ar: [{ title: '', desc: '' }],
    industries_en: [{ title: '', desc: '' }],
    kpis: [{ value: '', label: '' }],
    order_index: 0,
    status: 'draft',
    locations: [],
  });

  useEffect(() => {
    if (!isNew && id) {
      fetchFactory();
    } else if (isNew) {
      setLoading(false);
    }
  }, [id, isNew]);

  const fetchFactory = async () => {
    if (!id || id === 'new') {
      setLoading(false);
      return;
    }
    
    try {
      const response = await api.get(`/api/admin/factories/${id}`);
      const factory = response.data.factory;
      setData({
        slug: factory.slug || '',
        name_ar: factory.name_ar || '',
        name_en: factory.name_en || '',
        tagline_ar: factory.tagline_ar || '',
        tagline_en: factory.tagline_en || '',
        logo: factory.logo || '',
        hero_image: factory.hero_image || '',
        address_ar: factory.address_ar || '',
        address_en: factory.address_en || '',
        phones: factory.phones && factory.phones.length > 0 ? factory.phones : [''],
        email: factory.email || '',
        map_url: factory.map_url || '',
        lat: factory.lat || 0,
        lng: factory.lng || 0,
        description_ar: factory.description_ar || '',
        description_en: factory.description_en || '',
        capabilities_ar: factory.capabilities_ar && factory.capabilities_ar.length > 0 ? factory.capabilities_ar : [''],
        capabilities_en: factory.capabilities_en && factory.capabilities_en.length > 0 ? factory.capabilities_en : [''],
        advantages_ar: factory.advantages_ar && factory.advantages_ar.length > 0 ? factory.advantages_ar : [{ title: '', desc: '' }],
        advantages_en: factory.advantages_en && factory.advantages_en.length > 0 ? factory.advantages_en : [{ title: '', desc: '' }],
        industries_ar: factory.industries_ar && factory.industries_ar.length > 0 ? factory.industries_ar : [{ title: '', desc: '' }],
        industries_en: factory.industries_en && factory.industries_en.length > 0 ? factory.industries_en : [{ title: '', desc: '' }],
        kpis: factory.kpis && factory.kpis.length > 0 ? factory.kpis : [{ value: '', label: '' }],
        order_index: factory.order_index || 0,
        status: factory.status || 'draft',
        locations: (factory.locations || []).map((loc: any) => ({
          id: loc.id,
          address_ar: loc.address_ar || '',
          address_en: loc.address_en || '',
          phones: Array.isArray(loc.phones) && loc.phones.length > 0 ? loc.phones : [''],
          email: loc.email || '',
          map_url: loc.map_url || '',
          lat: loc.lat ?? 0,
          lng: loc.lng ?? 0,
          is_primary: !!loc.is_primary,
          order_index: loc.order_index ?? 0,
        })),
      });
    } catch (error) {
      console.error('Error fetching factory:', error);
      navigate('/#/admin/factories');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        phones: data.phones.filter(p => p.trim() !== ''),
        capabilities_ar: data.capabilities_ar.filter(c => c.trim() !== ''),
        capabilities_en: data.capabilities_en.filter(c => c.trim() !== ''),
        advantages_ar: data.advantages_ar.filter(a => a.title.trim() !== '' || a.desc.trim() !== ''),
        advantages_en: data.advantages_en.filter(a => a.title.trim() !== '' || a.desc.trim() !== ''),
        industries_ar: data.industries_ar.filter(i => i.title.trim() !== '' || i.desc.trim() !== ''),
        industries_en: data.industries_en.filter(i => i.title.trim() !== '' || i.desc.trim() !== ''),
        kpis: data.kpis.filter(k => k.value.trim() !== '' || k.label.trim() !== ''),
        locations: data.locations
          .filter((loc) => (loc.address_ar || '').trim() !== '' && (loc.address_en || '').trim() !== '')
          .map((loc, idx) => ({
            address_ar: loc.address_ar,
            address_en: loc.address_en,
            phones: loc.phones.filter((p) => p.trim() !== ''),
            email: loc.email || undefined,
            map_url: loc.map_url || undefined,
            lat: loc.lat || undefined,
            lng: loc.lng || undefined,
            is_primary: loc.is_primary,
            order_index: idx,
          })),
      };

      if (isNew) {
        await api.post('/api/admin/factories', payload);
      } else {
        await api.put(`/api/admin/factories/${id}`, payload);
      }

      navigate('/admin/factories');
    } catch (error: any) {
      alert(error.response?.data?.error || 'فشل حفظ المصنع');
    } finally {
      setSaving(false);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            {isNew ? 'إضافة مصنع جديد' : 'تعديل المصنع'}
          </h1>
          <p className="text-gray-600">
            {isNew ? 'إنشاء مصنع جديد في النظام' : 'تعديل معلومات المصنع'}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-50"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Slug *</label>
              <input
                type="text"
                value={data.slug}
                onChange={(e) => setData({ ...data, slug: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                placeholder="hima"
                dir="ltr"
                required
              />
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
                value={data.name_ar}
                onChange={(e) => setData({ ...data, name_ar: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم (إنجليزي) *</label>
              <input
                type="text"
                value={data.name_en}
                onChange={(e) => setData({ ...data, name_en: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الشعار (عربي)</label>
              <input
                type="text"
                value={data.tagline_ar}
                onChange={(e) => setData({ ...data, tagline_ar: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الشعار (إنجليزي)</label>
              <input
                type="text"
                value={data.tagline_en}
                onChange={(e) => setData({ ...data, tagline_en: e.target.value })}
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

        {/* Images */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">الصور</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ImageUpload
              value={data.logo}
              onChange={(url) => setData({ ...data, logo: url })}
              category="factories"
              label="الشعار"
            />
            <ImageUpload
              value={data.hero_image}
              onChange={(url) => setData({ ...data, hero_image: url })}
              category="factories"
              label="صورة الخلفية"
            />
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">معلومات الاتصال</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان (عربي)</label>
              <input
                type="text"
                value={data.address_ar}
                onChange={(e) => setData({ ...data, address_ar: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان (إنجليزي)</label>
              <input
                type="text"
                value={data.address_en}
                onChange={(e) => setData({ ...data, address_en: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">أرقام الهواتف</label>
              <div className="space-y-2">
                {data.phones.map((phone, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        const newPhones = [...data.phones];
                        newPhones[index] = e.target.value;
                        setData({ ...data, phones: newPhones });
                      }}
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                      placeholder="07701234567"
                      dir="ltr"
                    />
                    {data.phones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newPhones = data.phones.filter((_, i) => i !== index);
                          setData({ ...data, phones: newPhones });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setData({ ...data, phones: [...data.phones, ''] })}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  + إضافة رقم
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">رابط الخريطة (Google Maps Embed)</label>
              <input
                type="url"
                value={data.map_url}
                onChange={(e) => setData({ ...data, map_url: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                placeholder="https://maps.google.com/maps?q=...&output=embed"
                dir="ltr"
              />
              <p className="text-xs text-gray-500 mt-1">رابط embed من Google Maps</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">الإحداثيات الجغرافية (اختياري)</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">خط العرض (Latitude)</label>
                  <input
                    type="number"
                    step="any"
                    value={data.lat || ''}
                    onChange={(e) => setData({ ...data, lat: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                    placeholder="33.312"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">خط الطول (Longitude)</label>
                  <input
                    type="number"
                    step="any"
                    value={data.lng || ''}
                    onChange={(e) => setData({ ...data, lng: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                    placeholder="44.445"
                    dir="ltr"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">استخدم هذه الإحداثيات إذا لم يكن لديك رابط embed جاهز</p>
            </div>
          </div>
        </section>

        {/* Locations (multi-location) */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            المواقع
          </h2>
          <p className="text-sm text-gray-600 mb-4">إدارة المواقع المتعددة للمصنع. حدد موقعاً رئيسياً واحداً على الأقل.</p>
          <div className="space-y-4">
            {data.locations.map((loc, locIdx) => (
              <div key={loc.id ?? locIdx} className="p-4 border-2 border-gray-200 rounded-xl bg-gray-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    موقع {locIdx + 1}
                    {loc.is_primary && (
                      <span className="mr-2 inline-flex items-center gap-1 text-amber-600">
                        <Star className="h-4 w-4 fill-current" /> رئيسي
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const next = data.locations.map((l, i) => ({
                          ...l,
                          is_primary: i === locIdx,
                        }));
                        setData({ ...data, locations: next });
                      }}
                      className={`text-sm px-3 py-1.5 rounded-lg border ${loc.is_primary ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {loc.is_primary ? 'رئيسي' : 'تحديد رئيسي'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setLocationToDelete(locIdx)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="حذف الموقع"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">العنوان (عربي)</label>
                    <input
                      type="text"
                      value={loc.address_ar}
                      onChange={(e) => {
                        const next = [...data.locations];
                        next[locIdx] = { ...loc, address_ar: e.target.value };
                        setData({ ...data, locations: next });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">العنوان (إنجليزي)</label>
                    <input
                      type="text"
                      value={loc.address_en}
                      onChange={(e) => {
                        const next = [...data.locations];
                        next[locIdx] = { ...loc, address_en: e.target.value };
                        setData({ ...data, locations: next });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">الهواتف</label>
                    <div className="flex flex-wrap gap-2">
                      {(loc.phones.length ? loc.phones : ['']).map((ph, pi) => (
                        <div key={pi} className="flex gap-1 items-center">
                          <input
                            type="text"
                            value={ph}
                            onChange={(e) => {
                              const phones = [...(loc.phones.length ? loc.phones : [''])];
                              phones[pi] = e.target.value;
                              const next = [...data.locations];
                              next[locIdx] = { ...loc, phones };
                              setData({ ...data, locations: next });
                            }}
                            className="w-32 px-2 py-1.5 border border-gray-200 rounded-lg text-sm dir-ltr"
                            placeholder="07701234567"
                            dir="ltr"
                          />
                          {(loc.phones.length ? loc.phones : ['']).length > 1 && (
                            <button type="button" onClick={() => {
                              const phones = (loc.phones.length ? loc.phones : ['']).filter((_, i) => i !== pi);
                              const next = [...data.locations];
                              next[locIdx] = { ...loc, phones: phones.length ? phones : [''] };
                              setData({ ...data, locations: next });
                            }} className="p-1 text-red-600"><X className="h-4 w-4" /></button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const phones = [...(loc.phones.length ? loc.phones : ['']), ''];
                          const next = [...data.locations];
                          next[locIdx] = { ...loc, phones };
                          setData({ ...data, locations: next });
                        }}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        + إضافة رقم
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={loc.email}
                      onChange={(e) => {
                        const next = [...data.locations];
                        next[locIdx] = { ...loc, email: e.target.value };
                        setData({ ...data, locations: next });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none text-sm dir-ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">رابط الخريطة</label>
                    <input
                      type="url"
                      value={loc.map_url}
                      onChange={(e) => {
                        const next = [...data.locations];
                        next[locIdx] = { ...loc, map_url: e.target.value };
                        setData({ ...data, locations: next });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none text-sm dir-ltr"
                      placeholder="https://maps.google.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">خط العرض</label>
                    <input
                      type="number"
                      step="any"
                      value={loc.lat || ''}
                      onChange={(e) => {
                        const next = [...data.locations];
                        next[locIdx] = { ...loc, lat: parseFloat(e.target.value) || 0 };
                        setData({ ...data, locations: next });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm dir-ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">خط الطول</label>
                    <input
                      type="number"
                      step="any"
                      value={loc.lng || ''}
                      onChange={(e) => {
                        const next = [...data.locations];
                        next[locIdx] = { ...loc, lng: parseFloat(e.target.value) || 0 };
                        setData({ ...data, locations: next });
                      }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm dir-ltr"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setData({
                ...data,
                locations: [...data.locations, {
                  address_ar: '',
                  address_en: '',
                  phones: [''],
                  email: '',
                  map_url: '',
                  lat: 0,
                  lng: 0,
                  is_primary: data.locations.length === 0,
                  order_index: data.locations.length,
                }],
              })}
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
            >
              <Plus className="h-4 w-4" />
              إضافة موقع
            </button>
          </div>
        </section>

        {/* Hero Description */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">وصف الصفحة الرئيسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف الرئيسي (عربي)</label>
              <textarea
                value={data.description_ar}
                onChange={(e) => setData({ ...data, description_ar: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none resize-none"
                placeholder="وصف مختصر يظهر في الصفحة الرئيسية للمصنع..."
              />
              <p className="text-xs text-gray-500 mt-1">يظهر في قسم Hero في أعلى الصفحة</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف الرئيسي (إنجليزي)</label>
              <textarea
                value={data.description_en}
                onChange={(e) => setData({ ...data, description_en: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none resize-none"
                placeholder="Brief description that appears on the factory homepage..."
              />
              <p className="text-xs text-gray-500 mt-1">Appears in the Hero section at the top of the page</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">قسم "من نحن"</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">
              <strong>ملاحظة:</strong> النص الكامل لقسم "من نحن" يمكن إضافته في حقل الوصف أعلاه أو في محتوى الصفحة.
            </p>
          </div>
        </section>

        {/* Capabilities */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">القدرات التصنيعية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">القدرات (عربي)</label>
              <div className="space-y-2">
                {data.capabilities_ar.map((cap, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={cap}
                      onChange={(e) => {
                        const newCaps = [...data.capabilities_ar];
                        newCaps[index] = e.target.value;
                        setData({ ...data, capabilities_ar: newCaps });
                      }}
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                    />
                    {data.capabilities_ar.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newCaps = data.capabilities_ar.filter((_, i) => i !== index);
                          setData({ ...data, capabilities_ar: newCaps });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setData({ ...data, capabilities_ar: [...data.capabilities_ar, ''] })}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  + إضافة قدرة
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">القدرات (إنجليزي)</label>
              <div className="space-y-2">
                {data.capabilities_en.map((cap, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={cap}
                      onChange={(e) => {
                        const newCaps = [...data.capabilities_en];
                        newCaps[index] = e.target.value;
                        setData({ ...data, capabilities_en: newCaps });
                      }}
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                    />
                    {data.capabilities_en.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newCaps = data.capabilities_en.filter((_, i) => i !== index);
                          setData({ ...data, capabilities_en: newCaps });
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setData({ ...data, capabilities_en: [...data.capabilities_en, ''] })}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  + إضافة قدرة
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">المميزات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">المميزات (عربي)</label>
              <div className="space-y-3">
                {data.advantages_ar.map((adv, index) => (
                  <div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={adv.title}
                        onChange={(e) => {
                          const newAdvs = [...data.advantages_ar];
                          newAdvs[index] = { ...adv, title: e.target.value };
                          setData({ ...data, advantages_ar: newAdvs });
                        }}
                        placeholder="العنوان"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none"
                      />
                      {data.advantages_ar.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newAdvs = data.advantages_ar.filter((_, i) => i !== index);
                            setData({ ...data, advantages_ar: newAdvs });
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <textarea
                      value={adv.desc}
                      onChange={(e) => {
                        const newAdvs = [...data.advantages_ar];
                        newAdvs[index] = { ...adv, desc: e.target.value };
                        setData({ ...data, advantages_ar: newAdvs });
                      }}
                      placeholder="الوصف"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none resize-none"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setData({ ...data, advantages_ar: [...data.advantages_ar, { title: '', desc: '' }] })}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  + إضافة ميزة
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">المميزات (إنجليزي)</label>
              <div className="space-y-3">
                {data.advantages_en.map((adv, index) => (
                  <div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={adv.title}
                        onChange={(e) => {
                          const newAdvs = [...data.advantages_en];
                          newAdvs[index] = { ...adv, title: e.target.value };
                          setData({ ...data, advantages_en: newAdvs });
                        }}
                        placeholder="Title"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none"
                      />
                      {data.advantages_en.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newAdvs = data.advantages_en.filter((_, i) => i !== index);
                            setData({ ...data, advantages_en: newAdvs });
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <textarea
                      value={adv.desc}
                      onChange={(e) => {
                        const newAdvs = [...data.advantages_en];
                        newAdvs[index] = { ...adv, desc: e.target.value };
                        setData({ ...data, advantages_en: newAdvs });
                      }}
                      placeholder="Description"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none resize-none"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setData({ ...data, advantages_en: [...data.advantages_en, { title: '', desc: '' }] })}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  + إضافة ميزة
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">القطاعات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">القطاعات (عربي)</label>
              <div className="space-y-3">
                {data.industries_ar.map((ind, index) => (
                  <div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={ind.title}
                        onChange={(e) => {
                          const newInds = [...data.industries_ar];
                          newInds[index] = { ...ind, title: e.target.value };
                          setData({ ...data, industries_ar: newInds });
                        }}
                        placeholder="العنوان"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none"
                      />
                      {data.industries_ar.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newInds = data.industries_ar.filter((_, i) => i !== index);
                            setData({ ...data, industries_ar: newInds });
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <textarea
                      value={ind.desc}
                      onChange={(e) => {
                        const newInds = [...data.industries_ar];
                        newInds[index] = { ...ind, desc: e.target.value };
                        setData({ ...data, industries_ar: newInds });
                      }}
                      placeholder="الوصف"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none resize-none"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setData({ ...data, industries_ar: [...data.industries_ar, { title: '', desc: '' }] })}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  + إضافة قطاع
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">القطاعات (إنجليزي)</label>
              <div className="space-y-3">
                {data.industries_en.map((ind, index) => (
                  <div key={index} className="p-4 border-2 border-gray-200 rounded-lg space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={ind.title}
                        onChange={(e) => {
                          const newInds = [...data.industries_en];
                          newInds[index] = { ...ind, title: e.target.value };
                          setData({ ...data, industries_en: newInds });
                        }}
                        placeholder="Title"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none"
                      />
                      {data.industries_en.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const newInds = data.industries_en.filter((_, i) => i !== index);
                            setData({ ...data, industries_en: newInds });
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <textarea
                      value={ind.desc}
                      onChange={(e) => {
                        const newInds = [...data.industries_en];
                        newInds[index] = { ...ind, desc: e.target.value };
                        setData({ ...data, industries_en: newInds });
                      }}
                      placeholder="Description"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-emerald-500 outline-none resize-none"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setData({ ...data, industries_en: [...data.industries_en, { title: '', desc: '' }] })}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  + إضافة قطاع
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* KPIs */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">مؤشرات الأداء (KPIs)</h2>
          <div className="space-y-3">
            {data.kpis.map((kpi, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={kpi.value}
                  onChange={(e) => {
                    const newKpis = [...data.kpis];
                    newKpis[index] = { ...kpi, value: e.target.value };
                    setData({ ...data, kpis: newKpis });
                  }}
                  placeholder="القيمة (مثال: 18K+)"
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                />
                <input
                  type="text"
                  value={kpi.label}
                  onChange={(e) => {
                    const newKpis = [...data.kpis];
                    newKpis[index] = { ...kpi, label: e.target.value };
                    setData({ ...data, kpis: newKpis });
                  }}
                  placeholder="التسمية (مثال: طن إنتاج سنوي)"
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                />
                {data.kpis.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newKpis = data.kpis.filter((_, i) => i !== index);
                      setData({ ...data, kpis: newKpis });
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setData({ ...data, kpis: [...data.kpis, { value: '', label: '' }] })}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              + إضافة مؤشر
            </button>
          </div>
        </section>
      </div>

      <ConfirmDialog
        isOpen={locationToDelete !== null}
        title="حذف الموقع"
        message="هل أنت متأكد من حذف هذا الموقع؟ لا يمكن التراجع عن هذا الإجراء."
        confirmText="حذف"
        cancelText="إلغاء"
        variant="danger"
        onConfirm={() => {
          if (locationToDelete !== null) {
            const next = data.locations.filter((_, i) => i !== locationToDelete);
            setData({ ...data, locations: next });
            setLocationToDelete(null);
          }
        }}
        onCancel={() => setLocationToDelete(null)}
      />
    </div>
  );
}
