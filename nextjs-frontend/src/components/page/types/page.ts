import {KeystoneWebsite} from "@/components/website/types/website";

export interface KeystonePage  {
    id: string,
    slug: string,
    title: string,
    keywords: string,
    description: string,
    website: KeystoneWebsite
    createdAt: string,
    ranking: number
    priority: number
}

export interface PagePreferenceFilterType {
    websitePreference?: string
}

export const PREFERENCE_RESET = 'reset'


export interface PageFilterKeys {
    website?: { "id": { "equals": string } },
    assignedTo?: { "id": { "equals": string } },
}

export const OPTION_SELECTED = 'checked'

export interface CsvExportResponse {
    filename: string,
    fileurl: string,
    numberItem?: number,
    rows: KeystonePage[]
}