import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "../hooks/useUser";

const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
        updateUser(where: $where, data: $data) {
            id
        }
    }
`;

export const useUserPreference = () => {
    const response = useMutation(
        UPDATE_USER_MUTATION,{
            // refectch the currently logged in user
            refetchQueries: [{query: CURRENT_USER_QUERY}],
        }
    );

    return response
}