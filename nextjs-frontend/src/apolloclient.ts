import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { config } from "@/config"; // your config

const httpLink = createHttpLink({
    uri: config.keystone.graphqlEndpoint,
    credentials: "include", // sends the session cookie automatically
});

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
