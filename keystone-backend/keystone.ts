// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core'

// to keep this file tidy, we define our schema in a different file
import {extendGraphqlSchema, lists} from './schema'

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth'
import {getDatabaseConnection, getDatabaseType} from './schemas/config'
import {keystoneconfig} from './config'

export default withAuth(
  config({
      server: {
          cors: { origin: [keystoneconfig.frontend.host, keystoneconfig.backend.host], credentials: true },
          port: keystoneconfig.backend.port,
          maxFileSize: 200 * 1024 * 1024,
          extendExpressApp: async (app, commonContext) => { /* ... */ },
          extendHttpServer: async (httpServer, commonContext) => { /* ... */ },
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
    lists,
      graphql: {
          extendGraphqlSchema
      },
      ui: {
         /*isAccessAllowed: ()=> true,*/
          // only admins can view the AdminUI
          isAccessAllowed: (context) => {
              return context.session?.data?.isAdmin ?? false
          },
      },
    session,
  })
)
