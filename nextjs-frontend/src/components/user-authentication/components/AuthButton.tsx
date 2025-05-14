"use client";

import {Form} from "@/components/global/styles/Form";
import React, {useState} from "react";
import { useRouter } from 'next/router';
import {apolloClient} from "@/apolloclient";
import {useUserState} from "@/state/UserState";

export const AuthButton: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const {user, refresh} = useUserState()
    const router = useRouter();

    const handleSignout = async () => {
        setLoading(true);
        await fetch('/api/logout');
        await apolloClient.clearStore();
        refresh();
        router.push('/');
        setLoading(false);
    };

    const handleLogin = (e) => {
        e.preventDefault()
        window.location.href = '/api/login';
    };

    return (
        <Form>
            {user ? (
                <>
                    <h2>{user?.name}</h2>
                    <fieldset>
                        <button onClick={handleSignout}>
                            Sign Out
                        </button>
                    </fieldset>
                </>
            ) : (
                <>
                    <h2>Or Sign In with OAuth</h2>
                    <fieldset>
                        <button onClick={handleLogin}>
                            Sign in with Google
                        </button>
                    </fieldset>
                </>
            )}
        </Form>
    );
}

