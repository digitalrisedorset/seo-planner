import {list} from "@keystone-6/core";
import {checkbox, relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";
import {PageVersionManager} from "../services/PageVersionManager";

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
            initialColumns: ['title', 'page' ,'isActive', 'createdAt'],
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
        currentVersion: relationship({
            ref: 'Page.currentVersion',
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
    },
})