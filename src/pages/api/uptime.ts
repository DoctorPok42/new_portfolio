import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@/../config.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(config.uptime);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch uptime data' });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error('Failed to proxy uptime data', error);
    return res.status(500).json({ error: 'Failed to fetch uptime data' });
  }
}
