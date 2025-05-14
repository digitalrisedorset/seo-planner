import express from 'express'
import session from 'express-session'
import passport from 'passport'
import './auth/google.js'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import {getKeystoneUserById, KeystoneUser} from "./lib/keystone.js";

dotenv.config()

const app = express()

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

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

app.post('/logout', (req, res) => {
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

app.post('/refresh-session', (req, res) => {
    (async () => {
        const userId = (req.user as { id: string })?.id;

        if (!userId) {
            return res.status(401).json({ error: 'Not logged in' });
        }

        const updatedUser = await getKeystoneUserById(userId);
        req.user = updatedUser;
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

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.SERVER_PORT}`)
})
