import React from "react";
import {EmptyListingStyles} from "@/components/website/styles/WebsiteFilterStyles";

export const NoWebsite: React.FC = () => {
    return (
        <EmptyListingStyles>
            <h1>No Website were found matching your criterias</h1>
        </EmptyListingStyles>
    )
}