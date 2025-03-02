export interface graphQLVariables {
    [k: string]: string | number | boolean | {"connect": { "id": string} } | {"disconnect": boolean }
}