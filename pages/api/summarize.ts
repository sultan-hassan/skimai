// pages/api/summarize.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(`Summarize the following scientific text:\n\n${text}`);
    const response = result.response;
    const summary = response.text();

    return res.status(200).json({ summary });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to summarize text' });
  }
}
