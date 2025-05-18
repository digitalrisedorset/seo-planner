import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {useUserState} from "@/state/UserState";

export default function AuthCallback() {
    const router = useRouter();
    const { token } = router.query;
    const {refresh} = useUserState()

    useEffect(() => {
        if (token) {
            fetch('/api/store-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ token }),
            }).then(() => {
                refresh()
                router.push('/pages');
            });
        }
    }, [token]);

    return <p>Logging in...</p>;
}
