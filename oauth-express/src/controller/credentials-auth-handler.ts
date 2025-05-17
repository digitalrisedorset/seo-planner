import {OAuthControllerInterface} from "./OAuthControllerInterface.js";
import {ErrorWrapper} from "../error-handler.js";
import passport from "passport";
import { Request, Response } from "express";

export class LoginWithCredentialsHandler implements OAuthControllerInterface {
    errorWrapper = new ErrorWrapper()

    authenticate = (req: Request, res: Response) => {
        passport.authenticate('google', { scope: ['profile', 'email'] })
    }

    loginCallback = (req: Request, res: Response) => {
        passport.authenticate('google', {
            failureRedirect: '/',
            successRedirect: `${process.env.FRONTEND_HOST}` // or '/', your homepage, etc.
        })
    }
}