// server/src/lib/backup.ts
import { db } from '../db/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BACKUP_DIR = path.join(__dirname, '../../backups');
const RETENTION_DAYS = 30;

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

export function createBackup(): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFileName = `hadi-backup-${timestamp}.db`;
  const backupPath = path.join(BACKUP_DIR, backupFileName);

  // Create backup by copying the database
  const dbPath = process.env.DB_PATH || path.join(__dirname, '../../hadi.db');
  fs.copyFileSync(dbPath, backupPath);

  // Clean old backups
  cleanOldBackups();

  return backupPath;
}

export function listBackups(): Array<{ name: string; path: string; size: number; created: Date }> {
  if (!fs.existsSync(BACKUP_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BACKUP_DIR)
    .filter(file => file.endsWith('.db'))
    .map(file => {
      const filePath = path.join(BACKUP_DIR, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        path: filePath,
        size: stats.size,
        created: stats.birthtime,
      };
    })
    .sort((a, b) => b.created.getTime() - a.created.getTime());

  return files;
}

function cleanOldBackups(): void {
  if (!fs.existsSync(BACKUP_DIR)) {
    return;
  }

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - RETENTION_DAYS);

  const files = fs.readdirSync(BACKUP_DIR);
  files.forEach(file => {
    if (file.endsWith('.db')) {
      const filePath = path.join(BACKUP_DIR, file);
      const stats = fs.statSync(filePath);
      if (stats.birthtime < cutoffDate) {
        fs.unlinkSync(filePath);
        console.log(`Deleted old backup: ${file}`);
      }
    }
  });
}
