import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useUser} from "@/components/user-authentication/hooks/useUser";

const WEBSITES_QUERY = gql`
    query Websites($where: WebsiteWhereInput!) {
      websites(where: $where) {
        id
        label
      }
    }
`;

export const useWebsites = () => {
    const {user} = useUser()

    const websiteData = useQuery(WEBSITES_QUERY, {
        variables: {
            "where": {
                "user": {
                    "id": {
                        "equals": user?.id
                    }
                }
            }
        },
        fetchPolicy: 'no-cache'
    });

    return websiteData
}