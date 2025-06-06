import {useUserState} from "@/state/UserState";

export interface UserInformation {
    id: string
    email: string
    name: string
    websitePreference: WebsitePreference
    hideComplete: boolean
}

export interface WebsitePreference {
    id: string
    label: string
}

export function useUserWebsiteId(): string {
    const {user} = useUserState()

    if (user === undefined || user.websitePreference?.id === undefined) {
        return ''
    }

    return user.websitePreference?.id
}
