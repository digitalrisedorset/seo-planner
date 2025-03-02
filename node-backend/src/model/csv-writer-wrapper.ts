const csvLibWriter = require('csv-writer');
const path = require('path');
import { config } from '../config'

export class CsvWriterWrapper {
    writer = null;

    private filename = ''

    startImport = () => {
        this.setExportFilename('page-export')
    }

    setExportFilename = (prefix: string) => {
        this.filename = `${prefix}.csv`
    }

    getFilePath = () => {
        return `${config.rootDir}${config.export.csvFolder}/${this.filename}`
    }

    writeHeader = (row: any) => {
        console.log(`${(new Date()).toLocaleString()}: write csv file at ${this.getFilePath()}`)
        this.writer = csvLibWriter.createObjectCsvWriter({
            path: path.resolve(this.getFilePath()),
            header: row,
        });
    }

    writeRecords = async (rows: any): Promise<string> => {
        if (this.writer === null) {
            throw new Error('write has not been initialised')
        }

        //@ts-ignore
        return this.writer.writeRecords(rows).then(() => {
            return this.getCsvFileLink()
        })
    }

    getCsvFileLink = () => {
        return `${config.export.csvFolder}/${this.filename}`
    }
}