import NavStyles from "@/components/global/styles/NavStyles";
import Link from "next/link";
import {SignOut} from "@/components/user-authentication/components/SignOut";
import {useUserState} from "@/state/UserState";

export const Nav: React.FC = () => {
    const {user} = useUserState()

    if (user === null) return null;

    return (
        <NavStyles>
            {user && (
                <>
                    <Link href="/create-page">Create Page</Link>
                    <Link href="/create-website">Create Website</Link>
                    <SignOut/>
                </>)}
            {!user && (
                <>
                    <Link href="/signin">Sign In</Link>
                    <Link href="/signup">Sign Up</Link>
                </>
            )}
        </NavStyles>
    );
}