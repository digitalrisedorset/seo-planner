// /pages/api/refresh-session.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const parsed = cookie.parse(req.headers.cookie || '');
        const token = parsed.token;

        const response = await fetch(`${process.env.OAUTH_HOST}/refresh-session`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            credentials: 'include',
        });

        const json = await response.json();
        res.status(200).json(json);
    } catch (err) {
        console.error('Failed to fetch user from oauth-express:', err);
        res.status(500).json({ user: null, error: 'Failed to retrieve session' });
    }
}
