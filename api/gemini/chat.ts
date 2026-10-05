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

    const { message = '', history = [], language = 'English', model = 'gemini-3.7-flash' } = body;

    const safeHistory = Array.isArray(history) ? history : [];
    const messages = [
      ...safeHistory.map((h: any) => ({ role: h?.sender === 'user' ? ('user' as const) : ('model' as const), content: h?.text || '' })),
      { role: 'user' as const, content: typeof message === 'string' ? message : '' }
    ];

    let fullText = '';
    for await (const token of ConversationService.generateStreamResponse(messages, language, model)) {
      fullText += token;
    }

    res.status(200).json({
      text: fullText,
      groundingChunks: [],
      thinkingUsed: false
    });
  } catch (err: any) {
    const errorMessage = err?.message || (typeof err === 'string' ? err : 'Error processing request');
    console.error(`[Error in /api/gemini/chat Vercel function]`, errorMessage);
    res.status(200).json({
      text: `\n\n*(Notice: Clinical assistant encountered a temporary server error: ${errorMessage}. Please try again shortly.)*`,
      groundingChunks: [],
      thinkingUsed: false
    });
  }
}
