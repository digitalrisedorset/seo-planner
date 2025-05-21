// pages/api/login-with-credentials.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import {setCookie} from "@/lib/cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    const response = await fetch(`${process.env.OAUTH_HOST}/local/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok || !result.token) {
        return res.status(401).json({ error: result.error || 'Login failed' });
    }

    setCookie('token', result.token, req, res)

    // ✅ Return user data to frontend (can also skip this if decoded from JWT)
    res.status(200).json({ user: result.user });
}
