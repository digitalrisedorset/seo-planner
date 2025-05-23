import {FlashMessageProvider} from "@/state/FlassMessageState";
import {WebsiteStateProvider} from "@/state/WebsiteStateProvider";
import {UserStateProvider} from "@/state/UserState";
import {PageStateProvider} from "@/state/PageStateProvider";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return  <FlashMessageProvider>
                <WebsiteStateProvider>
                    <PageStateProvider>
                        <UserStateProvider>
                            {children}
                        </UserStateProvider>
                    </PageStateProvider>
                </WebsiteStateProvider>
            </FlashMessageProvider>;
}