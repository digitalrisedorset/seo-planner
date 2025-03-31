import {Label} from "@/components/global/styles/Form";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {useUserPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {KeystoneWebsite} from "@/components/website/types/website";
import {useWebsites} from "@/components/website/graphql/useWebsites";
import {VenueStyle} from "@/components/page/styles/PageFilterStyles";

export const WebsiteFilter: React.FC = () => {
    const {data} = useWebsites()
    const {user} = useUser()
    const [updateUserPreference] = useUserPreference()

    if (user?.id === undefined) return
    const onWebsiteChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id,{'websitePreference': e.target.value})
        })
    };

    return (
        <VenueStyle>
            <fieldset>
                <Label>Website Filter</Label>
                <select onChange={onWebsiteChange} className="form-select" value={user.websitePreference?.id}>
                    <option value="">-</option>
                    {data?.websites.map((item: KeystoneWebsite) => {
                        return (<option key={item.label} value={item.id}>{item.label}</option>)
                    })}
                </select>
            </fieldset>
        </VenueStyle>
    )
}