// server/src/scripts/createAdmin.ts
import { db } from '../db/index.js';
import { hashPassword } from '../lib/password.js';

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || 'Admin';

if (!email || !password) {
  console.error('Usage: tsx src/scripts/createAdmin.ts <email> <password> [name]');
  process.exit(1);
}

async function createAdmin() {
  try {
    // Check if email already exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      console.error('User with this email already exists');
      process.exit(1);
    }

    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();

    const result = db.prepare(`
      INSERT INTO users (email, password_hash, name, role, created_at, updated_at)
      VALUES (?, ?, ?, 'admin', ?, ?)
    `).run(email, passwordHash, name, now, now);

    console.log(`Admin user created successfully!`);
    console.log(`ID: ${result.lastInsertRowid}`);
    console.log(`Email: ${email}`);
    console.log(`Name: ${name}`);
    console.log(`Role: admin`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
