import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from "@/config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    debugger

    try {
        const { idToken } = req.body

        const keystoneRes = await fetch(config.keystone.graphqlEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: req.headers.cookie || '',
            },
            credentials: 'include',
            body: JSON.stringify({
                query: `
          mutation AuthenticateWithGoogle($token: String!) {
            authenticateWithGoogle(idToken: $token) {
              success
              message
            }
          }
        `,
                variables: {
                    token: idToken,
                },
            }),
        })

        const keystoneData = await keystoneRes.json()
        console.log('keystone res', keystoneData)
        const cookie = keystoneRes.headers.get('set-cookie')

        console.log('keystone header', keystoneRes.headers)

        console.log('keystone cookie', cookie)

        if (cookie) {
            res.setHeader('Set-Cookie', cookie)
        }

        return res.status(200).json(keystoneData.data.authenticateWithGoogle)

    } catch (error) {
        console.error('Error in /api/auth/google:', error)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
