import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {useFilter} from "@/components/page/hooks/useFilter";

export const PAGES_QUERY = gql`
    query Pages($where: PageWhereInput!, $orderBy: [PageOrderByInput!]!) {
      pages(where: $where, orderBy: $orderBy) {
        id       
        keywords
        description
        ranking
        priority       
        createdAt
        updatedAt      
      }
    }
`;

export const usePages = () => {
    const filter = useFilter()

    const pagesData = useQuery(PAGES_QUERY, {
        variables: {
            "where": filter,
            "orderBy": [{"priority": "desc"}],
        },
        fetchPolicy: "cache-and-network"
    });

    return pagesData
}