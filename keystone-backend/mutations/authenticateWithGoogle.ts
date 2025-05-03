import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const authenticateWithGoogle = async (_root: any, { idToken }: { idToken: string }, context: any) => {
    let payload;

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        payload = ticket.getPayload();
    } catch (err) {
        console.error('Invalid Google token:', err);
        return { success: false, message: 'Invalid Google token' };
    }

    if (!payload?.email) {
        return { success: false, message: 'Missing email in token' };
    }

    const email = payload.email;
    let user = await context.db.User.findOne({ where: { email } });

    if (!user) {
        user = await context.db.User.createOne({
            data: {
                email,
                name: payload.name || 'No Name',
                provider: 'google',
                subjectId: payload.sub
            },
        });
    }

    const cookieHeader = await context.sessionStrategy.start({
        itemId: user.id,
        data: {
            isAdmin: user.isAdmin,
        },
    })

    console.log('cookieHeader', cookieHeader)

    context.req?.res?.setHeader('Set-Cookie', cookieHeader);

    return {
        success: true,
        message: 'Authenticated successfully',
    };
};
