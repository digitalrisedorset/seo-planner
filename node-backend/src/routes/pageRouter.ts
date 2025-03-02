import express, { Application, Request, Response, NextFunction } from 'express'
import { config } from "../config";
import { corsOptions } from '../lib/cors-setup'
import { PageExport } from "../controller/pageExport";

export const setupPageRoutes = (app: Application) => {
    const router = express.Router()
    const options = corsOptions();
    router.use(options)

    const pageExportController = new PageExport()

    router.use('/', (req: Request, res: Response, next: NextFunction) => {
        console.log(`page export request: ${req.url}`)
        next()
    })

    router.post("/create-csv-export", pageExportController.createCsvExport)

    router.options('*', options);

    app.use(config.route.pageApiPrefix, router)
}