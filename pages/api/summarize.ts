import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  summary: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    // For demo, just return a fixed summary string
    const { text } = req.body;
    res.status(200).json({ summary: `Summary of: "${text}"` });
  } else {
    res.status(405).json({ summary: 'Method not allowed' });
  }
}
