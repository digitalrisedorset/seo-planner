"use client";

import { useSignOut } from "../graphql/useSignOut";
import { useRouter } from "next/router";
import { useFlashMessage } from "@/state/FlassMessageState";
import {apolloClient} from "@/apolloclient";

export const SignOut: React.FC = () => {
  const router = useRouter();
  const { addSuccessMessage } = useFlashMessage();

  const handleSignout = async () => {
    await apolloClient.clearStore(); // clear user data cache

    if (session.user?.provider === "credentials") {
      // Logged in with backend credentials
      addSuccessMessage("You are now logged out");
      await router.replace("/");
    } else {
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
     /* <SignOutButton />*/
  );
};
