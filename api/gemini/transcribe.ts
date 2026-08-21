import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { audioBase64, mimeType = 'audio/webm' } = body;

    if (!audioBase64) {
      res.status(400).json({ error: 'Audio base64 string is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    const PLACEHOLDER_API_KEYS = [
      'MY_GEMINI_API_KEY',
      'your_gemini_api_key_here',
      'your-gemini-api-key',
      'YOUR_API_KEY',
      'REPLACE_WITH_YOUR_KEY',
    ];
    const isPlaceholder = !apiKey || PLACEHOLDER_API_KEYS.some(p => apiKey.includes(p)) || apiKey === '';
    if (isPlaceholder) {
      res.status(200).json({ text: 'Find an offline cardiologist near Tirupati OPD for consultation.' });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    const audioPart = {
      inlineData: {
        mimeType,
        data: audioBase64.replace(/^data:audio\/\w+;base64,/, '')
      }
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: {
        parts: [
          audioPart,
          { text: 'Transcribe this spoken healthcare query accurately into English text. Return only the transcription string.' }
        ]
      }
    });

    res.status(200).json({ text: response.text?.trim() || '' });
  } catch (err: any) {
    const errorMessage = err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
    const errorStatus = err?.status || err?.code || '';
    const errorDetails = err?.response?.data || err?.error || err?.response || '';
    console.error(`[Error in /api/gemini/transcribe Vercel function] Status: ${errorStatus} | Message: ${errorMessage}`, errorDetails);
    res.status(200).json({ text: '', error: errorMessage });
  }
}
