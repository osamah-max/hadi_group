// server/src/routes/admin/products.ts
import { Router } from 'express';
import { z } from 'zod';
import { db } from '../../db/index.js';
import { authenticate, requireRole } from '../../middleware/auth.js';
import { cache } from '../../lib/cache.js';

const router = Router();

// Product schema
const productSchema = z.object({
  factory_id: z.number().int().positive(),
  title_ar: z.string().min(1),
  title_en: z.string().min(1),
  desc_ar: z.string().optional(),
  desc_en: z.string().optional(),
  img: z.string().optional(),
  category_ar: z.string().optional(),
  category_en: z.string().optional(),
  specs: z.record(z.string()).optional().default({}),
  additional_images: z.array(z.string()).optional().default([]),
  context_image: z.string().optional(),
  technical_drawing: z.string().optional(),
  pdf_url: z.string().optional(),
  order_index: z.number().optional().default(0),
  status: z.enum(['draft', 'published']).optional().default('draft'),
});

// GET /api/admin/products
router.get('/', authenticate, requireRole('admin', 'editor', 'viewer'), (req, res) => {
  const { factory_id, status } = req.query;
  let query = 'SELECT p.*, f.slug as factory_slug, f.name_ar as factory_name_ar, f.name_en as factory_name_en FROM products p LEFT JOIN factories f ON p.factory_id = f.id WHERE 1=1';
  const params: any[] = [];

  if (factory_id) {
    query += ' AND p.factory_id = ?';
    params.push(parseInt(factory_id as string));
  }

  if (status) {
    query += ' AND p.status = ?';
    params.push(status);
  }

  query += ' ORDER BY p.order_index ASC, p.created_at DESC';

  const products = db.prepare(query).all(...params) as any[];
  
  // Parse JSON fields
  const parsed = products.map(p => ({
    ...p,
    specs: JSON.parse(p.specs || '{}'),
    additional_images: JSON.parse(p.additional_images || '[]'),
  }));

  res.json({ products: parsed });
});

// GET /api/admin/products/:id
router.get('/:id', authenticate, requireRole('admin', 'editor', 'viewer'), (req, res) => {
  const product = db.prepare(`
    SELECT p.*, f.slug as factory_slug, f.name_ar as factory_name_ar, f.name_en as factory_name_en
    FROM products p
    LEFT JOIN factories f ON p.factory_id = f.id
    WHERE p.id = ?
  `).get(parseInt(req.params.id)) as any;
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const parsed = {
    ...product,
    specs: JSON.parse(product.specs || '{}'),
    additional_images: JSON.parse(product.additional_images || '[]'),
  };

  res.json({ product: parsed });
});

// POST /api/admin/products
router.post('/', authenticate, requireRole('admin', 'editor'), async (req, res, next) => {
  try {
    const data = productSchema.parse(req.body);

    // Verify factory exists
    const factory = db.prepare('SELECT id FROM factories WHERE id = ?').get(data.factory_id);
    if (!factory) {
      return res.status(404).json({ error: 'Factory not found' });
    }

    const now = new Date().toISOString();
    const result = db.prepare(`
      INSERT INTO products (
        factory_id, title_ar, title_en, desc_ar, desc_en, img,
        category_ar, category_en, specs, additional_images,
        context_image, technical_drawing, pdf_url,
        order_index, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      data.factory_id,
      data.title_ar,
      data.title_en,
      data.desc_ar || null,
      data.desc_en || null,
      data.img || null,
      data.category_ar || null,
      data.category_en || null,
      JSON.stringify(data.specs),
      JSON.stringify(data.additional_images),
      data.context_image || null,
      data.technical_drawing || null,
      data.pdf_url || null,
      data.order_index,
      data.status,
      now,
      now,
    );

    // Clear cache
    cache.clear('products:.*');

    const newProduct = db.prepare(`
      SELECT p.*, f.slug as factory_slug, f.name_ar as factory_name_ar, f.name_en as factory_name_en
      FROM products p
      LEFT JOIN factories f ON p.factory_id = f.id
      WHERE p.id = ?
    `).get(result.lastInsertRowid) as any;

    const parsed = {
      ...newProduct,
      specs: JSON.parse(newProduct.specs || '{}'),
      additional_images: JSON.parse(newProduct.additional_images || '[]'),
    };

    res.status(201).json({ product: parsed });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/products/:id
router.put('/:id', authenticate, requireRole('admin', 'editor'), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = productSchema.parse(req.body);

    // Check if product exists
    const existing = db.prepare('SELECT id FROM products WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Verify factory exists
    const factory = db.prepare('SELECT id FROM factories WHERE id = ?').get(data.factory_id);
    if (!factory) {
      return res.status(404).json({ error: 'Factory not found' });
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE products SET
        factory_id = ?, title_ar = ?, title_en = ?, desc_ar = ?, desc_en = ?,
        img = ?, category_ar = ?, category_en = ?,
        specs = ?, additional_images = ?,
        context_image = ?, technical_drawing = ?, pdf_url = ?,
        order_index = ?, status = ?, updated_at = ?
      WHERE id = ?
    `).run(
      data.factory_id,
      data.title_ar,
      data.title_en,
      data.desc_ar || null,
      data.desc_en || null,
      data.img || null,
      data.category_ar || null,
      data.category_en || null,
      JSON.stringify(data.specs),
      JSON.stringify(data.additional_images),
      data.context_image || null,
      data.technical_drawing || null,
      data.pdf_url || null,
      data.order_index,
      data.status,
      now,
      id,
    );

    // Clear cache
    cache.clear('products:.*');

    const updated = db.prepare(`
      SELECT p.*, f.slug as factory_slug, f.name_ar as factory_name_ar, f.name_en as factory_name_en
      FROM products p
      LEFT JOIN factories f ON p.factory_id = f.id
      WHERE p.id = ?
    `).get(id) as any;

    const parsed = {
      ...updated,
      specs: JSON.parse(updated.specs || '{}'),
      additional_images: JSON.parse(updated.additional_images || '[]'),
    };

    res.json({ product: parsed });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/products/:id
router.delete('/:id', authenticate, requireRole('admin'), (req, res) => {
  const id = parseInt(req.params.id);

  // Check if product exists
  const existing = db.prepare('SELECT id FROM products WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Product not found' });
  }

  db.prepare('DELETE FROM products WHERE id = ?').run(id);

  // Clear cache
  cache.clear('products:.*');

  res.json({ message: 'Product deleted successfully' });
});

export default router;
