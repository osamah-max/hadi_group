// server/src/middleware/rateLimiter.ts
import { Request, Response, NextFunction } from 'express';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore: Map<string, RateLimitEntry> = new Map();
const WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS = 100; // per window

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  // Skip rate limiting for GET requests to public API
  if (req.method === 'GET' && (req.path.startsWith('/api/factories') || req.path.startsWith('/api/products'))) {
    return next();
  }

  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS,
    });
    return next();
  }

  if (entry.count >= MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Please try again later',
    });
  }

  entry.count++;
  next();
}
