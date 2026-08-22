import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ImageAnalysisService } from '../../server/services/ImageAnalysisService';
import dotenv from 'dotenv';
dotenv.config();

export const config = { maxDuration: 60 };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { base64Data, mimeType = 'image/jpeg', scanType = 'medicine', userNotes = '', language = 'English' } = body;

    if (!base64Data) {
      res.status(400).json({ error: 'Image base64 is required' });
      return;
    }

    const result = await ImageAnalysisService.analyzeImage(base64Data, mimeType, scanType, userNotes, language);
    res.status(200).json({ analysis: result });
  } catch (err: any) {
    console.error('Error in /api/gemini/analyze-image Vercel function:', err);
    res.status(500).json({ error: err.message || 'Failed to analyze image' });
  }
}
