import {WebsiteStyles} from "@/components/website/styles/WebsiteFilterStyles";
import {KeystoneWebsite} from "@/components/website/types/website";

interface WebsiteProps {
    pagewebsite: KeystoneWebsite
}

export const Website: React.FC<WebsiteProps> = ({pagewebsite}: WebsiteProps) => {
    return (
        <WebsiteStyles>
            <span className="title">{pagewebsite.label}</span>
        </WebsiteStyles>
    )
}