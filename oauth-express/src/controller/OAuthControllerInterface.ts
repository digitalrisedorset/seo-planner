import {Request, Response} from "express";

export type ErrorResponse = {
    "error": string
}

type BaseResponse<TData> = TData | ErrorResponse;

export interface OAuthControllerInterface {
    authenticate: (req: Request, res: Response) => void;
}
