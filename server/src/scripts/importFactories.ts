/**
 * Import factories, locations, and products from seed data.
 * Skips factories that already exist (by slug) to avoid duplicates.
 * Run: tsx src/scripts/importFactories.ts
 */
import { db } from '../db/index.js';
import { seedFactories, seedProducts } from './seedData.js';

function run() {
  const getFactoryIdBySlug = db.prepare<[string]>('SELECT id FROM factories WHERE slug = ?');
  const insertFactory = db.prepare(`
    INSERT INTO factories (
      slug, name_ar, name_en, tagline_ar, tagline_en,
      description_ar, description_en, logo, hero_image,
      address_ar, address_en, phones, email, map_url, lat, lng,
      capabilities_ar, capabilities_en, advantages_ar, advantages_en,
      industries_ar, industries_en, kpis, order_index, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 'published')
  `);
  const insertLocation = db.prepare(`
    INSERT INTO factory_locations (factory_id, address_ar, address_en, phones, email, map_url, lat, lng, is_primary, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertProduct = db.prepare(`
    INSERT INTO products (factory_id, title_ar, title_en, desc_ar, desc_en, img, category_ar, category_en, order_index, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'published')
  `);

  let factoriesAdded = 0;
  let locationsAdded = 0;
  let productsAdded = 0;

  for (const f of seedFactories) {
    const existing = getFactoryIdBySlug.get(f.slug) as { id: number } | undefined;
    if (existing) {
      console.log(`Factory "${f.slug}" already exists, skipping.`);
      continue;
    }

    const primaryLoc = f.locations.find((l) => l.is_primary) ?? f.locations[0];
    const addrAr = primaryLoc?.address_ar ?? '';
    const addrEn = primaryLoc?.address_en ?? '';
    const phones = primaryLoc ? JSON.stringify(primaryLoc.phones) : '[]';
    const email = primaryLoc?.email ?? null;
    const mapUrl = primaryLoc?.map_url ?? null;
    const lat = primaryLoc?.lat ?? null;
    const lng = primaryLoc?.lng ?? null;

    const runResult = insertFactory.run(
      f.slug,
      f.name_ar,
      f.name_en,
      f.tagline_ar,
      f.tagline_en,
      f.description_ar,
      f.description_en,
      f.logo,
      f.hero_image,
      addrAr,
      addrEn,
      phones,
      email,
      mapUrl,
      lat,
      lng,
      JSON.stringify(f.capabilities_ar),
      JSON.stringify(f.capabilities_en),
      JSON.stringify(f.advantages_ar),
      JSON.stringify(f.advantages_en),
      JSON.stringify(f.industries_ar),
      JSON.stringify(f.industries_en),
      JSON.stringify(f.kpis)
    );
    const id = Number((runResult as { lastInsertRowid: number | bigint }).lastInsertRowid);

    for (const loc of f.locations) {
      insertLocation.run(
        id,
        loc.address_ar,
        loc.address_en,
        JSON.stringify(loc.phones),
        loc.email,
        loc.map_url,
        loc.lat,
        loc.lng,
        loc.is_primary ? 1 : 0,
        loc.order_index
      );
      locationsAdded += 1;
    }

    const productsForFactory = seedProducts.filter((p) => p.slug_factory === f.slug);
    for (const p of productsForFactory) {
      insertProduct.run(
        id,
        p.title_ar,
        p.title_en,
        p.desc_ar,
        p.desc_en,
        p.img,
        p.category_ar,
        p.category_en,
        p.order_index
      );
      productsAdded += 1;
    }

    factoriesAdded += 1;
    console.log(`Imported factory "${f.slug}" (id=${id}) with ${f.locations.length} location(s) and ${productsForFactory.length} product(s).`);
  }

  console.log(`Done. Factories: ${factoriesAdded}, Locations: ${locationsAdded}, Products: ${productsAdded}.`);
}

run();
