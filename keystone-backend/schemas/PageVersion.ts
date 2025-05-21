import {list} from "@keystone-6/core";
import {checkbox, relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";
import {deactivateOtherVersions, enforceMaxPageVersions} from "./PageVersion/pageVersion.utils";

export const PageVersion = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['title', 'isActive', 'createdAt'],
        },
    },
    fields: {
        title: text(),
        description: text(),
        keywords: text(),
        isActive: checkbox({ defaultValue: false }),
        createdAt: timestamp({ defaultValue: { kind: 'now' } }),
        page: relationship({
            ref: 'Page.versions',
        }),
    },
    hooks: {
        resolveInput: async ({ operation, resolvedData, context }) => {
            if (operation !== 'create') return resolvedData;

            const pageId = resolvedData.page?.connect?.id;

            await enforceMaxPageVersions(context, pageId)

            return resolvedData;
        },

        // Optionally still use afterOperation for activating one version and deactivating others
        afterOperation: async ({ resolvedData, operation, item, context }) => {
            if ((operation === 'create' || operation === 'update') && item.isActive && item.pageId) {
                    const isActivating = resolvedData.isActive === true;

                    // Get the Page ID (either from new relationship or existing item)
                    const pageId = resolvedData.page?.connect?.id || item?.pageId;

                    if (isActivating && pageId) {
                        // Deactivate other versions for the same page
                        await deactivateOtherVersions(context, pageId, item.id)
                    }

                    return resolvedData
            }
        },
    },
})