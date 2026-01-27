// server/src/routes/public/factories.ts
import { Router } from 'express';
import { db } from '../../db/index.js';
import { cache } from '../../lib/cache.js';

const router = Router();

// GET /api/factories
router.get('/', (req, res) => {
  const { lang = 'ar' } = req.query;
  const cacheKey = `factories:${lang}:all`;

  // Try cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json({ factories: cached });
  }

  const factories = db.prepare(`
    SELECT * FROM factories 
    WHERE status = 'published'
    ORDER BY order_index ASC, created_at DESC
  `).all() as any[];

  const parsed = factories.map((f) => {
    const locations = (db.prepare('SELECT * FROM factory_locations WHERE factory_id = ? ORDER BY is_primary DESC, order_index ASC').all(f.id) as any[]).map((r) => ({
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
    }));
    return {
      id: f.id,
      slug: f.slug,
      name: lang === 'en' ? f.name_en : f.name_ar,
      name_ar: f.name_ar,
      name_en: f.name_en,
      tagline: lang === 'en' ? f.tagline_en : f.tagline_ar,
      tagline_ar: f.tagline_ar,
      tagline_en: f.tagline_en,
      logo: f.logo,
      hero_image: f.hero_image,
      address: lang === 'en' ? f.address_en : f.address_ar,
      address_ar: f.address_ar,
      address_en: f.address_en,
      phones: JSON.parse(f.phones || '[]'),
      email: f.email,
      map_url: f.map_url,
      lat: f.lat,
      lng: f.lng,
      description: lang === 'en' ? f.description_en : f.description_ar,
      description_ar: f.description_ar,
      description_en: f.description_en,
      capabilities: lang === 'en' ? JSON.parse(f.capabilities_en || '[]') : JSON.parse(f.capabilities_ar || '[]'),
      capabilities_ar: JSON.parse(f.capabilities_ar || '[]'),
      capabilities_en: JSON.parse(f.capabilities_en || '[]'),
      advantages: lang === 'en' ? JSON.parse(f.advantages_en || '[]') : JSON.parse(f.advantages_ar || '[]'),
      advantages_ar: JSON.parse(f.advantages_ar || '[]'),
      advantages_en: JSON.parse(f.advantages_en || '[]'),
      industries: lang === 'en' ? JSON.parse(f.industries_en || '[]') : JSON.parse(f.industries_ar || '[]'),
      industries_ar: JSON.parse(f.industries_ar || '[]'),
      industries_en: JSON.parse(f.industries_en || '[]'),
      kpis: JSON.parse(f.kpis || '[]'),
      locations,
      order_index: f.order_index,
      created_at: f.created_at,
      updated_at: f.updated_at,
    };
  });

  cache.set(cacheKey, parsed, 3600000);
  res.json({ factories: parsed });
});

// GET /api/factories/:slug
router.get('/:slug', (req, res) => {
  const { lang = 'ar' } = req.query;
  const { slug } = req.params;
  const cacheKey = `factories:${lang}:${slug}`;

  // Try cache first
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json({ factory: cached });
  }

  const factory = db.prepare(`
    SELECT * FROM factories 
    WHERE slug = ? AND status = 'published'
  `).get(slug) as any;

  if (!factory) {
    return res.status(404).json({ error: 'Factory not found' });
  }

  const locations = (db.prepare(`
    SELECT * FROM factory_locations WHERE factory_id = ? ORDER BY is_primary DESC, order_index ASC
  `).all(factory.id) as any[]).map((r) => ({
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
  }));

  const parsed = {
    id: factory.id,
    slug: factory.slug,
    name: lang === 'en' ? factory.name_en : factory.name_ar,
    name_ar: factory.name_ar,
    name_en: factory.name_en,
    tagline: lang === 'en' ? factory.tagline_en : factory.tagline_ar,
    tagline_ar: factory.tagline_ar,
    tagline_en: factory.tagline_en,
    logo: factory.logo,
    hero_image: factory.hero_image,
    address: lang === 'en' ? factory.address_en : factory.address_ar,
    address_ar: factory.address_ar,
    address_en: factory.address_en,
    phones: JSON.parse(factory.phones || '[]'),
    email: factory.email,
    map_url: factory.map_url,
    lat: factory.lat,
    lng: factory.lng,
    description: lang === 'en' ? factory.description_en : factory.description_ar,
    description_ar: factory.description_ar,
    description_en: factory.description_en,
    capabilities: lang === 'en'
      ? JSON.parse(factory.capabilities_en || '[]')
      : JSON.parse(factory.capabilities_ar || '[]'),
    capabilities_ar: JSON.parse(factory.capabilities_ar || '[]'),
    capabilities_en: JSON.parse(factory.capabilities_en || '[]'),
    advantages: lang === 'en'
      ? JSON.parse(factory.advantages_en || '[]')
      : JSON.parse(factory.advantages_ar || '[]'),
    advantages_ar: JSON.parse(factory.advantages_ar || '[]'),
    advantages_en: JSON.parse(factory.advantages_en || '[]'),
    industries: lang === 'en'
      ? JSON.parse(factory.industries_en || '[]')
      : JSON.parse(factory.industries_ar || '[]'),
    industries_ar: JSON.parse(factory.industries_ar || '[]'),
    industries_en: JSON.parse(factory.industries_en || '[]'),
    kpis: JSON.parse(factory.kpis || '[]'),
    locations,
    order_index: factory.order_index,
    created_at: factory.created_at,
    updated_at: factory.updated_at,
  };

  cache.set(cacheKey, parsed, 3600000);
  res.json({ factory: parsed });
});

export default router;
