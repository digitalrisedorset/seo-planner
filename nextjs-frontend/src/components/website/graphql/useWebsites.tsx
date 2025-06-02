import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useUserState} from "@/state/UserState";

const WEBSITES_QUERY = gql`
    query Websites($where: WebsiteWhereInput!) {
      websites(where: $where) {
        id
        label
      }
    }
`;

export const useWebsites = () => {
    const {user} = useUserState()

    const { data, error, refetch, loading } = useQuery(WEBSITES_QUERY, {
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


    return { webistesData: data, error, refetchWebsites: refetch, loading }
}