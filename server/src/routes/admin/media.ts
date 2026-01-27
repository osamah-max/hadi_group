// server/src/routes/admin/media.ts
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authenticate, requireRole } from '../../middleware/auth.js';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '../../uploads');

// Helper to safely resolve paths (prevent path traversal)
function safeResolvePath(relativePath: string): string {
  const resolved = path.resolve(UPLOAD_DIR, relativePath);
  const uploadDirResolved = path.resolve(UPLOAD_DIR);
  
  if (!resolved.startsWith(uploadDirResolved)) {
    throw new Error('Invalid path');
  }
  
  return resolved;
}

// GET /api/admin/media
router.get('/', authenticate, requireRole('admin', 'editor', 'viewer'), (req, res, next) => {
  try {
    const { category, type, q } = req.query;
    
    const files: Array<{
      name: string;
      path: string;
      url: string;
      size: number;
      mimetype: string;
      extension: string;
      createdAt: Date;
      category: string;
    }> = [];

    // Determine which directories to scan
    const categories = category 
      ? [category as string]
      : ['factories', 'products', 'general'];

    categories.forEach((cat) => {
      const categoryDir = path.join(UPLOAD_DIR, cat);
      
      if (!fs.existsSync(categoryDir)) {
        return;
      }

      const items = fs.readdirSync(categoryDir, { withFileTypes: true });
      
      items.forEach((item) => {
        if (!item.isFile()) return;

        const filePath = path.join(categoryDir, item.name);
        const stats = fs.statSync(filePath);
        const ext = path.extname(item.name).toLowerCase();
        
        // Filter by type if specified
        if (type) {
          const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
          const isPdf = ext === '.pdf';
          
          if (type === 'image' && !isImage) return;
          if (type === 'pdf' && !isPdf) return;
        }

        // Filter by search query if specified
        if (q && !item.name.toLowerCase().includes((q as string).toLowerCase())) {
          return;
        }

        // Determine mimetype
        let mimetype = 'application/octet-stream';
        if (['.jpg', '.jpeg'].includes(ext)) mimetype = 'image/jpeg';
        else if (ext === '.png') mimetype = 'image/png';
        else if (ext === '.gif') mimetype = 'image/gif';
        else if (ext === '.webp') mimetype = 'image/webp';
        else if (ext === '.pdf') mimetype = 'application/pdf';

        files.push({
          name: item.name,
          path: `/uploads/${cat}/${item.name}`,
          url: `/uploads/${cat}/${item.name}`,
          size: stats.size,
          mimetype,
          extension: ext,
          createdAt: stats.birthtime,
          category: cat,
        });
      });
    });

    // Sort by creation date (newest first)
    files.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    res.json({ files });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/media
router.delete('/', authenticate, requireRole('admin', 'editor'), (req, res, next) => {
  try {
    const { path: filePath } = req.body;
    
    if (!filePath || typeof filePath !== 'string') {
      return res.status(400).json({ error: 'File path is required' });
    }

    // Extract relative path (should be like /uploads/category/filename)
    const relativePath = filePath.replace(/^\/uploads\//, '');
    
    if (!relativePath || relativePath.includes('..')) {
      return res.status(400).json({ error: 'Invalid file path' });
    }

    try {
      const fullPath = safeResolvePath(relativePath);
      
      if (!fs.existsSync(fullPath)) {
        return res.status(404).json({ error: 'File not found' });
      }

      fs.unlinkSync(fullPath);
      
      res.json({ message: 'File deleted successfully' });
    } catch (error: any) {
      if (error.message === 'Invalid path') {
        return res.status(400).json({ error: 'Invalid file path' });
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

export default router;
