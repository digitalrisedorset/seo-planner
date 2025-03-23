import {FlashMessageProvider} from "@/state/FlassMessageState";
import {WebsiteStateProvider} from "@/state/WebsiteStateProvider";

export default function StateProvider({ children }: {
    children: React.ReactNode;
}) {
    return  <FlashMessageProvider>
                <WebsiteStateProvider>
                    {children}
                </WebsiteStateProvider>
            </FlashMessageProvider>;
}