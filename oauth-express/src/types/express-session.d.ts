import 'express-session';

declare module 'express-session' {
    interface SessionData {
        passport: {
            user?: {
                id: string;
                email: string;
                name: string;
                hideComplete: boolean;
                provider: string;
                websitePreference?: {
                    id: string;
                    label: string;
                };
            };
        }
    }
}
