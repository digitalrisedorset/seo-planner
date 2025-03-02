import {useRouter} from "next/router";
import {sanitiseString} from "@/lib/string";
import {EditPage} from "@/components/page/components/EditPage";
import {Loading} from "@/components/global/components/Loading";
import {usePage} from "@/components/page/graphql/usePage";

export default function Page() {
    const router = useRouter();

    const pageId = sanitiseString(router.query.pageId);

    const { data, loading } = usePage(pageId);

    if (loading) return <Loading />

    return (<EditPage page={data?.page} />)
}