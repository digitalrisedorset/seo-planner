import {getDate} from "@/lib/date";
import {PageStyles} from "@/components/page/styles/PageFilterStyles";
import {KeystonePage} from "@/components/page/types/page";
import {useState} from "react";
import {useCurrentPageUrl} from "@/components/page/hooks/usePage";
import {useUpdatePage} from "@/components/page/graphql/useUpdatePage";
import {router} from "next/client";
import {usePage} from "@/components/page/graphql/usePage";
import {useFlashMessage} from "@/state/FlassMessageState";
import {Loading} from "@/components/global/components/Loading";
import {PageVersionModel} from "@/components/page/models/PageVersion";

interface PageProps {
    page: KeystonePage
}

export const AugmentPage: React.FC<PageProps> = ({page}: PageProps) => {
    const [includeTitle, setIncludeTitle] = useState(true);
    const [includeKeywords, setIncludeKeywords] = useState(true);
    const [includeDescription, setIncludeDescription] = useState(true);
    const pageUrl = useCurrentPageUrl(page.slug)
    const [updatePageContent] = useUpdatePage(page.id)
    const { refetchPage } = usePage(page.id);
    const {addSuccessMessage} = useFlashMessage()
    const [loading, setLoading] = useState(false)
    const pageVersionHandler = new PageVersionModel()

    if (!pageUrl) {
        return <p>Loading website info...</p>;
    }

    const handleAugment = async () => {
        setLoading(true)
        const {title, keywords, description} = await pageVersionHandler.fetchNewPageMetadata(
            page, pageUrl, includeTitle, includeKeywords, includeDescription
        )

        await updatePageContent({
            variables: {
                updatePageContentId: page.id,
                title: title?? page.title,
                keywords: keywords?? page.keywords,
                description: description?? page.description,
                ranking: 0,
            }
        }).catch(console.error);
        await refetchPage();
        addSuccessMessage(`Your page was updated`)
        router.push({pathname: `/edit-page/${page.id}`});
        setLoading(false)
    }

    if (loading) return <Loading />

    return (<PageStyles>
        <span className="slug">{page.slug}</span>
        <span className="priority">{page.priority}</span>
        {page.ranking > 0 && <span className="ranking">{page.ranking}</span>}

        <label>
            <input type="checkbox" checked={includeTitle} onChange={() => setIncludeTitle(!includeTitle)} />
            <span className="field-label">Title:</span> {page.title}
        </label>

        <label>
            <input type="checkbox" checked={includeKeywords} onChange={() => setIncludeKeywords(!includeKeywords)} />
            <span className="field-label">Keywords:</span> {page.keywords}
        </label>

        <label>
            <input type="checkbox" checked={includeDescription} onChange={() => setIncludeDescription(!includeDescription)} />
            <span className="field-label">Description:</span> {page.description}
        </label>

        <span className="date-created">created at:<br/> {getDate(page.createdAt)}</span>
        <button type="button" onClick={() => handleAugment()}>AI Augment Selected</button>
    </PageStyles>
    )
}