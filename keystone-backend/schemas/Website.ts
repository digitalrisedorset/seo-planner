import {list} from "@keystone-6/core";
import { relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";

export const Website = list({
    access: allowAll,
    fields: {
        label: text(),
        pages: relationship({
            ref: 'Page.website',
            many: true
        }),
        user: relationship({
            ref: 'User.websites',
        }),
        userPreference: relationship({
            ref: 'User.websitePreference',
        }),
    },
    hooks: {
        resolveInput: async ({ item, resolvedData, context }) => {
            const sesh = context.session
            if (!sesh.itemId) {
                throw new Error('You must be logged in to do this!');
            }

            resolvedData.user = { connect: { id: sesh.itemId} }

            return resolvedData;
        },
    }
})