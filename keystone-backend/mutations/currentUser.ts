
const currentUser = async (_root: any, { id, email, name }: { id: string; email: string; name?: string }, context: any
) => {
    const session = context.session;
    if (!session?.itemId) return null;

    const user = await context.db.User.findOne({
        where: { id: session.itemId },
    });

    return user;
}

export default currentUser;