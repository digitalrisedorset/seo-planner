import gql from "graphql-tag";
import {InMemoryCache, useMutation} from "@apollo/client";
import {PAGES_QUERY} from "@/components/page/graphql/useUserPages";
import {getPageVersionQueryVariables, PAGE_VERSIONS_QUERY} from "@/components/page/graphql/usePageVersions";
import {usePageState} from "@/state/PageStateProvider";

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

export const useUpdatePage = (pageId: string) => {
    const response = useMutation(
        UPDATE_PAGE_MUTATION,{
            update,
            refetchQueries: [{
                query: PAGE_VERSIONS_QUERY,
                variables: getPageVersionQueryVariables(pageId)
            }],
            awaitRefetchQueries: true
        }
    );

    return response
}