import express, { Application, Request, Response, NextFunction } from 'express'
import { config } from "../config";
import { corsOptions } from '../lib/cors-setup'
import {OpenAIHandler} from "../controller/openai-handler";
import {sanitiseUrl} from "../lib/url";

export const setupOpenAIRoutes = (app: Application) => {
    const router = express.Router()
    const options = corsOptions();
    router.use(options)

    const openaiHandlerController = new OpenAIHandler()

    router.use('/', (req: Request, res: Response, next: NextFunction) => {
        console.log(`augment metadata request sanitised: ${sanitiseUrl(req.url)}`)
        next()
    })

    router.post("/augment-page-data", openaiHandlerController.getAugmentedMetadata)

    router.options('*', options);

    app.use(config.route.openaiPrefix, router)
}