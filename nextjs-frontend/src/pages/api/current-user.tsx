// src/pages/api/current-user.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Call Keystone's GraphQL endpoint to fetch current user info
        const keystoneRes = await fetch(`${process.env.KEYSTONE_API_URL}/api/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: req.headers.cookie || '', // Forward browser cookies to Keystone
            },
            credentials: 'include', // Important: ensure cookies are passed
            body: JSON.stringify({
                query: `
          query {
            currentUser {
              id
              email
              isAdmin
              provider
            }
          }
        `,
            }),
        })

        if (keystoneRes.status === 302 || keystoneRes.status === 401) {
            // Session is invalid or missing
            return res.status(200).json({ user: null })
        }

        const { data } = await keystoneRes.json()

        return res.status(200).json({
            user: data?.currentUser ?? null,
        })
    } catch (error) {
        console.error('Error in /api/current-user:', error)
        return res.status(500).json({ user: null })
    }
}
