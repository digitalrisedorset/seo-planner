import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getOAuthSession } from "oauth-integration";
import { config } from "@/config";

const httpLink = createHttpLink({
    uri: config.keystone.graphqlEndpoint,
    credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
    const session = await getOAuthSession();

    return {
        headers: {
            ...headers,
            Authorization: session?.user?.sessionToken
                ? `Bearer ${session.user.sessionToken}`
                : "",
        },
    };
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
