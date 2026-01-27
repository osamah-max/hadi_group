// server/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isDev = process.env.NODE_ENV !== 'production';
  // Always log full details server-side
  console.error('Error:', err?.stack || err);

  // Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors,
    });
  }

  // Database errors
  if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return res.status(409).json({
      error: 'Duplicate entry',
      message: 'A record with this value already exists',
    });
  }

  // Default error
  res.status(err.status || 500).json(
    isDev
      ? {
          error: err?.message || 'Internal server error',
          stack: err?.stack,
        }
      : {
          error: 'Internal server error',
        }
  );
}
