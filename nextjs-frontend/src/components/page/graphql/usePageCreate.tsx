import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {formProps} from "@/components/global/types/form";
import {graphQLVariables} from "@/components/user-authentication/types/user";
import {PAGES_QUERY} from "@/components/page/graphql/useUserPages";
import {useUserWebsiteId} from "@/components/user-authentication/hooks/useUser";
import {useUserState} from "@/state/UserState";

export const PAGE_CREATE_MUTATION = gql`
  mutation CreatePage($data: PageCreateInput!) {
      createPage(data: $data) {       
        id
      }
    }
`;

export const useCreatePage = (inputs: formProps) => {
    const website = useUserWebsiteId()
    const {user} = useUserState()

    const variables: graphQLVariables = inputs

    variables['website'] = {
        "connect": {
            "id":  website
        }
    }

    const response = useMutation(PAGE_CREATE_MUTATION, {
        variables: {
            data: variables
        },
        // refectch the currently logged in user
        refetchQueries: [{ query: PAGES_QUERY }],
    });

    return response;
}