import {list} from "@keystone-6/core";
import {integer, relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";

export const Page = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['id', 'label', 'assignedTo', 'website', 'createdAt'],
        },
    },
    fields: {
        slug: text(),
        keywords: text(),
        description: text(),
        assignedTo: relationship({ ref: 'User.pages' }),
        website: relationship({ref: 'Website.pages'}),
        ranking: integer(),
        priority: integer({defaultValue: 0}),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
        }),
        updatedAt: timestamp(),
        completedAt: timestamp(),
    },
    hooks: {
        resolveInput: async ({ item, resolvedData, context }) => {
            const sesh = context.session
            if (!sesh.itemId) {
                throw new Error('You must be logged in to do this!');
            }

            resolvedData.assignedTo = { connect: { id: sesh.itemId} }
            resolvedData.updatedAt = (new Date()).toISOString()

            return resolvedData;
        },
    }
})