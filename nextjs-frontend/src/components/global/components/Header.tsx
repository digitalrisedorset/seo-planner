import Link from "next/link"
import {useRouter} from "next/router";
import Image from "next/image";
import React from "react";
import HeaderStyles from "@/components/global/styles/Header";

const Header: React.FC = () => {
    const router = useRouter()

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault(); // stop the form from submitting
        router.push({pathname: `/`});
    }

    return (
        <HeaderStyles>
            <Link href="#" onClick={handleClick}>
                <Image className="logo" src="/logo.png" width="80" height="77" alt=""/>
            </Link>
        </HeaderStyles>)
    ;
}

export default Header;