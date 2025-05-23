import React from "react";
import {EmptyListingStyles} from "@/components/page/styles/PageFilterStyles";

export const NoPageVersion: React.FC = () => {
    return (
        <EmptyListingStyles>
            <h1>No versions were found for this page</h1>
        </EmptyListingStyles>
    )
}