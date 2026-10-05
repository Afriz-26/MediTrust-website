import type { Request as VercelRequest, Response as VercelResponse } from 'express';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(410).json({
    error: "Text chat now runs in the visitor's browser.",
    code: 'CHAT_MOVED_ON_DEVICE',
  });
}
