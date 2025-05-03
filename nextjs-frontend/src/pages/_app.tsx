import type { AppProps } from "next/app";
import Page from "@/components/global/components/Page";
import '@/components/global/styles/nprogress.css';

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from '@/apolloclient';

import StateProvider from "@/state/StateProvider";
import {GoogleOAuthProvider} from "@react-oauth/google";

import NProgress from 'nprogress';
import Router from 'next/router';
import { config } from "@/config";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

    return (
            <ApolloProvider client={apolloClient}>
                <GoogleOAuthProvider clientId={config.googleClientId}>
                    <StateProvider>
                        <Page>
                            <Component {...pageProps} />
                        </Page>
                    </StateProvider>
                </GoogleOAuthProvider>
            </ApolloProvider>
    );
}
