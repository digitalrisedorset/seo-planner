import {useUser, useUserWebsiteId} from "@/components/user-authentication/hooks/useUser";
import {PageFilterKeys} from "@/components/page/types/page";
import {useMemo} from "react";

export const useFilter = () => {
    const user = useUser()
    const website = useUserWebsiteId()

    const filter: PageFilterKeys = {}

    return useMemo(() => {
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
    }, [website, filter, user]);
}
