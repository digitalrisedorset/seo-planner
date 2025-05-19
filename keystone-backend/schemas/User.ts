import { list } from '@keystone-6/core';
import { checkbox, password, relationship, select, text, timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { websiteStatusPreference } from './websiteStatus';

const commonPasswords = [
    'password', '123456', '123456789', 'qwerty', 'abc123', 'password1', '123123',
];

export const User = list({
    access: allowAll,
    fields: {
        name: text({
            isFilterable: true,
            isOrderable: false,
        }),
        email: text({
            isFilterable: true,
            isOrderable: false,
            isIndexed: 'unique',
            validation: {
                isRequired: true,
            },
        }),
        provider: select({
            options: [
                { label: 'Credentials', value: 'credentials' },
                { label: 'Google', value: 'google' },
                { label: 'Apple', value: 'apple' },
            ],
            defaultValue: 'credentials',
        }),
        password: password({
            hooks: {
                validateInput: async ({ resolvedData, item, addValidationError }) => {
                    const provider = resolvedData.provider ?? item?.provider ?? null;
                    const password = resolvedData.password ?? item.password;

                    if (provider === 'credentials') {
                        if (!password) {
                            addValidationError('Password is required for credential-based users.');
                        } else if (password.length < 8) {
                            addValidationError('Password must be at least 8 characters long.');
                        }
                    }
                },
            },
        }),
        isAdmin: checkbox({
            defaultValue: false,
        }),
        websitePreference: relationship({
            ref: 'Website.userPreference',
        }),
        ...websiteStatusPreference,
        websites: relationship({
            ref: 'Website.user',
            many: true,
        }),
        tasks: relationship({ ref: 'Page.assignedTo', many: true }),
        sharedTasks: relationship({ ref: 'Page.sharedWith', many: true }),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
        }),
    },
    hooks: {
        validateInput: async ({ resolvedData, addValidationError }) => {
            if (resolvedData.password && commonPasswords.includes(resolvedData.password.toLowerCase())) {
                addValidationError('This password is too common. Please choose a stronger one.');
            }
        },
    },
});
