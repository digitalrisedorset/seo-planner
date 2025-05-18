import { serialize } from 'cookie';
import {NextApiRequest, NextApiResponse} from "next";
import {setCookie} from "@/lib/cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Missing token' });
    }

    setCookie('token', token, req, res)

    res.status(200).json({ message: 'Cookie set' });
}
