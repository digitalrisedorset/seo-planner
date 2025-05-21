import {setupPageRoutes} from "./pageRouter"
import {Application} from "express";
import {setupOpenAIRoutes} from "./openaiRouter";

export default (app: Application) => {
    setupPageRoutes(app)
    setupOpenAIRoutes(app)
}