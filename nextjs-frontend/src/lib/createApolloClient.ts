import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { config } from "@/config"; // your Keystone config

const httpLink = createHttpLink({
    uri: config.keystone.graphqlEndpoint,
    credentials: "include", // optional depending on your backend
});

export const createApolloClient = () => {
    const authLink = setContext(async (_, { headers }) => {
        return {
            headers: {
                ...headers,
                // Authorization: user?.sessionToken
                //     ? `Bearer ${user.sessionToken}`
                //     : "",
            },
        };
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};
