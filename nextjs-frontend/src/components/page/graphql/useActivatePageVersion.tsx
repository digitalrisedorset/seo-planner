import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {
    getPageVersionQueryVariables,
    PAGE_VERSIONS_QUERY
} from "@/components/page/graphql/usePageVersions";
import {usePageState} from "@/state/PageStateProvider";

const ACTIVATE_PAGE_VERSION_MUTATION = gql`
    mutation UpdatePageVersion($where: PageVersionWhereUniqueInput!, $data: PageVersionUpdateInput!) {
      updatePageVersion(where: $where, data: $data) {
        id
      }
    }
`;

export const useActivatePageVersion = (id: string) => {
    const {pageState} = usePageState()

    const response = useMutation(
        ACTIVATE_PAGE_VERSION_MUTATION,{
            variables: {
                "data": {
                    isActive: true
                },
                "where": {
                    "id": id
                }
            },
            refetchQueries: [{
                query: PAGE_VERSIONS_QUERY,
                variables: getPageVersionQueryVariables(pageState.activePageId)
            }]
        }
    );

    return response
}

