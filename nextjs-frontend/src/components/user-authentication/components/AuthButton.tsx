"use client";

import {Form} from "@/components/global/styles/Form";
import React from "react";
import { GoogleLogin } from '@react-oauth/google'
import {useUser} from "@/components/user-authentication/hooks/useUser";

export const AuthButton: React.FC = () => {
    const user = useUser()

    const handleGoogleLoginSuccess = async (credentialResponse: any) => {
        const idToken = credentialResponse.credential
        if (!idToken) {
            console.error('No ID Token returned')
            //setError('Login failed')
            return
        }
debugger
        const res = await fetch('http://localhost:3000/api/graphql', {
            method: 'POST',
            credentials: 'include', // ✅ sends/receives cookies
            headers: {
                'Content-Type': 'application/json',
            },
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

console.log('cookie header', res.headers.get('set-cookie'))
        // const res = await fetch('/api/auth/google', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ idToken }),
        // })

        const data = await res.json()

        if (!res.ok || !data.success) {
            console.error('Google login failed', data.message)
            //setError('Google login failed')
        }
    }

    return (
        <Form>
            {user ? (
                <>
                    <h2>{user?.name}</h2>
                    <fieldset>
                        <button onClick={() => {}}>
                            Sign Out
                        </button>
                    </fieldset>
                </>
            ) : (
                <>
                    <h2>Or Sign In with OAuth</h2>
                    <fieldset>
                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={() => {
                                console.log('google error login')
                            }}
                        />
                    </fieldset>
                </>
            )}
        </Form>
    );
}

