import {getDate} from "@/lib/date";
import {PageStyles} from "@/components/page/styles/PageFilterStyles";
import {KeystonePage} from "@/components/page/types/page";
import {useRouter} from "next/router";
import {useDeletePage} from "@/components/page/graphql/useDeletePage";

interface PageProps {
    page: KeystonePage
}

export const Page: React.FC<PageProps> = ({page}: PageProps) => {
    const router = useRouter()
    const [deletePage] = useDeletePage(page.id)

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault(); // stop the form from submitting
        router.push({pathname: `/edit-page/${page.id}`});
    }

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        await deletePage().catch(console.error);
    }

    return (
        <PageStyles>
            <span className="slug">{page.slug}</span>
            <span className="priority">{page.priority}</span>
            {page.ranking > 0 && <span className="ranking">{page.ranking}</span>}
            <span className="title">{page?.currentVersion?.title}</span>
            <span className="description">{page?.currentVersion?.description}</span>
            <span className="date-created">created at:<br/> {getDate(page.createdAt)}</span>
            <button type="button" onClick={handleClick}>
                Edit
            </button>
            <button type="button" onClick={handleDelete}>
                Delete
            </button>
        </PageStyles>
    )
}