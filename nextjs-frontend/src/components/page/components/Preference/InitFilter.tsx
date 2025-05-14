import React from "react";
import {EventRow, ViewEventStyle} from "@/components/global/styles/ItemStyles";
import {WebsitePreference} from "@/components/page/components/Preference/WebsiteReference";
import {WebsiteStatus} from "@/components/page/components/Preference/WebsiteStatus";
import {useUserState} from "@/state/UserState";

export const InitFilter: React.FC = () => {
    const {user} = useUserState()

    if (user === undefined) return

    return (
        <ViewEventStyle>
            <h5>Let&apos;s make this page listing easy</h5>
            <EventRow>
                <p className="label">What website do you want to use?</p>
                <WebsitePreference />
            </EventRow>
            <EventRow>
                <p className="label">Do you want to hide the complete pages</p>
                <WebsiteStatus />
            </EventRow>
        </ViewEventStyle>
    )
}