import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Construct the full redirect URL to the OAuth Express server
    const OAUTH_URL = `${process.env.OAUTH_HOST}/auth/google`;

    // Redirect the browser from within Next.js
    res.writeHead(302, { Location: OAUTH_URL });
    res.end();
}
