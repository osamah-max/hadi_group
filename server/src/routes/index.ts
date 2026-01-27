// server/src/routes/index.ts
import { Router } from 'express';
import adminAuthRoutes from './admin/auth.js';
import adminFactoriesRoutes from './admin/factories.js';
import adminProductsRoutes from './admin/products.js';
import adminUsersRoutes from './admin/users.js';
import adminMediaRoutes from './admin/media.js';
import adminSettingsRoutes from './admin/settings.js';
import publicFactoriesRoutes from './public/factories.js';
import publicProductsRoutes from './public/products.js';
import publicSettingsRoutes from './public/settings.js';
import uploadRoutes from './upload.js';

const router = Router();

// Public routes
router.use('/factories', publicFactoriesRoutes);
router.use('/products', publicProductsRoutes);
router.use('/settings', publicSettingsRoutes);

// Upload routes (requires auth)
router.use('/upload', uploadRoutes);

// Admin routes
router.use('/admin/auth', adminAuthRoutes);
router.use('/admin/factories', adminFactoriesRoutes);
router.use('/admin/products', adminProductsRoutes);
router.use('/admin/users', adminUsersRoutes);
router.use('/admin/media', adminMediaRoutes);
router.use('/admin/settings', adminSettingsRoutes);

export default router;
