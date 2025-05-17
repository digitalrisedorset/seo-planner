// /pages/api/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const parsed = cookie.parse(req.headers.cookie || '');
        const token = parsed.token;

        const logoutRes = await fetch(`${process.env.OAUTH_HOST}/logout`, {
            method: 'POST',
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const logoutResult = await logoutRes.json();

        // ✅ Log for visibility
        console.log('[NEXTJS] ✅ Logged out via oauth-express:', logoutResult);

        res.status(200).json(logoutResult);
    } catch (err) {
        console.error('Failed to logout user from oauth-express:', err);
        res.status(500).json({ user: null, error: 'Failed to clear the session' });
    }
}
