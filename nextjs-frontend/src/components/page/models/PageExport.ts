import {config} from "@/config";
import {CsvExportResponse, KeystonePage} from "@/components/page/types/page";

export class PageExportModel {
    createCsvFile = async (pageData: KeystonePage[]): Promise<CsvExportResponse | undefined> => {
        try {
            const data = pageData.map((page: KeystonePage) => {
                return {
                    keywords: page.keywords,
                    description: page.description,
                    priority: page.priority,
                    ranking: page.ranking
                }
            })

            const response = await fetch(`${config.nodejsEndpoint}/page/create-csv-export`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            let result = []
            if (response.status>=200 && response.status <300) {
                result = await response.json()
            } else{
                throw new Error();
            }

            return {
                filename: result.filename.split('/').pop(),
                fileurl: `${config.nodejsEndpoint}/${result.filename}`,
                numberItem: result?.rows.length,
                rows: result?.rows
            } as CsvExportResponse;
        } catch (e) {
            console.log(e)
        }
    }
}