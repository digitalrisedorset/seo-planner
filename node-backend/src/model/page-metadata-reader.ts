import {query} from "../lib/db";

export class PageMetadataReader {

    getWebsiteMetadata = async (websiteId: string) => {
        const seoData = await query(
            `SELECT slug, title, description, keywords FROM public."Page" WHERE website = $1`,
            [websiteId]
        );

        return seoData
    }
}