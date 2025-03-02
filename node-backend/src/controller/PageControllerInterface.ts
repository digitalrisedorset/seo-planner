import { Request, Response } from "express";
import {Page} from "../types/page";

export type ErrorResponse = {
    "error": string
}

type BaseResponse<TData> = TData | ErrorResponse;

export interface PageControllerInterface {
    createCsvExport: (req: Request, res: Response) => Promise<any>;
}

export type CsvExportCreation = {
    filename: string,
    rows: Page[]
}

export type CsvExportCreationResponse = BaseResponse<CsvExportCreation>