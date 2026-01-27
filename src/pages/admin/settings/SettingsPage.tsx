// src/pages/admin/settings/SettingsPage.tsx
import { useEffect, useState } from 'react';
import { Save, Mail, MapPin, Clock, Share2, X } from 'lucide-react';
import api from '../../../lib/api';

type SettingsState = {
  site_general_address_ar: string;
  site_general_address_en: string;
  site_general_phones: string[];
  site_general_email: string;
  site_working_hours_ar: string;
  site_working_hours_en: string;
  site_social_facebook: string;
  site_social_twitter: string;
  site_social_linkedin: string;
  site_social_instagram: string;
};

const initial: SettingsState = {
  site_general_address_ar: '',
  site_general_address_en: '',
  site_general_phones: [''],
  site_general_email: '',
  site_working_hours_ar: '',
  site_working_hours_en: '',
  site_social_facebook: '',
  site_social_twitter: '',
  site_social_linkedin: '',
  site_social_instagram: '',
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(initial);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get<{ settings: Record<string, string | string[]> }>('/api/admin/settings');
      const s = res.data.settings ?? {};
      const phones = s.site_general_phones;
      const phonesArr = Array.isArray(phones) ? phones : (typeof phones === 'string' && phones ? (() => { try { return JSON.parse(phones) as string[]; } catch { return [phones]; } })() : ['']);
      setSettings({
        site_general_address_ar: (s.site_general_address_ar as string) ?? initial.site_general_address_ar,
        site_general_address_en: (s.site_general_address_en as string) ?? initial.site_general_address_en,
        site_general_phones: phonesArr.length ? phonesArr : [''],
        site_general_email: (s.site_general_email as string) ?? initial.site_general_email,
        site_working_hours_ar: (s.site_working_hours_ar as string) ?? initial.site_working_hours_ar,
        site_working_hours_en: (s.site_working_hours_en as string) ?? initial.site_working_hours_en,
        site_social_facebook: (s.site_social_facebook as string) ?? initial.site_social_facebook,
        site_social_twitter: (s.site_social_twitter as string) ?? initial.site_social_twitter,
        site_social_linkedin: (s.site_social_linkedin as string) ?? initial.site_social_linkedin,
        site_social_instagram: (s.site_social_instagram as string) ?? initial.site_social_instagram,
      });
    } catch (e) {
      console.error('Failed to load settings', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...settings,
        site_general_phones: settings.site_general_phones.filter((p) => p.trim() !== ''),
      };
      await api.put('/api/admin/settings', { settings: payload });
      alert('تم حفظ الإعدادات بنجاح');
    } catch (e: any) {
      alert(e.response?.data?.error || 'فشل حفظ الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  const update = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">إعدادات الموقع</h1>
          <p className="text-gray-600">العنوان العام، ساعات العمل، وروابط التواصل الاجتماعي</p>
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

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-8">
        {/* General contact */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            معلومات التواصل العامة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان (عربي)</label>
              <input
                type="text"
                value={settings.site_general_address_ar}
                onChange={(e) => update('site_general_address_ar', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان (إنجليزي)</label>
              <input
                type="text"
                value={settings.site_general_address_en}
                onChange={(e) => update('site_general_address_en', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الهواتف</label>
              <div className="space-y-2">
                {(settings.site_general_phones.length ? settings.site_general_phones : ['']).map((phone, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => {
                        const next = [...(settings.site_general_phones || [''])];
                        next[i] = e.target.value;
                        update('site_general_phones', next);
                      }}
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none dir-ltr"
                      placeholder="07701234567"
                    />
                    {(settings.site_general_phones?.length ?? 1) > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          update(
                            'site_general_phones',
                            settings.site_general_phones.filter((_, j) => j !== i)
                          )
                        }
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => update('site_general_phones', [...(settings.site_general_phones || ['']), ''])}
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  + إضافة رقم
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <Mail className="h-4 w-4" />
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={settings.site_general_email}
                onChange={(e) => update('site_general_email', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none dir-ltr"
              />
            </div>
          </div>
        </section>

        {/* Working hours */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            ساعات العمل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ساعات العمل (عربي)</label>
              <input
                type="text"
                value={settings.site_working_hours_ar}
                onChange={(e) => update('site_working_hours_ar', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                placeholder="السبت - الخميس، 8:00 - 16:00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ساعات العمل (إنجليزي)</label>
              <input
                type="text"
                value={settings.site_working_hours_en}
                onChange={(e) => update('site_working_hours_en', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none"
                placeholder="Sat - Thu, 8:00 AM - 4:00 PM"
              />
            </div>
          </div>
        </section>

        {/* Social */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            روابط التواصل الاجتماعي
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook</label>
              <input
                type="url"
                value={settings.site_social_facebook}
                onChange={(e) => update('site_social_facebook', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none dir-ltr"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter</label>
              <input
                type="url"
                value={settings.site_social_twitter}
                onChange={(e) => update('site_social_twitter', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none dir-ltr"
                placeholder="https://twitter.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn</label>
              <input
                type="url"
                value={settings.site_social_linkedin}
                onChange={(e) => update('site_social_linkedin', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none dir-ltr"
                placeholder="https://linkedin.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram</label>
              <input
                type="url"
                value={settings.site_social_instagram}
                onChange={(e) => update('site_social_instagram', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none dir-ltr"
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
