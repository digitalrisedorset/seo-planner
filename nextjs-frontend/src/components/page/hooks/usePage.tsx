import {useUserWebsite} from "@/components/website/graphql/useUserWebsite";

export const useCurrentPageUrl = (pageSlug: string) => {
    const website = useUserWebsite();

    if (!website?.data?.website.label) return undefined;

    return `${website?.data?.website?.url}/${pageSlug}`
}