import {Sign} from "@/components/user-authentication/components/Sign";
import {Section} from "@/components/global/styles/MainStyles";
import {RequestReset} from "@/components/user-authentication/components/RequestReset";


export default function Signin() {
    return (
        <Section>
            <Sign />
            <RequestReset />
        </Section>
    )
}