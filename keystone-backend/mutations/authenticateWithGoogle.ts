import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticateWithGoogle = async (_root: any, { idToken }: { idToken: string }, context: any) => {
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

    const email = payload.email;
    let user = await context.db.User.findOne({ where: { email } });

    if (!user) {
        user = await context.db.User.createOne({
            data: {
                email,
                name: payload.name,
            },
        });
    }

    await context.sessionStrategy.start({ data: { id: user.id } });

    return {
        success: true,
        message: 'Authenticated successfully',
    };
};

export default authenticateWithGoogle;
