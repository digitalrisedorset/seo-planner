import React from "react";
import {Label} from "@/components/global/styles/Form";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {PREFERENCE_RESET, PagePreferenceFilterType} from "@/components/page/types/page";
import {useUserPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {ResetPrefence} from "@/components/page/styles/PageFilterStyles";

export const ResetPreferenceFilter: React.FC = () => {
    const user = useUser()()
    const [updateUserPreference] = useUserPreference()

    if (user === undefined) return

    const resetFilter = async () => {
        const preference: PagePreferenceFilterType = {
            'websitePreference': PREFERENCE_RESET
        }

        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, preference)
        })
    };

    return (
        <ResetPrefence>
            <fieldset>
                <Label></Label>
                <button className="reset-preference" type="button" onClick={resetFilter}>
                    Reset Preference
                </button>
            </fieldset>
        </ResetPrefence>
    )
}