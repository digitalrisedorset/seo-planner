import levenshtein from 'js-levenshtein';

export async function enforceMaxPageVersions(context, pageId: string): Promise<void> {
    const versions = await context.query.PageVersion.findMany({
        where: { page: { id: { equals: pageId } } },
        orderBy: { createdAt: 'asc' },
        query: 'id createdAt',
    });

    if (versions.length >= 3) {
        const oldest = versions[0];
        await context.query.PageVersion.deleteOne({
            where: { id: oldest.id },
        });
    }
}

export async function deactivateOtherVersions(context, pageId: string, currentId: string): Promise<void> {
    const allVersions = await context.query.PageVersion.findMany({
        where: { page: { id: { equals: pageId } }, id: { not: { equals: currentId } } },
        query: 'id',
    });

    // Step 2: Bulk deactivate all of them (except this one, if needed)
    for (const version of allVersions) {
        await context.query.PageVersion.updateOne({
            where: { id: version.id },
            data: { isActive: false },
            query: 'id',
        });
    }
}

export async function activateLatestVersionOnly(
    context,
    pageId: string,
    currentId: string
): Promise<void> {
    // Step 1: Set current version to active
    await context.db.PageVersion.updateOne({
        where: { id: currentId },
        data: { isActive: true },
    });

    // Step 2: Deactivate all others
    await context.db.PageVersion.updateMany({
        where: {
            page: { id: { equals: pageId } },
            id: { not: { equals: currentId } },
        },
        data: { isActive: false },
    });
}

export async function activateLatestVersion(
    context,
    pageId: string,
    deletedId: string
): Promise<void> {
    const latestVersion = await context.query.PageVersion.findMany({
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
        await context.db.PageVersion.updateOne({
            where: { id: lastVersion.id },
            data: { isActive: true },
        });
    }
}

export function scoreSeoChange(newVersion, oldVersion): number {
    const slugDiff = levenshtein(newVersion.slug || '', oldVersion.slug || '');
    const titleDiff = levenshtein(newVersion.title || '', oldVersion.title || '');
    const descDiff = levenshtein(newVersion.description || '', oldVersion.description || '');

    const totalScore =
        slugDiff * 1 +      // weight: 1
        titleDiff * 2 +     // weight: 2
        descDiff * 3;       // weight: 3

    return totalScore;
}
