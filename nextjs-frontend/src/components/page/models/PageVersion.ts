import {KeystonePage} from "@/components/page/types/page";

export class PageVersionModel {
    fetchNewPageMetadata = async (page: KeystonePage, pageUrl: string, includeTitle: boolean, includeKeywords, includeDescription) => {
        const response = await fetch('/api/augment-page-metadata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({page, pageUrl, includeTitle, includeKeywords, includeDescription}),
        });

        const {title, keywords, description} = await response.json()

        // TODOS: add validation or error if medatadata are not valid
        return {title, keywords, description}
    }
}