// server/src/routes/admin/users.ts
import { Router } from 'express';
import { z } from 'zod';
import { db } from '../../db/index.js';
import { authenticate, requireRole } from '../../middleware/auth.js';
import { hashPassword } from '../../lib/password.js';

const router = Router();

// User schema
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).optional(),
  name: z.string().optional(),
  role: z.enum(['admin', 'editor', 'viewer']).optional().default('viewer'),
});

// GET /api/admin/users
router.get('/', authenticate, requireRole('admin'), (req, res) => {
  const users = db.prepare('SELECT id, email, name, role, created_at, updated_at FROM users ORDER BY created_at DESC').all() as any[];
  res.json({ users });
});

// GET /api/admin/users/:id
router.get('/:id', authenticate, requireRole('admin'), (req, res) => {
  const user = db.prepare('SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = ?').get(parseInt(req.params.id)) as any;
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user });
});

// POST /api/admin/users
router.post('/', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const data = userSchema.parse(req.body);

    if (!data.password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Check if email already exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(data.email);
    if (existing) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const passwordHash = await hashPassword(data.password);
    const now = new Date().toISOString();

    const result = db.prepare(`
      INSERT INTO users (email, password_hash, name, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(data.email, passwordHash, data.name || null, data.role, now, now);

    const newUser = db.prepare('SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = ?').get(result.lastInsertRowid) as any;

    res.status(201).json({ user: newUser });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/users/:id
router.put('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    // Check if user exists
    const existing = db.prepare('SELECT id FROM users WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent self-deletion (if trying to change own role to non-admin)
    if (req.user!.id === id && req.body.role && req.body.role !== 'admin') {
      return res.status(403).json({ error: 'Cannot change your own role' });
    }

    const data = userSchema.partial().parse(req.body);
    const now = new Date().toISOString();

    // Check if email is taken by another user
    if (data.email) {
      const emailCheck = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(data.email, id);
      if (emailCheck) {
        return res.status(409).json({ error: 'Email already exists' });
      }
    }

    let updateQuery = 'UPDATE users SET updated_at = ?';
    const params: any[] = [now];

    if (data.email) {
      updateQuery += ', email = ?';
      params.push(data.email);
    }

    if (data.name !== undefined) {
      updateQuery += ', name = ?';
      params.push(data.name || null);
    }

    if (data.role) {
      updateQuery += ', role = ?';
      params.push(data.role);
    }

    if (data.password) {
      const passwordHash = await hashPassword(data.password);
      updateQuery += ', password_hash = ?';
      params.push(passwordHash);
    }

    updateQuery += ' WHERE id = ?';
    params.push(id);

    db.prepare(updateQuery).run(...params);

    const updated = db.prepare('SELECT id, email, name, role, created_at, updated_at FROM users WHERE id = ?').get(id) as any;

    res.json({ user: updated });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/users/:id
router.delete('/:id', authenticate, requireRole('admin'), (req, res) => {
  const id = parseInt(req.params.id);

  // Prevent self-deletion
  if (req.user!.id === id) {
    return res.status(403).json({ error: 'Cannot delete your own account' });
  }

  // Check if user exists
  const existing = db.prepare('SELECT id FROM users WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'User not found' });
  }

  db.prepare('DELETE FROM users WHERE id = ?').run(id);

  res.json({ message: 'User deleted successfully' });
});

export default router;
