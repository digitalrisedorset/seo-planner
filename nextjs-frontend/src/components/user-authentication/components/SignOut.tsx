"use client";

import {apolloClient} from "@/apolloclient";
import {router} from "next/client";
import {useUserState} from "@/state/UserState";

export const SignOut: React.FC = () => {
    const { refresh } = useUserState();

  const handleSignout = async () => {
      await fetch('/api/logout');
      refresh(); // ✅ refetch session state
      router.push('/');
      await apolloClient.clearStore(); // clear user data cache
  };

  return (
      <button type="button" onClick={handleSignout}>
        Sign Out
      </button>
  );
};
