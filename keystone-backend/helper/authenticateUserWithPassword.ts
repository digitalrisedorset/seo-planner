import type { Context } from '.keystone/types'

async function createSessionTokenForUser(email: string, context: Context): Promise<string> {
    const result = await context.graphql.run({
        query: `
      mutation Authenticate($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
          ... on UserAuthenticationWithPasswordSuccess {
            sessionToken
          }
          ... on UserAuthenticationWithPasswordFailure {
            message
          }
        }
      }
    `,
        variables: {
            email,
            password: process.env.INTERNAL_OAUTH_USER_PASSWORD!, // or a fixed secret
        },
    });

    const auth = result.authenticateUserWithPassword;

    if (auth?.sessionToken) return auth.sessionToken;

    console.warn("⚠️ Unable to authenticate user:", auth?.message || "Unknown error");
    throw new Error("Failed to generate Keystone session token");
}

export default createSessionTokenForUser