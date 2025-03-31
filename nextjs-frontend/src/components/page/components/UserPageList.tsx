import {usePages} from "@/components/page/graphql/useUserPages";
import {Loading} from "@/components/global/components/Loading";
import {Page} from "@/components/page/components/Page";
import {NoPage} from "@/components/page/components/NoPage";
import {PageList} from "@/components/page/styles/PageFilterStyles";
import {useUser} from "@/components/user-authentication/hooks/useUser";
import {KeystonePage} from "@/components/page/types/page";

export const UserPageList: React.FC = () => {
    const { data, loading } = usePages()

    if (loading) return <Loading />

    return (<PageList>
        {data?.pages.length > 0 && data?.pages.map(
            (page: KeystonePage) => <Page key={page.id} page={page} />
        )}
        {data?.pages.length === 0 && <NoPage />}
    </PageList>
    )
}