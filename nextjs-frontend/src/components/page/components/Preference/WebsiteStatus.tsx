import React from "react";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {useUserPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {EventHostSelectionStyle} from "@/components/website/types/WebsiteStyle";
import {PreferenceChoice} from "@/components/page/styles/PageFilterStyles";
import {PREFERENCE_HIDE_COMPLETE} from "@/components/page/types/page";

export const WebsiteStatus: React.FC = () => {
    const {user} = useUser()
    const [updateUserPreference] = useUserPreference()

    if (user === undefined) return

    const onStatusChange = async (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {'hideComplete': input.value})
        })
    };

    return <EventHostSelectionStyle>
                <PreferenceChoice key="hide_complete">
                    <input type="radio" id={"hide_complete"} name="status" value={PREFERENCE_HIDE_COMPLETE} onClick={onStatusChange} />
                    <label htmlFor="hide_complete">Yes</label>
                </PreferenceChoice>
                <PreferenceChoice key="not_complete">
                    <input type="radio" id={"not_complete"} name="status" value="false" onClick={onStatusChange} />
                    <label htmlFor="not_complete">No</label>
                </PreferenceChoice>
    </EventHostSelectionStyle>
}