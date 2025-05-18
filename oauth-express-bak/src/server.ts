import express, {NextFunction} from 'express'
import session from 'express-session'
import passport from 'passport'
import { initLocalStrategy } from './auth/local.js';
import { initGoogleStrategy } from './auth/google.js';
import { initPassport } from './auth/passport.js';
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import {getKeystoneUserById, KeystoneUser} from "./lib/keystone.js";
import {issueJwt, verifyJwt} from "./lib/jwt.js";
initLocalStrategy(passport);
initGoogleStrategy(passport);
initPassport(passport);

dotenv.config()

const app = express()
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // true if using HTTPS in prod
        sameSite: 'lax', // or 'none' if cross-site
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    }
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(verifyJwt)

app.get('/', (req: Request, res: Response) => {
    const user = req.user as KeystoneUser
    res.send(`
    <h1>Home</h1>
    ${user ? `<p>Logged in as ${user.name}</p>` : '<a href="/auth/google">Login with Google</a>'}
  `)
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        successRedirect: `${process.env.FRONTEND_HOST}` // or '/', your homepage, etc.
    })
);

app.post('/logout', (req: Request, res: Response) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.json({ success: true });
        });
    });
});

app.get('/session', (req: Request, res: Response) => {
    res.json({
        user: req.user,
        session: req.session,
        sessionID: req.sessionID
    })
})

app.post('/refresh-session', (req: Request, res: Response) => {
    (async () => {
        const userId = (req.user as { id: string })?.id;

        if (!userId) {
            return res.status(401).json({ error: 'Not logged in' });
        }

        const updatedUser = await getKeystoneUserById(userId);
        if (req.session.passport) {
            req.session.passport.user = updatedUser;
        }

        // ✅ Mark session as modified and explicitly save
        req.session.touch();      // updates session timestamp
        req.session.save((err) => {
            if (err) {
                console.error('❌ Failed to save session:', err);
                return res.status(500).json({ error: 'Could not save session' });
            }

            res.json({ user: updatedUser });
        });
    })().catch(err => {
        console.error('❌ Error refreshing session:', err);
        res.status(500).json({ error: 'Internal error' });
    });
});

app.get('/protected', (req: Request, res: Response) => {
    res.json({ message: 'Protected content', user: req.user });
});

app.post('/auth/local', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        'local',
        (
            err: Error | null,
            user: KeystoneUser | false,
            info: { message?: string } | undefined
        ) => {
            if (err) return res.status(500).json({ error: 'Internal error' });
            if (!user) return res.status(401).json({ error: info?.message || 'Invalid credentials' });

            const token = issueJwt(user);
            return res.json({ token, user });
        }
    )(req, res, next);
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.SERVER_PORT}`)
})