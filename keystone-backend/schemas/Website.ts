import {list} from "@keystone-6/core";
import { relationship, text} from "@keystone-6/core/fields";
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
    }
})