import express, { Application, Request, Response, NextFunction } from 'express'
import { config } from "../config";
import { corsOptions } from '../lib/cors-setup'
import {GenericAuthHandler} from "../controller/generic-auth-handler.js";

export const setupGenericAuthRoutes = (app: Application) => {
    const router = express.Router()
    const options = corsOptions();
    router.use(options)

    const genericHandlerController = new GenericAuthHandler()

    router.use('/', (req: Request, res: Response, next: NextFunction) => {
        console.log(`Generic Auth request: ${req.url}`)
        next()
    })

    router.get("/session", genericHandlerController.getUserSession)

    router.get("/logout", genericHandlerController.logout)

    router.post("/refresh-session", genericHandlerController.refreshSession)

    router.options('*', options);

    app.use(config.route.apiPrefix, router)
}