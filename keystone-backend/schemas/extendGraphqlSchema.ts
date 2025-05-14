import { graphql } from '@keystone-6/core';

export const extendGraphqlSchema = graphql.extend(base => {
    return {
        mutation: {
            upsertUser: graphql.field({
                type: base.object('User'),
                args: {
                    email: graphql.arg({ type: graphql.nonNull(graphql.String) }),
                    name: graphql.arg({ type: graphql.String }),
                    provider: graphql.arg({ type: graphql.String }),
                },
                async resolve(root, { email, name, provider }, context) {
                    const existing = await context.db.User.findOne({ where: { email } });

                    if (existing) {
                        return await context.db.User.updateOne({
                            where: { id: existing.id },
                            data: {
                                name,
                                provider,
                            },
                        });
                    }

                    return await context.db.User.createOne({
                        data: {
                            email,
                            name,
                            provider,
                        },
                    });
                },
            }),
        },
    };
});
