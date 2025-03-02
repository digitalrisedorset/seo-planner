import React from "react";
import {EmptyListingStyles} from "@/components/page/styles/PageFilterStyles";

export const NoPage: React.FC = () => {
    return (
        <EmptyListingStyles>
            <h1>No Website were found matching your criterias</h1>
        </EmptyListingStyles>
    )
}