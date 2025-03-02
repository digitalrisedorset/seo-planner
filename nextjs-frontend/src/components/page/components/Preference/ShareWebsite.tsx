import React from "react";
import {Label} from "@/components/global/styles/Form";
import {SharePrefence} from "@/components/page/styles/PageFilterStyles";
import {useRouter} from "next/router";

export const ShareWebsite: React.FC = () => {
    const router = useRouter();

    const share = async (e: React.FormEvent) => {
        e.preventDefault();
        router.push({pathname: `/share-website`});
    };

    return (
        <SharePrefence>
            <fieldset>
                <Label></Label>
                <button className="share" type="button" onClick={share}>
                    Share
                </button>
            </fieldset>
        </SharePrefence>
    )
}