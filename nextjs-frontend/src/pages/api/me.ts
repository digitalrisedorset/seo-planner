// /pages/api/me.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const meRes = await fetch(`${process.env.OAUTH_HOST}/session`, {
            method: 'GET',
            headers: {
                cookie: req.headers.cookie || '',
            },
        });

        const user = await meRes.json();
        res.status(200).json(user);
    } catch (err) {
        console.error('Failed to fetch user from oauth-express:', err);
        res.status(500).json({ user: null, error: 'Failed to retrieve session' });
    }
}
