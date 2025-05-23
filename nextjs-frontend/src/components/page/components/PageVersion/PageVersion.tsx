import {KeystonePageVersion} from "@/components/page/types/pageVersion";
import {useDeletePageVersion} from "@/components/page/graphql/useDeletePageVersion";
import {useActivatePageVersion} from "@/components/page/graphql/useActivatePageVersion";
import {PageVersionStyles} from "@/components/page/styles/PageEditStyle";
import {usePageState} from "@/state/PageStateProvider";

interface PageVersionProps {
    pageVersion: KeystonePageVersion
    versionNumber: number
    activeVersion: boolean
}

export const PageVersion: React.FC<PageVersionProps> = ({pageVersion, versionNumber, activeVersion}: PageVersionProps) => {
    const [deletePageVersion] = useDeletePageVersion(pageVersion.id)
    const [updatePageVersion] = useActivatePageVersion(pageVersion.id)
    const {pageState, toggleActivePageVersion, clearActivePageVersionId} = usePageState()

    const handleActivate = async (e: React.FormEvent) => {
        e.preventDefault(); // stop the form from submitting
        toggleActivePageVersion(pageVersion.id)
        await updatePageVersion().catch(console.error);
    }

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pageVersion.id === pageState.activePageVersionId) {
            clearActivePageVersionId();
        }
        await deletePageVersion().catch(console.error);
    }

    return (
        <PageVersionStyles active={activeVersion?'true':'false'}>
            <div className="label">Version {versionNumber}</div>
            <div>
                <span className="slug">{pageVersion.slug}</span>
                <span className="title">{pageVersion.title}</span>
                <span className="description">{pageVersion.description}</span>
                <div className="actions">
                    <button type="button" onClick={handleActivate}>
                        Activate
                    </button>
                    <button type="button" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </PageVersionStyles>
    )
}