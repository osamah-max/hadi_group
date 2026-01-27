// server/src/routes/public/settings.ts
import { Router } from 'express';
import { db } from '../../db/index.js';
import { SETTING_KEYS } from '../admin/settings.js';

const router = Router();

// GET /api/settings — public; returns site-wide settings for contact page etc.
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT key, value, type FROM settings WHERE key IN (' + SETTING_KEYS.map(() => '?').join(',') + ')').all(...SETTING_KEYS) as { key: string; value: string | null; type: string | null }[];
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

export default router;
