export type configInfo = {
    keystone: {
        graphqlEndpoint: string,
        headers: {
            'apollo-require-preflight': string
        }
    },
    nodejsEndpoint: string,
    nextAuth: string
}

export const config: configInfo = {
    keystone: {
        graphqlEndpoint: (process.env.KEYSTONE_HOST === undefined) ? 'http://localhost:3000/api/graphql' : `${process.env.KEYSTONE_HOST}/api/graphql`,
        headers: {
            'apollo-require-preflight': (process.env.REACT_REQUIRE_PREFLIGHT)? 'true': 'false'
        }
    },
    nodejsEndpoint: (process.env.NEXT_PUBLIC_NODE_HOST === undefined) ? 'http://localhost:8080' : process.env.NEXT_PUBLIC_NODE_HOST,
    nextAuth: (process.env.NEXT_PUBLIC_NEXTAUTH_SECRET === undefined) ? 'nextauth-seret' : process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
}
