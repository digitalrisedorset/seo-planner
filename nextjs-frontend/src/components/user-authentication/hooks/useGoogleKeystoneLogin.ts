// src/hooks/useGoogleKeystoneLogin.ts
import { useGoogleLogin } from '@react-oauth/google'

export function useGoogleKeystoneLogin() {
    return useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const idToken = tokenResponse.credential || tokenResponse.access_token
            if (!idToken) return false

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken }),
            })

            const data = await res.json()
            return res.ok && data.success
        },
        onError: () => {
            console.error('Google login failed')
            return false
        },
        flow: 'implicit',
        scope: 'openid email profile',
    }) as unknown as () => Promise<boolean>
}
