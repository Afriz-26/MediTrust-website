import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ConversationService } from '../../server/services/ConversationService';
import dotenv from 'dotenv';
dotenv.config();

// Gemini calls take 5–20s; Vercel Hobby default maxDuration is 10s which kills the function → HTTP 500.
// Raise the hard limit so real AI responses can stream back reliably.
export const config = { maxDuration: 60 };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { message, history = [], language = 'English', model = 'gemini-3.6-flash' } = body;

    const messages = [
      ...history.map((h: any) => ({ role: h.sender === 'user' ? ('user' as const) : ('model' as const), content: h.text })),
      { role: 'user' as const, content: message || '' }
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
    const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
    const errorStatus = err?.status || err?.code || '500';
    const errorDetails = err?.response?.data || err?.error || err?.response || '';
    console.error(`[Error in /api/gemini/chat Vercel function] Status: ${errorStatus} | Message: ${errorMessage}`, errorDetails);
    // Return fallback with HTTP 200 to avoid client-side HTTP_500 errors
    const fallbackText = `I am temporarily unable to reach the Gemini server (HTTP_${errorStatus}). Please check your connection or try again shortly.`;
    res.status(200).json({
      text: fallbackText,
      groundingChunks: [],
      thinkingUsed: false,
      error: errorMessage
    });
  }
}
