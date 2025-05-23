import {useRouter} from "next/router";
import {sanitiseString} from "@/lib/string";
import {EditPage} from "@/components/page/components/EditPage";
import {Loading} from "@/components/global/components/Loading";
import {usePage} from "@/components/page/graphql/usePage";
import {PageVersions} from "@/components/page/components/PageVersions";
import {PageEditStyle} from "@/components/page/styles/PageEditStyle";
import {usePageState} from "@/state/PageStateProvider";
import {useEffect} from "react";

export default function Page() {
    const router = useRouter();
    const {toggleActivePage} = usePageState()

    const pageId = sanitiseString(router.query.pageId);

    const { data, loading } = usePage(pageId);

    useEffect(() => {
        if (pageId) {
            toggleActivePage(pageId);
        }
    }, [pageId, toggleActivePage]);

    if (loading) return <Loading />

    return (
        <PageEditStyle>
            <EditPage page={data?.page} />
            <PageVersions page={data?.page} />
        </PageEditStyle>
    )
}