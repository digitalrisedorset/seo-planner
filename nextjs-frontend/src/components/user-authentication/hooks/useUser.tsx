import {gql, useQuery} from '@apollo/client';

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
    const { data } = useQuery(CURRENT_USER_QUERY, {
        nextFetchPolicy: 'network-only',
        fetchPolicy: 'network-only'
    });

    return data?.authenticatedItem;
}

export function useUserWebsiteId(): string {
    const {user} = useUser()

    if (user === undefined || user.websitePreference?.id === undefined) {
        return ''
    }

    return user.websitePreference?.id
}

export { CURRENT_USER_QUERY };