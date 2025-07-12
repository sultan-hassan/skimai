import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text || text.trim().length < 10) {
    return res.status(400).json({ error: 'Please provide more detailed text.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(text);
    const response = result.response;
    const summary = response.text();

    return res.status(200).json({ summary });
  } catch (error: any) {
    console.error("Gemini error:", error?.message || error);
    return res.status(500).json({ error: error?.message || 'Failed to summarize text.' });
  }
}

