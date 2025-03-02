import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "../hooks/useUser";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export const useSignOut = () => {
    const response = useMutation(SIGN_OUT_MUTATION, {
        refetchQueries: [{query: CURRENT_USER_QUERY}]
    });

    return response
}