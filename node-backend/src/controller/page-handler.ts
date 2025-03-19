import { ErrorWrapper } from "../error-handler";
import { Request, Response } from "express";
import {CsvExportCreationResponse, PageControllerInterface, PageListMetaData} from "./PageControllerInterface";
import {ExportCreator} from "../model/export-creator";
import {PageMetadataReader} from "../model/page-metadata-reader";
import {escapeHtml} from "../lib/string";

export class PageHandler implements PageControllerInterface {
    errorWrapper = new ErrorWrapper()

    createCsvExport = async (req: Request, res: Response): Promise<void> => {
        try {
            const exporter = new ExportCreator()
            const rows = await exporter.getPageData(req.body)
            const filename = await exporter.finaliseWriteRows(rows)

            res.send({ filename, rows } as CsvExportCreationResponse)
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    getWebsiteMetadata = async (req: Request, res: Response): Promise<void> => {
        try {
            const websiteId = escapeHtml(req.query?.websiteId)
            if (websiteId === '') {
                res.status(500).json({ error: `The websiteId "${req.query.websiteId}" is invalid` });
            }

            const pageMetadataReader = new PageMetadataReader()
            const seoData = await pageMetadataReader.getWebsiteMetadata(websiteId)

            if (seoData.length === 0) {
                res.status(404).json({ error: "No SEO data found for this URL" });
            }

            res.json(seoData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    }
}