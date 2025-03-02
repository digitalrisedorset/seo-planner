import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "../hooks/useUser";
import gql from "graphql-tag";
import {formProps} from "@/components/global/types/form";

const SIGNIN_MUTATION = gql`
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name            
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const useLoginUser = (inputs: formProps) => {
    const [signin] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });

    const setUserLogged = async () => {
        const res = await signin(inputs);

        return (res?.data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure')
            ? res?.data?.authenticateUserWithPassword
            : res?.data?.authenticateUserWithPassword.item
    }

    return setUserLogged
}