import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      console.error('GOOGLE_SCRIPT_URL is not defined in environment variables.');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
      redirect: 'follow'
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error forwarding to Google Sheets:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
}
