import { checkbox } from "@keystone-6/core/fields";

export const websiteStatusPreference = {
    hideComplete: checkbox({
        defaultValue: false,
        label: 'Hide Complete Task',
    }),
};