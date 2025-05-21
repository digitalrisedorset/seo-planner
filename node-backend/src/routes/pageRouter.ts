import express, { Application, Request, Response, NextFunction } from 'express'
import { config } from "../config";
import { corsOptions } from '../lib/cors-setup'
import { PageHandler } from "../controller/page-handler";
import {sanitiseUrl} from "../lib/url";

export const setupPageRoutes = (app: Application) => {
    const router = express.Router()
    const options = corsOptions();
    router.use(options)

    const pageHandlerController = new PageHandler()

    router.use('/', (req: Request, res: Response, next: NextFunction) => {
        console.log(`page metadata request: ${sanitiseUrl(req.url)}`)
        next()
    })

    router.post("/create-csv-export", pageHandlerController.createCsvExport)

    router.get("/get-website-metadata", pageHandlerController.getWebsiteMetadata)

    router.options('*', options);

    app.use(config.route.pageApiPrefix, router)
}