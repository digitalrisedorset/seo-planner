import {Application} from "express";
import passport from "passport";

export const setupPassport = (app: Application) => {
    app.use(passport.initialize())
    app.use(passport.session())
}