export interface graphQLVariables {
    [k: string]: string | number | boolean | {"connect": { "id": string} } | {"disconnect": boolean }
}

export interface UserInformation {
    id: string
    email: string
    name: string
}