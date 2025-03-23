"use client";

//import {getOAuthSession, signOutUser, useOAuthUser} from "oauth-integration";
import { useSignOut } from "../graphql/useSignOut";
import { useRouter } from "next/router";
import { useFlashMessage } from "@/state/FlassMessageState";
import {apolloClient} from "@/apolloclient";
import {signOut, useSession} from "next-auth/react";

export const SignOut: React.FC = () => {
  //const { user } = useOAuthUser();
  const { data: session, status } = useSession();
  const [signout] = useSignOut();
  const router = useRouter();
  const { addSuccessMessage } = useFlashMessage();

  const handleSignout = async () => {
    await apolloClient.clearStore(); // clear user data cache

    if (session.user?.provider === "credentials") {
      // Logged in with backend credentials
      await signout();
      addSuccessMessage("You are now logged out");
      await router.replace("/");
    } else {
      //await signOutUser(); // clear session
      await signOut({
        callbackUrl: "/",
      })
    }

    // Always call NextAuth's signOut to clear client session
    //await signOutUser();
    await signOut({
      callbackUrl: "/",
    })
  };

  return (
      <button type="button" onClick={handleSignout}>
        Sign Out
      </button>
  );
};
