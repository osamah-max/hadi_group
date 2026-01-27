// server/src/routes/admin/auth.ts
import { Router } from 'express';
import { z } from 'zod';
import { db } from '../../db/index.js';
import { signToken } from '../../lib/jwt.js';
import { hashPassword, comparePassword } from '../../lib/password.js';
import { authenticate, requireRole } from '../../middleware/auth.js';

const router = Router();

// Login schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Register schema
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  role: z.enum(['admin', 'editor', 'viewer']).optional().default('viewer'),
});

// POST /api/admin/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/auth/me
router.get('/me', authenticate, (req, res) => {
  const user = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(req.user!.id) as any;
  res.json({ user });
});

// POST /api/admin/auth/register
router.post('/register', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { email, password, name, role } = registerSchema.parse(req.body);

    // Check if email already exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();

    const result = db.prepare(`
      INSERT INTO users (email, password_hash, name, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(email, passwordHash, name || null, role, now, now);

    const newUser = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(result.lastInsertRowid) as any;

    res.status(201).json({
      user: newUser,
      message: 'User created successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
