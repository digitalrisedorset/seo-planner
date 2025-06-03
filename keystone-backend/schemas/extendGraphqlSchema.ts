import { graphql } from '@keystone-6/core';
import {updatePageContent} from "../mutations/UpdatePageContent";
import {upsertUser} from "../mutations/UpsertUsert";

export const extendGraphqlSchema = graphql.extend(base => {
    return {
        mutation: {
            updatePageContent: graphql.field({
                type: graphql.String,
                args: {
                    id: graphql.arg({ type: graphql.nonNull(graphql.ID) }),
                    slug: graphql.arg({ type: graphql.String }),
                    title: graphql.arg({ type: graphql.String }),
                    keywords: graphql.arg({ type: graphql.String }),
                    description: graphql.arg({ type: graphql.String }),
                    website: graphql.arg({
                        type: graphql.inputObject({
                            name: 'WebsiteRelationInput',
                            fields: {
                                connect: graphql.arg({
                                    type: graphql.inputObject({
                                        name: 'WebsiteConnectInput',
                                        fields: {
                                            id: graphql.arg({ type: graphql.nonNull(graphql.ID) }),
                                        }
                                    })
                                })
                            }
                        })
                    }),
                    ranking: graphql.arg({ type: graphql.Int }),
                    priority: graphql.arg({ type: graphql.Int }),
                },
                async resolve(root, args, context) {
                    return updatePageContent(root, args, context);
                },
            }),
            upsertUser: graphql.field({
                type: base.object('User'),
                args: {
                    email: graphql.arg({ type: graphql.nonNull(graphql.String) }),
                    name: graphql.arg({ type: graphql.String }),
                    provider: graphql.arg({ type: graphql.String }),
                },
                async resolve(root, args, context) {
                    return upsertUser(root, args, context);
                },
            }),
        },
    };
});
