// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document'
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import { type Lists } from '.keystone/types'
import {User} from "./schemas/User";
import {Page} from "./schemas/Page";
import {Website} from "./schemas/Website";
import type { GraphQLSchema } from 'graphql'
import { mergeSchemas } from '@graphql-tools/schema'

import {authenticateWithCredentials} from "./mutations/authenticateWithCredentials";
import {authenticateWithGoogle} from "./mutations/authenticateWithGoogle";

export const lists: Lists = {
  Page,
  Website: Website,
  User
}

export function extendGraphqlSchema (baseSchema: GraphQLSchema) {
  return mergeSchemas({
    schemas: [baseSchema],
    typeDefs: `
        type AuthResponse {
          success: Boolean!
          message: String!
        }
        type Mutation {        
          authenticateWithGoogle(
            idToken: String!
          ): AuthResponse    
          authenticateWithCredentials(
            email: String!
            password: String!
          ): AuthResponse        
        }`,
    resolvers: {
      Mutation: {
        authenticateWithGoogle,
        authenticateWithCredentials
      }
    },
  })
}