"use client";

import {Form} from "@/components/global/styles/Form";
import {signIn, signOut, useSession} from "next-auth/react";
import React from "react";
import {Loading} from "@/components/global/components/Loading";

export const AuthButton: React.FC = () => {
    const { data: session, status } = useSession();

    if (status === "loading") return <Loading />

    return (
        <Form>
            {session ? (
                <>
                    <h2>{session.user?.name}</h2>
                    <fieldset>
                        <button onClick={() => signOut()}>
                            Sign Out
                        </button>
                    </fieldset>
                </>
            ) : (
                <>
                    <h2>Or Sign In with OAuth</h2>
                    <fieldset>
                        <button onClick={() => signIn("google", {
                            prompt: "select_account",
                            callbackUrl: "/pages",
                        })}>
                            Sign in with Google
                        </button>
                    </fieldset>
                </>
            )}
        </Form>
    );
}

