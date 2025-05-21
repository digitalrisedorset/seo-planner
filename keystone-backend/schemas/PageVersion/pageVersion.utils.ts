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
