import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ConversationService } from '../../server/services/ConversationService';

const PLACEHOLDER_API_KEYS = [
  'MY_GEMINI_API_KEY',
  'your_gemini_api_key_here',
  'your-gemini-api-key',
  'YOUR_API_KEY',
  'REPLACE_WITH_YOUR_KEY',
  'your-supabase-anon-key',
];

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
    const { messages = [], language = 'English', model = 'gemini-3.6-flash' } = body;

    for await (const token of ConversationService.generateStreamResponse(messages, language, model)) {
      res.write(`data: ${JSON.stringify({ text: token })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err: any) {
    const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
    const errorStatus = err?.status || err?.code || '500';
    const errorDetails = err?.response?.data || err?.error || err?.response || '';
    console.error(`[SSE Stream Error in Vercel function] Status: ${errorStatus} | Message: ${errorMessage}`, errorDetails);
    // Send error as SSE text data (HTTP 200) so the client can display a friendly fallback
    res.write(`data: ${JSON.stringify({ text: `I am temporarily unable to reach the Gemini server (HTTP_${errorStatus || 500}). Please check your connection or try again shortly.` })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}
