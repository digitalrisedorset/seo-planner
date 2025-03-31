import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
import { config } from "@/config"; // your Keystone config

const httpLink = createHttpLink({
    uri: config.keystone.graphqlEndpoint,
    credentials: "include", // optional depending on your backend
});

export const createApolloClient = () => {
    const authLink = setContext(async (_, { headers }) => {
        const session = await getSession();

        return {
            headers: {
                ...headers,
                Authorization: session?.user?.sessionToken
                    ? `Bearer ${session.user.sessionToken}`
                    : "",
            },
        };
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};
