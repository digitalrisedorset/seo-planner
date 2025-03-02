import {ApolloClient, InMemoryCache } from "@apollo/client";
import {config} from "@/config";

console.log('graphqlEndpoint', config.keystone.graphqlEndpoint)

export const apolloClient = new ApolloClient({
    uri: config.keystone.graphqlEndpoint,
    cache: new InMemoryCache(),
    credentials: 'include',
    headers: {
        'apollo-require-preflight': 'true'
    }
});

apolloClient.clearStore();