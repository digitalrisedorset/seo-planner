import {setupJsonBodyParse} from "./jsonParser.js";
import {Application} from "express";
import {setupSession} from "./session.js";
import {setupPassport} from "./passport.js";

export default (app: Application) => {
    setupJsonBodyParse(app)
    setupSession(app)
    setupPassport(app)
}