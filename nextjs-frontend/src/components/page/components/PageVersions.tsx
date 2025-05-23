import React from "react";
import {EditPageProps} from "@/components/page/components/EditPage";
import {KeystonePage} from "@/components/page/types/page";
import {usePageVersions} from "@/components/page/graphql/usePageVersions";
import {Loading} from "@/components/global/components/Loading";
import {KeystonePageVersion} from "@/components/page/types/pageVersion";
import {PageVersion} from "@/components/page/components/PageVersion/PageVersion";
import {NoPageVersion} from "@/components/page/components/PageVersion/NoPageVersion";
import {PageVersionList} from "@/components/page/styles/PageEditStyle";
import {usePageState} from "@/state/PageStateProvider";

export interface PageProps {
    page: KeystonePage
}

export const PageVersions: React.FC<EditPageProps> = ({page}: PageProps) => {
    const { data, loading } = usePageVersions(page.id);
    const {pageState} = usePageState()

    if (loading) return <Loading />

    return (<PageVersionList>
            {data?.pageVersions.length > 0 && data?.pageVersions.map(
                (pageVersion: KeystonePageVersion, index: number) => <PageVersion key={pageVersion.id}
                                                                                  pageVersion={pageVersion}
                                                                                  versionNumber={index+1}
                                                                                  activeVersion={pageVersion.id === pageState.activePageVersionId}
                />
            )}
            {data?.pageVersions.length === 0 && <NoPageVersion />}
        </PageVersionList>
    )
}