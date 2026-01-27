# دليل البدء السريع - Hadi CMS

## خطوات التشغيل

### 1. تشغيل Backend Server

افتح نافذة PowerShell/Terminal:

```powershell
cd server
npm install
npm run dev
```

يجب أن ترى رسالة: `Server running on http://localhost:3000`

### 2. إنشاء أول مستخدم Admin

في نافذة PowerShell/Terminal جديدة:

```powershell
cd server
npm run create-admin admin@hadigroup.iq password123 "Admin User"
```

**ملاحظة:** يمكنك تغيير:
- `admin@hadigroup.iq` → البريد الإلكتروني
- `password123` → كلمة المرور  
- `"Admin User"` → الاسم

### 3. تشغيل Frontend

في نافذة PowerShell/Terminal أخرى (في المجلد الرئيسي):

```powershell
npm run dev
```

### 4. الدخول إلى صفحة الإدارة

افتح المتصفح وانتقل إلى:
```
http://localhost:5173/#/admin/login
```

**مهم:** لاحظ `#` في المسار - هذا ضروري لأن المشروع يستخدم HashRouter.

### 5. تسجيل الدخول

استخدم البيانات التي أنشأتها:
- **البريد الإلكتروني:** `admin@hadigroup.iq` (أو ما أدخلته)
- **كلمة المرور:** `password123` (أو ما أدخلته)

## استكشاف الأخطاء

### الخطأ: `GET http://localhost:5173/admin/login 404`

**الحل:**
1. تأكد أن الـ Backend يعمل على `http://localhost:3000`
2. تأكد أنك تستخدم المسار الصحيح: `http://localhost:5173/#/admin/login` (مع `#`)
3. تأكد من أن الـ proxy في `vite.config.ts` يعمل

### الخطأ: `Network Error` أو `Connection Refused`

**الحل:**
1. تأكد أن الـ Backend يعمل (افتح `http://localhost:3000/health`)
2. تأكد من أن المنفذ 3000 غير مستخدم من برنامج آخر

### الخطأ: `401 Unauthorized`

**الحل:**
1. تأكد من إنشاء مستخدم admin أولاً
2. تأكد من استخدام البريد الإلكتروني وكلمة المرور الصحيحة

## المسارات المهمة

- صفحة الدخول: `/#/admin/login`
- لوحة التحكم: `/#/admin/dashboard`
- المصانع: `/#/admin/factories`
- المنتجات: `/#/admin/products`

## ملاحظات

- جميع المسارات تبدأ بـ `#` لأن المشروع يستخدم HashRouter
- الـ Backend يجب أن يعمل دائماً عند استخدام Admin Panel
- في التطوير، الـ Frontend يستخدم proxy للوصول إلى Backend
