import { gql } from '@apollo/client';
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useKeystoneUserQuery} from "@/components/user-authentication/hooks/useKeystoneUserQuery";
import {useFallbackUserQuery} from "@/components/user-authentication/hooks/useFallbackUserQuery";

const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name   
        websitePreference {
            id
            label
        }
        hideComplete
      }
    }
  }
`;

export interface UserInformation {
    id: string
    email: string
    name: string
    websitePreference: WebsitePreference
    hideComplete: boolean
}

export interface WebsitePreference {
    id: string
    label: string
}

export function useUser(): {
    user?: UserInformation;
    loading: boolean;
    isAuthenticated: boolean;
} {
    const { data: session, status } = useSession();

    const { user: keystoneUser, loading: loadingKeystone } = useKeystoneUserQuery(status);

    const {
        user: fallbackUser,
        loading: loadingFallback,
    } = useFallbackUserQuery(session?.user?.email, status === "authenticated" && !keystoneUser && session?.user?.provider === "google");

    const user = keystoneUser ?? fallbackUser;

    return {
        user,
        loading: status === "loading" || loadingKeystone || loadingFallback,
        isAuthenticated: status === "authenticated",
    };
}


export function useUserWebsiteId(): string {
    const {user} = useUser()

    if (user === undefined || user.websitePreference?.id === undefined) {
        return ''
    }

    return user.websitePreference?.id
}

export { CURRENT_USER_QUERY };
