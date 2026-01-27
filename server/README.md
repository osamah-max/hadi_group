# Hadi Group CMS - Backend Server

Backend server for Hadi Group CMS built with Express.js and SQLite.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=3000
NODE_ENV=development
DB_PATH=./hadi.db
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
UPLOAD_MAX_SIZE=10485760
UPLOAD_DIR=./uploads
```

4. Create the first admin user:
```bash
npm run create-admin <email> <password> [name]
```

Example:
```bash
npm run create-admin admin@hadigroup.iq password123 "Admin User"
```

## Running

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Public Endpoints
- `GET /api/factories` - List all published factories
- `GET /api/factories/:slug` - Get factory by slug
- `GET /api/products` - List all published products
- `GET /api/products/:id` - Get product by ID

### Admin Endpoints (Requires Authentication)

#### Auth
- `POST /api/admin/auth/login` - Login
- `GET /api/admin/auth/me` - Get current user
- `POST /api/admin/auth/register` - Register new user (admin only)

#### Factories
- `GET /api/admin/factories` - List all factories
- `GET /api/admin/factories/:id` - Get factory by ID
- `POST /api/admin/factories` - Create factory
- `PUT /api/admin/factories/:id` - Update factory
- `DELETE /api/admin/factories/:id` - Delete factory

#### Products
- `GET /api/admin/products` - List all products
- `GET /api/admin/products/:id` - Get product by ID
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

#### Users
- `GET /api/admin/users` - List all users (admin only)
- `POST /api/admin/users` - Create user (admin only)
- `PUT /api/admin/users/:id` - Update user (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)

#### Upload
- `POST /api/upload/single` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files

## Authentication

All admin endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Database

The database is automatically initialized on first run. The database file will be created at the path specified in `DB_PATH` environment variable.

## File Uploads

Uploaded files are stored in the `uploads/` directory, organized by category:
- `uploads/factories/` - Factory logos and hero images
- `uploads/products/` - Product images
- `uploads/general/` - General files

## Backup

Database backups are stored in the `backups/` directory. Backups older than 30 days are automatically cleaned up.
