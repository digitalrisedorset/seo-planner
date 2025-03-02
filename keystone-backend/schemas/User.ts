import {list} from "@keystone-6/core";
import {checkbox, password, relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";
import type {Session} from "../schema";
import {websiteStatusPreference} from "./websiteStatus";

export function isAdminOrSameUser ({ session }: { session?: Session }) {
    // you need to have a session to do this
    if (!session) return false

    // admins can do anything
    if (session.data.isAdmin) return true
}

export function isAdmin ({ session }: { session?: Session }) {
    // you need to have a session to do this
    if (!session) return false

    // admins can do anything
    if (session.data.isAdmin) return true

    // otherwise, no
    return false
}

export const User = list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,
    // this is the fields for our User list
    fields: {
        // by adding isRequired, we enforce that every User should have a name
        //   if no name is provided, an error will be displayed
        name: text(),

        email: text({
            validation: { isRequired: true },
            // by adding isIndexed: 'unique', we're saying that no user can have the same
            // email as another user - this may or may not be a good idea for your project
            // email as another user - this may or may not be a good idea for your project
            isIndexed: 'unique',
        }),

        password: password({ validation: { isRequired: true } }),

        websitePreference: relationship({
            ref: 'Website.userPreference',
        }),
        ...websiteStatusPreference,
        websites: relationship({
            ref: 'Website.user',
            many: true
        }),

        tasks: relationship({ ref: 'Page.assignedTo', many: true }),

        sharedTasks: relationship({ ref: 'Page.sharedWith', many: true }),

        createdAt: timestamp({
            // this sets the timestamp to Date.now() when the user is first created
            defaultValue: { kind: 'now' },
        }),
        isAdmin: checkbox({
            access: {
                // only the respective user, or an admin can read this field
                read: isAdminOrSameUser,

                // only admins can create, or update this field
                create: isAdmin,
                update: isAdmin,
            },
            defaultValue: false,
            ui: {
                // only admins can edit this field
                createView: {
                    fieldMode: args => (isAdmin(args) ? 'edit' : 'hidden'),
                },
                itemView: {
                    fieldMode: args => (isAdmin(args) ? 'edit' : 'read'),
                },
            },
        }),
    }
})