import {PassportStatic} from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import {createOrUpdateUser, KeystoneUser} from "../lib/keystone.js";

dotenv.config();

export const initGoogleStrategy = (passport: PassportStatic) => {
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: '/auth/google/callback',
        },
        async (_accessToken, _refreshToken, profile: Profile, done) => {
            try {
                const keystoneUser = await createOrUpdateUser(profile);
                const sessionUser: KeystoneUser = {
                    id: keystoneUser.id,
                    email: keystoneUser.email,
                    name: keystoneUser.name,
                    provider: keystoneUser.provider,
                    hideComplete: keystoneUser.hideComplete || false,
                    websitePreference: keystoneUser.websitePreference
                        ? {
                            id: keystoneUser.websitePreference.id,
                            label: keystoneUser.websitePreference.label,
                        }
                        : null,
                };

                done(null, sessionUser);
            } catch (err) {
                done(err);
            }
        }
    ));
};


