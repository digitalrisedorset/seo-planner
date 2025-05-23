import gql from "graphql-tag";
import {InMemoryCache, useMutation} from "@apollo/client";
import {PAGES_QUERY} from "@/components/page/graphql/useUserPages";

const DELETE_PAGE_MUTATION = gql`
    mutation DeletePage($where: PageWhereUniqueInput!) {
      deletePage(where: $where) {
        id
      }
    }
`;

function update(cache: InMemoryCache, payload: { data?: {deletePage: { id: string }} }) {
    const deletePageId = payload?.data?.deletePage?.id
    if (deletePageId === undefined) {
        return
    }

    const cacheKey = cache.identify({ __typename: "Page", id: deletePageId });
    if (cacheKey) {
        cache.evict({ id: cacheKey });
    }
}

export const useDeletePage = (id: string) => {
    const response = useMutation(
        DELETE_PAGE_MUTATION,{
            variables: { "where": { id: id }},
            update,
            refetchQueries: [{ query: PAGES_QUERY }],
        }
    );

    return response
}