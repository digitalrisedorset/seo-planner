import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import {gql} from "@apollo/client";
import {createApolloClient} from "@/lib/createApolloClient";
import {createGoogleUser} from "@/components/user-authentication/lib/google-user";

const LOGIN_MUTATION = gql`
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                const client = createApolloClient();

                try {
                    const { data } = await client.mutate({
                        mutation: LOGIN_MUTATION,
                        variables: { email, password },
                    });

                    const result = data.authenticateUserWithPassword;

                    if (result.__typename === "UserAuthenticationWithPasswordFailure") {
                        throw new Error(result.message || "Invalid credentials");
                    }

                    const user = {
                        id: result.item.id,
                        name: result.item.name,
                        email: result.item.email,
                        sessionToken: result.sessionToken,
                        provider: "credentials",
                    };

                    return user;
                } catch (err) {
                    console.error("Login failed", err);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const keystoneUser = await createGoogleUser(user)
                token.provider = user.provider;
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.keystoneUserId = keystoneUser.id
                if ('sessionToken' in user) {
                    token.sessionToken = user.sessionToken
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.sessionToken = token.sessionToken as string;
                session.user.provider = token.provider;
                session.user.id = token.keystoneUserId
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET, // optional if using NEXTAUTH_SECRET env var
        encryption: false, // ✅ disable encryption!
    },
};

export default NextAuth(authOptions);
