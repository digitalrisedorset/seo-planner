import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useUserWebsiteId} from "@/components/user-authentication/hooks/useUser";
import {KeystoneWebsite} from "@/components/website/types/website";

const WEBSITE_QUERY = gql`
    query Website($where: WebsiteWhereUniqueInput!) {
      website(where: $where) {
        label
        url
      }
    }
`;

interface WebsiteKeystoneInfo {
    website: {
        data: {
            website: Omit<KeystoneWebsite, "id">
        }
    }
}

export const useUserWebsite = (): WebsiteKeystoneInfo => {
    const websiteId = useUserWebsiteId();

    const { data, loading, error } = useQuery(WEBSITE_QUERY, {
        variables: {
            where: {
                id: websiteId
            }
        },
        fetchPolicy: 'no-cache'
    });

    return {
        websiteData: data,
        websiteLoading: loading,
        websiteError: error,
        websiteReady: !loading && !error && !!data
    };
};
