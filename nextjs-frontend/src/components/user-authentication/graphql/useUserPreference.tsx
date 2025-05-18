import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {useUserState} from "@/state/UserState";
import {fetchCookie} from "@/lib/cookie";

const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
        updateUser(where: $where, data: $data) {
            id
        }
    }
`;

export const useUserPreference = () => {
    const { refresh } = useUserState();

    const [updateUser, meta] = useMutation(UPDATE_USER_MUTATION);

    const update = async (variables: any) => {
        await updateUser(variables);
        // ✅ update local user state
        await refresh();
    };

    return [update, meta] as const;
};