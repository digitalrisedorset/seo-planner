import type {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end();

    const { page, pageUrl, includeTitle, includeKeywords, includeDescription } = req.body;

    const response = await fetch(`${process.env.NODE_HOST}/openai/augment-page-data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            pageUrl: pageUrl,
            page,
            include: {
                title: includeTitle,
                keywords: includeKeywords,
                description: includeDescription,
            },
        }),
    });

    if (!response.ok) {
        return res.status(401).json({ error: response.error || 'AI was not able to return augmented page metadata' });
    }

    const result = await response.json();

    res.status(200).json(result);
};
