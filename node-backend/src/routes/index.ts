import {setupPageRoutes} from "./pageRouter"
import {Application} from "express";

export default (app: Application) => {
    setupPageRoutes(app)
}