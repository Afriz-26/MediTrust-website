import type { Request as VercelRequest, Response as VercelResponse } from 'express';
import { ConversationService } from '../../server/services/ConversationService';

export const maxDuration = 60;

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

    const { message = '', history = [], language = 'English', model = 'gemini-2.5-flash' } = body;
    if (typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message text is required' });
      return;
    }

    const safeHistory = Array.isArray(history) ? history : [];
    const messages = [
      ...safeHistory.flatMap((item: any) => {
        const content = typeof item?.text === 'string'
          ? item.text
          : typeof item?.content === 'string'
            ? item.content
            : '';
        if (!content.trim()) return [];
        return [{
          role: item?.sender === 'user' || item?.role === 'user' ? ('user' as const) : ('model' as const),
          content
        }];
      }),
      { role: 'user' as const, content: message }
    ];

    let fullText = '';
    for await (const token of ConversationService.generateStreamResponse(messages, language, model, {
      enableSearch: body.enableSearch === true,
      enableMaps: body.enableMaps === true
    })) {
      fullText += token;
    }

    res.status(200).json({
      text: fullText,
      groundingChunks: [],
      thinkingUsed: false
    });
  } catch (err: any) {
    const errorMessage = err?.message || (typeof err === 'string' ? err : 'Error processing request');
    console.error('[Error in /api/gemini/chat Vercel function]', errorMessage, err?.response?.data || err?.error || '');
    res.status(502).json({ error: 'Assistant service is temporarily unavailable', code: 'AI_PROVIDER_UNAVAILABLE' });
  }
}
