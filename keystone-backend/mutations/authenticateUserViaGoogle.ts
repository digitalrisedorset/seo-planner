import type { Context } from '.keystone/types'
import createSessionTokenForUser from "../helper/authenticateUserWithPassword";

async function authenticateUserViaGoogle(
    root: any,
    { email, secret }: { email: string, secret: string },
    context: Context
): Promise<string> {
    if (secret !== process.env.INTERNAL_AUTH_SECRET) {
        throw new Error('Unauthorized');
    }

    console.log('email', email)
    // 2. Query find the user by email
    const user = await context.query.User.findOne({ where: { email } });


    console.log('user', user)

    if (!user) {
        // Optionally: create one with a random password
        const newUser = await context.db.User.createOne({
            data: { email, name: 'OAuth User', password: crypto.randomUUID() },
        });
        return await createSessionTokenForUser(newUser.id, context);
    }

    return await createSessionTokenForUser(user.id, context);
}

export default authenticateUserViaGoogle;