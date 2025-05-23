import gql from "graphql-tag";
import {InMemoryCache, useMutation} from "@apollo/client";
import {
    getPageVersionQueryVariables,
    PAGE_VERSIONS_QUERY
} from "@/components/page/graphql/usePageVersions";
import {usePageState} from "@/state/PageStateProvider";

const DELETE_PAGE_VERSION_MUTATION = gql`
    mutation DeletePageVersion($where: PageVersionWhereUniqueInput!) {
      deletePageVersion(where: $where) {
        id
      }
    }
`;

function update(cache: InMemoryCache, { data }: any) {
    const deletedId = data?.deletePageVersion?.id;
    if (!deletedId) return;

    const cacheKey = cache.identify({ __typename: "PageVersion", id: deletedId });
    if (cacheKey) {
        cache.evict({ id: cacheKey });
        cache.gc(); // optional: runs garbage collection
    }
}

export const useDeletePageVersion = (id: string) => {
    const {pageState} = usePageState()

    const response = useMutation(
        DELETE_PAGE_VERSION_MUTATION,{
            variables: { "where": { id: id }},
            update,
            refetchQueries: [{
                query: PAGE_VERSIONS_QUERY,
                variables: getPageVersionQueryVariables(pageState.activePageId)
            }],
            awaitRefetchQueries: true,
        }
    );

    return response
}