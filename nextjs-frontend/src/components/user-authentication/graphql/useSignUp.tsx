import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {formProps} from "@/components/global/types/form";
import {graphQLVariables} from "@/components/user-authentication/types/user";

export const SIGNUP_MUTATION = gql`
  mutation CreateUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
      email
      name
    }
  }
`;

export const useSignUpUser = (inputs: formProps) => {
    const variables: graphQLVariables = inputs

    const response = useMutation(SIGNUP_MUTATION, {
        variables: {
            data: variables
        },
        // refectch the currently logged in user
        //refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    return response;
}