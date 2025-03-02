import {useUser, useUserWebsiteId} from "@/components/user-authentication/hooks/useUser";
import {PageFilterKeys} from "@/components/page/types/page";

export const useFilter = () => {
    const user = useUser()
    const website = useUserWebsiteId()

    const filter: PageFilterKeys = {}

    if (user === undefined) {
        return filter
    }

    if (user.websitePreference !== undefined) {
        filter['website'] = { "id": {"equals": website} }
    }

    if (user.hideComplete === true) {
        filter['completedAt'] = null
    }

    filter['assignedTo'] = {"id": {"equals": user.id}}

    return filter
}
