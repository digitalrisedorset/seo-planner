import gql from "graphql-tag";
import {InMemoryCache, useMutation} from "@apollo/client";
import {PAGES_QUERY} from "@/components/page/graphql/useUserPages";

const UPDATE_PAGE_MUTATION = gql`
    mutation UpdatePage($where: PageWhereUniqueInput!, $data: PageUpdateInput!) {
      updatePage(where: $where, data: $data) {
        id
      }
    }
`;

function update(cache: InMemoryCache, payload: { data?: {updatePage: string } }) {
    const updateId = payload?.data?.updatePage
    if (updateId === undefined) {
        return
    }

    const cacheKey = cache.identify({ __typename: "Page", id: updateId });
    if (cacheKey) {
        cache.evict({ id: cacheKey });
    }
}

export const useUpdatePage = () => {
    const response = useMutation(
        UPDATE_PAGE_MUTATION,{
            update,
            refetchQueries: [{ query: PAGES_QUERY }],
        }
    );

    return response
}