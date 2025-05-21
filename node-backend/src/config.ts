const dotenv = require('dotenv');
dotenv.config();
const appRoot = require('app-root-path');

export type configInfo = {
    port: number;
    frontendUrl: string;
    siteConsumerUrl: string;
    export: {
        csvFolder: string
    },
    route: {
        apiPrefix: string;
        pageApiPrefix: string;
        openaiPrefix: string;
    },
    rootDir: string;
    openai: {
        model: string;
        apiKey: string;
    }
}

export const config: configInfo = {
    port: (process.env.PORT === undefined)? 8080: Number(process.env.PORT),

    frontendUrl: (process.env.FRONTEND_URL === undefined)?'http://localhost:3001':process.env.FRONTEND_URL,

    siteConsumerUrl: (process.env.SITE_CONSUMER_URL === undefined)?'http://digitalrisedorset.com':process.env.SITE_CONSUMER_URL,
    export: {
        csvFolder: (process.env.EXPORT_CSV_FOLDER === undefined)? 'csv_export': process.env.EXPORT_CSV_FOLDER,
    },

    /**
     * Routes access
     */
    route: {
        apiPrefix: '/',
        pageApiPrefix: '/page',
        openaiPrefix: '/openai'
    },
    rootDir: appRoot.resolve('/'),
    openai: {
        model: (process.env.OPENAI_MODEL === undefined)? 'o3-mini': process.env.OPENAI_MODEL,
        apiKey: (process.env.OPENAI_API_KEY === undefined)? 'rrfdf': process.env.OPENAI_API_KEY,
    }
}