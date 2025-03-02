import React from "react";

interface PageProps {
    children: React.ReactNode
}

export const Layout: React.FC<PageProps> = ({ children }: PageProps) => {
    return (
        <>{ children }</>
    )
}