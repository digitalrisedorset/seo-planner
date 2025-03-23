"use client";

import {Form} from "@/components/global/styles/Form";
import { SignInButton, SignOutButton, useOAuthUser } from "oauth-integration";
//import { getOAuthSession } from "oauth-integration";
import {signIn, signOut, useSession} from "next-auth/react";
import React from "react";

export const AuthButton: React.FC = () => {
    //const { user } = useOAuthUser();
    const { data: session, status } = useSession();

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
                        <button onClick={() => signIn("google", {prompt: "select_account"})}>
                            Sign in with Google
                        </button>
                    </fieldset>
                </>
            )}
        </Form>
    );
}

