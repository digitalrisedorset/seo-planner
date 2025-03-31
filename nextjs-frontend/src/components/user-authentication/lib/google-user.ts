import {createApolloClient} from "@/lib/createApolloClient";
import {SIGNUP_MUTATION} from "@/components/user-authentication/graphql/useSignUp";
import {UserInformation} from "@/components/user-authentication/types/user";
import gql from "graphql-tag";

const CHECK_USER_QUERY = gql`
  query CheckUser($email: String!) {
    users(where: { email: { equals: $email } }) {
      id
    }
  }
`;

export const createGoogleUser = async (user: UserInformation) => {
    // 1. Query Keystone to see if a user exists
    const client = createApolloClient()

    const existingUser = await client.query({
        query: CHECK_USER_QUERY,
        variables: { email: user.email },
    });
    let keystoneUser

    if (existingUser.data.users.length > 0) {
        keystoneUser = existingUser.data.users[0]
    }

    if (!keystoneUser) {
        // 2. If not found, create one
        const {data: createData} = await client.mutate({
            mutation: SIGNUP_MUTATION,
            variables: {
                data: {
                    name: user?.name,
                    email: user?.email,
                    googleId: user?.id,
                }
            },
        })

        keystoneUser = createData
    }

    return keystoneUser
}
