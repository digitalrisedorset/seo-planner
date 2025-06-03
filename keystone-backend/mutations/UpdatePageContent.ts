import type { Context } from '.keystone/types'
import {PageVersionManager} from "../services/PageVersionManager";

interface UpdateInput {
    id: string;
    slug: string;
    title?: string;
    keywords?: string;
    description?: string;
    ranking?: number;
    priority?: number;
}

export async function updatePageContent(
    root: any,
    args: UpdateInput,
    context: Context
): Promise<string> {
    const { id, slug, title, keywords, description, website, ranking, priority } = args;

    const service = new PageVersionManager(context);
    const existingPage = await context.db.Page.findOne({ where: { id } });

    if (!existingPage) {
        throw new Error(`Page with ID ${id} not found`);
    }

    // Update Page metadata (not versioned)
    await context.db.Page.updateOne({
        where: { id },
        data: {
            slug,
            website,
            ranking: ranking ?? existingPage.ranking,
            priority: priority ?? existingPage.priority,
        },
    });

    // Handle versioning
    const latest = await service.getLatestVersion(id);
    const newData = {
        title: title ?? latest?.title ?? '',
        keywords: keywords ?? latest?.keywords ?? '',
        description: description ?? latest?.description ?? '',
    };

    const score = latest
        ? service.calculateChangeScore(newData, latest)
        : 999; // force version creation

    if (await service.shouldCreateVersion(id, score)) {
        const newVersion = await service.createNewVersion(id, newData);
        await service.deactivateOtherVersions(id, newVersion.id);
        return newVersion.id;
    }

    return 'no-version-created';
}