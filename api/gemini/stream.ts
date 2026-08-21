import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ConversationService } from '../../server/services/ConversationService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { messages = [], language = 'English', model = 'gemini-3.7-flash' } = body;

    for await (const token of ConversationService.generateStreamResponse(messages, language, model)) {
      res.write(`data: ${JSON.stringify({ text: token })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err: any) {
    const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
    const errorStatus = err?.status || err?.code || '';
    const errorDetails = err?.response?.data || err?.error || err?.response || '';
    console.error(`[SSE Stream Error in Vercel function] Status: ${errorStatus} | Message: ${errorMessage}`, errorDetails);
    res.write(`data: ${JSON.stringify({ error: errorMessage || 'Stream generation failed', details: errorDetails })}\n\n`);
    res.end();
  }
}
