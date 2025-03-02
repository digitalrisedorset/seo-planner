import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "../hooks/useUser";
import {formProps} from "@/components/global/types/form";

const RESET_MUTATION = gql`
  mutation RedeemUserPasswordResetToken($email: String!, $password: String!, $token: String!) {
    redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
      message
      code
    }
  }
`;

export const useResetPassword = (inputs: formProps) => {

    const response = useMutation(
        RESET_MUTATION,
        {
            variables: inputs,
            // refectch the currently logged in user
            refetchQueries: [{query: CURRENT_USER_QUERY}],
        }
    );

    return response
}