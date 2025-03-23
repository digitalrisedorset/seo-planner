import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import {config} from "@/config";

export function createApolloClient() {
    return new ApolloClient({
        ssrMode: true,
        link: new HttpLink({
            uri: config.keystone.graphqlEndpoint,
            fetch,
            credentials: "include",
        }),
        cache: new InMemoryCache(),
    });
}
