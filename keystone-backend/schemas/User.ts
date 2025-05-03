import {list} from "@keystone-6/core";
import {checkbox, password, relationship, text, timestamp, select} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";
import {websiteStatusPreference} from "./websiteStatus";
import type { Session } from '.keystone/types'

export function isAdminOrSameUser ({ session }: { session?: Session }) {
    return true;
    // you need to have a session to do this
    if (!session) return false

    // admins can do anything
    if (session.data.isAdmin) return true
}

export function isAdmin ({ session }: { session?: Session }) {
    return true;
    // you need to have a session to do this
    if (!session) return false

    // admins can do anything
    if (session.data.isAdmin) return true

    // otherwise, no
    return false
}

const commonPasswords = [
    "password", "123456", "123456789", "qwerty", "abc123", "password1", "123123"
];

export const User = list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,
    // this is the fields for our User list
    fields: {
        name: text(),
        email: text({
            access: allowAll,
            isFilterable: true,
            isOrderable: false,
            isIndexed: 'unique',
            validation: {
                isRequired: true,
            },
        }),
        emailVerified: checkbox({ defaultValue: false }),
        emailVerificationToken: text(),
        emailVerificationTokenExpiry: timestamp(),
        provider: select({
            options: [
                { label: 'Credentials', value: 'credentials' },
                { label: 'Google', value: 'google' },
                { label: 'Apple', value: 'apple' },
            ],
            validation: { isRequired: true },
        }),
        subjectId: text({
            validation: { isRequired: true },
            isIndexed: 'unique',
        }),
        // the user's password, used as the secret field for authentication
        //   should not be publicly visible
        password: password({
            hooks: {
                validateInput: async ({ resolvedData, item, addValidationError }) => {
                    if (resolvedData.provider === null && resolvedData.password) {
                        const provider = resolvedData.provider ?? item?.provider ?? null
                        const password = resolvedData.password
                        const isAdmin = resolvedData.isAdmin ?? item?.isAdmin ?? false

                        // Require password for credential-based users
                        if (provider === null || provider === 'credentials') {
                            if (!password) {
                                addValidationError('Password is required for credential-based users.')
                            } else if (password.length < 8) {
                                addValidationError('Password must be at least 8 characters long.')
                            }
                        }

                        // Extra rules for admin passwords
                        if (password && isAdmin) {
                            const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/
                            if (!strongPasswordRegex.test(password)) {
                                addValidationError(
                                    'Admin password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 special character.'
                                )
                            }
                        }
                    }
                },
            },
        }),
        websitePreference: relationship({
            ref: 'Website.userPreference',
        }),
        ...websiteStatusPreference,
        websites: relationship({
            ref: 'Website.user',
            many: true
        }),

        pages: relationship({ ref: 'Page.assignedTo', many: true }),

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
    },
    hooks: {
        validateInput: async ({ resolvedData, addValidationError }) => {
            if (resolvedData.password && commonPasswords.includes(resolvedData.password.toLowerCase())) {
                addValidationError("This password is too common. Please choose a stronger one.");
            }
        },
    },
})