import { useUser, useUserWebsiteId } from "@/components/user-authentication/hooks/useUser";
import { PageFilterKeys } from "@/components/page/types/page";
import { useMemo } from "react";

export const useFilter = () => {
    const user = useUser();
    const website = useUserWebsiteId();

    return useMemo(() => {
        const filter: PageFilterKeys = {};

        // 💡 Guard against user being null or undefined
        if (!user || typeof user !== "object") {
            return filter;
        }

        if (user.websitePreference?.id) {
            filter["website"] = { id: { equals: website } };
        }

        if (user.hideComplete === true) {
            filter["completedAt"] = null;
        }

        filter["assignedTo"] = { id: { equals: user.id } };

        return filter;
    }, [website, user]);
};
