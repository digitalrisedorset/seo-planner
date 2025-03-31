import {CURRENT_USER_QUERY, UserInformation} from "@/components/user-authentication/hooks/useUser";
import {useQuery} from "@apollo/client";
import {useEffect} from "react";

export function useKeystoneUserQuery(status: string) {
    const { data, refetch, loading: queryLoading } = useQuery(CURRENT_USER_QUERY, {
        fetchPolicy: "network-only",
        skip: status !== "authenticated",
    });

    useEffect(() => {
        if (status === "authenticated") {
            refetch(); // make sure we have latest user info after login
        }
    }, [status]);

    return {
        user: data?.authenticatedItem,
        queryLoading
    }
}