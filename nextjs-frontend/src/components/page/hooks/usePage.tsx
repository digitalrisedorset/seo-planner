import {useUserWebsite} from "@/components/website/graphql/useUserWebsite";

export const useCurrentPageUrl = (pageSlug: string) => {
    const {websiteData} = useUserWebsite();

    if (!websiteData?.website.label) return undefined;

    return `${websiteData?.website?.url}/${pageSlug}`
}