import React from "react";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {getUserPreferenceVariables} from "@/components/user-authentication/lib/user-preference";
import {Loading} from "@/components/global/components/Loading";
import {useUserPreference} from "@/components/user-authentication/graphql/useUserPreference";
import {KeystoneWebsite} from "@/components/website/types/website";
import {useWebsites} from "@/components/website/graphql/useWebsites";
import {EventHostSelectionStyle} from "@/components/website/types/WebsiteStyle";
import {PreferenceChoice} from "@/components/page/styles/PageFilterStyles";

export const WebsitePreference: React.FC = () => {
    const { data, loading } = useWebsites();
    const { user, loading: userLoading } = useUser();
    const [updateUserPreference] = useUserPreference();

    if (userLoading || loading) return <Loading />;
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
            {data?.websites.map((item: KeystoneWebsite) => (
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
