import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { createApolloClient } from "@/lib/createApolloClient";
import { UserInformation } from "./useUser"; // adjust path if needed

const CHECK_USER_QUERY = gql`
  query CheckUser($email: String!) {
    users(where: { email: { equals: $email } }) {
      id
      email
      name
      websitePreference {
        id
        label
      }
      hideComplete
    }
  }
`;

export function useFallbackUserQuery(email?: string, shouldFetch?: boolean): {
    user?: UserInformation;
    loading: boolean;
} {
    const [user, setUser] = useState<UserInformation | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!email || !shouldFetch) return;

        const fetchFallbackUser = async () => {
            try {
                setLoading(true);
                const client = createApolloClient();
                const { data } = await client.query<{ users: UserInformation[] }>({
                    query: CHECK_USER_QUERY,
                    variables: { email },
                    fetchPolicy: "network-only",
                });

                if (data?.users?.length > 0) {
                    setUser(data.users[0]);
                }
            } catch (err) {
                console.error("Fallback user query failed", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFallbackUser();
    }, [email, shouldFetch]);

    return { user, loading };
}
