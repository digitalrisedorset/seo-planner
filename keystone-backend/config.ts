import {DatabaseProvider} from "@keystone-6/core/types";

const dotenv = require('dotenv');
dotenv.config();

export type configInfo = {
    frontend: {
        host: string,
        port: number
    },
    backend: {
        host: string,
        port: number
    },
    oauth: {
        host: string,
        port: number
    },
    database: {
        dbtype: DatabaseProvider,
        name: string,
        host: string,
        user: string,
        password: string,
        port: number
    }
}

const config: configInfo = {
    frontend: {
        host: (process.env.FRONTEND_HOST === undefined)?'localhost':process.env.FRONTEND_HOST,
        port: (process.env.FRONTEND_PORT === undefined)?3001:Number(process.env.FRONTEND_PORT)
    },
    backend: {
        host: (process.env.BACKEND_HOST === undefined)?'localhost':process.env.BACKEND_HOST,
        port: (process.env.BACKEND_PORT === undefined)?3002:Number(process.env.BACKEND_PORT)
    },
    oauth: {
        host: (process.env.OAUTH_HOST === undefined)?'localhost':process.env.OAUTH_HOST,
        port: (process.env.OAUTH_PORT === undefined)?3002:Number(process.env.OAUTH_PORT)
    },
    database: {
        dbtype: (process.env.DB_TYPE === undefined)?'postgresql':process.env.DB_TYPE as DatabaseProvider,
        name: (process.env.DB_DATABASE === undefined)?'template1':process.env.DB_DATABASE,
        host: (process.env.DB_HOST === undefined)?'localhost':process.env.DB_HOST,
        user: (process.env.DB_USER === undefined)?'postgres':process.env.DB_USER,
        password: (process.env.DB_PWD === undefined)?'passw0rd':process.env.DB_PWD,
        port: (process.env.DB_PORT === undefined)?3306:Number(process.env.DB_PORT)
    }
}

export { config as keystoneconfig}