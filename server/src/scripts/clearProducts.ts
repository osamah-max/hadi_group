/**
 * حذف كافة المنتجات من قاعدة البيانات
 * Run: npm run clear-products
 */
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../hadi.db');

const db = new Database(DB_PATH);
const result = db.prepare('DELETE FROM products').run();
console.log(`تم حذف ${result.changes} منتج من قاعدة البيانات.`);
db.close();
