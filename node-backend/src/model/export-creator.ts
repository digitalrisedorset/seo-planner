import {Page} from "../types/page";
import {CsvWriterWrapper} from "./csv-writer-wrapper";

type HeaderField =  {id:string, title: string}

export class ExportCreator {
    csvWriter = new CsvWriterWrapper()

    getPageData = async (data: Readonly<Page[]>) => {
        const header: HeaderField[] = [
            {'id':'title', 'title': 'Title'},
            {'id':'keywords', 'title': 'Keywords'},
            {'id':'description', 'title': 'Description'},
            {'id':'ranking', 'title': 'Ranking'},
            {'id':'priority', 'title': 'Priority'},
        ]
        this.csvWriter.startImport()
        this.csvWriter.writeHeader(header)

        return data.map((page: Page) => {
            return {
                slug: page.slug,
                title: page.title,
                keywords: page.keywords,
                description: page.description
            }
        })
    }

    finaliseWriteRows = async (csvRows: Readonly<(Page)[]>) => {
        console.log(`Import file with ${csvRows.length}`)
        return await this.csvWriter.writeRecords(csvRows)
    }
}