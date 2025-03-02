import {graphQLVariables} from "@/components/user-authentication/types/user";
import {PREFERENCE_HIDE_COMPLETE, PREFERENCE_RESET, PagePreferenceFilterType} from "@/components/page/types/page";

export const getUserPreferenceVariables = (userId: string, fields: PagePreferenceFilterType) => {
    const data: graphQLVariables = {}

    for (const index in fields) {
        if (!fields.hasOwnProperty(index)) continue;
        const value = fields[index as keyof PagePreferenceFilterType];
        if (value === undefined) continue

        switch (index) {
            case 'websitePreference':
                if (fields[index] === PREFERENCE_RESET) {
                    data[index] = {"disconnect": true}
                } else {
                    data[index] = {
                        "connect": {
                            "id": value
                        }
                    }
                }
                break;
            case 'hideComplete':
                if (fields[index] === PREFERENCE_HIDE_COMPLETE) {
                    data[index] = true
                } else {
                    data[index] = false
                }
                break;
        }
    }

    return {
        "data": data,
        "where": {
            "id": userId
        },
    }
}