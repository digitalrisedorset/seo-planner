import {list} from "@keystone-6/core";
import {checkbox, relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";
import {PageVersionManager} from "../services/PageVersionManager";
import {versionableFields} from "./Page";

export interface PageVersionData {
    title: string,
    description: string,
    keywords: string,
    isActive: boolean,
}

export type PageVersionForCreation = Omit<PageVersionData, 'isActive'>;

export const PageVersion = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['title', 'isActive', 'createdAt'],
        },
    },
    fields: {
        ...versionableFields,
        isActive: checkbox({ defaultValue: false }),
        createdAt: timestamp({ defaultValue: { kind: 'now' } }),
        page: relationship({
            ref: 'Page.versions',
        }),
    },
    hooks: {
        resolveInput: async ({ operation, resolvedData, context }) => {
            if (operation !== 'create' && operation !== 'delete') return resolvedData;

            const pageId = resolvedData.page?.connect?.id;
            if (!pageId) return resolvedData;

            const service = new PageVersionManager(context);
            await service.enforceMaxVersions(pageId);

            return resolvedData;
        },
        beforeOperation: async ({ operation, item, context }) => {
            if (operation === 'delete' && item.isActive === true) {
                const service = new PageVersionManager(context);
                await service.ensureActiveVersionAfterDelete(item?.pageId, item?.id);
            }
        },
        // Optionally still use afterOperation for activating one version and deactivating others
        afterOperation: async ({ resolvedData, operation, item, context }) => {
            if ((operation === 'create' || operation === 'update') && item.isActive && item.pageId) {
                const service = new PageVersionManager(context);
                await service.ensureVersionConsistencyOnCreateOrUpdate({
                    pageId: resolvedData.page?.connect?.id || item?.pageId,
                    currentVersionId: item.id,
                    wasExplicitlyActivated: resolvedData.isActive === true,
                    wasCreated: operation === 'create',
                });

                return resolvedData
            }
        },
    },
})