import {Page} from "../types/page";
import {fetchPageContent} from "./openai-handler/page-fetcher";
import {OpenaiAgent} from "./openai-handler/ai-agent";

type AugmentedInput = {
    pageUrl: string;
    page: Readonly<Page>;
    include: {
        title: boolean,
        keywords: boolean,
        description: boolean
    }
}

export class OpenaiHandler {
    getAugmentedPageData = async ({pageUrl, page, include}: AugmentedInput) => {
        const pageContent = await fetchPageContent(pageUrl)
        const openaiAgent = new OpenaiAgent()
        const prompt = openaiAgent.createPrompt(pageUrl, pageContent, page, include)

        return await openaiAgent.getAugmentedPageData(prompt, include)
    }
}