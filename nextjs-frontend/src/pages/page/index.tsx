import {useRouter} from "next/router";
import {sanitiseString} from "@/lib/string";
import {Loading} from "@/components/global/components/Loading";
import {usePage} from "@/components/page/graphql/usePage";
import {Page} from "@/components/page/components/Page";

export default function View() {
    const router = useRouter();

    const pageId = sanitiseString(router.query.pageId);

    const { data, loading } = usePage(pageId);

    if (loading) return <Loading />

    return (<Page page={data?.page} />)
}