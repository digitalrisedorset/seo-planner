import {FlashMessageProvider} from "@/state/FlassMessageState";
import {WebsiteStateProvider} from "@/state/WebsiteStateProvider";
import {UserStateProvider} from "@/state/UserState";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return  <FlashMessageProvider>
                <WebsiteStateProvider>
                    <UserStateProvider>
                        {children}
                    </UserStateProvider>
                </WebsiteStateProvider>
            </FlashMessageProvider>;
}