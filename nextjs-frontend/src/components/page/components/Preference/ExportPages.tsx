import React, {useState} from "react";
import {Label} from "@/components/global/styles/Form";
import {ResetPrefence} from "@/components/page/styles/PageFilterStyles";
import {PageExportModel} from "@/components/page/models/PageExport";
import {usePages} from "@/components/page/graphql/useUserPages";
import {Loading} from "@/components/global/components/Loading";
import Link from "next/link";

export const ExportPages: React.FC = () => {
    const { data, loading } = usePages()
    const [downloadFile, setDownloadFile] = useState('')

    const exportInCsv = async (e: React.FormEvent) => {
        e.preventDefault();
        if (data?.pages.length===0) {
            alert('no page exist')
        }

        const exportModel = new PageExportModel()
        const response = await exportModel.createCsvFile(data?.pages)

        if (response) {
            setDownloadFile(response.fileurl)
        }
    };

    if (loading) return <Loading />

    return (
        <ResetPrefence>
            <fieldset>
                <Label></Label>
                <button className="reset-preference" type="button" onClick={exportInCsv}>
                    Export
                </button>
                {downloadFile && <Link className="download-export-file" href={downloadFile}><span>download csv report</span></Link>}
            </fieldset>
        </ResetPrefence>
    )
}