import { KeystoneContext } from '@keystone-6/core/types';
import levenshtein from "js-levenshtein";
import {PageVersionForCreation} from "../schemas/PageVersion";

export const VERSION_THRESHOLD = 3;

export const SCORE_CHANGE_THRESHOLD = 120;

export class PageVersionManager {
    constructor(private context: KeystoneContext) {}

    async getLatestVersion(pageId: string) {
        const versions = await this.context.query.PageVersion.findMany({
            where: { page: { id: { equals: pageId } } },
            orderBy: { createdAt: 'desc' },
            take: 1,
            query: 'id title description',
        });

        return versions[0];
    }

    async enforceMaxVersions(pageId: string) {
        const versions = await this.context.query.PageVersion.findMany({
            where: { page: { id: { equals: pageId } } },
            orderBy: { createdAt: 'asc' },
            query: 'id createdAt',
        });

        if (versions.length >= VERSION_THRESHOLD) {
            const oldest = versions[0];
            await this.context.query.PageVersion.deleteOne({
                where: { id: oldest.id },
            });
        }
    }

    async ensureActiveVersionAfterDelete(pageId: string, deletedId: string) {
        const latestVersion = await this.context.query.PageVersion.findMany({
            where: {
                page: { id: { equals: pageId } },
                id: { not: { equals: deletedId } },
            },
            orderBy: { createdAt: 'desc' },
            take: 1,
            query: 'id',
        });

        const lastVersion = latestVersion[0];

        if (lastVersion?.id) {
            await this.context.db.PageVersion.updateOne({
                where: { id: lastVersion.id },
                data: { isActive: true },
            });
        }
    }

    async ensureVersionConsistencyOnCreateOrUpdate({
       pageId,
       currentVersionId,
       wasExplicitlyActivated,
       wasCreated
    }: {
        pageId: string;
        currentVersionId: string;
        wasExplicitlyActivated: boolean;
        wasCreated: boolean;
    }) {
        if (wasExplicitlyActivated && pageId) {
            // Deactivate other versions for the same page
            await this.deactivateOtherVersions(pageId, currentVersionId)
        }

        if (wasCreated && pageId) {
            await this.activateLatestVersionOnly(pageId, currentVersionId);
        }
    }

    async activateLatestVersionOnly(
        pageId: string,
        currentId: string
    ): Promise<void> {
        const allVersions = await this.context.query.PageVersion.findMany({
            where: { page: { id: { equals: pageId } }, id: { not: { equals: currentId } } },
            query: 'id',
        });

        // Step 2: Bulk deactivate all of them (except this one, if needed)
        for (const version of allVersions) {
            await this.context.query.PageVersion.updateOne({
                where: { id: version.id },
                data: { isActive: version.id === currentId },
                query: 'id',
            });
        }
    }

    calculateChangeScore(newData: PageVersionForCreation, previousVersion: PageVersionForCreation) {
        const titleDiff = levenshtein(newData.title || '', previousVersion.title || '');
        const descDiff = levenshtein(newData.description || '', previousVersion.description || '');

        const totalScore =
            titleDiff * 2 +     // weight: 2
            descDiff * 3;       // weight: 3

        return totalScore;
    }

    async shouldCreateVersion(pageId: string, changeScore: number): Promise<boolean> {
        const count = await this.context.query.PageVersion.count({
            where: { page: { id: { equals: pageId } } },
        });

        return count < VERSION_THRESHOLD || changeScore >= SCORE_CHANGE_THRESHOLD;
    }

    async createNewVersion(pageId: string, data: PageVersionForCreation) {
        return await this.context.db.PageVersion.createOne({
            data: {
                ...data,
                page: { connect: { id: pageId } },
                isActive: true,
            },
        });
    }

    async deactivateOtherVersions(pageId: string, activeId: string) {
        const allVersions = await this.context.query.PageVersion.findMany({
            where: {page: {id: {equals: pageId}}, id: {not: {equals: activeId}}},
            query: 'id',
        });

        // Step 2: Bulk deactivate all of them (except this one, if needed)
        for (const version of allVersions) {
            await this.context.query.PageVersion.updateOne({
                where: {id: version.id},
                data: {isActive: false},
                query: 'id',
            });
        }
    }
}


