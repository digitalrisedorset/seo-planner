import React, {useEffect, useState} from "react";
import {GlobalStyles} from "@/components/global/styles/Global";
import {MainStyles} from "@/components/global/styles/MainStyles";
import Header from "@/components/global/components/Header";
import {Nav} from "@/components/global/components/Nav";
import Footer from "@/components/global/components/Footer";

interface PageProps {
    children: React.ReactNode
}

const Page: React.FC<PageProps> = ({ children, ...delegated }: PageProps) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
    <MainStyles {...delegated}>
        <GlobalStyles />
            <Header />
            <Nav />
            {children}
            <Footer />
        </MainStyles>
    )
}

export default Page