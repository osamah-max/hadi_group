// server/src/routes/admin/settings.ts
import { Router } from 'express';
import { db } from '../../db/index.js';
import { authenticate, requireRole } from '../../middleware/auth.js';
import { cache } from '../../lib/cache.js';

export const SETTING_KEYS = [
  'site_general_address_ar',
  'site_general_address_en',
  'site_general_phones',
  'site_general_email',
  'site_working_hours_ar',
  'site_working_hours_en',
  'site_social_facebook',
  'site_social_twitter',
  'site_social_linkedin',
  'site_social_instagram',
] as const;

const router = Router();

// GET /api/admin/settings – all settings
router.get('/', authenticate, requireRole('admin', 'editor', 'viewer'), (req, res) => {
  const rows = db.prepare('SELECT key, value, type FROM settings').all() as { key: string; value: string | null; type: string | null }[];
  const settings: Record<string, string | string[]> = {};
  for (const k of SETTING_KEYS) {
    settings[k] = '';
  }
  for (const r of rows) {
    if (r.type === 'json' && r.value) {
      try {
        settings[r.key] = JSON.parse(r.value) as string[];
      } catch {
        settings[r.key] = r.value ?? '';
      }
    } else {
      settings[r.key] = r.value ?? '';
    }
  }
  res.json({ settings });
});

// GET /api/admin/settings/:key – single setting
router.get('/:key', authenticate, requireRole('admin', 'editor', 'viewer'), (req, res) => {
  const key = req.params.key;
  if (!SETTING_KEYS.includes(key as (typeof SETTING_KEYS)[number])) {
    return res.status(400).json({ error: 'Invalid setting key' });
  }
  const row = db.prepare('SELECT key, value, type FROM settings WHERE key = ?').get(key) as { key: string; value: string | null; type: string | null } | undefined;
  if (!row) {
    return res.json({ key, value: '', type: null });
  }
  let value: string | string[] = row.value ?? '';
  if (row.type === 'json' && row.value) {
    try {
      value = JSON.parse(row.value) as string[];
    } catch {}
  }
  res.json({ key: row.key, value, type: row.type });
});

// PUT /api/admin/settings – bulk update (must be before PUT /:key)
router.put('/', authenticate, requireRole('admin', 'editor'), (req, res) => {
  cache.delete('settings:public');
  const body = req.body ?? {};
  const settings = body.settings && typeof body.settings === 'object' ? body.settings : body;
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO settings (key, value, type, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, type = excluded.type, updated_at = excluded.updated_at
  `);
  for (const [key, value] of Object.entries(settings)) {
    if (typeof key !== 'string' || !SETTING_KEYS.includes(key as typeof SETTING_KEYS[number])) continue;
    const val = value != null ? (typeof value === 'string' ? value : JSON.stringify(value)) : '';
    const type = value != null && Array.isArray(value) ? 'json' : null;
    stmt.run(key, val, type, now, now);
  }
  const rows = db.prepare('SELECT key, value, type FROM settings').all() as { key: string; value: string | null; type: string | null }[];
  const out: Record<string, string | string[]> = {};
  for (const k of SETTING_KEYS) {
    out[k] = '';
  }
  for (const r of rows) {
    if (r.type === 'json' && r.value) {
      try {
        out[r.key] = JSON.parse(r.value) as string[];
      } catch {
        out[r.key] = r.value ?? '';
      }
    } else {
      out[r.key] = r.value ?? '';
    }
  }
  res.json({ settings: out });
});

// PUT /api/admin/settings/:key – update one
router.put('/:key', authenticate, requireRole('admin', 'editor'), (req, res) => {
  const key = req.params.key;
  if (!SETTING_KEYS.includes(key as typeof SETTING_KEYS[number])) {
    return res.status(400).json({ error: 'Invalid setting key' });
  }
  cache.delete('settings:public');
  const { value, type } = req.body ?? {};
  const isArray = Array.isArray(value);
  const val = value != null ? (isArray ? JSON.stringify(value) : String(value)) : '';
  const typeVal = isArray ? 'json' : (type ?? null);
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO settings (key, value, type, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, type = excluded.type, updated_at = excluded.updated_at
  `).run(key, val, typeVal, now, now);
  const row = db.prepare('SELECT key, value, type FROM settings WHERE key = ?').get(key) as { key: string; value: string | null; type: string | null };
  let outValue: string | string[] = row.value ?? '';
  if (row.type === 'json' && row.value) {
    try {
      outValue = JSON.parse(row.value) as string[];
    } catch {}
  }
  res.json({ key: row.key, value: outValue, type: row.type });
});

export default router;
