// /pages/api/logout.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import {serialize} from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const serialized = serialize('token', '', {
        httpOnly: true,
        expires: new Date(0), // 👈 Expire immediately
        path: '/',
    });

    res.setHeader('Set-Cookie', serialized);

    res.status(200).json({ success: true });
    // try {
    //     const token = fetchCookie('token', req, res)
    //
    //     const logoutRes = await fetch(`${process.env.OAUTH_HOST}/auth/logout`, {
    //         method: 'POST',
    //         headers: token ? { Authorization: `Bearer ${token}` } : {},
    //     });
    //
    //     const logoutResult = await logoutRes.json();
    //
    //     // ✅ Log for visibility
    //     console.log('[NEXTJS] ✅ Logged out via oauth-express:', logoutResult);
    //
    //     res.status(200).json(logoutResult);
    // } catch (err) {
    //     console.error('Failed to logout user from oauth-express:', err);
    //     res.status(500).json({ user: null, error: 'Failed to clear the session' });
    // }
}
