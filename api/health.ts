import type { Request as VercelRequest, Response as VercelResponse } from 'express';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    platform: 'Vercel Serverless'
  });
}
