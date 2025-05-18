// oauth-express/auth/local.ts
import { Strategy as LocalStrategy } from 'passport-local';
import { fetchKeystoneUserByEmailAndPassword } from '../lib/keystone.js';
import {PassportStatic} from "passport";

export const initLocalStrategy = (passport: PassportStatic) => {
    passport.use(new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                console.log('initLocalStrategy', {email, password})
                const user = await fetchKeystoneUserByEmailAndPassword(email, password);
                if (!user) {
                    return done(null, false, { message: 'Invalid credentials' });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));
};
