// pages/api/login-with-credentials.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    const response = await fetch(`${process.env.OAUTH_HOST}/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok || !result.token) {
        return res.status(401).json({ error: result.error || 'Login failed' });
    }

    // ✅ Set JWT in an HttpOnly cookie (optional but secure)
    res.setHeader('Set-Cookie', cookie.serialize('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
        path: '/',
    }));

    // ✅ Return user data to frontend (can also skip this if decoded from JWT)
    res.status(200).json({ user: result.user });
}
