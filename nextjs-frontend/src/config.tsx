export type configInfo = {
    keystone: {
        graphqlEndpoint: string,
        headers: {
            'apollo-require-preflight': string
        }
    },
    nodejsEndpoint: string,
    googleClientId: string
}

export const config: configInfo = {
    keystone: {
        graphqlEndpoint: (process.env.KEYSTONE_HOST === undefined) ? 'http://localhost:3000/api/graphql' : `${process.env.KEYSTONE_HOST}/api/graphql`,
        headers: {
            'apollo-require-preflight': (process.env.REACT_REQUIRE_PREFLIGHT)? 'true': 'false'
        }
    },
    nodejsEndpoint: (process.env.NEXT_PUBLIC_NODE_HOST === undefined) ? 'http://localhost:8080' : process.env.NEXT_PUBLIC_NODE_HOST,
    googleClientId: (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID === undefined) ? 'google-seret' : process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
}
