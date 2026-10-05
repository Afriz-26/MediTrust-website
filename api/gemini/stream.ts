import type { Request as VercelRequest, Response as VercelResponse } from 'express';
import { ConversationService } from '../../server/services/ConversationService';

export const maxDuration = 60; // Allow full duration on Vercel Pro/Hobby

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    let body: any = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        res.status(400).json({ error: 'Request body must be valid JSON' });
        return;
      }
    } else if (Buffer.isBuffer(body)) {
      try {
        body = JSON.parse(body.toString('utf-8'));
      } catch {
        res.status(400).json({ error: 'Request body must be valid JSON' });
        return;
      }
    }
    body = body || {};

    const rawMessages = body.messages;
    const messages = Array.isArray(rawMessages)
      ? rawMessages.flatMap((message: any) => {
          const content = typeof message?.content === 'string'
            ? message.content
            : typeof message?.text === 'string'
              ? message.text
              : '';
          if (!content.trim()) return [];
          return [{
            role: (message?.role === 'user' || message?.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
            content
          }];
        })
      : [];

    if (!messages.some((message: { role: string }) => message.role === 'user')) {
      res.status(400).json({ error: 'A user message is required' });
      return;
    }

    const language = typeof body.language === 'string' ? body.language : 'English';
    const model = typeof body.model === 'string' ? body.model : 'gemini-2.5-flash';
    const grounding = {
      enableSearch: body.enableSearch === true,
      enableMaps: body.enableMaps === true
    };

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform, no-store');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    if (typeof (res as any).flushHeaders === 'function') {
      (res as any).flushHeaders();
    }

    for await (const token of ConversationService.generateStreamResponse(messages, language, model, grounding)) {
      res.write(`data: ${JSON.stringify({ text: token })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err: any) {
    const errorMessage = err?.message || (typeof err === 'string' ? err : 'Stream error occurred');
    console.error('[SSE Stream Error in Vercel function]', errorMessage, err?.response?.data || err?.error || '');
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: 'Assistant service is temporarily unavailable', status: 502 })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }
    res.status(502).json({ error: 'Assistant service is temporarily unavailable', code: 'AI_PROVIDER_UNAVAILABLE' });
  }
}
