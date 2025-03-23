import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useFilter} from "@/components/page/hooks/useFilter";

export const TASKS_QUERY = gql`
    query Pages($where: PageWhereInput!, $orderBy: [PageOrderByInput!]!) {
      pages(where: $where, orderBy: $orderBy) {
        id       
        keywords
        description
        ranking
        priority       
        createdAt
        updatedAt
        completedAt
      }
    }
`;

export const usePages = () => {
    const filter = useFilter()

    const pagesData = useQuery(TASKS_QUERY, {
        variables: {
            "where": filter,
            "orderBy": [{"priority": "desc"}],
        },
        fetchPolicy: "cache-and-network"
    });

    return pagesData
}