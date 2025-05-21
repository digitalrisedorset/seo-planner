import {list} from "@keystone-6/core";
import {integer, relationship, text, timestamp} from "@keystone-6/core/fields";
import {allowAll} from "@keystone-6/core/access";

export const Page = list({
    access: allowAll,
    ui: {
        listView: {
            initialColumns: ['id', 'label', 'assignedTo', 'website', 'createdAt'],
        },
    },
    fields: {
        slug: text(),
        title: text(),
        keywords: text(),
        description: text(),
        website: relationship({ref: 'Website.pages'}),
        ranking: integer(),
        priority: integer({defaultValue: 0}),
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

            const { title, keywords, description } = resolvedData;

            await context.db.PageVersion.createOne({
                data: {
                    title: title ?? originalItem.title,
                    keywords: keywords ?? originalItem.keywords,
                    description: description ?? originalItem.description,
                    isActive: true,
                    page: { connect: { id: item.id } },
                },
            });
        }
    },
})