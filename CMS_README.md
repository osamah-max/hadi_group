# Hadi Group CMS System

نظام إدارة محتوى كامل لمجموعة هادي يتضمن Backend (Express + SQLite) و Frontend Admin Panel.

## المكونات

### Backend (`server/`)
- Express.js server
- SQLite database
- JWT authentication
- File upload system
- RESTful API

### Frontend Admin Panel (`src/pages/admin/`)
- صفحات إدارة المصانع
- صفحات إدارة المنتجات
- نظام المصادقة
- واجهة إدارية احترافية

## الإعداد الأولي

### 1. إعداد Backend

```bash
cd server
npm install
cp .env.example .env
# تحديث .env بالقيم المناسبة
npm run create-admin admin@hadigroup.iq password123 "Admin"
npm run dev
```

### 2. إعداد Frontend

```bash
npm install
cp .env.example .env
# تحديث VITE_API_URL في .env
npm run dev
```

## الاستخدام

### تسجيل الدخول
1. افتح `/admin/login`
2. أدخل البريد الإلكتروني وكلمة المرور
3. بعد تسجيل الدخول، ستنتقل إلى لوحة التحكم

### إدارة المصانع
- عرض جميع المصانع: `/admin/factories`
- إضافة مصنع جديد: `/admin/factories/new`
- تعديل مصنع: `/admin/factories/:id`

### إدارة المنتجات
- عرض جميع المنتجات: `/admin/products`
- إضافة منتج جديد: `/admin/products/new`
- تعديل منتج: `/admin/products/:id`
- فلترة حسب المصنع متاحة في صفحة القائمة

## الأدوار والصلاحيات

- **Admin**: صلاحيات كاملة (إنشاء، تعديل، حذف)
- **Editor**: يمكن إنشاء وتعديل (لا يمكن حذف)
- **Viewer**: عرض فقط

## التكامل مع الموقع

صفحات المصانع الحالية (`src/pages/companies/*.tsx`) يمكن تحديثها لقراءة البيانات من API بدلاً من البيانات الثابتة.

مثال:
```typescript
const [factory, setFactory] = useState(null);
useEffect(() => {
  api.get(`/api/factories/hima`).then(res => setFactory(res.data.factory));
}, []);
```

## ملاحظات

- قاعدة البيانات SQLite يتم إنشاؤها تلقائياً عند أول تشغيل
- الملفات المرفوعة تُحفظ في `server/uploads/`
- النسخ الاحتياطية تُحفظ في `server/backups/`
- Cache مفعل للموارد العامة لتحسين الأداء
