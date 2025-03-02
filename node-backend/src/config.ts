const dotenv = require('dotenv');
dotenv.config();
const appRoot = require('app-root-path');

export type configInfo = {
    port: number;
    frontendUrl: string;
    export: {
        csvFolder: string
    },
    route: {
        apiPrefix: string;
        pageApiPrefix: string
    },
    rootDir: string
}

export const config: configInfo = {
    port: (process.env.PORT === undefined)? 8080: Number(process.env.PORT),

    frontendUrl: (process.env.FRONTEND_URL === undefined)?'http://localhost:3001':process.env.FRONTEND_URL,

    export: {
        csvFolder: (process.env.EXPORT_CSV_FOLDER === undefined)? 'csv_export': process.env.EXPORT_CSV_FOLDER,
    },

    /**
     * Routes access
     */
    route: {
        apiPrefix: '/',
        pageApiPrefix: '/page'
    },
    rootDir: appRoot.resolve('/')
}