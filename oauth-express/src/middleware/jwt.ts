import {Application} from "express";
import {veriyfJwt} from "../lib/jwt";

export const setupJwtValidation = (app: Application) => {
    app.use(veriyfJwt)
}
