import {list} from "@keystone-6/core";
import {integer, relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";

export const Page = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['slug', 'website'],
        },
    },
    fields: {
        slug: text(),
        website: relationship({ref: 'Website.pages'}),
        currentVersion: relationship({ref: 'PageVersion.currentVersion'}),
        ranking: integer(),
        priority: integer({defaultValue: 0}),
        changeScore: integer(),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
        }),
        updatedAt: timestamp(),
        versions: relationship({ ref: 'PageVersion.page', many: true }),
    },
    hooks: {
        resolveInput: async ({ item, resolvedData, context }) => {
            resolvedData.updatedAt = (new Date()).toISOString()

            return resolvedData;
        }
    },
})