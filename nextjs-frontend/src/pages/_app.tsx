import type { AppProps } from "next/app";
import Page from "@/components/global/components/Page";
import '@/components/global/styles/nprogress.css';

import { ApolloProvider } from "@apollo/client";
import { apolloClient } from '@/apolloclient';
import { SessionProvider } from "next-auth/react";

import StateProvider from "@/state/StateProvider";

import NProgress from 'nprogress';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

    return (
        <SessionProvider session={session}>
            <ApolloProvider client={apolloClient}>
                <StateProvider>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </StateProvider>
            </ApolloProvider>
        </SessionProvider>
    );
}
