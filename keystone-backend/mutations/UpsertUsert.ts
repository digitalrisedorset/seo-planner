import type { Context } from '.keystone/types'

interface UserInput {
    email: string;
    name: string;
    provider: string
}
export async function upsertUser(
    root: any,
    args: UserInput,
    context: Context
): Promise<string> {
    const { email, name, provider } = args;

    const existing = await context.db.User.findOne({ where: { email } });

    if (existing) {
        return await context.db.User.updateOne({
            where: { id: existing.id },
            data: {
                name,
                provider,
            },
        });
    }

    return await context.db.User.createOne({
        data: {
            email,
            name,
            provider,
        },
    });
}