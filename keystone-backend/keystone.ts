import dotenv from 'dotenv'
dotenv.config()

import { config } from '@keystone-6/core'
import {extendGraphqlSchema, lists} from './schema' // or './src/keystone/schema' if that's the structure
import { keystoneconfig } from './config'
import {session, withAuth} from "./auth";

export default withAuth(config({
    server: {
        cors: {
            origin: [keystoneconfig.frontend.host, keystoneconfig.backend.host],
            credentials: true,
            exposedHeaders: ['Set-Cookie'],
        },
        port: keystoneconfig.backend.port,
        maxFileSize: 200 * 1024 * 1024,
        extendExpressApp: async (app, commonContext) => { /* optional */ },
        extendHttpServer: async (httpServer, commonContext) => { /* optional */ },
    },
    db: {
        provider: 'postgresql',
        url: process.env.DATABASE_URL!,
        extendPrismaSchema: (schema) => {
            return schema.replace(
                /(generator [^}]+)}/g,
                ['$1', 'previewFeatures = ["driverAdapters"]\n', '}'].join(''),
            )
        },
        onConnect: async (context) => {
            console.log('Connected to the database')
        },
        idField: { kind: 'uuid' },
    },
    ui: {
        basePath: '/admin',
        isAccessAllowed: ({ session }) => session?.allowAdminUI === true,
    },
    lists,
    session,
    graphql: {
        extendGraphqlSchema
    },
}))
