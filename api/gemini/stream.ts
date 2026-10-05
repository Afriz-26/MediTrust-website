import type { Request as VercelRequest, Response as VercelResponse } from 'express';
import { ConversationService } from '../../server/services/ConversationService';

export const maxDuration = 60; // Allow full duration on Vercel Pro/Hobby

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform, no-store');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');

  if (typeof (res as any).flushHeaders === 'function') {
    (res as any).flushHeaders();
  }

  try {
    let body: any = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    } else if (Buffer.isBuffer(body)) {
      try {
        body = JSON.parse(body.toString('utf-8'));
      } catch {
        body = {};
      }
    }
    body = body || {};

    const rawMessages = body.messages;
    const messages = Array.isArray(rawMessages)
      ? rawMessages.map((m: any) => ({
          role: (m?.role === 'user' ? 'user' : 'model') as 'user' | 'model',
          content: typeof m?.content === 'string' ? m.content : typeof m?.text === 'string' ? m.text : ''
        }))
      : [];

    const language = typeof body.language === 'string' ? body.language : 'English';
    const model = typeof body.model === 'string' ? body.model : 'gemini-3.7-flash';

    for await (const token of ConversationService.generateStreamResponse(messages, language, model)) {
      res.write(`data: ${JSON.stringify({ text: token })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err: any) {
    const errorMessage = err?.message || (typeof err === 'string' ? err : 'Stream error occurred');
    console.error(`[SSE Stream Error in Vercel function]`, errorMessage);
    res.write(`data: ${JSON.stringify({ text: `\n\n*(Notice: Clinical assistant encountered a temporary server error: ${errorMessage}. Please check your connection or try again shortly.)*` })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}
