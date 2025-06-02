import {KeystonePageVersion} from "@/components/page/types/pageVersion";
import {useDeletePageVersion} from "@/components/page/graphql/useDeletePageVersion";
import {useActivatePageVersion} from "@/components/page/graphql/useActivatePageVersion";
import {PageVersionStyles} from "@/components/page/styles/PageEditStyle";
import {usePageState} from "@/state/PageStateProvider";
import {truncate} from "@/lib/string";

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

    const isPageVersionActive = (): 'true' | 'false' => {
        if (activeVersion) {
            return  'true';
        }
        return pageVersion.isActive ? 'true' : 'false';
    };

    return (
        <PageVersionStyles active={isPageVersionActive()}>
            <div className="label version-number">Version {versionNumber}</div>
            <div>
                <div className="version-details-grid">
                    <div className="row main-row">
                        <span className="label">Title:</span>
                        <span className="value">{pageVersion.title}</span>
                    </div>
                    <div className="row sub-row">
                        <span className="label">Keywords:</span>
                        <span className="value">{truncate(pageVersion.keywords)}</span>
                    </div>
                    <div className="row sub-row">
                        <span className="label">Description:</span>
                        <span className="value">{truncate(pageVersion.description)}</span>
                    </div>
                </div>
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