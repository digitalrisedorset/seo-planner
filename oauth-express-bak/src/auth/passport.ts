// auth/passport.ts
import { KeystoneUser } from '../lib/keystone';
import {PassportStatic} from "passport";

export const initPassport = (passport: PassportStatic) => {
    passport.serializeUser((user, done) => {
        done(null, user); // store the full user object
    });

    passport.deserializeUser((user: KeystoneUser, done) => {
        done(null, user); // restore user into req.user
    });
};
