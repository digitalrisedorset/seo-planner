import { Request, Response } from "express";
import {Page} from "../types/page";

export type ErrorResponse = {
    "error": string
}

type BaseResponse<TData> = TData | ErrorResponse;

export interface PageControllerInterface {
    createCsvExport: (req: Request, res: Response) => Promise<any>;

    getWebsiteMetadata: (req: Request, res: Response) => Promise<void>
}

export type CsvExportCreation = {
    filename: string,
    rows: Page[]
}

export type CsvExportCreationResponse = BaseResponse<CsvExportCreation>

export type PageListMetaData = BaseResponse<readonly Page[]>