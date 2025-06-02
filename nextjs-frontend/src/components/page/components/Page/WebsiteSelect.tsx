import React from "react";
import {capitalise} from "@/lib/string";
import {Loading} from "@/components/global/components/Loading";
import {useWebsites} from "@/components/website/graphql/useWebsites";
import {useWebsiteState} from "@/state/WebsiteStateProvider";
import {SelectStyle} from "@/components/global/styles/ItemStyles";
import {Radio} from "@/components/global/components/Preference/Radio";
import {EditPageProps} from "@/components/page/components/EditPage";
import {KeystoneWebsite} from "@/components/website/types/website";

export const WebsiteSelect: React.FC<EditPageProps> = ({page}: EditPageProps) => {
    const {webistesData, loading} = useWebsites()
    const {websiteState, toggleActiveWebsite} = useWebsiteState();

    if (loading) return <Loading />

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        toggleActiveWebsite(e.target.value)
    }

    const websiteSelected = () => {
        return websiteState.activeWebsiteId || page.website.id
    }

    return <SelectStyle>
        {webistesData?.websites.map((item: KeystoneWebsite) => {
            return (
                <Radio key={`website-${item.id}`}
                       id={`website-${item.id}`}
                       name="website"
                       value={item.id}
                       checked={websiteSelected() === item.id}
                       onChange={handleSelect}
                       label={capitalise(item?.label)}
                />
            )
        })}
    </SelectStyle>
}