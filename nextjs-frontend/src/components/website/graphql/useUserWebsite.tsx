import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useUserWebsiteId} from "@/components/user-authentication/hooks/useUser";

const WEBSITE_QUERY = gql`
    query Website($where: WebsiteWhereUniqueInput!) {
      website(where: $where) {
        label
      }
    }
`;

export const useUserWebsite = () => {
    const websiteId = useUserWebsiteId()

    const websiteData = useQuery(WEBSITE_QUERY, {
        variables: {
            "where": {
                "id": websiteId
            }
        },
        fetchPolicy: 'no-cache'
    });

    return websiteData
}