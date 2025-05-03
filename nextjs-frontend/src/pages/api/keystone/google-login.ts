// /pages/api/keystone/google-login.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ error: 'Missing idToken' });
    }

    const response = await fetch(`${process.env.KEYSTONE_HOST}/api/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // let Keystone set cookies
        body: JSON.stringify({
            query: `mutation AuthenticateWithGoogle($idToken: String!) {
                      authenticateWithGoogle(idToken: $idToken) {
                        success
                        message
                      }
                    }`,
            variables: { idToken },
        }),
    });

    const body = await response.json();

    if (!body?.data?.authenticateWithGoogle?.success) {
        return res.status(401).json({ error: body?.data?.authenticateWithGoogle?.message || 'Authentication failed' });
    }

    // Forward Keystone's Set-Cookie header
    const setCookieHeader = response.headers.get('set-cookie');
    console.log('🍪 Set-Cookie received from Keystone:', setCookieHeader);
    if (setCookieHeader) {
        res.setHeader('Set-Cookie', setCookieHeader);
    }

    return res.status(200).json({ success: true });
}
