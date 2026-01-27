# رفع المشروع إلى GitHub والنشر

## 1. رفع التغييرات إلى GitHub

افتح **Terminal** (أو PowerShell) في مجلد المشروع ثم نفّذ:

```bash
# الانتقال لمجلد المشروع
cd "e:\desktop\desktop\My-Github\Hadi"

# إضافة كل التغييرات
git add -A

# عمل commit
git commit -m "إضافة لوحة تحكم CMS، ربط المنتجات بقاعدة البيانات، وإعداد النشر"

# الدفع إلى GitHub
git push origin main
```

> إذا ظهر خطأ `Permission denied` على `.git/index.lock`:
> - أغلِق أي نوافذ/عمليات تستخدم هذا المشروع (مثل Git GUI أو terminal آخر).
> - أو شغّل الأمر من **Command Prompt** أو **Git Bash** كمسؤول إن لزم.

## 2. البناء (تم تنفيذه)

تم تشغيل البناء مسبقاً:

```bash
npm run build
```

مخرجات البناء في مجلد `dist/`.

## 3. النشر على GitHub Pages

بعد نجاح `git push`، انشر موقعك على GitHub Pages:

```bash
npm run deploy
```

هذا الأمر يرفع محتويات `dist/` إلى الفرع `gh-pages`. الموقع سيكون متاحاً على:

**https://osamah-max.github.io/hadi_group**

---

## ملخص الأوامر بالترتيب

```bash
cd "e:\desktop\desktop\My-Github\Hadi"
git add -A
git commit -m "إضافة لوحة تحكم CMS وربط المنتجات بقاعدة البيانات"
git push origin main
npm run deploy
```
