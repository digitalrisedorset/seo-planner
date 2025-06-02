import {list} from "@keystone-6/core";
import {integer, relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";
import {PageVersionManager} from '../services/PageVersionManager';
import {PageVersionForCreation} from "./PageVersion";

export const versionableFields = {
    title: text(),
    description: text(),
    keywords: text(),
};

export const Page = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['slug', 'website'],
        },
    },
    fields: {
        slug: text(),
        ...versionableFields,
        website: relationship({ref: 'Website.pages'}),
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
        },
        beforeOperation: async ({ operation, item, originalItem, context, resolvedData }) => {
            if (operation !== 'update') return;

            const pageId = item.id;
            const newData: PageVersionForCreation = {
                title: resolvedData.title ?? originalItem.title,
                keywords: resolvedData.keywords ?? originalItem.keywords,
                description: resolvedData.description ?? originalItem.description,
            };

            const service = new PageVersionManager(context);
            const previous = await service.getLatestVersion(pageId);

            if (!previous) {
                await service.createNewVersion(item.id, newData);
                return
            }

            const score = service.calculateChangeScore(newData, previous);

            console.log('change score', score)
            if (service.shouldCreateVersion(pageId, score)) {
                await service.createNewVersion(pageId, newData);
                //await service.deactivateOtherVersions(pageId, item.id);
            }
        }
    },
})