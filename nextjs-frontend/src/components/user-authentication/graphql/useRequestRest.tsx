import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "../hooks/useUser";
import {formProps} from "@/components/global/types/form";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`;

export const useRequestReset = (inputs: formProps) => {

    const response = useMutation(
        REQUEST_RESET_MUTATION,
        {
            variables: inputs,
            // refectch the currently logged in user
            refetchQueries: [{query: CURRENT_USER_QUERY}],
        }
    )

    return response
};