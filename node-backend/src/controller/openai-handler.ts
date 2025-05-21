import { ErrorWrapper } from "../error-handler";
import { Request, Response } from "express";
import {OpenaiHandler} from "../model/openai-handler";
import {normalizeUrl} from "../lib/url";

export class OpenAIHandler {
    errorWrapper = new ErrorWrapper()

    getAugmentedMetadata = async (req: Request, res: Response): Promise<void> => {
        try {
            const pageUrl = normalizeUrl(req.body.pageUrl)
            const page = req.body.page
            const include = req.body.include

            const openAIHandler = new OpenaiHandler()
            const augmentedData = await openAIHandler.getAugmentedPageData({pageUrl, page, include})

            res.json(augmentedData);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    }
}