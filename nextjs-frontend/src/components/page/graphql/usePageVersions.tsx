import {useQuery} from "@apollo/client";
import gql from "graphql-tag";

export const PAGE_VERSIONS_QUERY = gql`
    query PageVersions($where: PageVersionWhereInput!, $orderBy: [PageVersionOrderByInput!]!) {
      pageVersions(where: $where, orderBy: $orderBy) {
        title
        id
        isActive
        createdAt
        page {
          id
        }
      }
    }
`;

export const usePageVersions = (id: string | undefined) => {
    const { data, error, refetch, loading } = useQuery(PAGE_VERSIONS_QUERY, {
        variables: getPageVersionQueryVariables(id),
    });

    return { data, error, refetch, loading }
}

export const getPageVersionQueryVariables = (pageId: string) => ({
    where: {
        page: {
            id: { equals: pageId }
        }
    },
    orderBy: [{ createdAt: "asc" }]
});