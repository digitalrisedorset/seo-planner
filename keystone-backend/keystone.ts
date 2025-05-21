// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core'

// to keep this file tidy, we define our schema in a different file
import {getDatabaseConnection, getDatabaseType} from './schemas/config'
import {keystoneconfig} from './config'
import { withAuth, session } from './auth'
import {lists} from "./schema";
import {extendGraphqlSchema} from "./schemas/extendGraphqlSchema";

const sessionSecret = process.env.SESSION_SECRET || 'fallback-secret';

export default withAuth(config({
      server: {
          cors: { origin: [keystoneconfig.frontend.host, keystoneconfig.backend.host, keystoneconfig.oauth.host], credentials: true },
          port: keystoneconfig.backend.port,
          maxFileSize: 200 * 1024 * 1024
      },
    db: {
        provider: getDatabaseType(),
        url: getDatabaseConnection(),
        onConnect: async context => {
            console.log('Connected to the database')
        },
        //Optional advanced configuration
        //enableLogging: true,
        idField: { kind: 'uuid' }
    },
    session,
    lists,
    graphql: {
        extendGraphqlSchema,
    },
        ui: {
            /*isAccessAllowed: () => true // for local dev*/
            isAccessAllowed: ({ req }) => {
                return req.headers.authorization === `Bearer ${process.env.KEYSTONE_SERVICE_TOKEN}`;
            }
        }
    }
))


