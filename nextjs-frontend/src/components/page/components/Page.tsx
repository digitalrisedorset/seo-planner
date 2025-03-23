import {getDate} from "@/lib/date";
import {PageStyles} from "@/components/page/styles/PageFilterStyles";
import {KeystonePage} from "@/components/page/types/page";
import {useRouter} from "next/router";
import {useUpdatePage} from "@/components/page/graphql/useUpdatePage";
import {useDeletePage} from "@/components/page/graphql/useDeletePage";
import {usePages} from "@/components/page/graphql/useUserPages";

interface PageProps {
    page: KeystonePage
}

export const Page: React.FC<PageProps> = ({page}: PageProps) => {
    const router = useRouter()
    const [updatePage] = useUpdatePage()
    const [deletePage] = useDeletePage(page.id)
    const { refetch } = usePages();

    const handleClick = async (e: React.FormEvent) => {
        e.preventDefault(); // stop the form from submitting
        router.push({pathname: `/edit-page/${page.id}`});
    }

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        await deletePage().catch(console.error);
    }

    async function handleComplete(e: React.FormEvent) {
        e.preventDefault(); // stop the form from submitting
        await updatePage({
            variables: {
                "data": { completedAt: new Date().toISOString() },
                "where": { "id": page.id },
            }
        }).catch(console.error);

        refetch();
    }

    return (
        <PageStyles>
            <span className="slug">{page.slug}</span>
            <span className="priority">{page.priority}</span>
            {page.ranking > 0 && <span className="ranking">{page.ranking}</span>}
            <span className="description">{page.description}</span>
            <span className="date-created">created at:<br/> {getDate(page.createdAt)}</span>
            {page.completedAt !== null &&
                <span className="date-completed">completed at:<br/> {getDate(page.completedAt)}</span>}
            <button type="button" onClick={handleClick}>
                Edit
            </button>
            <button type="button" onClick={handleDelete}>
                Delete
            </button>
            {page.completedAt === null && <button type="button" onClick={handleComplete}>
                Complete
            </button>}
        </PageStyles>
    )
}