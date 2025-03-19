import { ErrorWrapper } from "../error-handler";
import { Request, Response } from "express";
import {CsvExportCreationResponse, PageControllerInterface} from "./PageControllerInterface";
import {ExportCreator} from "../model/export-creator";

export class PageExport implements PageControllerInterface {
    errorWrapper = new ErrorWrapper()

    createCsvExport = async (req: Request, res: Response): Promise<void> => {
        try {
            const exporter = new ExportCreator()
            const rows = await exporter.getPageData(req.body)
            const filename = await exporter.finaliseWriteRows(rows)
            console.log('Export complete', filename)
            res.send({ filename, rows } as CsvExportCreationResponse)
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }
}