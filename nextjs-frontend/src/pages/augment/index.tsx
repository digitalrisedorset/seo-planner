import {useRouter} from "next/router";
import {sanitiseString} from "@/lib/string";
import {Loading} from "@/components/global/components/Loading";
import {usePage} from "@/components/page/graphql/usePage";
import {AugmentPage} from "@/components/page/components/AugmentPage";

export default function View() {
    const router = useRouter();

    const pageId = sanitiseString(router.query.pageId);

    const { pageData, loading } = usePage(pageId);

    if (loading) return <Loading />

    return (<AugmentPage page={pageData?.page} />)
}