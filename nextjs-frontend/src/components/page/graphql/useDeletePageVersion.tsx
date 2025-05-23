import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
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

export const useDeletePageVersion = (id: string) => {
    const {pageState} = usePageState()

    const response = useMutation(
        DELETE_PAGE_VERSION_MUTATION,{
            variables: { "where": { id: id }},
            refetchQueries: [{
                query: PAGE_VERSIONS_QUERY,
                variables: getPageVersionQueryVariables(pageState.activePageId)
            }],
        }
    );

    return response
}