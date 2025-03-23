import {NextRouter} from "next/router";

export const reloadPage = (router: NextRouter, route: string) => {
    router.replace(route).then(() => router.reload());
}