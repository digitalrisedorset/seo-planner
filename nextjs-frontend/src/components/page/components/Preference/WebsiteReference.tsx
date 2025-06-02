import React from "react";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {useUserPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {KeystoneWebsite} from "@/components/website/types/website";
import {useWebsites} from "@/components/website/graphql/useWebsites";
import {EventHostSelectionStyle} from "@/components/website/types/WebsiteStyle";
import {PreferenceChoice} from "@/components/page/styles/PageFilterStyles";
import {useUserState} from "@/state/UserState";

export const WebsitePreference: React.FC = () => {
    const { webistesData, loading } = useWebsites();
    const {user} = useUserState();
    const [updateUserPreference] = useUserPreference();
    
    if (!user) return null;

    const onWebsiteChange = async (e: React.MouseEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        await updateUserPreference({
            variables: getUserPreferenceVariables(user.id, {
                websitePreference: input.value,
            }),
        });
    };

    return (
        <EventHostSelectionStyle>
            {webistesData?.websites.map((item: KeystoneWebsite) => (
                <PreferenceChoice key={item.id}>
                    <input
                        type="radio"
                        id={item.label}
                        name="eventHost"
                        value={item.id}
                        onClick={onWebsiteChange}
                    />
                    <label htmlFor={item.label}>{item.label}</label>
                </PreferenceChoice>
            ))}
        </EventHostSelectionStyle>
    );
};
