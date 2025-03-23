import { gql, useQuery } from '@apollo/client';
import {useEffect} from "react";
//import {useOAuthUser} from "oauth-integration";
import {useSession} from "next-auth/react";

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

export function useUser(): UserInformation | undefined {
    //const { status } = useOAuthUser();
    const { data: session, status } = useSession();

    const { data, refetch } = useQuery(CURRENT_USER_QUERY, {
        fetchPolicy: 'network-only',
        skip: status !== "authenticated",
    });

    useEffect(() => {
        if (status === "authenticated") {
            refetch(); // make sure we have latest user info after login
        }
    }, [status]);

    return data?.authenticatedItem;
}


export function useUserWebsiteId(): string {
    const user = useUser()

    if (user === undefined || user.websitePreference?.id === undefined) {
        return ''
    }

    return user.websitePreference?.id
}

export { CURRENT_USER_QUERY };
