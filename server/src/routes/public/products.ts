// server/src/routes/public/products.ts
import { Router } from 'express';
import { db } from '../../db/index.js';
import { cache } from '../../lib/cache.js';

const router = Router();

// GET /api/products
router.get('/', (req, res) => {
  const { factory_slug, lang = 'ar' } = req.query;
  const cacheKey = `products:${lang}:${factory_slug || 'all'}`;

  // Try cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json({ products: cached });
  }

  let query = `
    SELECT p.*, f.slug as factory_slug, f.name_ar as factory_name_ar, f.name_en as factory_name_en
    FROM products p
    INNER JOIN factories f ON p.factory_id = f.id
    WHERE p.status = 'published' AND f.status = 'published'
  `;
  const params: any[] = [];

  if (factory_slug) {
    query += ' AND f.slug = ?';
    params.push(factory_slug);
  }

  query += ' ORDER BY p.order_index ASC, p.created_at DESC';

  const products = db.prepare(query).all(...params) as any[];

  // Parse JSON fields
  const parsed = products.map(p => ({
    id: p.id,
    factory_id: p.factory_id,
    factory_slug: p.factory_slug,
    factory_name: lang === 'en' ? p.factory_name_en : p.factory_name_ar,
    factory_name_ar: p.factory_name_ar,
    factory_name_en: p.factory_name_en,
    title: lang === 'en' ? p.title_en : p.title_ar,
    title_ar: p.title_ar,
    title_en: p.title_en,
    desc: lang === 'en' ? p.desc_en : p.desc_ar,
    desc_ar: p.desc_ar,
    desc_en: p.desc_en,
    img: p.img,
    category: lang === 'en' ? p.category_en : p.category_ar,
    category_ar: p.category_ar,
    category_en: p.category_en,
    specs: JSON.parse(p.specs || '{}'),
    additional_images: JSON.parse(p.additional_images || '[]'),
    context_image: p.context_image,
    technical_drawing: p.technical_drawing,
    pdf_url: p.pdf_url,
    order_index: p.order_index,
    created_at: p.created_at,
    updated_at: p.updated_at,
  }));

  // Cache for 1 hour
  cache.set(cacheKey, parsed, 3600000);

  res.json({ products: parsed });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const { lang = 'ar' } = req.query;
  const id = parseInt(req.params.id);
  const cacheKey = `products:${lang}:${id}`;

  // Try cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json({ product: cached });
  }

  const product = db.prepare(`
    SELECT p.*, f.slug as factory_slug, f.name_ar as factory_name_ar, f.name_en as factory_name_en
    FROM products p
    INNER JOIN factories f ON p.factory_id = f.id
    WHERE p.id = ? AND p.status = 'published' AND f.status = 'published'
  `).get(id) as any;

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const parsed = {
    id: product.id,
    factory_id: product.factory_id,
    factory_slug: product.factory_slug,
    factory_name: lang === 'en' ? product.factory_name_en : product.factory_name_ar,
    factory_name_ar: product.factory_name_ar,
    factory_name_en: product.factory_name_en,
    title: lang === 'en' ? product.title_en : product.title_ar,
    title_ar: product.title_ar,
    title_en: product.title_en,
    desc: lang === 'en' ? product.desc_en : product.desc_ar,
    desc_ar: product.desc_ar,
    desc_en: product.desc_en,
    img: product.img,
    category: lang === 'en' ? product.category_en : product.category_ar,
    category_ar: product.category_ar,
    category_en: product.category_en,
    specs: JSON.parse(product.specs || '{}'),
    additional_images: JSON.parse(product.additional_images || '[]'),
    context_image: product.context_image,
    technical_drawing: product.technical_drawing,
    pdf_url: product.pdf_url,
    order_index: product.order_index,
    created_at: product.created_at,
    updated_at: product.updated_at,
  };

  // Cache for 1 hour
  cache.set(cacheKey, parsed, 3600000);

  res.json({ product: parsed });
});

export default router;
