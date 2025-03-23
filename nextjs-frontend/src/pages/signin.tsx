import {Sign} from "@/components/user-authentication/components/Sign";
import {Section} from "@/components/global/styles/MainStyles";
import {RequestReset} from "@/components/user-authentication/components/RequestReset";
import {AuthButton} from "@/components/user-authentication/components/AuthButton";


export default function Signin() {
    return (
        <Section>
            <Sign />
            <AuthButton />
            <RequestReset />
        </Section>
    )
}