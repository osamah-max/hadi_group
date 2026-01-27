// server/src/routes/admin/factories.ts
import { Router } from 'express';
import { z } from 'zod';
import { db } from '../../db/index.js';
import { authenticate, requireRole } from '../../middleware/auth.js';
import { cache } from '../../lib/cache.js';

const router = Router();

// Factory schema
const factorySchema = z.object({
  slug: z.string().min(1),
  name_ar: z.string().min(1),
  name_en: z.string().min(1),
  tagline_ar: z.string().optional(),
  tagline_en: z.string().optional(),
  logo: z.string().optional(),
  hero_image: z.string().optional(),
  address_ar: z.string().optional(),
  address_en: z.string().optional(),
  phones: z.array(z.string()).optional().default([]),
  email: z.string().email().optional(),
  map_url: z.string().url().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  description_ar: z.string().optional(),
  description_en: z.string().optional(),
  capabilities_ar: z.array(z.string()).optional().default([]),
  capabilities_en: z.array(z.string()).optional().default([]),
  advantages_ar: z.array(z.object({
    title: z.string(),
    desc: z.string(),
  })).optional().default([]),
  advantages_en: z.array(z.object({
    title: z.string(),
    desc: z.string(),
  })).optional().default([]),
  industries_ar: z.array(z.object({
    title: z.string(),
    desc: z.string(),
  })).optional().default([]),
  industries_en: z.array(z.object({
    title: z.string(),
    desc: z.string(),
  })).optional().default([]),
  kpis: z.array(z.object({
    value: z.string(),
    label: z.string(),
  })).optional().default([]),
  order_index: z.number().optional().default(0),
  status: z.enum(['draft', 'published']).optional().default('draft'),
  locations: z.array(z.object({
    address_ar: z.string().min(1),
    address_en: z.string().min(1),
    phones: z.array(z.string()).default([]),
    email: z.string().optional(),
    map_url: z.string().optional(),
    lat: z.number().optional(),
    lng: z.number().optional(),
    is_primary: z.boolean().optional().default(false),
    order_index: z.number().optional().default(0),
  })).optional().default([]),
});

const locationSchema = z.object({
  address_ar: z.string().min(1),
  address_en: z.string().min(1),
  phones: z.array(z.string()).default([]),
  email: z.string().optional(),
  map_url: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  is_primary: z.boolean().optional().default(false),
  order_index: z.number().optional().default(0),
});

function parseFactory(f: any) {
  return {
    ...f,
    phones: JSON.parse(f.phones || '[]'),
    capabilities_ar: JSON.parse(f.capabilities_ar || '[]'),
    capabilities_en: JSON.parse(f.capabilities_en || '[]'),
    advantages_ar: JSON.parse(f.advantages_ar || '[]'),
    advantages_en: JSON.parse(f.advantages_en || '[]'),
    industries_ar: JSON.parse(f.industries_ar || '[]'),
    industries_en: JSON.parse(f.industries_en || '[]'),
    kpis: JSON.parse(f.kpis || '[]'),
  };
}

function getLocations(factoryId: number): any[] {
  const rows = db.prepare('SELECT * FROM factory_locations WHERE factory_id = ? ORDER BY is_primary DESC, order_index ASC').all(factoryId) as any[];
  return rows.map((r) => ({
    id: r.id,
    factory_id: r.factory_id,
    address_ar: r.address_ar,
    address_en: r.address_en,
    phones: JSON.parse(r.phones || '[]'),
    email: r.email,
    map_url: r.map_url,
    lat: r.lat,
    lng: r.lng,
    is_primary: !!r.is_primary,
    order_index: r.order_index,
    created_at: r.created_at,
    updated_at: r.updated_at,
  }));
}

// GET /api/admin/factories
router.get('/', authenticate, requireRole('admin', 'editor', 'viewer'), (req, res) => {
  const { status } = req.query;
  let query = 'SELECT * FROM factories WHERE 1=1';
  const params: any[] = [];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  query += ' ORDER BY order_index ASC, created_at DESC';

  const factories = db.prepare(query).all(...params) as any[];
  
  const parsed = factories.map((f) => ({ ...parseFactory(f), locations: getLocations(f.id) }));
  res.json({ factories: parsed });
});

// GET /api/admin/factories/:id
router.get('/:id', authenticate, requireRole('admin', 'editor', 'viewer'), (req, res) => {
  const factory = db.prepare('SELECT * FROM factories WHERE id = ?').get(parseInt(req.params.id)) as any;
  if (!factory) {
    return res.status(404).json({ error: 'Factory not found' });
  }
  const parsed = { ...parseFactory(factory), locations: getLocations(factory.id) };
  res.json({ factory: parsed });
});

// POST /api/admin/factories
router.post('/', authenticate, requireRole('admin', 'editor'), async (req, res, next) => {
  try {
    const data = factorySchema.parse(req.body);
    const existing = db.prepare('SELECT id FROM factories WHERE slug = ?').get(data.slug);
    if (existing) {
      return res.status(409).json({ error: 'Factory with this slug already exists' });
    }

    const now = new Date().toISOString();
    const insertFactory = db.prepare(`
      INSERT INTO factories (
        slug, name_ar, name_en, tagline_ar, tagline_en, logo, hero_image,
        address_ar, address_en, phones, email, map_url, lat, lng,
        description_ar, description_en,
        capabilities_ar, capabilities_en,
        advantages_ar, advantages_en,
        industries_ar, industries_en,
        kpis, order_index, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const insertLocation = db.prepare(`
      INSERT INTO factory_locations (factory_id, address_ar, address_en, phones, email, map_url, lat, lng, is_primary, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const run = db.transaction(() => {
      const result = insertFactory.run(
        data.slug,
        data.name_ar,
        data.name_en,
        data.tagline_ar || null,
        data.tagline_en || null,
        data.logo || null,
        data.hero_image || null,
        data.address_ar || null,
        data.address_en || null,
        JSON.stringify(data.phones),
        data.email || null,
        data.map_url || null,
        data.lat ?? null,
        data.lng ?? null,
        data.description_ar || null,
        data.description_en || null,
        JSON.stringify(data.capabilities_ar),
        JSON.stringify(data.capabilities_en),
        JSON.stringify(data.advantages_ar),
        JSON.stringify(data.advantages_en),
        JSON.stringify(data.industries_ar),
        JSON.stringify(data.industries_en),
        JSON.stringify(data.kpis),
        data.order_index,
        data.status,
        now,
        now,
      );
      const id = Number((result as { lastInsertRowid: number | bigint }).lastInsertRowid);
      const primaryLoc = data.locations.find((l: any) => l.is_primary) ?? data.locations[0];
      for (let i = 0; i < data.locations.length; i++) {
        const loc = data.locations[i];
        insertLocation.run(
          id,
          loc.address_ar,
          loc.address_en,
          JSON.stringify(loc.phones ?? []),
          loc.email ?? null,
          loc.map_url ?? null,
          loc.lat ?? null,
          loc.lng ?? null,
          (loc.is_primary ? 1 : 0),
          loc.order_index ?? i,
        );
      }
      return id;
    });
    const id = run();

    cache.clear('factories:.*');
    const newFactory = db.prepare('SELECT * FROM factories WHERE id = ?').get(id) as any;
    res.status(201).json({ factory: { ...parseFactory(newFactory), locations: getLocations(id) } });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/factories/:id
router.put('/:id', authenticate, requireRole('admin', 'editor'), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = factorySchema.parse(req.body);
    const existing = db.prepare('SELECT id FROM factories WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Factory not found' });
    }
    const slugCheck = db.prepare('SELECT id FROM factories WHERE slug = ? AND id != ?').get(data.slug, id);
    if (slugCheck) {
      return res.status(409).json({ error: 'Factory with this slug already exists' });
    }

    const now = new Date().toISOString();
    const updateFactory = db.prepare(`
      UPDATE factories SET
        slug = ?, name_ar = ?, name_en = ?, tagline_ar = ?, tagline_en = ?,
        logo = ?, hero_image = ?,
        address_ar = ?, address_en = ?, phones = ?, email = ?, map_url = ?,
        lat = ?, lng = ?,
        description_ar = ?, description_en = ?,
        capabilities_ar = ?, capabilities_en = ?,
        advantages_ar = ?, advantages_en = ?,
        industries_ar = ?, industries_en = ?,
        kpis = ?, order_index = ?, status = ?, updated_at = ?
      WHERE id = ?
    `);
    const deleteLocations = db.prepare('DELETE FROM factory_locations WHERE factory_id = ?');
    const insertLocation = db.prepare(`
      INSERT INTO factory_locations (factory_id, address_ar, address_en, phones, email, map_url, lat, lng, is_primary, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    db.transaction(() => {
      updateFactory.run(
        data.slug,
        data.name_ar,
        data.name_en,
        data.tagline_ar || null,
        data.tagline_en || null,
        data.logo || null,
        data.hero_image || null,
        data.address_ar || null,
        data.address_en || null,
        JSON.stringify(data.phones),
        data.email || null,
        data.map_url || null,
        data.lat ?? null,
        data.lng ?? null,
        data.description_ar || null,
        data.description_en || null,
        JSON.stringify(data.capabilities_ar),
        JSON.stringify(data.capabilities_en),
        JSON.stringify(data.advantages_ar),
        JSON.stringify(data.advantages_en),
        JSON.stringify(data.industries_ar),
        JSON.stringify(data.industries_en),
        JSON.stringify(data.kpis),
        data.order_index,
        data.status,
        now,
        id,
      );
      if (Array.isArray(data.locations)) {
        deleteLocations.run(id);
        for (let i = 0; i < data.locations.length; i++) {
          const loc = data.locations[i];
          insertLocation.run(
            id,
            loc.address_ar,
            loc.address_en,
            JSON.stringify(loc.phones ?? []),
            loc.email ?? null,
            loc.map_url ?? null,
            loc.lat ?? null,
            loc.lng ?? null,
            (loc.is_primary ? 1 : 0),
            loc.order_index ?? i,
          );
        }
      }
    })();

    cache.clear('factories:.*');
    const updated = db.prepare('SELECT * FROM factories WHERE id = ?').get(id) as any;
    res.json({ factory: { ...parseFactory(updated), locations: getLocations(id) } });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/factories/:id
router.delete('/:id', authenticate, requireRole('admin'), (req, res) => {
  const id = parseInt(req.params.id);

  // Check if factory exists
  const existing = db.prepare('SELECT id FROM factories WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Factory not found' });
  }

  // Check if factory has products
  const productsCount = db.prepare('SELECT COUNT(*) as count FROM products WHERE factory_id = ?').get(id) as any;
  if (productsCount.count > 0) {
    return res.status(409).json({
      error: 'Cannot delete factory with products',
      message: `This factory has ${productsCount.count} product(s). Please delete or reassign them first.`,
    });
  }

  db.prepare('DELETE FROM factories WHERE id = ?').run(id);
  cache.clear('factories:.*');
  res.json({ message: 'Factory deleted successfully' });
});

// POST /api/admin/factories/:id/locations
router.post('/:id/locations', authenticate, requireRole('admin', 'editor'), (req, res, next) => {
  try {
    const factoryId = parseInt(req.params.id);
    const data = locationSchema.parse(req.body);
    const existing = db.prepare('SELECT id FROM factories WHERE id = ?').get(factoryId);
    if (!existing) {
      return res.status(404).json({ error: 'Factory not found' });
    }
    db.prepare(`
      INSERT INTO factory_locations (factory_id, address_ar, address_en, phones, email, map_url, lat, lng, is_primary, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      factoryId,
      data.address_ar,
      data.address_en,
      JSON.stringify(data.phones ?? []),
      data.email ?? null,
      data.map_url ?? null,
      data.lat ?? null,
      data.lng ?? null,
      data.is_primary ? 1 : 0,
      data.order_index ?? 0,
    );
    const row = db.prepare('SELECT * FROM factory_locations WHERE factory_id = ? ORDER BY id DESC LIMIT 1').get(factoryId) as any;
    const location = {
      id: row.id,
      factory_id: row.factory_id,
      address_ar: row.address_ar,
      address_en: row.address_en,
      phones: JSON.parse(row.phones || '[]'),
      email: row.email,
      map_url: row.map_url,
      lat: row.lat,
      lng: row.lng,
      is_primary: !!row.is_primary,
      order_index: row.order_index,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
    cache.clear('factories:.*');
    res.status(201).json({ location });
  } catch (e) {
    next(e);
  }
});

// PUT /api/admin/factories/:id/locations/:locationId
router.put('/:id/locations/:locationId', authenticate, requireRole('admin', 'editor'), (req, res, next) => {
  try {
    const factoryId = parseInt(req.params.id);
    const locationId = parseInt(req.params.locationId);
    const data = locationSchema.parse(req.body);
    const loc = db.prepare('SELECT id, factory_id FROM factory_locations WHERE id = ? AND factory_id = ?').get(locationId, factoryId) as any;
    if (!loc) {
      return res.status(404).json({ error: 'Location not found' });
    }
    const now = new Date().toISOString();
    db.prepare(`
      UPDATE factory_locations SET
        address_ar = ?, address_en = ?, phones = ?, email = ?, map_url = ?, lat = ?, lng = ?,
        is_primary = ?, order_index = ?, updated_at = ?
      WHERE id = ? AND factory_id = ?
    `).run(
      data.address_ar,
      data.address_en,
      JSON.stringify(data.phones ?? []),
      data.email ?? null,
      data.map_url ?? null,
      data.lat ?? null,
      data.lng ?? null,
      data.is_primary ? 1 : 0,
      data.order_index ?? 0,
      now,
      locationId,
      factoryId,
    );
    const row = db.prepare('SELECT * FROM factory_locations WHERE id = ?').get(locationId) as any;
    const location = {
      id: row.id,
      factory_id: row.factory_id,
      address_ar: row.address_ar,
      address_en: row.address_en,
      phones: JSON.parse(row.phones || '[]'),
      email: row.email,
      map_url: row.map_url,
      lat: row.lat,
      lng: row.lng,
      is_primary: !!row.is_primary,
      order_index: row.order_index,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
    cache.clear('factories:.*');
    res.json({ location });
  } catch (e) {
    next(e);
  }
});

// DELETE /api/admin/factories/:id/locations/:locationId
router.delete('/:id/locations/:locationId', authenticate, requireRole('admin', 'editor'), (req, res) => {
  const factoryId = parseInt(req.params.id);
  const locationId = parseInt(req.params.locationId);
  const loc = db.prepare('SELECT id FROM factory_locations WHERE id = ? AND factory_id = ?').get(locationId, factoryId);
  if (!loc) {
    return res.status(404).json({ error: 'Location not found' });
  }
  db.prepare('DELETE FROM factory_locations WHERE id = ? AND factory_id = ?').run(locationId, factoryId);
  cache.clear('factories:.*');
  res.json({ message: 'Location deleted' });
});

export default router;
