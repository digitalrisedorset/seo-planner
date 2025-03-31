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
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    provider: "google" // ✅ manually add this!
                };
            }
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
        async jwt({ token, user, account, trigger }) {
            // Only on initial sign-in
            if (trigger === 'signIn' && account?.provider === "google" && account.id_token) {
                // ✅ First: ensure user exists in Keystone
                const keystoneUser = await createGoogleUser(user); // your existing logic
                token.keystoneUserId = keystoneUser.id;

                // ✅ Then: call your API route to let Keystone set session cookie
                try {
                    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/keystone/google-login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ idToken: account.id_token }),
                    });

                    const data = await res.json();
                    if (!data.success) {
                        console.error('Keystone login via Google failed:', data.error);
                    }
                } catch (err) {
                    console.error('Error during Keystone login:', err);
                }
            }

            // 🧠 Always set token fields on first login
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
                token.provider = user.provider;

                // Keep this if you're still using sessionToken for fallback
                if ("sessionToken" in user) {
                    token.sessionToken = user.sessionToken;
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.keystoneUserId;
                session.user.provider = token.provider;
                session.user.sessionToken = token.sessionToken;
                session.user.image = token.picture;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        }
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
