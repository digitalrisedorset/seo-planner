import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginSuccess() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const router = useRouter();



    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            {status === 'loading' && <p>🔄 Signing you into the backend…</p>}
            {status === 'success' && <p>✅ You're signed in! Redirecting…</p>}
            {status === 'error' && <p>❌ Something went wrong syncing your session. Try refreshing the page.</p>}
        </div>
    );
}
