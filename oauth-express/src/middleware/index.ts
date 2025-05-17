import {setupJsonBodyParse} from "./jsonParser.js";
import {Application} from "express";
import {setupSession} from "./session.js";
import {setupPassport} from "./passport.js";
import {setupJwtValidation} from "./jwt.js";

export default (app: Application) => {
    setupJsonBodyParse(app)
    setupSession(app)
    setupPassport(app)
    setupJwtValidation(app)
}